function is_present_conditional_and(response, tabReference, matchCol, matchValue) {
  var rows = getDataRows_(tabReference);

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r];
    if(util_match_and(tabReference, matchValue, matchCol, row)) {
      response.responseCode = 200;
      return true;
    }
  }
  response.responseCode = 200;
  return false;
}