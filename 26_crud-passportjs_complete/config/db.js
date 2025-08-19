const mongoose = require('mongoose');   


mongoose.connect('mongodb://localhost:27017/passportjs-crud')


const db = mongoose.connection;

db.once('open', (err) => {
    if(err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        return false;
    }
    console.log('\nConnected to MongoDB');
});