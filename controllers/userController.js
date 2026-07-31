const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req,res) => {
  try{
    const {name , email,password,role} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    });
    
    res.status(201).json({
        success:true,
        message:"User Created Succesfully ",
        data : user
    });
}catch(error)
{
res.status(400).json({
    success:false,
    message:error.message
});
}
};

const getAllUsers = async (req,res) => {
  try{
    const user = await User.find();

    res.status(200).json({
        success:true,
        count: user.length,
        data:user
    });
  }catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    });
  }
};

const getUserById = async (req,res) => {
  try{
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not Found!"
        });
    }

    res.status(200).json({
        success:true,
        data:user
    });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


const updateUser = async (req , res) => {
  try{
    const {id} = req.params;

    const updatedUser = await User.findByIdAndUpdate(
        id,
        req.body,
        {
            new:true,
            runValidatorsaaaa:true
        }
    );

    if(!updatedUser){
        return res.status(404).json({
            success:false,
            message:"User not Found"
        });
            }

            res.status(200).json({
                success:true,
                message:"User Updated Succesfully",
                data:updatedUser
            });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
  }
}

const deleteUser = async (req, res) => {
  try{
    const {id} = req.params;

    const deleteUser = await User.findByIdAndDelete(id);

    if(!deleteUser){
        return res.status(404).json({
            success:false,
            message:"User not Found"
        });
    }

    res.status(200).json({
        success:true,
        message:"User Deleted Succesfully"
    });
  }catch(error) {
    res.status(500).json({
        success:false,
        message: error.message
    })
  }
}

const loginUser = async (req,res) => {
  try{
    const { email,password} = req.body;

    //find user by email 
    const user = await User.findOne({email});

    if(!user) {
        return res.status(401).json({
            success:false,
            message:"Invslid ID or Password"
        });
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password,user.password);
    
    if(!isMatch)
    {
         return res.status(401).json({
            success:false,
            message:"Invslid Email-ID or Password"
        });
    }

    //Generate JWT
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn : "7d"
    }
);

console.log('Generated Tokens:',token);

res.status(200).json({
        success:true,
        message: "Login Sucessful",
        token
    });
  }catch(error)
  {
    res.status(500).json({
        success:false,
        message:error.message
    });
  }
}



module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};
