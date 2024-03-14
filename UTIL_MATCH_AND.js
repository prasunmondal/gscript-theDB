function util_match_and(ss, sheetname, matchValue, matchCol, row)
{
  var matchValuesArray = matchValue.split(",")
  var matchColNamesArray = matchCol.split(",")
  for(var i=0; i<matchColNamesArray.length; i++) {
    if(matchValuesArray[i] != row[util_getColumnNumberFromColumnName(ss, sheetname, matchColNamesArray[i])]) {
      return false;
    }
  }
  return true;
}