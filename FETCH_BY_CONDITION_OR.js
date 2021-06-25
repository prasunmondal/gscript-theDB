function fetch_by_condition_or(response, tabReference, matchCol, matchValue) {
  if (typeof properties == "undefined") {
    properties = getHeaderRow(tabReference);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }

  var no_of_records_found = 0
  var rows = getDataRows(tabReference), data = [];
  for (var r = 0, l = rows.length; r < l; r++) {
    var row = rows[r];
    if(util_match_or(tabReference, matchValue, matchCol, row)) {
      var record  = {}
      for (var p in properties) {
        record[properties[p]] = row[p];
      }
      data.push(record);
      no_of_records_found += 1
    }
  }

  response.rows_affected = no_of_records_found
  response.responseCode = 200;
  if(response.rows_affected == 0)
    response.responseCode = 204;

  return data;
}