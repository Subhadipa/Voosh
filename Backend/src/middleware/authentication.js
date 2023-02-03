const jwt =require("jsonwebtoken")

module.exports.authentication=async(req,res,next)=>{
   try{
    let authToken=req.headers['x-auth-token']
    if (!authToken) {
        return res.status(401).send({
          status: false,
          message: "Mandatory authentication header is missing",
        });
      } else {
        let decodedToken = jwt.verify(authToken, "subha");
        if (decodedToken) {
          req.userId = decodedToken.userId;
          next();
        } else {
          return res
            .status(401)
            .send({ status: false, message: "The token is invalid!" });
        }
      }

   }catch(error){
    return res.status(500).send({ status: false, message: error.message });
   }
}