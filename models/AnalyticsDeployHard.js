/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: MongoDB schema for deploy documentation activity
*/

const mongoose = require("mongoose");

const AnalyticsSchemaActivityHard = mongoose.Schema({
    "activityID": {"type": Number},
    "inveniraStdID": {"type": Number},
    "access": {"type": Boolean},
    "downloadInstr": {"type": Boolean},
    "downloadCode": {"type": Boolean},
    "downloadDocsLibs": {"type": ["Mixed"]},
    "upload": {"type": Boolean},
    "studentData": {"type": ["Mixed"]},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("AnalyticsDeployHard",AnalyticsSchemaActivityHard);