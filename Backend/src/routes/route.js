const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")
const middleware=require("../middleware/authentication")
const orderController=require("../controller/orderConroller")
router.post("/add-user",userController.registerUser)
router.post("/login-user",userController.loginUser)
router.post("/add-order",middleware.authentication,orderController.craeteOrder)
router.get("/get-order",middleware.authentication,orderController.getOrder)




module.exports=router