
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bill = new Schema({
    'invoice': Number,
    'createdDate': Date,
    'updatedDate':Date,
    'totalAmount': Number,
    'cgst': Number,
    'sgst': Number,
    'items': [],
    'companyName': String,
    'supplyDate': Date,
    'yourDcNumber': Number,
    'yourDcDate': Date,
    'ourDcNumber': Number,
    'ourDcDate': Date,
    'version': Number,
    'totWithGst':Number

}, { collection: 'Bill' });

module.exports = mongoose.model('Bill', bill);