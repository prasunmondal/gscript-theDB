function updateSheetsFromJson(jsonInput) {
    try {
        const requests = jsonInput.requests;
        var rowsUpdated = 0
        // Iterate over each request in the array
        requests.forEach(request => {
            const { opId, sheedId, tabname, fieldsToMatch, updates } = request;

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
                    rowsUpdated++;
                    updates.forEach(updateField => {
                        const colIndex = headerMap[updateField.key];
                        sheet.getRange(rowIndex + 2, colIndex + 1).setValue(updateField.value);
                    });
                }
            });

            Logger.log(`Operation ${opId}: Updates applied successfully for sheet: ${sheedId}, tab: ${tabname}`);
        });
        return {
            "statusCode": 200,
            "content": "Updated Successfully",
            "rowsAffected": rowsUpdated
        }
    } catch (error) {
        Logger.log(`Error: ${error.message}`);
        throw error; // Rethrow the error to handle it in `doPost`
    }
}