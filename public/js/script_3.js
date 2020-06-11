/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Javascript criar testes firmware
*/

//params for inven!RA
var summary = "";
var codeURL = "";
var instrURL = "";
var libsURLs = [];

//aux fields
var count_links = 0;

//main 
function script() 
{
	const description_box = document.getElementById("desc")
	description_box.addEventListener("change", function() 
	{
		summary = document.getElementById('desc').value;
		console.log(summary);
	});

	const code_doc_box = document.getElementById("desc_code")
	code_doc_box.addEventListener("change", function()
	{
		codeURL = document.getElementById('desc_code').value;
		console.log(codeURL);
	});

	const instr_doc_box = document.getElementById("desc_instr")
	instr_doc_box.addEventListener("change", function()
	{
		instrURL = document.getElementById('desc_instr').value;
		console.log(instrURL);
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
			libsURLs.push(linkObj);
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

//create JSON file from form data
function createJASON(summary,codeURL,instrURL, libsURLs) 
{
	var obj = new Object();
	//comment next 4 lines for fetch test
	obj.summary = summary;
	obj.codeURL = codeURL;
	obj.instrURL = instrURL;
	obj.libsURLs = libsURLs;
	//test object - uncomment next 6 lines for fetch test
	/*obj.name = 'Teste2 Duarte Cota';
	obj.properties = [{'aprop': 'smt'}];
	obj.config_url = 'someconfigurl.html';
	obj.json_params = 'someconfigurl.json';
	obj.style_url = 'anurl.css';
	obj.analytics = [];*/
	myJSON = JSON.stringify(obj);
	console.log(myJSON);
	//uncomment next lines for fecth test
	/*const options = {
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
	});*/
}

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
	createJASON(summary,codeURL,instrURL,libsURLs);
}

//deletes last URL from list
function deleteFromLinks() {
	var linksAux = new Array();
	var count = document.getElementById('list').children;
	for(var i=0; i<count.length; i++) {
		if(count[i].type == 'checkbox' && count[i].type == 'checkbox') {
			if(!count[i].checked) {
				linksAux.push(libsURLs[count[i].id]);
			}
		}
	}
	count_links = 0;
	document.getElementById('list').innerHTML = "";
	libsURLs=[];
	for(var j=0; j<linksAux.length; j++) {
		libsURLs.push(linksAux[j]);
		addLink(libsURLs[j]);
	}
	alert('Hiperligações eliminadas!');
}