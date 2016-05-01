import tickHandler from './tick-handler';

import {
  Stage,
  Bitmap,
  Shape
} from 'createjs';

export default function init() {
  // bind addEventLister
  document.addEventListener('DOMContentLoaded', ready);

  createjs.Ticker.addEventListener('tick', () => tickHandler.tick());
}

export function ready() {
  // things are ready, do stuff

  // include the styles
  require('./app.less');

  // draw a background
  const canvas = document.createElement('canvas');
  const stage = new Stage(canvas);
  const background = new Shape();
  const backImg = new Image();

  // set the initial canvas properties
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.id = 'canvas-main';

  // inject the canvas
  document.body.appendChild(canvas);

  // set background image src
  backImg.src = require('./assets/background-tile.png');

  stage.addChild(background);
  background.x = 0;
  background.y = 0;
  background.graphics.beginBitmapFill(backImg, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
}

init();
