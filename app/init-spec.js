import { expect } from 'chai';
import sinon from 'sinon';

import assetManifest from './asset-manifest';

import * as init from './init';

import TickHandler from './utils/tick-handler';

import * as tickHandlerObj from './tick-handler';

describe('init', () => {
  let sandbox;
  let queue;
  let ready;
  let tickHandler = tickHandlerObj.default;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    ready = sandbox.stub();
    tickHandler = new TickHandler();
    queue = {loadManifest:sandbox.stub()}

    sandbox.stub(document, 'addEventListener');
    sandbox.stub(createjs.Ticker, 'addEventListener');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('default', () => {
    it('should throw if the assetManifest has duplicate keys', () => {
      const man = Array.prototype.concat.apply([], assetManifest);
      const duplicate = {id: 'duplicateHere'};
      const duplicate2 = Object.assign({},duplicate);
      man.push(duplicate)
      man.push(duplicate2)

      expect(init.default.bind(null,queue,man,ready)).to.throw(Error);
    });

    it('should call loadManifest on the provided queue', () => {
      init.default(queue, assetManifest, ready);

      expect(queue.loadManifest).to.have.been.calledWith(assetManifest);
    });

    it('should register a `domContentLoaded` listener', () => {
      init.default(queue, assetManifest, ready);

      expect(document.addEventListener).to.have.been.calledWith('DOMContentLoaded');
      expect(document.addEventListener.firstCall.args[1]).to.be.a.function;
    });

    describe('domContentLoaded callback', () => {
      beforeEach(() => {
        queue.on = sandbox.stub();
        queue.load = sandbox.stub();
      });

      it('should call `load` on queue', () => {
        init.default(queue, assetManifest, ready);

        // test the domConentLoaded callback
        document.addEventListener.firstCall.args[1]()

        expect(queue.load).to.have.been.calledOnce;
      });

      it('should register `complete` event listener with queue that calls ready with the queue', () => {
        init.default(queue, assetManifest, ready);

        // test the domConentLoaded callback
        document.addEventListener.firstCall.args[1]()

        expect(queue.on).to.have.been.calledWith('complete');
        expect(queue.on.firstCall.args[1]).to.be.a('function');

        queue.on.firstCall.args[1]()

        expect(ready).to.have.been.calledWith(queue);
      });
    });

    it('should bind the tick listener', () => {
      // you need to stub the prototype because classes are weird
      sandbox.stub(TickHandler.prototype, 'tick');

      init.default(queue, assetManifest, ready);

      expect(createjs.Ticker.addEventListener).to.have.been.calledWith('tick');

      // execute the addEventListener callback that was just registered
      createjs.Ticker.addEventListener.firstCall.args[1]();

      expect(tickHandler.tick).to.have.been.calledOnce;
    });
  });

  describe('ready', () => {
    beforeEach(function() {
      sandbox.stub(tickHandler, 'registerCallback');
      sandbox.stub(document.body, 'appendChild');

      queue.getResult = sandbox.stub().returns('result')
    });
    // TODO: better coverage of the ready function
    it('should append a canvas element to the body', () => {
      init.ready(queue);

      expect(document.body.appendChild).to.have.been.calledOnce;
    });
  });
});
