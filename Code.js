
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

// DELETE_ALL                             -- done
// DELETE_CONDITIONAL_AND                 -- done
// DELETE_CONDITIONAL_OR                  -- done

function doPost(request) {
  try {
    var operation = request.parameter.opCode;
    var sheetId = request.parameter.sheetId;
    var tabName = request.parameter.tabName;
    var dataColumn = request.parameter.dataColumn;
    var dataValue = request.parameter.dataValue;
    var objectData = request.parameter.objectData;
    var keys  = request.parameter.keys;
    var searchColumn = request.parameter.searchColumn;
    var uniqueCol = request.parameter.uniqueCol;
    
    var sheetReference= SpreadsheetApp.openById(sheetId);
    var tabReference = sheetReference.getSheetByName(tabName);
    var data = {};

    if(operation == "FETCH_OBJECT") {
      data.records = getDataByColumnName(tabReference, searchColumn, keys);
    }

    switch (operation)  {
      case "IS_PRESENT_CONDITIONAL_OR":
        data.records = is_present_conditional_or(tabReference, dataColumn, dataValue);
        break;
      case "IS_PRESENT_CONDITIONAL_AND":
        data.records = is_present_conditional_and(tabReference, dataColumn, dataValue);
        break;
      case "FETCH_ALL":
        data.records = fetch_all(tabReference);
        break;
      case "FETCH_BY_CONDITION_OR":
        data.records = fetch_by_condition_or(tabReference, dataColumn, dataValue);
        break;
      case "FETCH_BY_CONDITION_AND":
        data.records = fetch_by_condition_and(tabReference, dataColumn, dataValue);
        break;
      case "INSERT_RAW_OBJECT":
        data.records = saveDataRaw(objectData, tabReference)
        break;
      case "INSERT_OBJECT":
        return generateOutput(data, request);
        break;
      case "INSERT_OBJECT_CONDITIONAL_AND_UNIQUE":
        data.records = insert_object_unique(tabReference, objectData, uniqueCol);
        break;
      case "DELETE_ALL":
        data.records = delete_all(tabReference);
        break;
      case "DELETE_CONDITIONAL_AND":
        data.records = delete_conditional_and(tabReference, dataColumn, dataValue);
        break;
      case "DELETE_CONDITIONAL_OR":
        data.records = delete_conditional_or(tabReference, dataColumn, dataValue);
        break;
      default:
        throw "Error: Illegal opCode. Invalid Operation type - " + request.parameter.opCode;
    }
    return generateOutput(data, request);
  } catch (err) {
    return generateOutput("FAILED: " + err, request)
  }
}

function getHeaderRow_(tabReference) {
  return tabReference.getRange(1, 1, 1, tabReference.getLastColumn()).getValues()[0];
}

function getDataRows_(tabReference) {
  return tabReference.getRange(2, 1, tabReference.getLastRow() - 1, tabReference.getLastColumn()).getValues();
}