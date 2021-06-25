function isSheetEmpty(sheet) {
  return sheet.getDataRange().getValues().join("") === "";
}