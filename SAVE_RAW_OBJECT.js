function saveDataRaw(jsonString, request1) {
  var sheetId = request1.parameter.sheetId;
  var tabName = request1.parameter.tabName;
  var ss = SpreadsheetApp.openById(sheetId);

  var sheet = ss.getSheetByName(tabName);
  sheet.appendRow([jsonString])
  return "200: INSERTED SUCCESSFULLY"
}
