function updateRows(jsonInput) {
    try {
        const requests = jsonInput.requests;

        // Group requests by sheetId and tabname
        const groupedRequests = {};
        requests.forEach(request => {
            const key = '${request.sheedId}:${request.tabname}';
            if (!groupedRequests[key]) {
                groupedRequests[key] = {
                    sheedId: request.sheedId,
                    tabname: request.tabname,
                    operations: []
                };
            }
            groupedRequests[key].operations.push({
                fieldsToMatch: request.fieldsToMatch,
                updates: request.updates
            });
        });

        // Process each grouped sheet-tab combination
        for (const key in groupedRequests) {
            const { sheedId, tabname, operations } = groupedRequests[key];

            // Open the spreadsheet and sheet
            const spreadsheet = SpreadsheetApp.openById(sheedId);
            const sheet = spreadsheet.getSheetByName(tabname);
            if (!sheet) throw new Error(`Sheet with name '${tabname}' not found in spreadsheet '${sheedId}'.`);

            // Get all data and map headers to indices
            const data = sheet.getDataRange().getValues();
            const headers = data[0];
            const rows = data.slice(1); // Exclude header row

            const headerMap = {};
            headers.forEach((header, index) => {
                headerMap[header] = index;
            });

            // Process all operations for this sheet-tab
            operations.forEach(({ fieldsToMatch, updates }) => {
                // Validate match and update keys
                fieldsToMatch.forEach(match => {
                    if (!(match.key in headerMap)) throw new Error(`Match key '${match.key}' not found in headers.`);
                });
                updates.forEach(update => {
                    if (!(update.key in headerMap)) throw new Error(`Update key '${update.key}' not found in headers.`);
                });

                // Iterate through rows and apply updates
                rows.forEach((row, rowIndex) => {
                    const match = fieldsToMatch.every(matchField => {
                        const colIndex = headerMap[matchField.key];
                        return row[colIndex] === matchField.value;
                    });

                    if (match) {
                        updates.forEach(updateField => {
                            const colIndex = headerMap[updateField.key];
                            sheet.getRange(rowIndex + 2, colIndex + 1).setValue(updateField.value);
                        });
                    }
                });
            });

            Logger.log(`Updates applied successfully for sheet: ${sheedId}, tab: ${tabname}`);
        }
    } catch (error) {
        Logger.log(`Error: ${error.message}`);
        throw error; // Rethrow the error to handle it in `doPost`
    }
}