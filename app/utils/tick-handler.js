class TickHandler {
  constructor() {
    this.callbacks = [];
  }

  tick() {
    this.callbacks.map(e => e());
  }

  registerCallback(cb) {
    if(typeof cb !== 'function') throw new Error('`cb` must be a function');
    this.callbacks.push(cb);
  }
}

export default TickHandler;
