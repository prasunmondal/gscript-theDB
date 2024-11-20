function insert_object(jsonObj) {
  var sheetId = jsonObj.sheetId;
  var tabName = jsonObj.tabName;
  var data = JSON.parse(jsonObj.objectData);
  var ss = SpreadsheetApp.openById(sheetId);
  var headers = getHeaderRow_(ss, tabName);
  var keys = Object.keys(data);
  var values = Object.values(data);
  var colMap = getColumnMap(keys, headers)

  var rowData = []
  for (var i = 0; i < values.length; i++) {
    rowData[colMap[i]] = JSON.stringify(values[i]).replace('"', '').replace(
        '"',
        '');
  }
  var sheet = ss.getSheetByName(tabName);
  sheet.appendRow(rowData)
  return {
    "statusCode": 200,
    "content": "Inserted Successfully",
    "rowsAffected": 1
  }
}

function getColumnMap(keys, headers) {
  var colMap = []
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < headers.length; j++) {
      if (keys[i] == headers[j]) {
        colMap[i] = j;
        break;
      }
    }
  }
  return colMap
}