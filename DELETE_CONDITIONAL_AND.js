function delete_conditional_and(response, tabReference, dataColumn, dataValue) {
  var rows = tabReference.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var rowsDeleted = 0;
  var lock = LockService.getScriptLock();

  for (var i = numRows - 1; i >= 0; i--) {
    var row = values[i];
    if (util_match_and(tabReference, dataValue, dataColumn, row)) {
      tabReference.deleteRow((parseInt(i)+1));
      rowsDeleted++;
    }
  }
  lock.releaseLock()

  response.rows_deleted = rowsDeleted
  response.responseCode = 200;
  if(response.rows_deleted == 0)
    response.responseCode = 204

  return "SUCCESS: " + rowsDeleted + " row(s) deleted";
}