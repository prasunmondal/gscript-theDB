function getDataByColumnName(tabReference, matchCol, matchValue) {
  if (typeof properties == "undefined") {
    properties = getHeaderRow_(tabReference);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }

  matchCol = util_getColumnNumberFromColumnName(tabReference, matchCol)
  
  var matchValues = matchValue.split(',');
  var rows = getDataRows_(tabReference),
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};

    for (var p in properties) {
      record[properties[p]] = row[p];
    }

    if(matchValues == row[matchCol]) {
      data.push(record);
    }
  }
  return data;
}