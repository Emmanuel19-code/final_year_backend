import jwt from "jsonwebtoken"

const Authenticate = (req,res,next) =>{
  const token = req.headers.Authorization
  if(!token){
    return res.status(400).json({
        msg:"please provide an authentication token"
    })
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({
        msg:"Please invalid token"
    });
    req.user = decoded;
    next();
  });
}

export default Authenticate