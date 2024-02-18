const express=require('express')
const app=express()
const cors = require('cors');
app.use(express.json())
const path = require("path");
require('./models/dbConnection')
const userRouter= require('./routes/user')

app.use(cors());
const todoRoutes=require('./routes/todo')

app.use(todoRoutes)
app.use(userRouter)

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "todo-frontend", "build")));
    res.sendFile(path.resolve(__dirname, "todo-frontend", "build", "index.html"));
  });
const port=3000;

app.listen(port, ()=>{
    console.log("server running ")
})


