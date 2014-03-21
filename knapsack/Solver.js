var fs = require('fs');
var path = require('path');
var events = require("events");
var printResult = require("./printResult");
//var alogirtm = require("./algorithms/greedyAlgoritm");
var alogirtm = require("./algorithms/branchAndBunchRelaxWithSort");

process.argv.forEach(function (val, index, array) {
  if(val.indexOf("-file=")> -1) {
     fileName = val.substring(6);
   } 
});

var lines= [];
var values = [];
var weights = [];
var isFirst = true;
var capacity;

var readFile = fs.readFileSync(fileName, { encoding: 'utf8' })
  .toString()
  .split('\n')
  .forEach(function (line) {
    if (!line || line === '') return;

    var parts = line.split(" ");
    if (isFirst) {
      capacity = parseInt(parts[1]);
      isFirst = false;
    } else {
      values.push(parseInt(parts[0]));
      weights.push(parseInt(parts[1]));
    }
});

var result = alogirtm (capacity,values,weights);
printResult(result);