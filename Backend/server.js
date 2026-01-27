const express=require('express')
const cors=require('cors')
require("dotenv").config();
const connectDB = require("./config/db");


connectDB();
const app=express()

const port=3000
const authRoutes=require('./routes/authRoutes')
const marketRoutes = require("./routes/cardRoutes");
const betRoutes=require("./routes/betRoutes")
const userRoutes=require("./routes/userRoutes")

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use("/api/markets", marketRoutes);
app.use("/api/bets", betRoutes);
app.use("/api/users", userRoutes);

// app.get('/api/auth',(req,res)=>{
//     res.send("hello bro")
// })

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

