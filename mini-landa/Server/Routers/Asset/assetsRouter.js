const express = require('express');
const router = express.Router();
const c = require('../../Utils/Helpers/coloredLogs');
const { Asset, User } = require('../../Models');
const { tokenExtractor, isValidToken, isAdmin, assetFinder, assetPostReqValidator, errorHandlerMw } = require('../../Utils/Middlewares')

//Get Assets(All)
router.get('/', async (req, res) => {
    try {
        const assets = await Asset.findAll({})
        console.log(`${c.s.s} ${JSON.stringify(assets, null, 2)} ${c.s.e}`)
        return res.json(assets)
    } catch (error) {
        console.log(`${c.f.s} Get Failure ${c.f.e}`);
        return res.send(error);
    }
})

//Get Asset(ID)
router.get('/:id', assetFinder, async (req, res, next) => {
    const asset = req.asset;
    return res.json(asset)
})

//Restricted to Admin 
//Request Validation Implemented
//Post Asset
router.post('/add-asset', tokenExtractor, isValidToken, isAdmin, assetPostReqValidator, async (req, res, next) => {
    try {
        //const user = req.user;
        const asset = req.newAsset;
        //const newAsset = await Blog.create({...asset, userId: user.id});
        const newAsset = await Asset.create(asset);
        console.log(`${c.s.s} Success: Auth, Validation, Save ${c.s.e}`);
        return res.json(newAsset);
    } catch (error) {
      return res.status(400).json({error: [error.message]})
    }
})

//Error handler MW
router.use(errorHandlerMw);

module.exports = router;