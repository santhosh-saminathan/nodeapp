
'use strict';
const mongoose = require('mongoose');
const BillCollection = mongoose.model('Bill');
const moment = require('moment');


const storeBill = (req, res) => {

    BillCollection.findOne({ 'invoice': req.body.invoice }, function (err, event) {
        if (event === null) {

            console.log("inside new bill")

            let supplyDt = (req.body.supplyDate.split('/')[2] + '-' + req.body.supplyDate.split('/')[1] + '-' + req.body.supplyDate.split('/')[0]).toString();
            let yourDcDt = (req.body.yourDcDate.split('/')[2] + '-' + req.body.yourDcDate.split('/')[1] + '-' + req.body.yourDcDate.split('/')[0]).toString();
            let ourDcdt = req.body.ourDcDate ? (req.body.ourDcDate.split('/')[2] + '-' + req.body.ourDcDate.split('/')[1] + '-' + req.body.ourDcDate.split('/')[0]).toString() : null;

            let billData = {
                'invoice': req.body.invoice,
                'createdDate': new Date(Date.now()),
                'updatedDate': new Date(Date.now()),
                'totalAmount': req.body.totalAmount,
                'cgst': req.body.cgst,
                'totWithGst': req.body.totWithGst,
                'sgst': req.body.sgst,
                'items': req.body.items,
                'companyName': req.body.companyName,
                'supplyDate': supplyDt,
                'yourDcNumber': req.body.yourDcNumber,
                'yourDcDate': yourDcDt,
                'ourDcNumber': req.body.ourDcNumber,
                'ourDcDate': ourDcdt,
                'version': 0,
            }
            let BillDocument = new BillCollection(billData);
            BillDocument.save((error, saved) => {
                if (error) {
                    res.json(400, { 'status': 'error', 'data': 'Failed to store data' });

                }
                else {
                    res.json(200, saved);
                }
            })

        } else {
            console.log("bill already exists in store api")
            let supplyDt = (req.body.supplyDate.split('/')[2] + '-' + req.body.supplyDate.split('/')[1] + '-' + req.body.supplyDate.split('/')[0]).toString();
            let yourDcDt = (req.body.yourDcDate.split('/')[2] + '-' + req.body.yourDcDate.split('/')[1] + '-' + req.body.yourDcDate.split('/')[0]).toString();
            let ourDcdt = req.body.ourDcDate ? (req.body.ourDcDate.split('/')[2] + '-' + req.body.ourDcDate.split('/')[1] + '-' + req.body.ourDcDate.split('/')[0]).toString() : null;

            BillCollection.findOneAndUpdate({
                'invoice': req.body.invoice
            }, {
                    'updatedDate': new Date(Date.now()),
                    'totalAmount': req.body.totalAmount,
                    'cgst': req.body.cgst,
                    'sgst': req.body.sgst,
                    'totWithGst': req.body.totWithGst,
                    'items': req.body.items,
                    'companyName': req.body.companyName,
                    'supplyDate': supplyDt,
                    'yourDcNumber': req.body.yourDcNumber,
                    'yourDcDate': yourDcDt,
                    'ourDcNumber': req.body.ourDcNumber,
                    'ourDcDate': ourDcdt,
                    'version': 1,

                }, { new: true })
                .exec((error, updatedDetails) => {
                    if (error) {
                        res.json(400, { 'status': 'error', 'data': 'Failed to update likes' });
                    }
                    else {
                        res.json(200, updatedDetails);
                    }
                })
        }
    });


}


const getBill = (req, res) => {

    let startYear = req.body.startYear.toString();
    let startMonth = parseInt(req.body.startMonth) < 10 ? 0 + req.body.startMonth.toString() : req.body.startMonth.toString();
    let startDate = req.body.startDate.toString();
    let endYear = req.body.lastYear.toString();
    let endMonth = parseInt(req.body.lastMonth) < 10 ? 0 + req.body.lastMonth.toString() : req.body.lastMonth.toString();
    let endDate = req.body.lastDate.toString();

    let newArray = [];

    BillCollection.find({}, function (err, event) {
        if (err || event === null) {
            res.send(404).json(err);
        } else {
            let count = 0;
            event.forEach(function (data) {
                count++;
                if (new Date(data.supplyDate) >= new Date(startYear + '-' + startMonth + '-' + startDate) && new Date(data.supplyDate) <= new Date(endYear + '-' + endMonth + '-' + endDate)) {
                    newArray.push(data);
                }
            })

            if (event.length === count) {
                res.json(200, newArray);
            }
        }
    });
}

const deleteInvoiceBill = (req, res) => {
    BillCollection.findOneAndRemove({ 'invoice': req.body.invoice }, function (err, event) {
        if (err) {
            res.send(404).json(err);
        } else {
            res.json(200, event)
        }
    });
}


const getSingleBill = (req, res) => {
    BillCollection.findOne({ 'invoice': req.body.invoice }, function (err, event) {
        if (err) {
            res.send(404).json(err);
        } else {
            res.json(200, event)
        }
    });
}

const updateBill = (req, res) => {
    console.log("bill update")
    let supplyDt = (req.body.supplyDate.split('/')[2] + '-' + req.body.supplyDate.split('/')[1] + '-' + req.body.supplyDate.split('/')[0]).toString();
    let yourDcDt = (req.body.yourDcDate.split('/')[2] + '-' + req.body.yourDcDate.split('/')[1] + '-' + req.body.yourDcDate.split('/')[0]).toString();
    let ourDcdt = req.body.ourDcDate ? (req.body.ourDcDate.split('/')[2] + '-' + req.body.ourDcDate.split('/')[1] + '-' + req.body.ourDcDate.split('/')[0]).toString() : null;

    BillCollection.findOneAndUpdate({
        'invoice': req.body.invoice
    }, {
            'updatedDate': new Date(Date.now()),
            'totalAmount': req.body.totalAmount,
            'cgst': req.body.cgst,
            'sgst': req.body.sgst,
            'totWithGst': req.body.totWithGst,
            'items': req.body.items,
            'companyName': req.body.companyName,
            'supplyDate': supplyDt,
            'yourDcNumber': req.body.yourDcNumber,
            'yourDcDate': yourDcDt,
            'ourDcNumber': req.body.ourDcNumber,
            'ourDcDate': ourDcdt,
            'version': 1,

        }, { new: true })
        .exec((error, updatedDetails) => {
            if (error) {
                res.json(400, { 'status': 'error', 'data': 'Failed to update likes' });
            }
            else {
                res.json(200, updatedDetails);
            }
        })
}

module.exports = {
    storeBill: storeBill,
    getBill: getBill,
    deleteInvoiceBill: deleteInvoiceBill,
    getSingleBill: getSingleBill,
    updateBill: updateBill
}
