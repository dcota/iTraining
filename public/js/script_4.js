/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Javascript atividade Consulta de Documentação
*/

//empty fields for JSON input
var summary ="";
var codeURL = "";
var instrURL = "";
var links = [];
var docsLibs = [];
var inveniraStdID;
var activityID;
//aux fields
var count_links = 0;

//main function
function script() {
	const queryString = window.location.search;
	console.log(queryString);
	const urlParams = new URLSearchParams(queryString);
	inveniraStdID = urlParams.get('inveniraStdID');
	console.log(inveniraStdID);
	activityID = urlParams.get('activityID');
	console.log(activityID);
	const getCode_button = document.getElementById("getInstr_button")

	getData();
	
	getCode_button.addEventListener("click", function()
	{
		openDoc(instrURL);
		updateDB(activityID,inveniraStdID,"downloadInstr");
    });


	const getInstr_button = document.getElementById("getCode_button")
	getInstr_button.addEventListener("click", function()
	{
		alert('Tome nota do seu ID para identificação do código: ' + inveniraStdID);
		openDoc(codeURL);
		updateDB(activityID,inveniraStdID,"downloadCode");
    });
    
    const getLinks_button = document.getElementById("getLinks_button")
	getLinks_button.addEventListener("click", function()
	{
		openLinks();
	});
	
}

//shows URL description
function showURLs(link) {
	links.push(link);//adiciona ao array local para abrir
    var myDiv = document.getElementById("box3"); 
    // creating checkbox element 
    var checkbox = document.createElement('input'); 
    checkbox.type = "checkbox"; 
    checkbox.name = "name"; 
    checkbox.value = "value"; 
    checkbox.id = count_links; 
    // creating label for checkbox 
    var label = document.createElement('label'); 
    // assigning attributes for the created label tag  
    label.htmlFor = "id"; 
    // appending the created text to the created label tag  
	label.appendChild(document.createTextNode(link.desc));   
    //appending the checkbox and label to div 
    myDiv.appendChild(checkbox); 
    myDiv.appendChild(label); 
    document.getElementById('box3').innerHTML += "<br>";
    count_links = count_links + 1;
}

//open URL
function openLinks() {
	var count_children = document.getElementById("box3").children;
	docsLibs=[];
	var docArray = function(desc){
		this.desc = desc; 
	};
	for(var i=0; i<count_children.length; i++) {
		if(count_children[i].type == "checkbox") {
			if(count_children[i].checked) {
				window.open(links[count_children[i].id].lnk,"", "width=800, height=600");
				docsLibs.push((new docArray(links[count_children[i].id].desc)));
			}
		}
	}
	updateDB(activityID,inveniraStdID,"docsLibs");
}

//open thecnical doc on new window
function openDoc(url) {
	window.open(url,"", "width=800, height=600");
}

//GET JSON file 
function getData() {
	console.log('http://localhost:5000/api/deployHardRequestRoute/'+inveniraStdID+'/'+activityID);
	fetch('http://localhost:5000/api/deployHardRequestRoute/'+inveniraStdID+'/'+activityID)
		.then(res => res.json())
		.then(data => processData(data))
		.catch(function (error) {
			alert('Request failed', error)
		});
}

//outputs last URL link from list
function processData(data) { 
	document.getElementById('desc').innerHTML = data.properties.summary;
    //document.getElementById('box1').innerHTML = data.properties.instrURL;
    //document.getElementById('box2').innerHTML = data.properties.codeURL;
    summary= data.properties.summary;
    instrURL=data.properties.instrURL;
    codeURL=data.properties.codeURL;
	for(var i=0; i < data.properties.libsURLs.length; i++) {            
        showURLs(data.properties.libsURLs[i]);
	}
	createDBObject(activityID,inveniraStdID,data);
}

//create new object in database
function createDBObject(activityID,inveniraStdID,data) {
	var obj = new Object();
	obj.activityID = activityID;
	obj.inveniraStdID = inveniraStdID;
	obj.access = true;
	obj.downloadInstr = false;
	obj.downloadCode = false;
	obj.upload = false;
	obj.studentData = [];
	var arr = [];
	var docArray = function(desc, dLoad){
    this.desc = desc; 
    this.dLoad = dLoad; 
    };
	for (var i = 0; i < data.properties.libsURLs.length; i++) {
		arr.push((new docArray(data.properties.libsURLs[i].desc,false)));
	}
	obj.downloadDocsLibs=arr;
	myJSON = JSON.stringify(obj);
	console.log(myJSON);
	const options = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		mode:'cors',
		body: myJSON
	};
	fetch('http://localhost:5000/api/analyticsDeployHardRoute',options)
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		console.log('Request successful:', text);
	})
	.catch(function (error) {
		log('Request failed', error)
	});
}

//update db object
function updateDB(activityID,inveniraStdID,type) 
{
	var obj = new Object();
	obj.activityID = activityID;
	obj.inveniraStdID = inveniraStdID;
	obj.type=type;
	if(type=="docsLibs")
		obj.downloadDocsLibs = docsLibs;
	myJSON = JSON.stringify(obj);
	console.log(myJSON);
	const options = {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json'
		},
		mode:'cors',
		body: myJSON
	};
	fetch('http://localhost:5000/api/analyticsDeployHardRoute',options)
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		console.log('Request successful:', text);
	})
	.catch(function (error) {
		log('Request failed', error)
	});
}