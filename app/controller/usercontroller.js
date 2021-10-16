const userModel = require("../model/user_model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretkey = require("../auth/secretkey.js");
const validateLoginData =  require("../auth/validation_login.js");
const validateResigterData = require("../auth/validation_register.js");

class userController{

    static async createUser(req,res){

        try{

        console.log("going inside validation_register");
        const {errors, isValid} = validateResigterData(req.body);
        console.log(req.body);
        if(!isValid){
            console.log(errors);
           return res.status(400).json(errors);
        }

        const userdata = await userModel.findOne({email: req.body.email});
        console.log(userdata)
        if(userdata){
            res.json(400).json({message: "user already exists"});
        }
        else{
            const newUser = userModel(req.body);
            console.log(newUser);
            //need to hash the password before saving it
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err)
                  { throw err;}
                  newUser.password = hash;
                  newUser.save();
                  return res.status(200).json(newUser);
                });
              });

              

        }}
        catch(error){
            console.log("i am in catch block");
            console.log(error);
        }
    }

    static async loginUser(req, res){
        const {
            email,
            password,
        } = req.body;
        const {errors, isValid} = validateLoginData(req.body);
        if (!isValid){
            return res.status(400).json(errors);
        }

        const userdata = await userModel.findOne({email: email});
        if (!userdata){
           return res.status(400).json({err: "User does not exist"});
        }
        //check if password is correct
        else{
            bcrypt.compare(password, userdata.password,(err, match)=>{
                if(err || !match){
                    return res.status(400).json({err: "incorrect password entered"});
                }
                //user is found and password is correct
                else{
                    // create a jwt payload so you can sign jwt token for the user
                    const payload = {
                        _id: userdata.id,
                        firstname: userdata.firstname,
                        lastname: userdata.lastname,
                        email: userdata.email,
                        status: userdata.status,
                        avatar: userdata.avatar,
                        role: userdata.role,
                      };
                    //sign jwt token

                    jwt.sign(payload, secretkey,
                        {expiresIn: "31556926"}, // 1 year  = 31556926 seconds
                        (err, token) =>{

                            if(err || !token){
                                return res.status(400).json({err: "unable to make token, incorrect password"});

                            }
                            else{
                                return  res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                    data: payload, });
                            }

                        }); 


                }
            });
        }
    }
    static async getUsers(req, res){
        const usersData = await userModel.find({});
        if (!usersData){
            res.status(400).json({err: "No users found"});
        }
        else{
            res.status(200).json(usersData);
        }
    }

    static async getUsersByEmail(req,res){
        let _email = req.params.email;
        const userData = await userModel.findOne({email: _email});
        if (!userData){
            res.status(400).json({err: "No users found"});
        }
        else{
            res.status(200).json(usersData);
        }

    }

}

module.exports = userController;