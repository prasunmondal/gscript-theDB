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


/* Sample Request:

curl --location 'https://script.google.com/macros/s/AKfycbzg3b6YzCPwEzUKytI9j3tDd4-S9wVTujGzopN_qFClARWkijgXzIO46_fPcojr0NYrjA/exec' \
--form 'operations="[
    {
      \"opCode\": \"UPDATE_SHEET\",
      \"sheetId\": \"1p3v4SgXPfB70YjCXCOj57BdLrDiFBoynt7yIWPQ8WmI\",
      \"tabName\": \"TestSheet1\",
      \"opId\": \"37159ae7-a1ce-4c8f-ad09-43464ade4ca7-1732086994767\",
      \"requests\": [
		{
			\"opId\": \"request-update-1\",
		    \"sheedId\": \"1p3v4SgXPfB70YjCXCOj57BdLrDiFBoynt7yIWPQ8WmI\",
		    \"tabname\": \"Sheet134\",
		    \"fieldsToMatch\": [
		      { \"key\": \"column1\", \"value\": \"prasun\" },
		      { \"key\": \"column2\", \"value\": \"mondal\" }
		    ],
		    \"updates\": [
		      { \"key\": \"column3\", \"value\": \"cow\" },
		      { \"key\": \"column4\", \"value\": \"hen\" }
		    ]
	    },
	    {
			\"opId\": \"request-update-2\",
		    \"sheedId\": \"1p3v4SgXPfB70YjCXCOj57BdLrDiFBoynt7yIWPQ8WmI\",
		    \"tabname\": \"135\",
		    \"fieldsToMatch\": [
		      { \"key\": \"column1\", \"value\": \"prasun\" },
		      { \"key\": \"column2\", \"value\": \"mondal\" }
		    ],
		    \"updates\": [
		      { \"key\": \"column3\", \"value\": \"hum bhi\" },
		      { \"key\": \"column24\", \"value\": \"hai josh mein\" }
		    ]
	    }
    ]
    },
    {
      \"opCode\": \"FETCH_ALL\",
      \"sheetId\": \"1p3v4SgXPfB70YjCXCOj57BdLrDiFBoynt7yIWPQ8WmI\",
      \"tabName\": \"Sheet134\",
      \"opId\": \"54f46422-8c0d-4f73-9c62-81590a34c7da-1732086994768\"
    }
  ]"'



 */