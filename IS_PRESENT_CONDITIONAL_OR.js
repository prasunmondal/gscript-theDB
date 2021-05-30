function is_present_conditional_or(ss, sheetname, matchCol, matchValue) {
  var tabReference = ss.getSheetByName(sheetname);
  var rows = getDataRows_(tabReference);

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r];
    if(util_match_or(ss, sheetname, matchValue, matchCol, row)) {
      return true;
    }
  }
  return false;
}