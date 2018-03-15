
'use strict';
const mongoose = require('mongoose');
const BillCollection = mongoose.model('Bill');


const storeBill = (req, res) => {
    console.log("bill store");

    BillCollection.findOne({ 'invoice': req.body.invoice }, function (err, event) {
        if (event === null) {

            console.log("ajshaskcjam,sca",req.body);
            let billData = {
                'invoice': req.body.invoice,
                'createdDate': new Date(Date.now()),
                'updatedDate': new Date(Date.now()),
                'totalAmount': req.body.totalAmount,
                'cgst': req.body.cgst,
                'totWithGst':req.body.totWithGst,
                'sgst': req.body.sgst,
                'items': req.body.items,
                'companyName': req.body.companyName,
                'supplyDate': new Date(Date.now(req.body.supplyDate)),
                'yourDcNumber': req.body.yourDcNumber,
                'yourDcDate': new Date(Date.now(req.body.yourDcDate)),
                'ourDcNumber': req.body.ourDcNumber,
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
                    'totWithGst':req.body.totWithGst,
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


// BillCollection.find({"supplyDate": {"$gte": new Date("2018-3-12 00:00:00Z"), "$lte": new Date("2018-3-12 23:59:59Z")}}, function (err, event) {
//     if (err || event === null) {
//         console.log(err);
//         //res.send(404).json(err);
//     } else {
//         console.log("success data",event);
//         //res.json(200,event);
//     }
// });

const getBill = (req, res) => {
   
    console.log("Get bill",req.body);
    let startYear  = req.body.startYear;
    let startMonth = req.body.startMonth;
    let startDate =req.body.startDate ;
    let endYear = req.body.lastYear;
    let endMonth = req.body.lastMonth;
    let endDate = req.body.lastDate;

    BillCollection.find({"supplyDate": {"$gte": new Date((startYear+'-'+startMonth+'-'+startDate+" 00:00:00Z").toString()), "$lte": new Date((endYear+'-'+endMonth+'-'+endDate+" 00:00:00Z").toString())}}, function (err, event) {
        if (err || event === null) {
            console.log(err);
            res.send(404).json(err);
        } else {
            console.log("success data");
            res.json(200,event);
        }
    });
}

module.exports = {
    storeBill: storeBill,
    getBill: getBill
}