function generateOutput(opId, output, request) {
  if (output == true) {
    output = "[{\"result\":true}]"
  } else if (output == false) {
    output = "[{\"result\":false}]"
  }

  var response = {
    "opId": opId,
    "statusCode": output.statusCode,
    "content": output.content
  };

  var output = ContentService.createTextOutput();

  var callback = request.parameters.callback;
  if (callback === undefined) {
    output.setContent(JSON.stringify(response));
  } else {
    output.setContent(callback + "(" + JSON.stringify(response) + ")");
  }

  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}


function generateOutput2(opId, outputString, request) {
  var output = ContentService.createTextOutput();

  var callback = request.parameters.callback;
  if (callback === undefined) {
    output.setContent(JSON.stringify(outputString));
  } else {
    output.setContent(callback + "(" + JSON.stringify(outputString) + ")");
  }

  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}