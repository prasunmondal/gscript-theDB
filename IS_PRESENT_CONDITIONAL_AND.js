function is_present_conditional_and(response, tabReference, matchCol, matchValue) {
  var rows = getDataRows_(tabReference);

  response.responseCode = 500;
  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r];
    if(util_match_and(tabReference, matchValue, matchCol, row)) {
      return true;
    }
    response.responseCode = 520;
  }
  response.responseCode = 530;
  return false;
}