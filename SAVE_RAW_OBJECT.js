function saveDataRaw(jsonObj) {
  var ss = SpreadsheetApp.openById(jsonObj.sheetId);
  var sheet = ss.getSheetByName(jsonObj.tabName);
  var stringArray = jsonObj.objectData.replace(/[\[\]]/g, '').split(',');

  sheet.appendRow(stringArray)

  return {
    "statusCode": 200,
    "content": "Inserted Successfully",
    "rowsAffected": 1
  }
}
