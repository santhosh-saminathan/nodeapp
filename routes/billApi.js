
'use strict';
const mongoose = require('mongoose');
const BillCollection = mongoose.model('Bill');


const storeBill = (req, res) => {
    console.log("bill store");

    BillCollection.findOne({ 'invoice': req.body.invoice }, function (err, event) {
        if (event === null) {
            let billData = {
                'invoice': req.body.invoice,
                'createdDate': new Date(Date.now()),
                'updatedDate': new Date(Date.now()),
                'totalAmount': req.body.totalAmount,
                'cgst': req.body.cgst,
                'sgst': req.body.sgst,
                'items': req.body.items,
                'companyName': req.body.companyName,
                'supplyDate': new Date(Date.now(req.body.supplyDate)),
                'yourDcNumber': req.body,
                'yourDcDate': new Date(Date.now(req.body.yourDcDate)),
                'ourDcNumber': req.body,
                'ourDcDate': new Date(Date.now(req.body.ourDcDate)),
                'version': 0,
            }
            let BillDocument = new BillCollection(billData);
            BillDocument.save((error, saved) => {
                console.log(error, saved);
                if (error) {
                }
                else {
                    res.send(saved);
                }
            })

        } else {
            BillCollection.findOneAndUpdate({
                'invoice': req.body.invoice
            }, {
                    'updatedDate': new Date(Date.now()),
                    'totalAmount': req.body.totalAmount,
                    'cgst': req.body.cgst,
                    'sgst': req.body.sgst,
                    'items': req.body.items,
                    'companyName': req.body.companyName,
                    'supplyDate': new Date(Date.now(req.body.supplyDate)),
                    'yourDcNumber': req.body.yourDcNumber,
                    'yourDcDate': new Date(Date.now(req.body.yourDcDate)),
                    'ourDcNumber': req.body.ourDcNumber,
                    'ourDcDate': new Date(Date.now(req.body.ourDcDate)),
                    'version': 1,

                }, { new: true })
                .exec((error, updatedDetails) => {
                    console.log("update event", error, updatedDetails);
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
    BillCollection.findOne({ 'invoice': req.body.invoice }, function (err, event) {
        if (err || event === null) {
            console.log(err);
        } else {
            console.log(event);
        }
    });
}

module.exports = {
    storeBill: storeBill,
    getBill: getBill
}