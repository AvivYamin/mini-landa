const { SECRET } = require('../Config');
const User = require('../../Models/User');
const jwt = require('jsonwebtoken');
const c = require('../Helpers/coloredLogs');
const { idErrorResponse, fieldErrorResponse, authErrorResponse, uniqueErrorResponse } = require('../Helpers/errorResponses');
const { intValidator, stringValidator, boolValidator } = require('../Helpers/validators');

module.exports.isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user.admin) {
      return res.status(401).json({ error: 'operation not allowed' })
    }
    next()
}

//Find User(ID) Middleware
module.exports.userFinder = async (req, res, next) => {
  try {
      if(req.params.id){
        req.user = await User.findOne({
          where: { id: req.params.id }
      })
      }
      if(req.params.username){
        req.user = await User.findOne({
          where: { username: req.params.username }
        })
      }
      if(req.user){
        next()
      }else{
        next(idErrorResponse());
      }
  } catch (error) {
      next(error);
  }
}

//Validate User POST Request Middleware
module.exports.userPostReqValidator = async (req, res, next) => {
  try {
      newUser = req.body;
      if(newUser.username){
          stringValidator('username', newUser.username);
          if(newUser.name){
              stringValidator('name', newUser.name);
          }else{
            newUser.name = "Anonymous";
          }
      }else{
          fieldErrorResponse('username')
      }
      req.newUser = newUser;
      next()
  } catch (error) {
      next(error);
  }
}

//Validate User PUT Request Middleware
module.exports.userPutReqValidator = async (req, res, next) => {
  try {
      updateUser = req.body;
      req.updateUser = req.user;
      if(updateUser.username && updateUser.username != req.user.username ){
          isUniqueUser = await User.findOne({
              where: { username: updateUser.username }
              })
          if(isUniqueUser){
            next(uniqueErrorResponse());
          }
          if(stringValidator('username', updateUser.username) === true){
              req.updateUser.username = updateUser.username;
          }else{
            next(stringValidator('username', updateUser.username))
          }  
      }
      if(updateUser.name){
          if(stringValidator('name', updateUser.name) === true){
              req.updateUser.name = updateUser.name;
          }else{
            next(stringValidator('name', updateUser.name))
          }  
      }
      if(updateUser.disabled){
          if(boolValidator('disabled', updateUser.disabled) === true){
              req.updateUser.disabled = updateUser.disabled;
          }else{
            next(boolValidator('disabled', updateUser.disabled))
          }   
      }
      if(updateUser.admin){
          if(boolValidator('admin', updateUser.admin) === true){
              req.updateUser.admin = updateUser.admin;
          }else{
            next(boolValidator('admin', updateUser.admin))
          }  
      }
      next()
  } catch (error) {
      next(error);
  }
}