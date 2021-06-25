function insert_object_unique(response, tabReference, jsonString, searchColumn) {
  var data = JSON.parse(jsonString);
  matchColNamesArray = searchColumn.split(",")

  var keys = Object.keys(data);
  var values = Object.values(data);
  var headers = getHeaderRow(tabReference);
  var colMap = getColumnMap(keys, headers);

  matchCol = ""
  matchValue = ""
  matches = 0
  for(var i=0; i<keys.length; i++) {
    if(matchColNamesArray.indexOf(keys[i])+1) {
      matches++;
      if(matches > 1) {
        matchCol += ","
        matchValue += ","
      }
      matchCol += keys[i];
      matchValue += util_sanitize_value(JSON.stringify(values[i]));
    }
  }

  if(is_present_conditional_and(response, tabReference, matchCol, matchValue)) {
    response.responseCode = 409;
    return "UNIQUE CONSTRAINT VIOLATED for Columns: " + matchCol
  }

  var rowData = []
  for(var i=0; i<values.length; i++) {
    rowData[colMap[i]] = rowData[colMap[i]] = util_sanitize_value(JSON.stringify(values[i]));
  }
  tabReference.appendRow(rowData)
  response.responseCode = 201;
  response.rows_affected = 1;
  return "Data Record Created."
}