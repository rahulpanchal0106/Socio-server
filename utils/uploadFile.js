
const stream = require('stream')
const path = require('path')
const {google} = require('googleapis')


const KEYS = path.join(__dirname,"keys.json")
const SCOPES = ['https://googleapis.com/auth/drive']
const auth = google.auth.GoogleAuth({
    keyFile:KEYS,
    scopes:SCOPES
})
const upload_file = async(file)=>{
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    const {data} = await google.drive({
        version:"v3",
        auth
    }).files.create({
        media:{
            mimeType:file.mimeType,
            buffer:bufferStream
        },
        requestBody:{
            name:file.originalname,
            parents:["1C56obqW0lVzm4PdhZip4UR3xOLfo3GTW"]
        },
        fields:"id,name"
    })
    console.log(file);
    console.log("File uploaded: ",data.name, data.id);
    
}

module.exports = upload_file