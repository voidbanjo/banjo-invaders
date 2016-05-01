import tickHandler from './tickHandler';

export default function init() {
  // bind addEventLister
  document.addEventListener('DOMContentLoaded', ready);

  createjs.Ticker.addEventListener('tick', tickHandler.tick);
}

export function ready() {
  // things are ready, do stuff
}
