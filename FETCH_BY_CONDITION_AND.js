function fetch_by_condition_and(ss, sheetname, matchCol, matchValue, properties) {
  if (typeof properties == "undefined") {

    var tabReference = ss.getSheetByName(sheetname);
    properties = getHeaderRow_(tabReference);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }
  
  var rows = getDataRows_(tabReference),
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};

    for (var p in properties) {
      record[properties[p]] = row[p];
    }

    if(util_match_and(ss, sheetname, matchValue, matchCol, row)) {
      data.push(record);
    }
  }
  return data;
}