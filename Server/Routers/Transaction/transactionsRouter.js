const express = require('express');
const router = express.Router();
const c = require('../../Utils/Helpers/coloredLogs');
//const { Blog, User } = require('../Models');
//const { blogFinder, blogErrorHandler, queryMw, authMw, putReqValid, postReqValid } = require('../utils/middlewares/Blog');
//const { validateReq, idErrorResponse, fieldErrorResponse } = require('../utils/helpers/blog-func');
//const { tokenExtractor, isValidToken } = require('../utils/middlewares/Token');

//Get Users
router.get('/', async (req, res) => {
    try {
        const response = {
            message: "Hello Transactions"
        }
        console.log(`${c.s.s} ${response.message} ${c.s.e}`)
        return res.json(response)
    } catch (error) {
        console.log(`${c.f.s} Get Failure ${c.f.e}`);
        return res.send(error);
    }
})

module.exports = router;