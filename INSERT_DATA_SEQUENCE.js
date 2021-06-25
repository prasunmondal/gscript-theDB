function insert_data_sequence(response, tabReference, dataValue) {
    var rowData = []
    if (dataValue.startsWith("[") && dataValue.endsWith("]")) {
        dataValue = dataValue.substring(1, dataValue.length - 1)
    }
    var t = dataValue.split(",")
    for (var i = 0; i < t.length; i++) {
        rowData[i] = t[i];
    }
    tabReference.appendRow(rowData)
    response.responseCode = 201;
    response.rows_affected = 1;
    return "Data Record Created."
}