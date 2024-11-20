function insert_objects(jsonObj) {
  var sheetId = jsonObj.sheetId;
  var tabName = jsonObj.tabName;
  var dataList = JSON.parse(jsonObj.objectData);

  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(tabName);

  // Get headers and map columns to keys only once
  var headers = getHeaderRow_(ss, tabName);
  var keys = Object.keys(dataList[0]);
  var colMap = getColumnMap(keys, headers);

  // Prepare rows to insert
  var rowsToAdd = dataList.map(function(record) {
    return keys.map(function(key) {
      var colIndex = colMap[key];  // Column index from the map
      return record[key] || '';  // Default to empty string if value is undefined
    });
  });

  // Get the last row and use it to set the range
  var lastRow = sheet.getLastRow();
  if (rowsToAdd.length > 0) {
    // Perform batch insert for all rows in one go
    sheet.getRange(lastRow + 1, 1, rowsToAdd.length, rowsToAdd[0].length).setValues(rowsToAdd);
  }

  return {
    "statusCode": 200,
    "content": "Inserted Successfully",
    "rowsAffected": dataList.length
  };
}


const cachedColMap = {}
function getColumnMap(keys, headers, sheetId, tabname) {
  const cacheKey = sheetId + "_" + tabname
  if(cachedColMap[cacheKey])
    return cachedColMap[cacheKey]

  var colMap = []
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < headers.length; j++) {
      if (keys[i] === headers[j]) {
        colMap[i] = j;
        break;
      }
    }
  }
  cachedColMap[cacheKey] = colMap
  return colMap
}