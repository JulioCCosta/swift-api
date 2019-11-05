

export default async(req,res,next)=>{
    const token = req.headers["X-Auth-Token"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
      }

      try{
        next();
      }
      catch(err){
        res.status(400).send("Invalid token.");
      }

}