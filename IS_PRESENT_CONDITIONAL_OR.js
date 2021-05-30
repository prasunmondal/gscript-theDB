function is_present_conditional_or(tabReference, matchCol, matchValue) {
  var rows = getDataRows_(tabReference);

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r];
    if(util_match_or(tabReference, matchValue, matchCol, row)) {
      return true;
    }
  }
  return false;
}