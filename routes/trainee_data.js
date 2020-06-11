/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: NodeJs router 
*/

const express = require("express");
const router = express.Router();

const Data = require("../models/Data")

router.post("/", (req,res) => {
    const trainee_data = new Data({
        project: req.body.project,
        inveniraStdID: req.body.inveniraStdID,
        temp : req.body.temp,
        press : req.body.press,
        hum : req.body.hum
    });

   trainee_data
        .save()
        .then (result => {
            res.json(result);
            console.log(result);
        })
        .catch(err => {
            res.json({message: err});
            console.log(err);
        });
});

module.exports = router;