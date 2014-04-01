var fs = require('fs');
var path = require('path');
var events = require("events");
var printResult = require("./printResult");
//var alogirtm = require("./algorithms/greedyAlgoritm");
var alogirtmOptimal = require("./algorithms/brootforce");
var alogirtm = require("./algorithms/simple_1");

process.argv.forEach(function (val, index, array) {
  if(val.indexOf("-file=")> -1) {
    fileName = val.substring(6);
  }
});

var lines= [];
var values = [];
var isFirst = true;
var length;

var readFile = fs.readFileSync(fileName, { encoding: 'utf8' })
  .toString()
  .split('\n')
  .forEach(function (line) {
    if (!line || line === '') return;

    var parts = line.split(" ");
    if (isFirst) {
      vertexesCount = parseInt(parts[0]);
      adgesCount = parseInt(parts[1]);
      isFirst = false;
    } else {
      values.push({
        a : parseInt(parts[0]),
        b : parseInt(parts[1])
      });
    }
});

var greedyResult = alogirtm (vertexesCount, adgesCount, values);
var optimalResult = alogirtmOptimal (vertexesCount, adgesCount, values, greedyResult.value -  0.05 * greedyResult.value);

var result = typeof optimalResult.tacken === 'undefined' ?  greedyResult : optimalResult;


printResult(optimalResult);  
