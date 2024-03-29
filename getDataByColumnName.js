function getDataByColumnName(ss, sheetname, matchCol, matchValue, properties) {
  var str = "";
  if (typeof properties == "undefined") {
    properties = getHeaderRow_(ss, sheetname);
    properties = properties.map(function (p) {
      return p.replace(/\s+/g, '_');
    });
  }

  matchCol = getColumnNumberFromColumnName(ss, sheetname, matchCol)

  var matchValues = matchValue.split(',');
  str += "  - MatchValues: " + matchValues;
  var rows = getDataRows_(ss, sheetname),
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row = rows[r],
        record = {};

    for (var p in properties) {
      record[properties[p]] = row[p];
    }

    str += "MatchCol Value: " + matchCol
    str += "  - MatchCol: " + matchValues + "," + row[matchCol]
    if (matchValues == row[matchCol]) {
      str += "  - MatchedData: " + record;
      data.push(record);
    }
  }
  return data;
}