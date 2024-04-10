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

  var query = substituteColValues(ss, sheetname, request.parameter.query)
  var sh = ss.getSheetByName(sheetname);
  var rows = tempTab.getRange("a2").setFormula(query).getValues();

  const data = fetch_all(ss, tempTab.getName(), properties)
  ss.deleteSheet(tempTab);
  return data
}

function getSubstringsMatchingRegex(text, regexPattern) {
  var regex = new RegExp(regexPattern);
  var matches = text.match(regex);
  return matches;
}

function substituteColValues(ss, sheetname, text) {
  const colNames = getSubstringsMatchingRegex(text, /Col:([^ ]*)/gm)
  if(colNames == null)
    return text
  const columnNumbersMap = util_getColumnNumbersMap(ss, sheetname)
  colNames.forEach(function(item, index) {
    const colName = item.split(":")[1]
    const colNo = parseInt(util_getColumnNumberFromColumnNameUsingColMap(columnNumbersMap, colName),10) + 1
    text = text.replace(item, "Col" + colNo)
  });
  return text
}

// generates random string
function randomStr(len) {
    var len = len || 15; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i=0; i < len; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
    return s
};