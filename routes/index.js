const express = require('express');
const router = express.Router();

const postController = require('./post/controller/postController');
router.use('/', postController);

const fileController = require('./common/controller/fileController');
router.use('/file', fileController);

module.exports = router;
