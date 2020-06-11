/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Javascript deploy consulta de documentação
*/

//empty fields for JSON input
var description = "";
var dtDoc = "";
var linkToDT ="";
var links = [];
var activityID;
var inveniraStdID;


//aux fields
var count_links = 0;

//main function
function script() {
	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    activityID = urlParams.get('activityID');
	inveniraStdID = urlParams.get('inveniraStdID');

	getData(); 
   	 
}

function getData() {
	fetch('http://localhost:5000/api/analyticsGetDocRoute/' + activityID + '/'+ inveniraStdID)
		.then(res => res.json())
		.then(data => processData(data))
		.catch(function (error) {
			alert('Request failed', error)
		});
}

function processData(data) { 
	console.log(data);
	if(data.length==0)
		document.getElementById("listDoc").innerHTML += '   Nenhum documento descarregado'+'<br>' + '<br>';
	else {
		for (var i=0; i<data.length; i++)
			document.getElementById("list").innerHTML += (i+1) + '. ' + data[i] + '<br>' + '<br>';
	}
}


