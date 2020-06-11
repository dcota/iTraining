/*
Projet: Projeto LEI
Author: Duarte Cota
Date: 2020
Script: Javascript analíticas da atividade configuração de hardware
*/


//main function
function script() {
	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    activityID = urlParams.get('activityID');
	inveniraStdID = urlParams.get('inveniraStdID');
    getData(); 
}

function getData() {
	fetch('http://localhost:5000/api/analyticsGetHardRoute/' + activityID + '/'+ inveniraStdID)
		.then(res => res.json())
		.then(data => processData(data))
		.catch(function (error) {
			alert('Request failed', error)
		});
}

function processData(data) { 
    console.log(data);
    if(data.downloadInstr.length == 0){
        document.getElementById('listDoc').innerHTML += '   Nenhum documento descarregado'+'<br>' + '<br>';
    }
    else{
        for (var i=0; i<data.downloadInstr.length; i++)
            document.getElementById('listDoc').innerHTML += (i+1) + '. ' + data.downloadInstr[i] + '<br>' + '<br>';
    }
    if(data.downloadCode.length == 0){
        document.getElementById('listCode').innerHTML += '   Nenhum código descarregado'+'<br>' + '<br>';
    }
    else{
        for (var i=0; i<data.downloadCode.length; i++)
            document.getElementById('listCode').innerHTML += (i+1) + '. ' + data.downloadCode[i] + '<br>' + '<br>';
    }
    if(data.studentData.length == 0){
        //document.getElementById('tableData').innerHTML += '   Não há dados enviados pelo formando'+'<br>' + '<br>';
        const getAll_button = document.getElementById('all')
        getAll_button.addEventListener('click', function()
        {
            document.getElementById('tableData').innerHTML = ' ';
            document.getElementById('tableData').innerHTML += '   Não há dados para mostrar'+'<br>' + '<br>';
        });
        const getLast_button = document.getElementById('last')
        getLast_button.addEventListener('click', function()
        {
            document.getElementById('tableData').innerHTML = ' ';
            document.getElementById('tableData').innerHTML += '   Não há dados para mostrar'+'<br>' + '<br>';
        });
    }
    else{
        const getAll_button = document.getElementById('all')
        getAll_button.addEventListener('click', function()
        {
            showAll(data);
        });
        const getLast_button = document.getElementById('last')
        getLast_button.addEventListener('click', function()
        {
            showLast(data);
        });

        const getDownloadJSON_button = document.getElementById('fileDownloadJSON')
        getDownloadJSON_button.addEventListener('click', function()
        {
            onDownloadJSON(data.studentData);
        });

        const getDownloadCSV_button = document.getElementById('fileDownloadCSV')
        getDownloadCSV_button.addEventListener('click', function()
        {
            onDownloadCSV(data.studentData);
        });
    }
}

function showAll(data){
    document.getElementById('tableData').innerHTML = ' ';
    var table = document.createElement('TABLE');
    var len = data.studentData[0].length;
    var keys = Object.keys(data.studentData[0]);
    var aux=[];
    for(var i in keys){
        if(keys[i] != 'inveniraStdID')
            aux.push(keys[i]);
    }
    var columnCount = aux.length;
    for(var pack in data.studentData){
        var row = table.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.style.textAlign = 'center';
        cell.innerHTML = 'Pacote ' + pack;
        row.appendChild(cell);
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement('TH');
            headerCell.innerHTML = aux[i];
            row.appendChild(headerCell);
            var len = data.studentData[pack][aux[0].valueOf()].length;
        }
        row = table.insertRow(-1);
        for (var j = 0; j < len; j++) {
            for(params in aux) {
                var cell = row.insertCell(-1);
                cell.style.textAlign = 'center';
                cell.innerHTML = parseFloat(data.studentData[pack][aux[params].valueOf()][j]).toFixed(2) + '<br>'; 
            }
            row = table.insertRow(-1);
        }      
        var tableData = document.getElementById('tableData');
        tableData.innerHTML = '';
        tableData.appendChild(table);
    }  
}


function showLast(data){
    document.getElementById('tableData').innerHTML = ' ';
    var table = document.createElement('TABLE');
    var len = data.studentData[0].length;
    var keys = Object.keys(data.studentData[0]);
    var aux=[];
    for(var i in keys){
        if(keys[i] != 'inveniraStdID')
            aux.push(keys[i]);
    }
    var columnCount = aux.length;
    var lastPack = data.studentData.length-1;
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.style.textAlign = 'center';
    cell.innerHTML = 'Pacote ' + lastPack;
    row.appendChild(cell);
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement('TH');
        headerCell.innerHTML = aux[i];
        row.appendChild(headerCell);
        var len = data.studentData[lastPack][aux[0].valueOf()].length;
    }
    row = table.insertRow(-1);
    for (var j = 0; j < len; j++) {
        for(params in aux) {
            var cell = row.insertCell(-1);
            cell.style.textAlign = 'center';
            cell.innerHTML = parseFloat(data.studentData[lastPack][aux[params].valueOf()][j]).toFixed(2) + '<br>'; 
        }
        row = table.insertRow(-1);
    }

    var tableData = document.getElementById('tableData');
    tableData.innerHTML = '';
    tableData.appendChild(table);
      
}

function download(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function onDownloadJSON(data){
    download(JSON.stringify(data,undefined,4), 'dadosAlunoJSON.json', 'text/plain');
}

function onDownloadCSV(data){
    download(toCSV(data), 'dadosAlunoCSV.csv', 'text/csv;charset=utf-8;');
}

function toCSV (data){
    const items = data;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')
    return csv  
}