function delete_all(tabReference) {
  var rows = tabReference.getDataRange();
  var numRows = rows.getNumRows();

  var rowsDeleted = 0;
  var lock = LockService.getScriptLock();
  for (var i = numRows - 1; i > 0; i--) {
    tabReference.deleteRow((parseInt(i)+1));
    rowsDeleted++;
  }
  lock.releaseLock()
  return "SUCCESS: " + rowsDeleted + " row(s) deleted";
}