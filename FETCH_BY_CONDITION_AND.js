function fetch_by_condition_and(response, tabReference, matchCol, matchValue) {
  if (typeof properties == "undefined") {
    properties = getHeaderRow_(tabReference);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }

  var rows = getDataRows_(tabReference), data = [];
  for (var r = 0, l = rows.length; r < l; r++) {
    var row = rows[r], record  = {};
    for (var p in properties) {
      record[properties[p]] = row[p];
    }
    if(util_match_and(tabReference, matchValue, matchCol, row)) {
      data.push(record);
    }
  }
  return data;
}