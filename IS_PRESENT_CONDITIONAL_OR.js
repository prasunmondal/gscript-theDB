function is_present_conditional_or(ss, sheetname, matchCol, matchValue) {
  try {
    var rows = getDataRows_(ss, sheetname);

    for (var r = 0, l = rows.length; r < l; r++) {
      var row = rows[r];
      if (util_match_or(ss, sheetname, matchValue, matchCol, row)) {
        return {
          "statusCode": 200,
          "content": true
        }
      }
    }
    return {
      "statusCode": 200,
      "content": false
    }
  } catch (err) {
    return {
      "statusCode": 500,
      "errorMessage": err.message,
      "content": "Insertion failed"
    }
  }
}