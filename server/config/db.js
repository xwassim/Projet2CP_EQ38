const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://Islam:mongopass21@projet2cp.rx9aiit.mongodb.net/Projet2CP',
        {useNewUrlParser: true,  
        useUnifiedTopology: true, 
});

        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        console.log('MongoDB connection failed');
        process.exit(1);
    }
}




module.exports = connectDB;












