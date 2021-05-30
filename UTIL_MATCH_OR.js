function util_match_or(ss, sheetname, matchValue, matchCol, row)
{
  var tabReference = ss.getSheetByName(sheetname);
  var matchValuesArray = matchValue.split(",")
  var matchColNamesArray = matchCol.split(",")
  for(var i=0; i<matchColNamesArray.length; i++) {
    if(matchValuesArray[i] == row[util_getColumnNumberFromColumnName(tabReference, matchColNamesArray[i])]) {
      return true
    }
  }
  return false;
}