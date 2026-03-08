require('ts-node/register');
const config = require('./config/config.ts'); // ajusta la ruta si es necesario

console.log(
    'Usando config TS:',
    config.configDB[process.env.NODE_ENV || 'development']
);
module.exports = config.configDB[process.env.NODE_ENV || 'development'];
