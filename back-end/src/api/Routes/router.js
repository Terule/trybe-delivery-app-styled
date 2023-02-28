const express = require('express')


const router = express.Router();

router.use('/login', loginRouter)

module.exports = router;