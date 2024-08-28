const upload_pi = require("../utils/upload_pi");

const add_pi=async(req,res)=>{
    console.log("----------------- Uploading post file -------------")
    try{
        const {body,files,postId} = req;
        console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ ",req.body)
        var data;
        for(let i=0; i<files.length; i++){
            console.log(files[i],req.body.postId,postId)
            data=await upload_pi(files[i],req.body.postId);
        }
        res.status(200).json({"data":data});
    }catch(e){
        console.log(e.message);
        res.status(500).send(e.message);
    }
}
module.exports = add_pi;