function util_getColumnNumberFromColumnName(ss, sheetname, name) {
  properties = getHeaderRow_(ss, sheetname);
  properties = properties.map(function (p) {
    return p.replace(/\s+/g, '_');
  });
  for (var p in properties) {
    if (properties[p] == name) {
      return p
    }
  }
  return "Column Not Found. " + name;
  return -1
}

function util_getColumnNumbersMap(ss, sheetname) {
  return getHeaderRow_(ss, sheetname);
}

function util_getColumnNumberFromColumnNameUsingColMap(colNameMap, name) {
  for (var col in colNameMap) {
    if (properties[col] == name) {
      return col
    }
  }
}