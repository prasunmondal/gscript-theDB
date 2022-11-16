function util_getColumnNumberFromColumnName(tabReference, name) {
  properties = getHeaderRow(tabReference);
  properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  for (var p in properties) {
    if(properties[p] == name)
      return p
  }
  return "column not found. " + name;
  return -1
}

function util_getColumnNameNumberMap(tabReference) {
  var colMap = []
  properties = getHeaderRow(tabReference);
  properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });

  for (var p in properties) {
      colMap[p] = properties[p]
  }
  return colMap
}

function util_getColumnNumberFromColumnName2(colMap, name) {
  for(let i=0; i<colMap.length; i++) {
    if(colMap[i] == name) {
      return p
    }
  }
}