function generateOutput(outputString, request) {
  if(outputString == true) {
    outputString = "[{\"result\":true}]"
  } else if(outputString == false) {
    outputString = "[{\"result\":false}]"
  }
  var output  = ContentService.createTextOutput();
  
  var callback = request.parameters.callback;
    if (callback === undefined) {
      output.setContent(JSON.stringify(outputString));
    } else {
      output.setContent(callback + "(" + JSON.stringify(outputString) + ")");
    }
    
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}