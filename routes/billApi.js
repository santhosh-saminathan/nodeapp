
'use strict';
const mongoose = require('mongoose');
const BillCollection = mongoose.model('Bill');


const storeBill = (req, res) => {
    console.log("bill store");
    let billData = {
        'billNumber': 1233,
        'date': new Date(Date.now()),
        'amount': 1000.50
    }
    let BillDocument = new BillCollection(billData);
    BillDocument.save((error, saved) => {
        console.log(error,saved);
        if (error) {
           // res.json(400, { 'status': 'error', 'data': 'Failed to like event' });
        }
        else {
            res.send(saved);
           // res.json(201, likeAdded);
        }
    })

}

module.exports = {
    storeBill: storeBill
}