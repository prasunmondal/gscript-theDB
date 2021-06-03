function insert_object_unique(response, tabReference, jsonString, searchColumn) {
  var data = JSON.parse(jsonString);
  matchColNamesArray = searchColumn.split(",")

  var keys = Object.keys(data);
  var values = Object.values(data);
  var headers = getHeaderRow_(tabReference);
  var colMap = getColumnMap(keys, headers);

  var str = " - 1 -"
  matchCol = ""
  matchValue = ""
  matches = 0
  str += " - 2 -"
  for(var i=0; i<keys.length; i++) {
    str += " - 3 -"
    if(matchColNamesArray.indexOf(keys[i])+1) {
      matches++;
      if(matches > 1) {
        matchCol += ","
        matchValue += ","
      }
      matchCol += keys[i];
      matchValue += JSON.stringify(values[i]);
    }
  }
  str += " - 4 -"
  
  if(is_present_conditional_and(response, tabReference, matchCol, matchValue))
    return "UNIQUE CONSTRAINT VIOLATED for Columns: " + matchCol

  var rowData = []
  for(var i=0; i<values.length; i++) {
    rowData[colMap[i]] = JSON.stringify(values[i]);
  }
  tabReference.appendRow(rowData)
  response.responseCode = 201;
  return "Data Inserted Successfully."
}