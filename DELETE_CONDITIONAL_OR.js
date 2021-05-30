function delete_conditional_or(sheetId, tabName, dataColumn, dataValue) {  
  var ss = SpreadsheetApp.openById(sheetId);
  var tabReference = ss.getSheetByName(tabName);
  var rows = tabReference.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var rowsDeleted = 0;
  var lock = LockService.getScriptLock();
  for (var i = numRows - 1; i >= 0; i--) {
    var row = values[i];
    if (util_match_or(tabReference, dataValue, dataColumn, row)) {
      tabReference.deleteRow((parseInt(i)+1));
      rowsDeleted++;
    }
  }
  lock.releaseLock()
  return "SUCCESS: " + rowsDeleted + " row(s) deleted";
}