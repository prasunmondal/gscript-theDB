function saveDataRaw(jsonObj) {
  try {
    var ss = SpreadsheetApp.openById(jsonObj.sheetId);
    var sheet = ss.getSheetByName(jsonObj.tabName);
    var stringArray = jsonObj.objectData.replace(/[\[\]]/g, '').split(',');

    sheet.appendRow(stringArray)

    return {
      "statusCode": 200,
      "content": "INSERTED SUCCESSFULLY"
    }
  } catch (err) {
    return {
      "statusCode": 500,
      "errorMessage": err.message,
      "content": "Insertion failed"
    }
  }
}
