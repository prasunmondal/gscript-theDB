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




// Returns the map of headers vs column number
// Global cache object to store header maps
var headerCache = {};

function getColumnMap(keys, headers, cacheKey) {
    // If the header map for this cacheKey is already cached, return it
    if (headerCache[cacheKey]) {
        return headerCache[cacheKey];
    }

    // Create a map of header values to their column numbers
    var headerMap = {};
    for (var j = 0; j < headers.length; j++) {
        headerMap[headers[j]] = j;
    }

    // Initialize an empty object to store the key-column number map
    var colMap = {};

    // Iterate through the keys and map them to their column number using headerMap
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (headerMap[key] !== undefined) {
            colMap[key] = headerMap[key];
        } else {
            colMap[key] = -1; // If the key isn't found in the headers, assign a default value like -1
        }
    }

    // Cache the colMap for future use
    headerCache[cacheKey] = colMap;

    return colMap;
}
