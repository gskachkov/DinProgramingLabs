var fs = require('fs');
var path = require('path');
var events = require("events");
var printResult = require("./printResult");
var alogirtm = require("./algorithms/nopt");
//var alogirtmOptimal = require("./algorithms/own_solution_1");
//var alogirtm = require("./algorithms/simple_1");

process.argv.forEach(function (val, index, array) {
  if(val.indexOf("-file=")> -1) {
    fileName = val.substring(6);
  }
});

var lines = [];
var points = [];
var isFirst = true;
var length;
var index = 0;

var readFile = fs.readFileSync(fileName, { encoding: 'utf8' })
  .toString()
  .split('\n')
  .forEach(function (line) {
    if (!line || line === '') return;

    var parts = line.split(" ");
    if (isFirst) {
      pointsCount = parseInt(parts[0]);
      isFirst = false;
    } else {
      points.push({
        index    : index,
        x        : parseFloat(parts[0]),
        y        : parseFloat(parts[1]),
        selected : false
      });
      
      index ++;
    }
});

var result = alogirtm (pointsCount, points);


printResult(result);