/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: MongoDB schema for testing hardware activity deploy request
*/

const mongoose = require("mongoose");

const DeployHardRequestSchema = mongoose.Schema({
    "activityID": {"type": "Number"},
    "inveniraStdID": {"type": "Number"},
    "properties": {
        "summary": {"type": "String"},
        "codeURL": {"type": "String"},
        "instrURL": {"type" : "String"},
        "libsURLs": {"type": ["Mixed"]}
    },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("DeployHardRequest",DeployHardRequestSchema);