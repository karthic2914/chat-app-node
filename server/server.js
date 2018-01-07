const path = require('path');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
//call express
const express = require('express');

var app = express();

app.use(express.static(publicPath));

//server listen

app.listen(port , () =>{
  console.log(`Server is Up on port ${port}` );
})
