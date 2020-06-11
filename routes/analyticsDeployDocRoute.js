/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: NodeJs router 
*/

const express = require("express");
const routerAnalytics = express.Router();
//const app = express();



const AnalyticsDeployDoc = require("../models/AnalyticsDeployDoc")

routerAnalytics.post("/", (req,res) => {
    AnalyticsDeployDoc.find({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        //if not exist create object
        if(data == 0) {
            const analyticsDeployDocRoute = new AnalyticsDeployDoc({
                activityID: req.body.activityID,
                inveniraStdID: req.body.inveniraStdID,
                access : req.body.access,
                downloadDT : req.body.downloadDT,
                docsDesc : req.body.docsDesc
            });
        
            analyticsDeployDocRoute.save()
            .then (result => {
                //res.json(result);
                console.log(result);
             })
            .catch(err => {
                res.json({message: err});
                console.log(err);
            });
        }
        //else update object
        else{
            console.log('StudentID existente.');
            console.log("Objeto criado com sucesso...");
        }
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

routerAnalytics.put("/", (req,res) => {
    if(req.body.type=="dtURL"){
        AnalyticsDeployDoc.findOneAndUpdate({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}}, {$set : {'downloadDT': true}},{new:true})
        .exec()
        .then ((data) => {
            if(data != []) {
                res.status(200).json(data);
                console.log("From database",data);
            }
            //else error
            else{
                res.json({message:'Objeto inexistente.'});
                console.log('Objeto inexistente.');
            }
        })
        .catch ((error) => {
            console.log(error);
            res.status(500).json({error: error});
        });
    }

    else {
        var len = req.body.docsDesc.length;
        console.log('Len:' + len);
       for(var i=0 ; i < len ;i++){
           var doc = req.body.docsDesc[i];
           console.log(doc.desc);
          // "docsDesc.desc":{$gte: doc.desc}
           if(doc!=null){
                AnalyticsDeployDoc.findOneAndUpdate({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}, "docsDesc.desc":{$eq: doc.desc}  }, {$set : {'docsDesc.$.dLoad': true}},{new:true})
                .exec()
                .then ((data) => {
                    if(data != []) {
                        //res.send(data);
                        console.log("From database",data);
                    }
                    //else error
                    else{
                    // res.json({message:'Objeto inexistente.'});
                        console.log('Objeto inexistente.');
                    }
                })
                .catch ((error) => {
                    console.log(error);
                    res.status(500).json({error: error});
                });
            }
       }
    }
    
});
module.exports = routerAnalytics;













routerAnalytics.get("/", (req,res) => {
    AnalyticsDeployDoc.find({inveniraStdID:1001})
    .exec()
    .then ((data) => {
        const tudo = data;
        console.log("From database",tudo);
        if(tudo.size==!0)
            res.status(200).json(tudo);
        else{
            res.status(404).json({message:'StudentID inexistente.'});
        }
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

module.exports = routerAnalytics;