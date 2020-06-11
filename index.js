/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Node Js server main file
*/

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ip = require("ip");
var cors = require('cors')
console.dir (ip.address());

mongoose.set('useFindAndModify', false);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//define all server handlers
const routCourses = require("./routes/trainee_data");
const routeAnalyticsDepDocs = require("./routes/analyticsDeployDocRoute");
const routeAnalyticsDepHard = require("./routes/analyticsDeployHardRoute");
const routeDeployDocRequest = require("./routes/deployDocRequestRoute");
const routeDeployHardRequest = require("./routes/deployHardRequestRoute");
const routeAnalitycsGetHard = require("./routes/analyticsGetHardRoute");
const routeAnalitycsGetDoc = require("./routes/analyticsGetDocRoute");
const routeInveniraDoc = require("./routes/inveniraDocRoute");
const routeInveniraHardConfig = require("./routes/inveniraHardConfigRoute");
app.use("/api/trainee_data",routCourses);
app.use("/api/analyticsDeployDocRoute",routeAnalyticsDepDocs);
app.use("/api/analyticsDeployHardRoute",routeAnalyticsDepHard);
app.use("/api/deployDocRequestRoute",routeDeployDocRequest);
app.use("/api/deployHardRequestRoute",routeDeployHardRequest);
app.use("/api/analyticsGetHardRoute",routeAnalitycsGetHard);
app.use("/api/analyticsGetDocRoute",routeAnalitycsGetDoc);
app.use("/api/inveniraDocRoute",routeInveniraDoc);
app.use("/api/inveniraHardConfigRoute",routeInveniraHardConfig);

app.use(express.static('./public'));

//respond to deploy Documentation activity request
app.get('/deploydoc/:?', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/html/activity_deploy_doc.html'));
});

//respond to deploy Hardware Configuration activity request
app.get('/deployhardconfig/:?', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/html/activity_deploy_hard.html'));
});

//respond to Inven!RA analytics request - Documentation
app.get('/qualAnalyticsDoc/:?', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/html/analyticsDoc.html'));
});

//respond to Inven!RA analytics request - Hardware Configuration
app.get('/qualAnalyticsHardConfig/:?', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/html/analyticsHardConfig.html'));
});

//respond to simulate Inven!RA show analytics request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/invenira.html'));
});

//respond to config Documentation activity request
app.get('/configDocActivity', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/html/activity_config_doc.html'));
});

//respond to config Hardware Configuration activity request
app.get('/configHardACtivity', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/html/activity_config_hard.html'));
});

//URL to Cloud MongoDB
const dbURL = "mongodb://dcota:MiniLeo1969@itrainingdb-shard-00-00-yhlad.mongodb.net:27017,	itrainingdb-shard-00-01-yhlad.mongodb.net:27017,itrainingdb-shard-00-02-yhlad.mongodb.net:27017/json_data?ssl=true&replicaSet=iTrainingDB-shard-0&authSource=admin&retryWrites=true&w=majority";

//connect to MongoDB
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true},() => console.log("connected to database!"));

//define PORT
const PORT = 5000;

//set listen to PORT
app.listen(process.env.PORT || PORT, () => console.log ('Listening on port ' + PORT));