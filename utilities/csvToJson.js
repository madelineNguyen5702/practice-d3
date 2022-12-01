function csvToJson(csvString) {
  let bufferString = csvString.toString();
  let arr = bufferString.split("\n");
  var jsonObj = [];
  var headers = arr[0].split(",");

  for (var i = 1; i < arr.length; i++) {
    var data = arr[i].split(",");
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return jsonObj;
}

export default csvToJson;
