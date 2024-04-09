function fetch_by_query(ss, sheetname, request, properties) {

  // Create a new Sheet
  var tempTab = ss.insertSheet();
  tempTab.appendRow(getHeaderRow_(ss, sheetname));
  

  var str = "";
  if (typeof properties == "undefined") {
    properties = getHeaderRow_(ss, sheetname);
    properties = properties.map(function (p) {
      return p.replace(/\s+/g, '_');
    });
  }

  var query = request.parameter.query
  var sh = ss.getSheetByName(sheetname);
  var rows = tempTab.getRange("a2").setFormula(query).getValues();

  var data = fetch_all(ss, tempTab.getName(), properties)
  ss.deleteSheet(tempTab);
  return data
}


// generates random string
function randomStr(len) {
    var len = len || 15; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i=0; i < len; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
    return s
};