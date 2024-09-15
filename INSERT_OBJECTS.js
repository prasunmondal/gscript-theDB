function insert_objects(jsonObj) {
  var sheetId = jsonObj.sheetId;
  var tabName = jsonObj.tabName;
  var dataList = JSON.parse(jsonObj.objectData)

  var ss = SpreadsheetApp.openById(sheetId);
  var headers = getHeaderRow_(ss, tabName);
  var keys = Object.keys(dataList[0]);
  var colMap = getColumnMap(keys, headers)
  var sheet = ss.getSheetByName(tabName);

  var rowsToAdd = []
  for (var k = 0; k < dataList.length; k++) {
    var rowData = []
    var values = Object.values(dataList[k]);
    for (var i = 0; i < values.length; i++) {
      rowData[colMap[i]] = JSON.stringify(values[i]).replace('"', '').replace('"', '');
    }
    rowsToAdd.push(rowData)
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, values.length, headers.length).setValues(values);
  }

  return {
    "statusCode": 200,
    "content": "Inserted Successfully",
    "rowsAffected": dataList.length
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