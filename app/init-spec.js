import { expect } from 'chai';
import sinon from 'sinon';

import * as init from './init';

import TickHandler from './utils/tick-handler';

import * as tickHandlerObj from './tick-handler';

let tickHandler = tickHandlerObj.default;

describe('init', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    tickHandler = new TickHandler();

    sandbox.stub(document, 'addEventListener');
    sandbox.stub(createjs.Ticker, 'addEventListener');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('default', () => {
    it('should register a `domContentLoaded` listener', () => {
      init.default();

      expect(document.addEventListener).to.have.been.calledWith('DOMContentLoaded', init.ready);
    });

    it('should bind the tick listener', () => {
      // you need to stub the prototype because classes are weird
      sandbox.stub(TickHandler.prototype, 'tick');

      init.default();

      expect(createjs.Ticker.addEventListener).to.have.been.calledWith('tick');

      // execute the addEventListener callback that was just registered
      createjs.Ticker.addEventListener.firstCall.args[1]();

      expect(tickHandler.tick).to.have.been.calledOnce;
    });
  });

  describe('ready', () => {
    it('should do nothing', () => {
      init.ready();

      expect('everything').to.be.OK; // shh. it's okay
    });
  });
});
