function is_present_conditional_and(tabReference, matchCol, matchValue, properties) {
  var rows = getDataRows_(tabReference);

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r];
    if(util_match_and(tabReference, matchValue, matchCol, row)) {
      return true;
    }
  }
  return false;
}