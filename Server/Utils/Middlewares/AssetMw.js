const { Asset }= require('../../Models');
const { Op } = require('sequelize');
const c = require('../Helpers/coloredLogs');
const { idErrorResponse, fieldErrorResponse, authErrorResponse } = require('../Helpers/errorResponses');
const { intValidator, stringValidator } = require('../Helpers/validators');

//Find Asset(ID) Middleware
module.exports.assetFinder = async (req, res, next) => {
    try {
        console.log(`${c.p.s} Asset ID Request: ${req.params.id} ${c.p.e}`)
        req.asset = await Asset.findOne({
            where: { id: req.params.id }
        })
        if(req.asset){
            next()
        }else{
            console.log(`${c.f.s} Invalid ID ${c.f.e}`)
            next(idErrorResponse())
        }
    } catch (error) {
        next(error);
    }
}

//Validate Asset POST Request Middleware
module.exports.assetPostReqValidator = async (req, res, next) => {
    try {
        newAsset = req.body;
        if(newAsset.address){
            stringValidator('address', newAsset.address);
            if(newAsset.cost){
                intValidator('cost', newAsset.cost);
            }else{
                fieldErrorResponse('cost')
            }
        }else{
            fieldErrorResponse('address')
        }
        req.newAsset = newAsset;
        next()
    } catch (error) {
        next(error);
    }
}