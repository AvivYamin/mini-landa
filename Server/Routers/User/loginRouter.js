const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../../Models/User')
const { SECRET } = require('../../Utils/Config')
const c = require('../../Utils/Helpers/coloredLogs');

router.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({
    where: {
      username: body.username
    }
  })
  const passwordCorrect = body.password === 'secret'
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, SECRET);
  user.token = token;
  const updatedUser = await user.save();
  response
    .status(200)
    .send({ token: updatedUser.token, username: user.username, name: user.name })
})

module.exports = router