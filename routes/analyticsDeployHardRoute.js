/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: NodeJs router 
*/

const express = require("express");
const routerAnalytics = express.Router();
//const app = express();


const AnalyticsDeployHard = require("../models/AnalyticsDeployHard")

routerAnalytics.post("/", (req,res) => {
    AnalyticsDeployHard.find({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        //if not exist create object
        if(data == 0) {
            const analyticsDeployHardRoute = new AnalyticsDeployHard({
                activityID: req.body.activityID,
                inveniraStdID: req.body.inveniraStdID,
                access : req.body.access,
                downloadInstr : req.body.downloadInstr,
                downloadCode : req.body.downloadCode,
                downloadDocsLibs : req.body.downloadDocsLibs,
                upload : req.body.upload,
                studentData: req.body.studentData
            });
        
            analyticsDeployHardRoute.save()
            .then (result => {
                console.log(result);
                console.log("Objeto criado com sucesso...");
             })
            .catch(err => {
                res.json({message: err});
                console.log(err);
            });
        }
        else{
            console.log('StudentID existente.');
        }
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

routerAnalytics.put("/", (req,res) => {
    if(req.body.type=="downloadInstr"){
        AnalyticsDeployHard.findOneAndUpdate({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}}, {$set: {'downloadInstr': true}},{new:true})
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

    else if(req.body.type=="downloadCode"){
        AnalyticsDeployHard.findOneAndUpdate({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}}, {$set: {'downloadCode': true}},{new:true})
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

    else if (req.body.type=="docsLibs") {
        var len = req.body.downloadDocsLibs.length;
        console.log('Len:' + len);
        for(var i=0 ; i < len ;i++){
           var doc = req.body.downloadDocsLibs[i];
           console.log(doc.desc);
          // "docsDesc.desc":{$gte: doc.desc}
           if(doc!=null){
                AnalyticsDeployHard.findOneAndUpdate({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}, "downloadDocsLibs.desc":{$eq: doc.desc}  }, {$set: {'downloadDocsLibs.$.dLoad': true}},{new:true})
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
    else {
           if(req.body!=null){
                AnalyticsDeployHard.findOneAndUpdate({'inveniraStdID': {$eq: req.body.inveniraStdID}}, {$set: {'upload': true}, $push: {'studentData': req.body}},{new:true})
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
});

module.exports = routerAnalytics;