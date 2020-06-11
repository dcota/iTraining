/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: MongoDB schema for documentation activity deploy request
*/

const mongoose = require("mongoose");

const DeployDocRequestSchema = mongoose.Schema({
    "activityID": {"type": "Number"},
    "inveniraStdID": {"type": "Number"},
    "properties": {
        "summary": {"type": "String"},
        "dtURL": {"type": "String"},
        "docsURLs": {"type": ["Mixed"]}
    },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("DeployDocRequest",DeployDocRequestSchema);