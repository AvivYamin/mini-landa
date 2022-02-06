const router = require('express').Router()
const User = require('../../Models/User')
const c = require('../../Utils/Helpers/coloredLogs');
const { userPostReqValidator } = require('../../Utils/Middlewares');

//Post User
router.post('/', userPostReqValidator, async (req, res) => {
    try {
        const newUser = req.newUser;
        const user = await User.create(newUser)
        console.log(`${c.s.s} Post User Success: ${JSON.stringify(user, null, 2)} ${c.s.e}`);
        return res.json(user)
    } catch(error) {
        console.log(`${c.f.s} Post User Failure ${c.f.e}`);
        return res.status(400).json({error: [error.message]})
    }
})

module.exports = router