
'use strict';
const mongoose = require('mongoose');
const BillCollection = mongoose.model('Bill');
const moment = require('moment');


const storeBill = (req, res) => {

    BillCollection.findOne({ 'invoice': req.body.invoice }, function (err, event) {
        if (event === null) {


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
                }
                else {
                    res.send(saved);
                }
            })

        } else {
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


// BillCollection.find({"supplyDate": {"$gte": "2018-03-17", "$lte": "2018-03-17"}}, function (err, event) {
//     if (err || event === null) {
//         console.log(err);
//         //res.send(404).json(err);
//     } else {
//         console.log("success data",event);
//         //res.json(200,event);
//     }
// });

// BillCollection.find({}, function (err, event) {
//     if (err || event === null) {
//         console.log(err);
//         res.send(404).json(err);
//     } else {
//         //console.log("success data",event);
//        // res.json(200,event);
//        event.forEach(function(data){
//            if(new Date(data.supplyDate) >= new Date('2018-03-01') && new Date(data.supplyDate) <= new Date('2018-03-31')){
//                console.log("condition pased");
//            }
//        })
//     }
// });

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

module.exports = {
    storeBill: storeBill,
    getBill: getBill
}