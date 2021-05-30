function fetch_all(ss, sheetname, properties) {
  var str = "";
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
    data.push(record);
  }
  return data;
}