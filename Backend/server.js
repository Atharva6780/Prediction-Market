const express=require('express')
const cors=require('cors')
require("dotenv").config();
const connectDB = require("./config/db");


connectDB();
const app=express()

const port=3000
const authRoutes=require('./routes/authRoutes')

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoutes)

// app.get('/api/auth',(req,res)=>{
//     res.send("hello bro")
// })

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

