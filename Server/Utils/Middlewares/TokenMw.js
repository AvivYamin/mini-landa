const { SECRET } = require('../Config');
const User = require('../../Models/User');
const jwt = require('jsonwebtoken');
const c = require('../Helpers/coloredLogs');

//Extracts Token from request authorazation and authenticates it
//Authorizes acces to strict actions
module.exports.tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      console.log(`${c.s.s} Request By: (${req.decodedToken.id})${req.decodedToken.username} TOKEN: ${authorization} ${c.s.e}`)
      next()
    } catch {
      console.log(`${c.f.s} token invalid ${c.f.e}`)
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    console.log(`${c.f.s} token missing ${c.f.e}`)
    return res.status(401).json({ error: 'token missing' })
  }
}

//Validates the Token with the Token in the DB
module.exports.isValidToken = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const reqToken = req.get('authorization').substring(7);
  if(user.token == null){
    console.log(`${c.f.s} Login Needed ${c.f.s}`);
    return res.status(401).json({ error: 'Please Login' })
  }else if(reqToken != user.token){
      console.log(`${c.f.s} Expired TOKEN ${c.f.s}`);
      return res.status(401).json({ error: 'Expired TOKEN' })
  }else{
      console.log(`${c.s.s} SUCCESS: Your TOKEN ${c.s.s}`);
      req.user = user;
      next()
  }
}
