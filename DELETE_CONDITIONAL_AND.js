function delete_conditional_and(response, tabReference, dataColumn, dataValue) {
  var rows = tabReference.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var rowsDeleted = 0;
  var lock = LockService.getScriptLock();

  var colMap = util_getColumnNameNumberMap(tabReference)
  for (var i = numRows - 1; i >= 0; i--) {
    var row = values[i];
    if (util_match_and(tabReference, colMap, dataValue, dataColumn, row) && rowsDeleted < 1) {
      tabReference.deleteRow((parseInt(i)+1));
      rowsDeleted++;
    }
  }
  lock.releaseLock()

  response.rows_affected = rowsDeleted
  response.responseCode = 200;
  if(response.rows_affected == 0)
    response.responseCode = 204

  return "SUCCESS: " + rowsDeleted + " row(s) deleted";
}