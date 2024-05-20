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

  matchCol = ""
  matchValue = ""
  matches = 0
  for (var i = 0; i < keys.length; i++) {
    if (matchColNamesArray.indexOf(keys[i]) + 1) {
      matches++;
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
      "errorMessage": "Bad Request. Unique Constraint Violated for Columns: " + matchCol,
      "rowsAffected": 0
    }
  }

  var rowData = []
  for (var i = 0; i < values.length; i++) {
    rowData[colMap[i]] = JSON.stringify(values[i]);
  }
  var sheet = ss.getSheetByName(tabName);
  sheet.appendRow(rowData)
  return {
    "statusCode": 200,
    "content": "Inserted Successfully",
    "rowsAffected": 1
  }
}