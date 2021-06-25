function delete_all(response, tabReference) {
  var rows = tabReference.getDataRange();
  var numRows = rows.getNumRows();

  var rowsDeleted = 0;
  var lock = LockService.getScriptLock();
  for (var i = numRows - 1; i > 0; i--) {
    tabReference.deleteRow((parseInt(i)+1));
    rowsDeleted++;
  }
  lock.releaseLock()

  response.rows_affected = rowsDeleted
  response.responseCode = 200
  if(response.rows_affected == 0)
    response.responseCode = 204

  return "SUCCESS: " + rowsDeleted + " row(s) deleted";
}