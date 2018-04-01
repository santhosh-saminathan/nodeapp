
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
    'supplyDate': String,
    'yourDcNumber': String,
    'yourDcDate': String,
    'ourDcNumber': String,
    'ourDcDate': String,
    'version': Number,
    'totWithGst':Number

}, { collection: 'Bill' });

module.exports = mongoose.model('Bill', bill);