const express = require('express');
const router = express.Router();

const postService = require('../service/postService');

const { PostForm } = require('../model/postModel');

router.get('/', async (req, res, next) => {
    res.render('front/post/postWrite.ejs');
});

router.post('/post', async (req, res, next) => {
    try {
        let data = req.body;
        let postForm = new PostForm();
        postForm.setPstClNo(1);    //게시글 분류값(임의)
        postForm.setPstTtl(data.pstTtl);
        postForm.setPstCntn(data.pstCntn);
        postForm.setTpcCtgNo(data.tpcCtgNo);
        postForm.setPstDispCd(data.pstDispCd);
        postForm.setCmntYn(data.cmntYn);
        postForm.setRcmYn(data.rcmYn);
        postForm.setTagNm(data.tagNm);
        postForm.setPstStDtt(data.pstStDtt);
        postForm.setTopPstYn(data.topPstYn);
        let mbrNo = 1;  //작성자회원번호(임의)
        let pstNo = await postService.insertPost(postForm, mbrNo);
        res.status(201).json({message:"성공", pstNo: pstNo});
    } catch(err) {
        next(err);
    }
});

router.get('/view/:pstNo', async (req, res, next) => {
    let pstNo = req.params.pstNo;
    if(pstNo == null || pstNo.trim() == "" || isNaN(parseInt(pstNo))) {
        return res.redirect('/common/other?flag=pstNo');
    }
    try {
        let postInfo = await postService.selectPost(pstNo);
        res.render('front/post/postView.ejs', {postInfo});
    } catch(err) {
        next(err);
    }
});

module.exports = router;
