// IS_PRESENT                             -- Not Vaild
// IS_PRESENT_CONDITIONAL_OR              -- done
// IS_PRESENT_CONDITIONAL_AND             -- done

// FETCH_ALL                              -- done
// FETCH_BY_CONDITION_OR                  -- done
// FETCH_BY_CONDITION_AND                 -- done
// FETCH_BY_CONDITION_DATE_GT             -- 
// FETCH_BY_CONDITION_DATE_EQ             -- 
// FETCH_BY_CONDITION_DATE_LT             -- 

// INSERT_SEQUENTIAL                      --
// INSERT_SEQUENTIAL_FULL_UNIQUE          --
// INSERT_SEQUENTIAL_CONDITIONAL_UNIQUE   --
// INSERT_RAW_OBJECT                      -- done
// INSERT_OBJECT                          -- done
// INSERT_OBJECT_CONDITIONAL_AND_UNIQUE   -- done

// UPDATE_CONDITIONAL_OR                  --
// UPDATE_CONDITIONAL_AND                 --
// UPDATE_BY_SENDING_OBJECT               --
// UPDATE_BY_COLUMN_NAME                  --

// DELETE_CONDITIONAL_OR                  -- done
// DELETE_CONDITIONAL_AND                 -- done

function doPost(request) {

  var str = ""
  var logs = ""
  var responseArray = [];
  // Loop through the array of JSON objects
  var jsonObjArray = JSON.parse(request.parameter.operations)
  for (var i = 0; i < jsonObjArray.length; i++) {
    logs = ""
    var result = {}
    var jsonObject = jsonObjArray[i];
    logs += "Processing request: " + jsonObject.opCode + " - "
        + jsonObject.sheetId + " - " + jsonObject.tabName + " - "
        + jsonObject.objectData

    try {
      var operation = jsonObject.opCode;
      var sheetId = jsonObject.sheetId;
      var tabName = jsonObject.tabName;
      var dataColumn = jsonObject.dataColumn;
      var dataValue = jsonObject.dataValue;
      var uniqueCol = jsonObject.uniqueCol;
      var objectData = jsonObject.objectData;

      str = str + "operation: " + operation + "sheetId: " + sheetId
          + "tabName: " + tabName + "dataColumn: " + dataColumn + "dataValue: "
          + dataValue + "uniqueCol: " + uniqueCol + "objectData: " + objectData

      var ss = SpreadsheetApp.openById(sheetId);

      var sheet = ss.getSheetByName(tabName);
      var tabReference = ss.getSheetByName(tabName);
      var opId = jsonObject.opId

      if (operation == "INSERT_OBJECT") {
        result = insert_object(jsonObject)
      } else if (operation == "INSERT_OBJECTS") {
        result = insert_objects(jsonObject)
      } else if (operation == "INSERT_OBJECT_UNIQUE") {
        result = insert_object_unique(jsonObject)
      } else if (operation == "INSERT_RAW_OBJECT") {
        result = saveDataRaw(jsonObject)
      } else if (operation == "IS_PRESENT_CONDITIONAL_OR") {
        result = is_present_conditional_or(ss, tabName, dataColumn, dataValue);
      } else if (operation == "IS_PRESENT_CONDITIONAL_AND") {
        result = is_present_conditional_and(ss, tabName, dataColumn, dataValue);
      } else if (operation == "DELETE_ALL") {
        result = delete_all(sheetId, tabName);
      } else if (operation == "DELETE_CONDITIONAL_AND") {
        result = delete_conditional_and(sheetId, tabName, dataColumn,
            dataValue);
      } else if (operation == "DELETE_CONDITIONAL_OR") {
        result = delete_conditional_or(sheetId, tabName, dataColumn, dataValue);
      }
          // } else if (operation == "FETCH_OBJECT") {
          //   var
          //       keys = jsonObject.keys,
          //       searchColumn = jsonObject.searchColumn;
          //   var data = {};
          //   data.records = getDataByColumnName(ss, tabName, searchColumn, keys);
      //   return generateOutput(data, request);
      else if (operation == "FETCH_BY_QUERY") {
        var outputData = fetch_by_query(ss, tabName, jsonObject);
        var statusCode = (outputData.length > 0) ? 200 : 204
        result = {
          "statusCode": statusCode,
          "content": outputData,
          "rowsAffected": outputData.length
        }
      }
      else if (operation == "FETCH_ALL") {
        var outputData = fetch_all(ss, tabName);
        var statusCode = (outputData.length > 0)? 200 : 204
        result = {
          "statusCode": statusCode,
          "content": outputData,
          "rowsAffected": outputData.length
        }
      }
          // else if (operation == "FETCH_ALL_MULTIPLE_TABS") {
          //   var data = {};
          //   data.records = fetch_all_multiple_tabs(ss, tabName);
          //   return generateOutput(data, request);
      // }
      else if (operation == "FETCH_BY_CONDITION_OR") {
        result = fetch_by_condition_or(ss, tabName, dataColumn, dataValue);
      } else if (operation == "FETCH_BY_CONDITION_AND") {
        result = fetch_by_condition_and(ss, tabName, dataColumn, dataValue);
      } else if (operation == "UPDATE_SHEET") {
        result = updateSheetsFromJson(jsonObject);
      } else {
        result.statusCode = 400
        result.errorMessage = "Bad Request"
        result.content = "Invalid OpCode"
      }
    } catch (err) {
      result.statusCode = 500
      result.errorName = err.name
      result.errorMessage = err.message
      result.stacktrace = err.stack
      result.content = "Command Failed"
    }
    result.opId = opId
    result.logs = logs
    responseArray.push(result)
  }
  return generateOutput2(opId, responseArray, request)
}

function getDataRows_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);
  var lastRow = sh.getLastRow();
  
  // If there is only one row (headers), return an empty list
  if (lastRow <= 1) {
    return [];
  }
  
  return sh.getRange(2, 1, lastRow - 1, sh.getLastColumn()).getValues();
}