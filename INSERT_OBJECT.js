function insert_object(response, tabReference, jsonString) {
   var data = JSON.parse(jsonString);
   var headers = getHeaderRow(tabReference);
   var keys = Object.keys(data);
   var values = Object.values(data);
   var colMap = getColumnMap(keys, headers)

   var rowData = []
   for(var i=0; i<values.length; i++) {
       rowData[colMap[i]] = util_sanitize_value(JSON.stringify(values[i]));
   }
   tabReference.appendRow(rowData)
    response.responseCode = 201;
   return "Data Record Created."
}

function getColumnMap(keys, headers) {
  var colMap = []
  for(var i=0; i<keys.length; i++) {
        for(var j=0; j<headers.length; j++) {
          if(keys[i] == headers[j]) {
            colMap[i] = j;
            break;
          }
        }
    }
    return colMap
}