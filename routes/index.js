const express = require('express');
const router = express.Router();

const postController = require('./post/controller/postController');
router.use('/', postController);

module.exports = router;
