function fetch_all_multiple_tabs(ss, sheetname, properties) {
  dataCollection = {}

    sheets = sheetname.split(',')
    for (var index in sheets) {
      var sheet = sheets[index].trim()
      var data = []
      properties = getHeaderRow_(ss, sheet)
      properties = properties.map(function (p) {
        return p.replace(/\s+/g, '_');
      });

      var rows = getDataRows_(ss, sheet)

      for (var r = 0, l = rows.length; r < l; r++) {
        var row = rows[r],
            record = {};

        for (var p in properties) {
          record[properties[p]] = row[p];
        }
        data.push(record);
      }
      dataCollection[sheet] = data
    }
    return dataCollection
}