function is_present_conditional_or(response, tabReference, matchCol, matchValue) {
  if(!isSheetEmpty(tabReference)) {
    response.responseCode = 204;
    return false;
  }
  var rows = getDataRows(tabReference);
  if(rows.length == 0) {
    response.responseCode = 204;
    return false
  }

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r];
    if(util_match_or(tabReference, matchValue, matchCol, row)) {
      response.responseCode = 200;
      return true;
    }
  }
  response.responseCode = 204;
  return false;
}