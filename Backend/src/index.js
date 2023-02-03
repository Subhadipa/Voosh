const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const _=require("underscore")
const mongoose=require("mongoose")
const route=require("./routes/route")
const cors=require("cors")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

let connection_string="mongodb+srv://Subhadipa:Subha2022@subhadipa-cluster.qy3xxtm.mongodb.net/user-order-db?authSource=admin&replicaSet=atlas-iogo5c-shard-0&readPreference=primary&ssl=true"

mongoose.connect(connection_string,{useNewUrlParser:true})
        .then(()=>console.log("Mongoose is running on PORT 3000"))
        .catch((err)=>console.log(err))

app.use("/",route)

app.listen(process.env.PORT||3000,function(){
    console.log("Express is running on PORT "+(process.env.PORT||3000))
})


