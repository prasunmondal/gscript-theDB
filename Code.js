/*

IS_PRESENT                             -- Not Vaild
IS_PRESENT_CONDITIONAL_OR              -- done
IS_PRESENT_CONDITIONAL_AND             -- done

FETCH_ALL                              -- done
FETCH_BY_CONDITION_OR                  -- done
FETCH_BY_CONDITION_AND                 -- done
FETCH_BY_CONDITION_DATE_GT             --
FETCH_BY_CONDITION_DATE_EQ             --
FETCH_BY_CONDITION_DATE_LT             --

INSERT_SEQUENTIAL                      --
INSERT_SEQUENTIAL_FULL_UNIQUE          --
INSERT_SEQUENTIAL_CONDITIONAL_UNIQUE   --
INSERT_RAW_OBJECT                      -- done
INSERT_OBJECT                          -- done
INSERT_OBJECT_CONDITIONAL_AND_UNIQUE   -- done

UPDATE_CONDITIONAL_OR                  --
UPDATE_CONDITIONAL_AND                 --
UPDATE_BY_SENDING_OBJECT               --
UPDATE_BY_COLUMN_NAME                  --

DELETE_ALL                             -- done
DELETE_CONDITIONAL_OR                  -- done
DELETE_CONDITIONAL_AND                 -- done

*/

function doPost(request) {
  try {
    var operation = request.parameter.opCode;
    var sheetId = request.parameter.sheetId;
    var tabName = request.parameter.tabName;
    var dataColumn = request.parameter.dataColumn;
    var dataValue = request.parameter.dataValue;
    var objectData = request.parameter.objectData;
    var keys = request.parameter.keys;
    var searchColumn = request.parameter.searchColumn;
    var uniqueCol = request.parameter.uniqueCol;

    var sheetReference = SpreadsheetApp.openById(sheetId);
    var tabReference = sheetReference.getSheetByName(tabName);
    var response = {};

    response.operation = operation
    response.responseCode = 0

    var idempotentOperations = ["INSERT_OBJECT", "INSERT_OBJECT_UNIQUE", "INSERT_RAW_OBJECT", "DELETE_CONDITIONAL_AND",
    "DELETE_ALL", "DELETE_CONDITIONAL_OR"]
    if(idempotentOperations.indexOf(operation)+1) {
      response.lockedOperation = true
    } else {
      response.lockedOperation = false
    }

    if (operation == "INSERT_OBJECT") {
      response.records = insert_object(response, tabReference, objectData);
    } else if (operation == "INSERT_OBJECT_UNIQUE") {
      response.records = insert_object_unique(response, tabReference, objectData, uniqueCol);
    } else if (operation == "INSERT_RAW_OBJECT") {
      response.records = saveDataRaw(response, objectData, tabReference)
    } else if (operation == "IS_PRESENT_CONDITIONAL_OR") {
      response.records = is_present_conditional_or(response, tabReference, dataColumn, dataValue);
    } else if (operation == "IS_PRESENT_CONDITIONAL_AND") {
      response.records = is_present_conditional_and(response, tabReference, dataColumn, dataValue);
    } else if (operation == "DELETE_CONDITIONAL_AND") {
      response.records = delete_conditional_and(response, tabReference, dataColumn, dataValue);
    } else if (operation == "DELETE_ALL") {
      response.records = delete_all(response, tabReference);
    } else if (operation == "DELETE_CONDITIONAL_OR") {
      response.records = delete_conditional_or(response, tabReference, dataColumn, dataValue);
    } else if (operation == "FETCH_OBJECT") {
      response.records = getDataByColumnName(response, tabReference, searchColumn, keys);
    } else if (operation == "FETCH_ALL") {
      response.records = fetch_all(response, tabReference);
    } else if (operation == "FETCH_BY_CONDITION_OR") {
      response.records = fetch_by_condition_or(response, tabReference, dataColumn, dataValue);
    } else if (operation == "FETCH_BY_CONDITION_AND") {
      response.records = fetch_by_condition_and(response, tabReference, dataColumn, dataValue);
    } else {
      response.responseCode = 400
      response.records = "Bad Request: Illegal opCode. Invalid Operation type - " + operation;
    }
    return generateOutput(response, request);
  } catch (err) {
    if(err.scriptStackTraceElements.length > 0)
      response.isUnhandledError = true
    else
      response.isUnhandledError = false

    response.data = "FAILED: " + err.scriptStackTraceElements;
    response.errorStack = err.stack
    return generateOutput(response, request)
  }
}

function getHeaderRow(tabReference) {
  return tabReference.getRange(1, 1, 1, tabReference.getLastColumn()).getValues()[0];
}

function getDataRows(tabReference) {
  if(!isDataRowsPresent(tabReference))
    return []
  return tabReference.getRange(2, 1, tabReference.getLastRow() - 1, tabReference.getLastColumn()).getValues();
}

function isDataRowsPresent(tabReference) {
  if(tabReference.getLastRow()==1)
    return false;
  return true;
}