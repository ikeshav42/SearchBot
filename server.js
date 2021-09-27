const express = require("express");

const server = express();

server.all("/",(req,res)=>{
  res.send("Server is running")
})

function alive()
{
  server.listen(3000, ()=>{
    console.log("Server ready")
  })
}

module.exports = alive