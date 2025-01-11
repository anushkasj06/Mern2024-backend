const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


//*---------------
//Home page
//*---------------

const home = async(req, res)=>{
    try{
        res.status(200).send("Welcome to my first mernstack project using router and controller");

    }catch(error){
       console.log(error);
    }
}

//*---------------
//register page
//*---------------


const register = async (req, res) =>{
    try{

        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({email});

        if(userExist){ 
            return res.status(400).json({message:"user already exist"});
        }
        
        const userCreated = await User.create({
            username, 
            email, 
            phone, 
            password,
        });

        res.status(201).json({
            msg: "registration succesfull", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString()});
    }catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
}

//*---------------
//login page
//*---------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare the plain text password with the hashed password
        const isPasswordValid = await userExist.isPasswordValid(password);

        if (isPasswordValid) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(), // Assuming this is implemented
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        //res.status(500).json("internal server error");
        next(error);
    }
};


//*---------------
//User page
//*---------------

const user = async (req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(`Error from the user route: ${error}`);
    
    }
  };
  

module.exports = {home, register, login, user};
 