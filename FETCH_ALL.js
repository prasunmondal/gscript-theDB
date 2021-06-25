function fetch_all(response, tabReference) {
  if (typeof properties == "undefined") {
    properties = getHeaderRow(tabReference);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }

  var no_of_records_found = 0
  var rows = getDataRows(tabReference),
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};

    for (var p in properties) {
      record[properties[p]] = row[p];
    }
    data.push(record);
    no_of_records_found += 1
  }

  response.no_of_records_found = no_of_records_found
  response.responseCode = 200;
  if(response.no_of_records_found == 0)
    response.responseCode = 204;

  return data;
}