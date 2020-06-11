/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Javascript deploy consulta de documentação
*/

var description = '';
var dtDoc = '';
var linkToDT ='';
var links = [];
var docsURLs = [];
var activityID
var inveniraStdID;


//aux fields
var count_links = 0;

//main function
function script(document) {
	const queryString = window.location.search;
	console.log(queryString);
	const urlParams = new URLSearchParams(queryString);
	inveniraStdID = urlParams.get('inveniraStdID');
	console.log(inveniraStdID);
	activityID = urlParams.get('activityID');
	console.log(activityID);

	getData(); 

	const getURL_button = document.getElementById('getURL_button')
	getURL_button.addEventListener('click', function()
	{
		openDoc();
		updateDB(activityID,inveniraStdID,'dtURL');
    });
    
    const getLinks_button = document.getElementById('getLinks_button')
	getLinks_button.addEventListener('click', function()
	{
		openLinks();
	});
	 
}

//shows URL description
function showURLs(link) {
	links.push(link);//adiciona ao array local para abrir
    var myDiv = document.getElementById('box2'); 
    // creating checkbox element 
    var checkbox = document.createElement('input'); 
    checkbox.type = 'checkbox'; 
    checkbox.name = 'name'; 
    checkbox.value = 'value'; 
    checkbox.id = count_links; 
    // creating label for checkbox 
    var label = document.createElement('label'); 
    // assigning attributes for the created label tag  
    label.htmlFor = 'id'; 
    // appending the created text to the created label tag  
	label.appendChild(document.createTextNode(link.desc));   
    //appending the checkbox and label to div 
    myDiv.appendChild(checkbox); 
    myDiv.appendChild(label); 
    document.getElementById('box2').innerHTML += '<br>';
    count_links = count_links + 1;
}

//open URL
function openLinks() {
	var count_children = document.getElementById('box2').children;
	docsURLs=[];
	var docArray = function(desc){
		this.desc = desc; 
	};
	for(var i=0; i<count_children.length; i++) {
		if(count_children[i].type == 'checkbox') {
			if(count_children[i].checked) {
				window.open(links[count_children[i].id].lnk,'', 'width=800, height=600');
				docsURLs.push((new docArray(links[count_children[i].id].desc)));
			}
		}
	}
	updateDB(activityID,inveniraStdID,'docsURLs');
}

//open thecnical doc on new window
function openDoc() {
	window.open(linkToDT,'', 'width=800, height=600');
}

//GET JSON file and process for testing
function getData() {
	console.log('http://localhost:5000/api/deployDocRequestRoute/'+inveniraStdID+'/'+activityID);
	fetch('http://localhost:5000/api/deployDocRequestRoute/'+inveniraStdID+'/'+activityID)
		.then(res => res.json())
		.then(data => processData(data))
		.catch(function (error) {
			alert('Request failed', error)
		});
}

//outputs last URL link from list
function processData(data) { 
	document.getElementById('desc').innerHTML = data.properties.summary;
	linkToDT = data.properties.dtURL;
	for(var i=0; i < data.properties.docsURLs.length; i++) {            
        showURLs(data.properties.docsURLs[i]);
	}
	createDBObject(activityID,inveniraStdID,data);
}

//create new object in database
function createDBObject(activityID,inveniraStdID,data) {
	var obj = new Object();
	obj.activityID = activityID;
	obj.inveniraStdID = inveniraStdID;
	obj.access = true;
	obj.downloadDT = false;
	var arr = [];
	var docArray = function(desc, dLoad){
    this.desc = desc; 
    this.dLoad = dLoad; 
    };
	for (var i = 0; i < data.properties.docsURLs.length; i++) {
		arr.push((new docArray(data.properties.docsURLs[i].desc,false)));
	}
	obj.docsDesc=arr;
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
	fetch('http://localhost:5000/api/analyticsDeployDocRoute',options)
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

function updateDB(activityID,inveniraStdID,type) 
{
	var obj = new Object();
	obj.activityID = activityID;
	obj.inveniraStdID = inveniraStdID;
	obj.type=type;
	if(type=='docsURLs')
		obj.docsDesc = docsURLs;
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
	fetch('http://localhost:5000/api/analyticsDeployDocRoute',options)
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