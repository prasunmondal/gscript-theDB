function util_match_and(tabReference, matchValue, matchCol, row)
{
  if(getDataRows_(tabReference).length == 0)
    return false
  var matchValuesArray = matchValue.split(",")
  var matchColNamesArray = matchCol.split(",")
  for(var i=0; i<matchColNamesArray.length; i++) {
    if(matchValuesArray[i] != row[util_getColumnNumberFromColumnName(tabReference, matchColNamesArray[i])]) {
      return false;
    }
  }
  return true;
}