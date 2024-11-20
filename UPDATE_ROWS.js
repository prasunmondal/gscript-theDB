function updateSheetsFromJson(jsonInput) {
    const results = []; // To store the status of each request
    let totalRowsUpdated = 0; // To keep track of total rows updated

    try {
        const requests = jsonInput.requests;

        requests.forEach(request => {
            const { opId, sheedId, tabname, fieldsToMatch, updates } = request;
            const result = {
                opId,
                sheedId,
                tabname,
                status: "success",
                statusCode: 200,
                message: "",
                rowsUpdated: 0
            };

            try {
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
                        updates.forEach(updateField => {
                            const colIndex = headerMap[updateField.key];
                            sheet.getRange(rowIndex + 2, colIndex + 1).setValue(updateField.value);
                        });
                        result.rowsUpdated++;
                    }
                });

                totalRowsUpdated += result.rowsUpdated;
                result.message = `Updates applied successfully. Rows updated: ${result.rowsUpdated}`;
            } catch (error) {
                result.status = "failed";
                result.statusCode = 400; // Set appropriate failure status code
                result.message = error.message;
            }

            results.push(result);
        });

        return {
            statusCode: 200,
            totalRowsAffected: totalRowsUpdated,
            results
        };
    } catch (error) {
        Logger.log(`Unexpected error: ${error.message}`);
        return {
            statusCode: 500,
            message: "An unexpected error occurred",
            error: error.message
        };
    }
}
