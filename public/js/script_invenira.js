/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Javascript simulação processamento de analíticas pela Inven!RA
*/

//main function
function script() {
	const selectAct = document.getElementById('options1')
	selectAct.addEventListener('change', function() 
	{
		var value = selectAct.value;
		setActivity(value);
	});
}

//set choosen activity
function setActivity(value) {
	var url;
	document.getElementById('name').textContent = 'ATIVIDADE: '+ value;
	if (value == 'Consulta de documentação')
		url = 'http://localhost:5000/api/inveniraDocRoute';
	if (value == 'Configuração de hardware')
		url = 'http://localhost:5000/api/inveniraHardConfigRoute';
	getIDs(url); 
  }

//get all activityID
function getIDs(url) {
	const options = {
		method: 'GET',
	};
	fetch(url,options)
	.then(res => res.json()) 
	.then(data => fillIDs(data))
	.catch(function (error) {
		alert('Atividade inexistente', error)
	});
}

//fill select box with activityID
function fillIDs(data){
	var op = document.getElementById('options2')
	var len = op.options.length;
	if(len>0){
		for (i = len-1; i >= 0; i--) {
			op.options[i] = null;
		}
	}
	var newOption = document.createElement('option');
	newOption.innerHTML = '';
	op.options.add(newOption)
	for(var i=0; i<data.length;i++){
		var newOption = document.createElement('option');
		newOption.value = data[i];
		newOption.innerHTML = data[i];
		console.log(newOption);
		op.options.add(newOption);
	}
}

//select activityID
function getActID(id){
	var act = document.getElementById(id);
	var activityID = act.value;
	console.log(activityID);
	getData(activityID);
}

//get data for specific activityID
function getData(activityID) {
	var act = document.getElementById('options1');
	var activity = act.value;
	if (activity == 'Consulta de documentação')
		url = 'http://localhost:5000/api/analyticsGetDocRoute';
	if (activity == 'Configuração de hardware')
		url = 'http://localhost:5000/api/analyticsGetHardRoute';
	var obj = new Object();
	obj.activityID = activityID;
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
	fetch(url,options)
	.then(res => res.json()) 
	.then(data => processJSON(data))
	.catch(function (error) {
		alert('Atividade inexistente', error)
	});
}

//process response with analytics and fill table
function processJSON(data) { 
	console.log(data);
	var table = document.getElementById('table');
	for(var i = table.rows.length - 1; i > 0; i--)
		table.deleteRow(i);
	for(var i in data){
		var tbl = document.getElementById('table');
		var row = tbl.insertRow();
		var cell1 = row.insertCell();
		var cell2 = row.insertCell();
		var cell3 = row.insertCell();
		var cell4 = row.insertCell();
		cell3.style.textAlign = 'center';
		cell1.innerHTML = data[i].inveniraStdID;
		for(var j in data[i].quantAnalytics){
			cell2.innerHTML += data[i].quantAnalytics[j].name + '<br>';
		}
		for(var j in data[i].quantAnalytics){
			if(data[i].quantAnalytics[j].value === true)
				cell3.innerHTML += 'SIM' + '<br>';
			else if (data[i].quantAnalytics[j].value === false)
					cell3.innerHTML += 'NÃO' + '<br>';
			else 
				cell3.innerHTML += data[i].quantAnalytics[j].value + '<br>';
		}
		var url = data[i].qualAnalyticsURL;
		cell4.innerHTML += '<a href='  + data[i].qualAnalyticsURL +  '> ' + url + '</a>'
	}
}