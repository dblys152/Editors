const express = require('express');
const router = express.Router();

const postService = require('../service/postService');

const { PostForm } = require('../model/postModel');

router.get('/', async (req, res, next) => {
    res.render('front/post/postWrite.ejs');
});

router.post('/post', async (req, res, next) => {
    let data = req.body;

});

router.get('/view/:pstNo', async (req, res, next) => {
    let pstNo = req.params.pstNo;
    if(pstNo == null || pstNo.trim() == "" || isNaN(parseInt(pstNo))) {
        return res.redirect('/common/other?flag=pstNo');
    }
    try {
        let postInfo = await postService.selectPost(pstNo);
        res.render('front/post/postView.ejs', postInfo);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
