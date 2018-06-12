var express = require('express');
var app = express();
app.get('/',function(req,res){
  res.sendFile("./crossword.html",  { root : __dirname});
});
module.exports = app;
app.use(express.static('public'));
app.listen(process.env.PORT||8000);