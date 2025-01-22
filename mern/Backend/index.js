const express= require('express')

const app= express()
const con=require('./db.js')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Update to match the frontend's origin
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

con();
app.get('/',(req,res)=>{
    res.send("hello")
})
app.use(express.json())                                        //imp for use  

app.use('/api', require('./Routes/CreateUser.js'))   //create user
app.use('/api', require('./Routes/DisplayData.js'))   //create user
app.use('/api', require('./Routes/orderdata.js'))   //create user
app.listen(5000, ()=>{
    console.log("run")
})