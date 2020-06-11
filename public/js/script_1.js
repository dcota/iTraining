/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Javascript criar consulta de documentação
*/

//params for inven!RA 
var summary = "";
var dtURL = "";
var docsURLs = [];

//aux fields
var count_links = 0;

//main script
function script() 
{
	const description_box = document.getElementById("desc")
	description_box.addEventListener("change", function() 
	{
		summary = document.getElementById('desc').value;
	});

	const dt_doc_box = document.getElementById("desc_tec")
	dt_doc_box.addEventListener("change", function()
	{
		dtURL = document.getElementById('desc_tec').value;
	});

	const add_button = document.getElementById("add_button")
	add_button.addEventListener("click", function()
	{
		var lnk = document.getElementById('links').value;
		var desc = document.getElementById('links_desc').value;
		if(desc != "") {
			var linkObj = new Object();
			linkObj.lnk = lnk;
			linkObj.desc = desc;
			docsURLs.push(linkObj);
			addLink(linkObj);
			document.getElementById('links').value = "";
			document.getElementById('links_desc').value = "";
		}
		else
			alert("Tem de preencher uma descrição!");
	});

	const rem_button = document.getElementById("rem_button")
	rem_button.addEventListener("click", function()
	{
		deleteFromLinks();
	});
}

/******** aux functions*********/

//outputs last URL link from list
function addLink(linkObj) { 
    var myDiv = document.getElementById("list"); 
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
	var lb = linkObj.lnk + " -> " + linkObj.desc;
    label.appendChild(document.createTextNode(lb));   
    //appending the checkbox and label to div 
    myDiv.appendChild(checkbox); 
    myDiv.appendChild(label); 
    document.getElementById('list').innerHTML += "<br>";
	count_links = count_links + 1;
	document.getElementById('links').innerHTML = '';
	document.getElementById('links_desc').innerHTML = '';
}

//deletes last URL from list
function deleteFromLinks() {
	var linksAux = new Array();
	var count = document.getElementById('list').children;
	for(var i=0; i<count.length; i++) {
		if(count[i].type == 'checkbox' && count[i].type == 'checkbox') {
			if(!count[i].checked) {
				linksAux.push(docsURLs[count[i].id]);
			}
		}
	}
	count_links = 0;
	document.getElementById('list').innerHTML = "";
	docsURLs=[];
	for(var j=0; j<linksAux.length; j++) {
		docsURLs.push(linksAux[j]);
		addLink(docsURLs[j]);
	}
	alert('Hiperligações eliminadas!');
}

//create JSON file from form data - use if needed
function createJASON(summary,dtURL,docsURLs) 
{
	var obj = new Object();
	obj.summary = summary;
	obj.dtURL = dtURL;
	obj.docsURLs = docsURLs;
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
	fetch('http://tiagoc.xyz/invenira/activity',options)
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

//GET JSON objects from server - used if needed
function getJSON() {
	fetch('http://tiagoc.xyz/invenira/activity')
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			console.log(data);
		})
}