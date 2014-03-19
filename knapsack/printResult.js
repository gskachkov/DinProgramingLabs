module.exports = function printResult(result) {
  var resultString = '';
  var items = result.taken.length;
  for(var i = 0; i < items; i++) {
    resultString += result.taken[i] + " ";
  }

  console.log(result.value + ' 0');
  console.log(resultString);
};