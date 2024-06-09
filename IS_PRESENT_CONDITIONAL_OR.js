function is_present_conditional_or(ss, sheetname, matchCol, matchValue) {
  var rows = getDataRows_(ss, sheetname);

  for (var r = 0, l = rows.length; r < l; r++) {
    var row = rows[r];
    if (util_match_or(ss, sheetname, matchValue, matchCol, row)) {
      return {
        "statusCode": 200,
        "content": [{"result":true}]
      }
    }
  }
  return {
    "statusCode": 204,
    "content": [{"result":true}]
  }
}