function is_present_conditional_and(response, tabReference, matchCol, matchValue) {
  var rows = getDataRows_(tabReference);
  if(rows.length == 0) {
    return false
  }
  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r];
    if(util_match_and(tabReference, matchValue, matchCol, row)) {
      return true;
    }
  }
  return false;
}