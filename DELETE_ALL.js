function delete_all(sheetId, tabName) {
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(tabName);
  var rows = sheet.getDataRange();
  var numOfRows = rows.getNumRows();

  var rowsDeleted = 0;
  var lock = LockService.getScriptLock();
  sheet.deleteRows(2, numOfRows - 1);
  lock.releaseLock()
  return "SUCCESS: " + rowsDeleted + " row(s) deleted";
}