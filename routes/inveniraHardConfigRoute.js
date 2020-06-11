/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: NodeJs router 
*/

const express = require("express");
const routerAnalytics = express.Router();
//const app = express();


const AnalyticsGetHard = require("../models/AnalyticsDeployHard")

routerAnalytics.get("/", (req,res) => {
    AnalyticsGetHard.find()
    .exec()
    .then ((data) => {
        console.log("From database",data);
        if(data != 0) {
            var objects=[];
            for(var i in data){
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