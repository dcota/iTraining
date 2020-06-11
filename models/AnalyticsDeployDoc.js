/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: MongoDB schema for deploy documentation activity
*/

const mongoose = require("mongoose");

const AnalyticsSchemaActivityDoc = mongoose.Schema({
    "activityID": {"type": Number},
    "inveniraStdID": {"type": Number},
    "access": {"type": Boolean},
    "downloadDT": {"type": Boolean},
    "docsDesc": {"type": ["Mixed"]},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("AnalyticsDeployDoc",AnalyticsSchemaActivityDoc);