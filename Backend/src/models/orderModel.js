const mongoose=require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId
const orderSchema=new mongoose.Schema({
    user_id:{
        type:ObjectId,
        require:true,
        ref:"User Detail"
    },
    sub_total:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
   
},
{timestamps:true}
)

module.exports=mongoose.model("Order Detail",orderSchema)