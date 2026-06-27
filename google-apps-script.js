// Google Apps Script code for handling contact form submissions
// Copy this code into the code.gs file in your Google Apps Script project

function doPost(e) {
  try {
    // Get form data from the POST request (URLSearchParams)
    var data = e.parameter;

    // Open the Google Sheet (replace 'Sheet1' with your actual sheet name if different)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

    // If the sheet doesn't exist, create it
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Sheet1');
      // Add headers if creating a new sheet
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
    }

    // Get current timestamp
    var timestamp = new Date();

    // Append the form data to the sheet
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.subject || '',
      data.message || ''
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'status': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging
    Logger.log('Error: ' + error.toString());

    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'status': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to set up CORS headers if needed
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
