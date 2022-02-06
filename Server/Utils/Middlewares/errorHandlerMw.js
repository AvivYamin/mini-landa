//Error Handler Middleware
module.exports.errorHandlerMw = async (err, req, res, next) => {
    if (err.name === 'SequelizeDatabaseError') {
      return res.status(400).send({ error: 'Invalid ID Format', message: err.message});
    }else if(err.name === 'Error'){
      return res.status(404).send({ error: 'Invalid Entry', message: err.message});
    }
    next(err)
}