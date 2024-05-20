function fetch_all(ss, sheetname, properties) {
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
    data.push(record);
  }
  return data;
}