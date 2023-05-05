const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const crecheRoutes = require('./routes/crecheRoutes');
const enfantRoutes = require('./routes/enfantRoutes');
const cookieParser = require('cookie-parser');
const reservationRoutes = require('./routes/reservationRoutes');
const path = require('path');
require('dotenv').config({path:
path.resolve(__dirname,'./.env')});

app.use(express.json());
app.use(cookieParser());
//start the server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
}
);
//routes
app.use('/api/auth', authRoutes);
app.use('/creche', crecheRoutes);
app.use('/enfant', enfantRoutes);
app.use('/reservation',reservationRoutes);




