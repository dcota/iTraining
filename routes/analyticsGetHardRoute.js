/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Node Js route for create/update analytics
*/

const express = require("express");
const routerAnalytics = express.Router();

const AnalyticsGetHard = require("../models/AnalyticsDeployHard")

//code for POST request
routerAnalytics.post("/", (req,res) => {
    AnalyticsGetHard.find({'activityID': {$eq: req.body.activityID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        var getAnalytics = [];
        if(data != 0) {
            var maxInteractions = data[0].downloadDocsLibs.length + 4;
            for(var i in data){
                var objects = [];
                var count=0;
                var totalInteractions=0;
                if(data[i].access==true){
                    totalInteractions +=1;
                }
                if(data[i].downloadInstr==true){
                    totalInteractions += 1;
                }
                if(data[i].downloadCode==true) {
                    totalInteractions += 1;
                }
                if(data[i].upload==true){
                    totalInteractions += 1;
                }            
                for(var j in data[i].downloadDocsLibs){
                    if(data[i].downloadDocsLibs[j].dLoad == true)
                        count += 1;
                }
                var percDocsTec = (count/data[i].downloadDocsLibs.length)*100;
                var percProgress=((totalInteractions+count)/maxInteractions)*100;
                var obj = {"name": "Acesso à atividade", "value": data[i].access}
                objects.push(obj);
                obj  = {"name": "Download Instruções", "value": data[i].downloadInstr};
                objects.push(obj);
                obj  = {"name": "Download Código-Base", "value": data[i].downloadCode};
                objects.push(obj);
                obj  = {"name": "Upload dados", "value": data[i].upload};
                objects.push(obj);
                obj = {"name": "Download Documentos Técnicos (%)", "value": percDocsTec.toFixed(2)};
                objects.push(obj);
                obj = {"name": "Progresso na atividade (%)", "value": percProgress.toFixed(2)};
                objects.push(obj);
                obj = {"inveniraStdID": data[i].inveniraStdID, "quantAnalytics": objects,
                    "qualAnalyticsURL":'http://localhost:5000/qualAnalyticsHardConfig/?activityID='+ req.body.activityID + '&' +'inveniraStdID=' +data[i].inveniraStdID }
                getAnalytics.push(obj);
            }
            res.json(getAnalytics);
        }
        else {
            console.log('Atividade inexistente.');
            res.send("Atividade inexistente");
        }
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

//code for GET request
routerAnalytics.get("/:activityID/:inveniraStdID", (req,res) => {
    AnalyticsGetHard.findOne({'activityID': {$eq: req.params.activityID}, 'inveniraStdID': {$eq: req.params.inveniraStdID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        if(data != 0) {
            var arrDoc=[];
            var arrCode=[];
            var arrUpload=[];
            if(data.downloadInstr==true)
                arrDoc.push('Instruções do projeto');
            if(data.downloadCode==true)
                arrCode.push('Código-base');
            var len = data.downloadDocsLibs.length;
            for(var i=0; i<len; i++){
                if(data.downloadDocsLibs[i].dLoad==true)
                    arrCode.push(data.downloadDocsLibs[i].desc)
            }
            if(data.studentData.length>0)
                arrUpload = data.studentData;
            var obj = {"downloadInstr": arrDoc, "downloadCode" : arrCode, "studentData": arrUpload};
            console.log(obj);
            res.json(obj);
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