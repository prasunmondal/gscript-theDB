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