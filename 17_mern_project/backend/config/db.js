
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern_users');

const db = mongoose.connection;


db.once('open',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("DB connected successfully...");
})

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('DB connection error:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
