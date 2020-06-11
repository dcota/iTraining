/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Node Js route for create/update analytics
*/

const express = require("express");
const routerAnalytics = express.Router();
//const app = express();


const AnalyticsGetDoc = require("../models/AnalyticsDeployDoc")

//code for POST request
routerAnalytics.post("/", (req,res) => {
    AnalyticsGetDoc.find({'activityID': {$eq: req.body.activityID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        if(data != 0) {
            var maxInteractions = data[0].docsDesc.length + 2;
            console.log('Interac: '+ maxInteractions);
            var getAnalytics = [];
            for(var i in data){
                var objects = [];
                var count=0;
                var totalInteractions=0;
                if(data[i].access==true)
                    totalInteractions+=1;
                if(data[i].downloadDT==true)
                    totalInteractions+=1
                for(var j in data[i].docsDesc){
                    if(data[i].docsDesc[j].dLoad == true)
                        count = count + 1;
                }
                var percDocsTec = (count/data[i].docsDesc.length)*100;
                var percProgress=((totalInteractions+count)/maxInteractions)*100
                var obj = {"name": "Acesso à atividade", "value": data[i].access}
                objects.push(obj);
                obj  = {"name": "Download Descritivo Técnico", "value": data[i].downloadDT};
                objects.push(obj);
                obj = {"name": "Download Documentos Técnicos (%)", "value": percDocsTec.toFixed(2)};
                objects.push(obj);
                obj = {"name": "Progresso na atividade (%)", "value": percProgress.toFixed(2)};
                objects.push(obj);
                obj = {"inveniraStdID": data[i].inveniraStdID, "quantAnalytics": objects,
                    "qualAnalyticsURL":'http://localhost:5000/qualAnalyticsDoc/?activityID='+ req.body.activityID + '&' +'inveniraStdID=' +data[i].inveniraStdID }
                getAnalytics.push(obj);
  
            }
            res.json(getAnalytics);
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

//code for GET request
routerAnalytics.get("/:activityID/:inveniraStdID", (req,res) => {
    AnalyticsGetDoc.findOne({'activityID': {$eq: req.params.activityID}, 'inveniraStdID': {$eq: req.params.inveniraStdID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        if(data != 0) {
            var arr=[];
            if(data.downloadDT==true)
                arr.push('Descritivo Técnico')
            var len = data.docsDesc.length;
            for(var i=0; i<len; i++){
                if(data.docsDesc[i].dLoad==true)
                    arr.push(data.docsDesc[i].desc)
            }
            res.json(arr);
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