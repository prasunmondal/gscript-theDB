function delete_all(sheetId, tabName) {
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(tabName);
  var rows = sheet.getDataRange();
  var numOfRows = rows.getNumRows();

  var lock = LockService.getScriptLock();
  sheet.deleteRows(2, numOfRows - 1);
  lock.releaseLock()
  return {
    "statusCode": 200,
    "content": "SUCCESS: " + (numOfRows - 1) + " row(s) deleted",
    "rowsAffected": (numOfRows - 1)
  }
}