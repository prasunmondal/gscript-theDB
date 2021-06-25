function fetch_all(response, tabReference) {
    var no_of_records_found = 0, data = [];

    if (!isSheetEmpty(tabReference)) {
        if (typeof properties == "undefined") {
            properties = getHeaderRow(tabReference);
            properties = properties.map(function (p) {
                return p.replace(/\s+/g, '_');
            });
        }
        var rows = getDataRows(tabReference)
        for (var r = 0, l = rows.length; r < l; r++) {
            var row = rows[r],
                record = {};

            for (var p in properties) {
                record[properties[p]] = row[p];
            }
            data.push(record);
            no_of_records_found += 1
        }
    }

    response.rows_affected = no_of_records_found
    response.responseCode = 200;
    if (response.rows_affected == 0)
        response.responseCode = 204;

    return data;
}