const { google } = require('googleapis');
const path = require('path');

// Initialize Google Auth with the service account key file
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'cred.json'),
    scopes: ['https://www.googleapis.com/auth/drive'], // Adjusted to read-only if only fetching files
});

// Initialize the Drive API client
const drive = google.drive({ version: 'v3', auth });

// Function to search for profile picture based on username
const setFilePermission = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    console.log('Permission set successfully');
  } catch (error) {
    console.error('Error setting permission:', error.message);
    throw error;
  }
};

const searchPf = async (username) => {
  try {
    const response = await drive.files.list({
      q: `name contains '${username}' and mimeType='image/jpeg'`,
      fields: 'files(id, name, webViewLink, webContentLink)',
      spaces: 'drive',
    });

    const files = response.data.files;

    if (files.length === 0) {
      throw new Error('No files found.');
    }

    const file = files[0];
    
    // Set permission for the file
    console.log("🚀🚀🚀🚀 ",file)
    await setFilePermission(file.id);

    return file;
  } catch (error) {
    console.error('Error searching for file:', error.message);
    return null;
  }
};


module.exports = searchPf;
