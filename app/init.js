import tickHandler from './tick-handler';

import assetManifest from './asset-manifest';

import DebugTool from './utils/debug-tools.js'

import {
  LoadQueue,
  Stage,
  Bitmap,
  Shape
} from 'createjs';

// this is the starting point of everything
/* istanbul ignore if */ // we ignore it because it throws off test coverage
if(process.env.NODE_ENV !== 'testing') { // we just don't want it to run during tests
  const queue = new LoadQueue(true);
  init(queue, assetManifest, ready);
}

export default function init(queue, manifest, ready) {
  // include the styles
  require('./app.less');

  // make sure we don't have duplicate id's on the manifest,
  // they cause issues due to how we build keys
  manifest.map((e, i, a) => {
    if(a.filter(s => {return (s !== e && s.id === e.id)}).length > 0) {
      throw new Error(`Whoops! Looks like you have multiple assets with same name but different extensions: ${e.id}`)
    }
  });

  // give the queue the assetManifest
  queue.loadManifest(manifest);

  // bind DOM ready listener
  document.addEventListener('DOMContentLoaded', initComplete);

  // bind the tick listener
  createjs.Ticker.addEventListener('tick', () => tickHandler.tick());

  function initComplete() {
    // this is the passed ready, not the exported ready
    queue.on('complete', () => ready(queue));
    queue.load();
  }
}

export function ready(queue) {
  /* DOM is finished loading stuff, we can start */
  // this is the main canvas
  const canvas = document.createElement('canvas');
  // set the initial canvas properties
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.id = 'canvas-main';
  const stage = new Stage(canvas);
  const backImg = queue.getResult('background-tile-256');
  const background = new Shape();
  background.graphics.beginBitmapFill(backImg, 'repeat').drawRect(0, 0, canvas.width, canvas.height);

  // add the background
  stage.addChild(background);

  // inject the canvas
  document.body.appendChild(canvas);
  // register the tick callback for updating the stage (won't draw without)
  /* istanbul ignore next */
  const debugTool = window.dtool = new DebugTool(stage);
  debugTool.create();

  tickHandler.registerCallback(function() {
    debugTool.update();
    stage.update();
  });
}
