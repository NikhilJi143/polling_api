const mongodb = require('mongoose');

mongodb.connect('mongodb+srv://nikkuchouhan250:QCK5RUreoGDYPQWg@cluster0.sucfytw.mongodb.net/?retryWrites=true&w=majority');

const connectParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

const db = mongodb.connection ;

db.on('error', console.error.bind(console, 'error connecting to database'));

db.once('open', ()=>{
    console.log("connected to database : mongoDB");
});

module.exports = mongodb ;