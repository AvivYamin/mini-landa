const express = require('express');
const router = express.Router();
const c = require('../../Utils/Helpers/coloredLogs');
const signupRouter  = require('./signupRouter');
const loginRouter  = require('./loginRouter');
const { User } = require('../../Models');
const { isAdmin, tokenExtractor, userFinder, userPutReqValidator, errorHandlerMw } = require('../../Utils/Middlewares');
//const { Op } = require('sequelize');

//Get Users(All)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({})
        console.log(`${c.s.s} ${JSON.stringify(users, null, 2)} ${c.s.e}`)
        return res.json(users)
    } catch (error) {
        console.log(`${c.f.s} Get Failure ${c.f.e}`);
        next(error);
    }
})

//Get User(ID)
router.get('/:id', userFinder, async (req, res) => {
    const user = req.user;
    if (user) {
        console.log(`${c.s.s} ${JSON.stringify(user, null, 2)} ${c.s.e}`);
        res.json(user)
    } else {
        console.log(`${c.f.s} Get Failure ${c.f.e}`);
        next(error)
    }
})

//Restricted to admins
//Update User(username)
router.put('/:username', tokenExtractor, isAdmin, userFinder, userPutReqValidator, async (req, res) => {
    try {
        //const userName = req.params.username;
        const user = req.user;
        const updateUser = req.updateUser;
        if(user && updateUser){
            const updatedUser = await updateUser.save();
            console.log(`${c.s.s} ${JSON.stringify(updatedUser, null, 2)} ${c.s.e}`);
            res.json(updatedUser)
        }else{
            console.log(`${c.f.s} Put Failure 1 ${c.f.e}`);
            res.status(401).json({ error })
        }
    } catch(error) {
        console.log(`${c.f.s} Put Failure 2 ${c.f.e}`);
        next(error)
    }
})

//Delete User
router.delete('/:id', tokenExtractor, isAdmin, userFinder, async (req, res, next) => {
    try {
        const deleteUser = req.user;
        await deleteUser.destroy({
              where: { id: deleteUser.id } 
            })
        console.log(`${c.s.s} Success: Auth, Validation, Delete  ${c.s.e}`);
        return res.json(deleteUser); 
    } catch (error) {
        next(error)
    }
})

//Other User related routers
router.use('/login', loginRouter)
router.use('/signup', signupRouter)

//Error handler MW
router.use(errorHandlerMw);

module.exports = router;