class TickHandler {
  constructor() {
    this.callbacks = [];
  }

  tick() {
    this.callbacks.map(e => e());
  }

  registerCallback(cb) {
    if(typeof cb !== 'function') throw new Error('`cb` must be a function');
    if(this.callbacks.indexOf(cb) === -1) {
      this.callbacks.push(cb);
    }
  }

  unregisterCallback(cb) {
    if(typeof cb !== 'function') throw new Error('`cb` must be a function');
    this.callbacks = this.callbacks.filter(e => e !== cb);
  }
}

export default TickHandler;
