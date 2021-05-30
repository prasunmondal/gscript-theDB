function insert_object_unique(jsonString, request) {
  var sheet = request.parameter.sheetId;
  var tabName = request.parameter.tabName;
  var data = JSON.parse(jsonString);
  var searchColumn = request.parameter.uniqueCol;
  matchColNamesArray = searchColumn.split(",")
  var ss= SpreadsheetApp.openById(sheet);

  var keys = Object.keys(data);
  var values = Object.values(data);
  var tabReference = ss.getSheetByName(tabName);
  var headers = getHeaderRow_(tabReference);
  var colMap = getColumnMap(keys, headers);

  str = "";
  matchCol = ""
  matchValue = ""
  matches = 0
  str += "1--";
  for(var i=0; i<keys.length; i++) {
    str += "2-" + i + "-";
    if(matchColNamesArray.indexOf(keys[i])+1) {
      matches++;
      str += "3-" + i + "-";
      if(matches > 1) {
        matchCol += ","
        matchValue += ","
      }
      matchCol += keys[i];
      matchValue += JSON.stringify(values[i]);
    }
  }
  
  if(is_present_conditional_and(ss, tabName, matchCol, matchValue))
    return "UNIQUE CONSTRAINT VIOLATED for Columns: " + matchCol
  
  var rowData = []
  for(var i=0; i<values.length; i++) {
    var t = values[i].toString
    rowData[colMap[i]] = JSON.stringify(values[i]);
  }
  var sheet=ss.getSheetByName(tabName);
  sheet.appendRow(rowData)
  return "200: INSERTED SUCCESSFULLY."
}