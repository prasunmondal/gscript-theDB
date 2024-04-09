function fetch_by_query(ss, sheetname, request, properties) {

  // Create a new Sheet
  const tempTab = ss.insertSheet();
  tempTab.appendRow(getHeaderRow_(ss, sheetname));

  if (typeof properties == "undefined") {
    properties = getHeaderRow_(ss, sheetname);
    properties = properties.map(function (p) {
      return p.replace(/\s+/g, '_');
    });
  }

  var query = request.parameter.query
  query = substituteColValues(ss, sheetname, query)
  tempTab.getRange("a2").setFormula(query).getValues();

  const data = fetch_all(ss, tempTab.getName(), properties)
  ss.deleteSheet(tempTab);
  return data
}

function getSubstringsMatchingRegex(text, regexPattern) {
  var regex = new RegExp(regexPattern);
  var matches = text.match(regex);
  return matches;
}

function substituteColValues(ss, sheetname, query) {
  const colNames = getSubstringsMatchingRegex(query, /Col:([^ ]*)/gm)
  const columnNumbersMap = util_getColumnNumbersMap(ss, sheetname)
  colNames.forEach(function(item, index) {
    const colName = item.split(":")[1]
    query = query.replace(item, util_getColumnNumberFromColumnNameUsingColMap(columnNumbersMap, colName))
  });
}

// generates random string
function randomStr(len) {
    var len = len || 15; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i=0; i < len; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
    return s
};