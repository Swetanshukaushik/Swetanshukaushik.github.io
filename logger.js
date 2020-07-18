const EventEmitter = require('events');
const uuid = require('uuid'); //creates universal unique IDs

class Logger extends EventEmitter{
    log(msg){
        //call event
        this.emit('message', {id:uuid.v4(), msg} );
    }
}
module.exports = Logger;

// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('message', (data) => console.log(`Called Listner:`,  data));           //These can be lodded into index.js and use module.export here
// logger.log('Hello World');

//console.log(uuid.v4());

