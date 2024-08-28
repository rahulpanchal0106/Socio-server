
const stream = require('stream')
const path = require('path')
const {google} = require('googleapis');
const searchPf = require('./searchPf');

const KEYFILEPATH = path.join(__dirname,"..", "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

const upload_pi = async (fileObject,username) => {
    
    const alreadyExists = await searchPf(username);
    if(alreadyExists&&alreadyExists.id){
        console.log("Post img ALREADY exists, ",alreadyExists);
        await drive.files.delete({ fileId: alreadyExists.id });
        console.log("Deleted Old one");
    }
    console.log("Uploading new one")
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await drive.files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: username,
            parents: ["1T5prRMh8BH8F7xxaqGJ_OoP9l_6us2QS"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data;
};

module.exports = upload_pi