/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: NodeJs router 
*/

const express = require("express");
const routerAnalytics = express.Router();
//const app = express();


const AnalyticsGetDoc = require("../models/AnalyticsDeployDoc")

routerAnalytics.post("/", (req,res) => {
    AnalyticsGetDoc.find()
    .exec()
    .then ((data) => {
        console.log("From database",data);
        if(data != 0) {
            var objects=[];
            var len = data.length;
            for(var i=0; i<len; i++){
                if(objects.includes(data[i].activityID,0)==false)
                    objects.push(data[i].activityID);
            }
            console.log(objects);
            res.json(objects);
        }
        else{
            console.log('Base de dados vazia');
            res.send('Base de dados vazia');
        }
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

module.exports = routerAnalytics;