'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,webToken');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

var billSchema = require(path.resolve('./schema/billSchema.js'));



var mongoose = require('mongoose');
//mongoose.connect('mongodb://vinayaga:vinayaga@ds261118.mlab.com:61118/vinayaga');
 mongoose.connect('mongodb://localhost/test1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we are connected to database");
});




app.get('/test',function(req,res){
    res.send("Hello world");
})

app.post('/store/bill',require('./routes/billApi').storeBill);
app.post('/bill',require('./routes/billApi').getBill);
app.post('/invoice/delete',require('./routes/billApi').deleteInvoiceBill);



app.listen(app.get('port'), () => {
    console.log('Express server started');
});

module.exports = app
