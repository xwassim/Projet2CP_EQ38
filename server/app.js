const express = require("express");
const mongoose = require("mongoose");

const app = express();
const SearchRoute = require('./routes/SearchRoute');

const port = process.env.PORT || 5000;
app.use(express.json());



const dbo = require('./config/db')

dbo().then(()=>{
app.listen(port,  () => {
   
	console.log(`Server is running on port: ${port}`);
	});
});






app.use('/',SearchRoute)

