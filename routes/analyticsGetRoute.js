/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: NodeJs router 
*/

const express = require("express");

const routerGet = express.Router();

const AnalyticsDeployDoc = require("../models/AnalyticsDeployDoc")

routerGet.get("/", (req,res) => {
    AnalyticsDeployDoc.find()
    .then ((data) => {
        res.json(data);
        console.log(data);
    })
    .catch ((error) => {
        console.log(error);
    });
});

module.exports = routerGet;