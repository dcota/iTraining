/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: MongoDB schema for trainee data
*/

const mongoose = require("mongoose");

const TraineeDataSchema = mongoose.Schema({
    "project": {"type": "String"},
    "inveniraStdID": {"type": "Number"},
    "temp": {"type": ["Number"]},
    "press": {"type": ["Number"]},
    "hum" : {"type": ["Number"]},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Data",TraineeDataSchema);