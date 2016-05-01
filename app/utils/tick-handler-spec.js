import { expect } from 'chai';
import sinon from 'sinon';

import TickHandler from './tick-handler';

describe('TickHandler', () => {
  describe('constructor', () => {
    it('should create an empty `callbacks` array', () => {

    });
  });

  describe('tick', () => {
    it('should call each array item in `callbacks` on context as a function',  () => {
      const spy1 = sinon.spy();
      const spy2 = sinon.spy();
      const contextStub = {
        callbacks: [spy1,spy2]
      };

      TickHandler.prototype.tick.call(contextStub);

      expect(spy1).to.have.been.calledOnce;
      expect(spy2).to.have.been.calledOnce;
    });
  });

  describe('registerCallback', () => {
    it('should throw when the provided is not a function', () => {
      expect(TickHandler.prototype.registerCallback.bind({}, {})).to.throw(Error);
    });

    it('should push the provided function onto the callback array on context', () => {
      const func = function(){};
      const contextStub = {
        callbacks: []
      };

      TickHandler.prototype.registerCallback.call(contextStub, func);

      expect(contextStub.callbacks.length).to.equal(1);
      expect(contextStub.callbacks[0]).to.equal(func);
    });
  })
});
