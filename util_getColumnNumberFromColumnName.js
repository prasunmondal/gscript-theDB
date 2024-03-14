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
  return "column not found. " + name;
  return -1
}