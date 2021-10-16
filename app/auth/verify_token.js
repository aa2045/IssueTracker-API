const jwt = require("jsonwebtoken");
const secretkey = require("../auth/secretkey.js");
const user_model = require("../model/user_model");

module.exports = function verifyToken(req, res, next){

  // check header or url parameters or post parameters for token
  console.log("Going inside verifytoken");
  console.log(req.headers["authorization"]);
  const token = req.headers["authorization"].split(' ')[1]

  if(!token){
      return res.status(500).json({auth:false, message: " no token failed to authenticate"});
  }
  else{
      jwt.verify(token, secretkey, (err, decodedvalue)=>{
          if(err || !decodedvalue){
            console.log("err: "+err);
            console.log("decodedvalue: "+decodedvalue);
              res.status(500).json({auth:false, message: "failed to authenticate"});
          }
          else{
            //decodedvalue is the users id, so save it to the request.
            req.userId = decodedvalue.id;
            next();
          }
      });
  }

};