/**
  * This file is responsible for building the assetManifest
  * to be passed to the createjs preloader at init time
  */

const assets = require.context('./assets', true, /\.(png|jpe?g)$/)

// build a useable array of the packaged assets
const files = assets.keys().map(e => {
  const ext = e.match(/\.([a-z]+)$/i)[1];
  const name = e.match(/\/([a-z\d-_\.]+)$/i)[1].replace('.' + ext, '')
  const path = e.replace('./','').replace(name, '').replace('.' + ext, '');
  return {path,name,ext}
});
// build the manifest for the createjs preloader
const assetManifest = files.map(e => {
  const id = e.path + e.name
  const src = assets('./' + id + '.' + e.ext)
  return {id,src}
});

export default assetManifest
