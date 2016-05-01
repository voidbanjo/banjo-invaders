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

    it('should push the provided function onto the `callbacks` array on context', () => {
      const func = function(){};
      const contextStub = {
        callbacks: []
      };

      TickHandler.prototype.registerCallback.call(contextStub, func);

      expect(contextStub.callbacks.length).to.equal(1);
      expect(contextStub.callbacks[0]).to.equal(func);
    });

    it('should not push duplicates', () => {
      const func = function(){};
      const contextStub = {
        callbacks: []
      };

      TickHandler.prototype.registerCallback.call(contextStub, func);
      TickHandler.prototype.registerCallback.call(contextStub, func);
      TickHandler.prototype.registerCallback.call(contextStub, func);

      expect(contextStub.callbacks.length).to.equal(1);
      expect(contextStub.callbacks[0]).to.equal(func);
    });
  });

  describe('unregsiterCallback', () => {
    it('should throw when the provided is not a function', () => {
      expect(TickHandler.prototype.unregisterCallback.bind({}, {})).to.throw(Error);
    });

    it('should remove the provided function from the `callbacks` array on context', () => {
      const func1 = () => {};
      const func2 = () => {};
      const func3 = () => {};
      const contextStub = {
        callbacks: [func1,func2,func3]
      };

      TickHandler.prototype.unregisterCallback.call(contextStub, func2);

      expect(contextStub.callbacks.length).to.equal(2);
      expect(contextStub.callbacks[0]).to.equal(func1);
      expect(contextStub.callbacks[1]).to.equal(func3);
    });
  });
});
