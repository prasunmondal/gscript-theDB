function util_match_and(tabReference, colMap, matchValue, matchCol, row)
{
  if(getDataRows(tabReference).length == 0)
    return false
  var matchValuesArray = matchValue.split(",")
  var matchColNamesArray = matchCol.split(",")
  for(var i=0; i<matchColNamesArray.length; i++) {
    if(matchValuesArray[i] != row[util_getColumnNumberFromColumnName2(colMap, matchColNamesArray[i])]) {
      return false;
    }
  }
  return true;
}