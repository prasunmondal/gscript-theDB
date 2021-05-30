function util_match_or(tabReference, matchValue, matchCol, row)
{
  var matchValuesArray = matchValue.split(",")
  var matchColNamesArray = matchCol.split(",")
  for(var i=0; i<matchColNamesArray.length; i++) {
    if(matchValuesArray[i] == row[util_getColumnNumberFromColumnName(tabReference, matchColNamesArray[i])]) {
      return true
    }
  }
  return false;
}