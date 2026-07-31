const jwt = require("jsonwebtoken");

const protect = (req,res,next) => {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            success:false,
            message:"No token Provided"
        });
    }

    console.log('Authorization Header:',req.headers.authorization);
    
    const token = authHeader.split(" ")[1];

    console.log('Received Token:' , token);
    
    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    console.log('Decoded:',decoded);
    

    req.user = decoded;

    next();
  }catch(error)
  {
    res.status(401).json({
        success:false,
        message:"Invalid Token"
        });
  }
};

module.exports = protect
