function delete_conditional_or(sheetId, tabName, dataColumn, dataValue) {
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(tabName);
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var rowsDeleted = 0;
  var col = dataColumn;
  var lock = LockService.getScriptLock();
  for (var i = numRows - 1; i >= 0; i--) {
    var row = values[i];
    if (util_match_or(ss, tabName, dataValue, dataColumn, row)) {
      sheet.deleteRow((parseInt(i) + 1));
      rowsDeleted++;
    }
  }
  lock.releaseLock()
  var statusCode = (rowsDeleted.length > 0) ? 200 : 204
  return {
    "statusCode": statusCode,
    "content": "SUCCESS: " + rowsDeleted + " row(s) deleted",
    "rowsAffected": rowsDeleted
  }
}