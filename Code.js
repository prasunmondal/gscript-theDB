function doPost(request) {
  var responseArray = [];
  var jsonObjArray = JSON.parse(request.parameter.operations);

  // Cache operations mapping for better performance
  const operationsMap = {
    "INSERT_OBJECT": insert_object,
    "INSERT_OBJECTS": insert_objects,
    "INSERT_OBJECT_UNIQUE": insert_object_unique,
    "INSERT_RAW_OBJECT": saveDataRaw,
    "IS_PRESENT_CONDITIONAL_OR": is_present_conditional_or,
    "IS_PRESENT_CONDITIONAL_AND": is_present_conditional_and,
    "DELETE_ALL": delete_all,
    "DELETE_CONDITIONAL_AND": delete_conditional_and,
    "DELETE_CONDITIONAL_OR": delete_conditional_or,
    "FETCH_BY_QUERY": fetch_by_query,
    "FETCH_ALL": fetch_all,
    "FETCH_BY_CONDITION_OR": fetch_by_condition_or,
    "FETCH_BY_CONDITION_AND": fetch_by_condition_and,
    "UPDATE_SHEET": updateSheetsFromJson
  };

  for (var i = 0; i < jsonObjArray.length; i++) {
    var result = {};
    var jsonObject = jsonObjArray[i];
    var logs = "Processing request: " + jsonObject.opCode + " - "
        + jsonObject.sheetId + " - " + jsonObject.tabName + " - "
        + jsonObject.objectData;

    try {
      var operation = jsonObject.opCode;
      var sheetId = jsonObject.sheetId;
      var tabName = jsonObject.tabName;
      var ss = SpreadsheetApp.openById(sheetId);

      // Check if the operation is mapped
      if (operationsMap[operation]) {
        if (operation === "FETCH_BY_QUERY" || operation === "FETCH_ALL") {
          var outputData = operationsMap[operation](ss, tabName, jsonObject);
          var statusCode = outputData.length > 0 ? 200 : 204;
          result = {
            "statusCode": statusCode,
            "content": outputData,
            "rowsAffected": outputData.length
          };
        } else {
          result = operationsMap[operation](jsonObject);
        }
      } else {
        result.statusCode = 400;
        result.errorMessage = "Bad Request";
        result.content = "Invalid OpCode";
      }
    } catch (err) {
      result.statusCode = 500;
      result.errorName = err.name;
      result.errorMessage = err.message;
      result.stacktrace = err.stack;
      result.content = "Command Failed";
    }

    result.opId = jsonObject.opId;
    result.logs = logs;
    responseArray.push(result);
  }

  return generateOutput2(jsonObjArray[0].opId, responseArray, request);
}

function getDataRows_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);
  var lastRow = sh.getLastRow();

  if (lastRow <= 1) {
    return [];
  }

  return sh.getRange(2, 1, lastRow - 1, sh.getLastColumn()).getValues();
}