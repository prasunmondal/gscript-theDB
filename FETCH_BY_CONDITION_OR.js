function fetch_by_condition_or(ss, sheetname, matchCol, matchValue,
    properties) {
  if (typeof properties == "undefined") {
    properties = getHeaderRow_(ss, sheetname);
    properties = properties.map(function (p) {
      return p.replace(/\s+/g, '_');
    });
  }

  var rows = getDataRows_(ss, sheetname),
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row = rows[r],
        record = {};

    for (var p in properties) {
      record[properties[p]] = row[p];
    }

    if (util_match_or(ss, sheetname, matchValue, matchCol, row)) {
      data.push(record);
    }
  }
  return {
    "statusCode": (data.length > 0)? 200 : 204,
    "content": data,
    "rowsAffected": data.length
  }
}