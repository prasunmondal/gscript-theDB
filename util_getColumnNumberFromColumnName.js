function util_getColumnNumberFromColumnName(ss, sheetname, name) {
  var tabReference = ss.getSheetByName(sheetname);
  properties = getHeaderRow_(tabReference);
  properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  for (var p in properties) {
    if(properties[p] == name)
      return p
  }
  return "column not found. " + name;
  return -1
}