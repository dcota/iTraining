/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: NodeJs router 
*/

const express = require("express");
const deployDocRequest = express.Router();
const app = express();



const deployRequestCollection = require("../models/DeployDocRequest")

deployDocRequest.post("/", (req,res) => {
    deployRequestCollection.find({'activityID': {$eq: req.body.activityID}, 'inveniraStdID': {$eq: req.body.inveniraStdID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        //if not exist create object
        if(data==0) {
            //res.status(200).json(data);
            const deployRequestCollectionRoute = new deployRequestCollection({
                activityID: req.body.activityID,
                inveniraStdID: req.body.inveniraStdID,
                properties : req.body.properties
            });
            deployRequestCollectionRoute.save()
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
           // res.json({message:'Atividade existente.'});
            console.log('Atividade existente.');
        }
        var obj = {"deployURL":"http://localhost:5000/deploydoc/?inveniraStdID=" + req.body.inveniraStdID + "&activityID=" + req.body.activityID }
        res.json(obj);
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

deployDocRequest.get("/:inveniraStdID/:activityID", (req,res) => {
    deployRequestCollection.findOne({'activityID': {$eq: req.params.activityID}, 'inveniraStdID': {$eq: req.params.inveniraStdID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        //if not exist create object
        if(data!=0) {
            res.json(data);
        }
        //else update object
        else{
           // res.json({message:'Atividade existente.'});
            console.log('Atividade inexistente.');
        }
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

module.exports = deployDocRequest;