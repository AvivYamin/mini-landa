const { isAdmin, userFinder, userPostReqValidator, userPutReqValidator } = require('./UserMw');
const { tokenExtractor, isValidToken } = require('./TokenMw');
const { assetFinder, assetPostReqValidator } = require('./AssetMw');
const { errorHandlerMw } = require('./errorHandlerMw')


module.exports = {
    isAdmin,
    tokenExtractor,
    isValidToken,
    assetFinder,
    assetPostReqValidator,
    userFinder,
    userPostReqValidator,
    userPutReqValidator,
    errorHandlerMw
};