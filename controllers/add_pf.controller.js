const upload_file = require("../utils/uploadFile");

const add_pf=async(req,res)=>{
    console.log("----------------- Uploading file -------------")
    try{

        const {body,files,username} = req;
        console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ ",req.body)
        var data;
        for(let i=0; i<files.length; i++){
            console.log(files[i],req.body.username)
            data=await upload_file(files[i],req.body.username);
        }
        res.status(200).json({"data":data});
    }catch(e){
        console.log(e.message);
        res.status(500).send(e.message);
    }
}
module.exports = add_pf;