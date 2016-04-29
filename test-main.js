const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const fileContext = require.context('./app', true, /\.js$/i);
fileContext.keys().forEach(fileContext);
