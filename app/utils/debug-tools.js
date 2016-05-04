import { Ticker, Container, Text } from 'createjs';

class DebugTool {
  // expects a stage to attach to
  // will attach att 0,0 and place a container
  constructor /* istanbul ignore next */ (stage) {
    this.stage = stage;
  }

  create /* istanbul ignore next */ () {
    const defaults = ['', 'bold 16px Arial', '#e33'];
    // make the text instances
    this.targetFps = new Text(...defaults);
    this.currentFps = new Text(...defaults);
    this.tickId = new Text(...defaults);
    const pad = 14;
    // set the x positions of the text elements so they stack
    this.currentFps.y = pad
    this.tickId.y = pad * 2
    // make the containesr instance
    this.container = new Container();
    // add the text instances to the container
    this.container.addChild(this.targetFps, this.currentFps, this.tickId);
    // add the container to the stage provided
    this.stage.addChild(this.container);
  }

  toggle /* istanbul ignore next */ () {
    if(this.container) {
      this.destroy();
    } else {
      this.create();
    }
  }

  destroy /* istanbul ignore next */ () {
    this.stage.removeChild(this.container);
    // clean up
    delete this.targetFps;
    delete this.tickId;
    delete this.container;
  }

  update /* istanbul ignore next */ () {
    if(!this.container) return; // don't update if the container don't exist
    this.targetFps.set({text: `tFPS: ${Ticker.framerate}`}); // The desired FPS
    this.currentFps.set({text: `rFPS: ${Ticker.getMeasuredFPS().toFixed(2)}`}); // The real FPS
    this.tickId.set({text: `tickId: ${Ticker.getTicks()}`}); // # ticks passed, we used as tickId
  }
}

export default DebugTool;
