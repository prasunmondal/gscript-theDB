function insert_object_unique(jsonObj) {
  var sheet = jsonObj.sheetId;
  var tabName = jsonObj.tabName;
  var data = JSON.parse(jsonObj.objectData);
  var searchColumn = jsonObj.uniqueCol;
  matchColNamesArray = searchColumn.split(",")
  var ss = SpreadsheetApp.openById(sheet);

  var keys = Object.keys(data);
  var values = Object.values(data);
  var headers = getHeaderRow_(ss, tabName);
  var colMap = getColumnMap(keys, headers);

  str = "";
  matchCol = ""
  matchValue = ""
  matches = 0
  str += "1--";
  for (var i = 0; i < keys.length; i++) {
    str += "2-" + i + "-";
    if (matchColNamesArray.indexOf(keys[i]) + 1) {
      matches++;
      str += "3-" + i + "-";
      if (matches > 1) {
        matchCol += ","
        matchValue += ","
      }
      matchCol += keys[i];
      matchValue += JSON.stringify(values[i]);
    }
  }

  if (is_present_conditional_and(ss, tabName, matchCol, matchValue)) {
    return {
      "statusCode": 400,
      "content": "Bad Request. UNIQUE CONSTRAINT VIOLATED for Columns: " + matchCol
    }
  }

  var rowData = []
  for (var i = 0; i < values.length; i++) {
    var t = values[i].toString
    rowData[colMap[i]] = JSON.stringify(values[i]);
  }
  var sheet = ss.getSheetByName(tabName);
  sheet.appendRow(rowData)
  return {
    "statusCode": 200,
    "content": "INSERTED SUCCESSFULLY"
  }
}