// Cache to store sheet/tab header data
var headerCache = {};

function getHeaderRow_(ss, sheetname) {
    // Generate a unique key for the sheet/tab combination
    var cacheKey = ss.getId() + '_' + sheetname;

    // Check if the headers are already cached
    if (headerCache[cacheKey]) {
        return headerCache[cacheKey];
    }

    // If not cached, fetch the headers from the sheet
    var sh = ss.getSheetByName(sheetname);
    var headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];

    // Cache the headers for future use
    headerCache[cacheKey] = headers;

    return headers;
}
