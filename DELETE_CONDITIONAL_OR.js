function delete_conditional_or(response, tabReference, dataColumn, dataValue) {
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
  response.responseCode = 200;
  return "SUCCESS: " + rowsDeleted + " row(s) deleted";
}