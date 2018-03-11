
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bill = new Schema({
    'billNumber':Number,
    'date':Date,
    'amount':Number
}, { collection: 'Bill' });

module.exports = mongoose.model('Bill',bill);