require('dotenv').config();
const app =require('./app')
const mongoose = require('mongoose');
const start_server = async ()=>{
    try{
        await mongoose.connect(process.env.DB).catch((e)=>{
            console.log("DB CONNECTION PROBLEM: ",e)
        })

        app.listen(process.env.PORT,()=>{
            console.log("Socio Server is ON....");
        })
        
    }catch(e){
        console.error("Couldent connect to db...",e)
    }

    
}

mongoose.connection.on('connected',()=>{
    console.log("database cluster connected....")
})

start_server()