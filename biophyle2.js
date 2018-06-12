var express = require('express');
var app = express();
var l;
var seq1, seq2, difficulty, stage;

stage = 0;
app.get('/',function(req,res){
    if(req.query.seq1!= null && req.query.seq2!= null && req.query.gaps!= null) {
        console.log("In if block");
        seq1 = req.query.seq1;
        seq2 = req.query.seq2;
        l = req.query.gaps;
        console.log(seq1);
        console.log(seq2);
        console.log(l);

        res.sendFile("./public/stagepage.html", {root: __dirname});
    }
    else
    {
        res.sendFile("./public/startpage.html",  { root : __dirname});
        console.log("get");
    }


});

app.get('/getseq1',function(req,res){
    res.send(seq1);
});

app.get('/getseq2',function(req,res){
   res.send(seq2);
});

app.get('/getgaps',function(req,res){
    res.send(l);
});


app.get('/diff',function(req,res){
    res.send(difficulty);
});

app.get('/getdiff',function(req,res){
    difficulty = req.query.diff;
    console.log("Difficulty"+difficulty);
});
app.get('/getstage',function(req,res){
    console.log("stage"+stage);
    res.send(stage.toString());
});

app.get('/stagecomplete',function(req,res){
    if(stage<l-1)
        stage = stage +1;
    console.log("Stage"+stage);
    res.send("0");
});


module.exports = app;
app.use(express.static('public'));
app.listen(process.env.PORT||3000);