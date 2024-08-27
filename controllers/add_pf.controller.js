const upload_file = require("../utils/uploadFile");

const add_pf=async(req,res)=>{
    try{

        const {body,files} = req;
        for(let i=0; i<files.length; i++){
            await upload_file(files[f]);
        }
        res.status(200).send("Upload successfull");
    }catch(e){
        console.log(e.message);
        res.status(500).send(e.message);
    }
}
module.exports = add_pf;