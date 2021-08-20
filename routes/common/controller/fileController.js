const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime-types');
const imageSize = require('image-size');
const fileSrc = 'C:/dev/web_files/';

/* Tiny Editor 이미지 업로드 */
router.post('/edit-img/tiny', async (req, res, next) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0) {
            return next({status: 400, message: "파일이 존재하지 않습니다."});
        }
        let file = req.files.file;
        if(file == null) {
            return next({status: 400, message: "file 데이터가 없습니다."});
        }
        if(file.mimetype != 'image/jpeg' && file.mimetype != 'image/png' && file.mimetype != 'image/gif') {
            return next({status: 400, message: ".jpeg, .png, .gif 파일만 업로드 가능합니다."});
        }
        let ext = path.extname(file.name),
            fileNm = path.join('tinyImg' + Date.now() + ext),
            pathNm = fileSrc + fileNm;
        file.mv(pathNm, async (err) => {
            if(err) return next({status: 500, message: err});
            //check file exists
            if(fs.existsSync(pathNm)) {
                res.status(200).json({"location": "/file/edit-img/" + fileNm});
            } else {
                return next({status: 500, message: "파일 업로드 실패하였습니다."});
            }
        });
    } catch(err) {
        next(err);
    }
});

/* Smart Editor2 이미지 업로드 */
router.post('/edit-img/smart', async (req, res, next) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0) {
            return next({status: 400, message: "파일이 존재하지 않습니다."});
        }
        let file = req.files['file[]'];
        if(file == null) {
            return next({status: 400, message: "file[] 데이터가 없습니다."});
        }
        if(file.mimetype != 'image/jpeg' && file.mimetype != 'image/png' && file.mimetype != 'image/gif') {
            return next({status: 400, message: ".jpeg, .png, .gif 파일만 업로드 가능합니다."});
        }
        let ext = path.extname(file.name),
            fileNm = path.join('smartImg' + Date.now() + ext),
            pathNm = fileSrc + fileNm;
        file.mv(pathNm, async (err) => {
            if(err) return next({status: 500, message: err});
            //check file exists
            if(fs.existsSync(pathNm)) {
                let dimensions = imageSize(pathNm);
                res.status(200).json({
                    "files": [{
                        "url": "/file/edit-img/" + fileNm, 
                        "name": file.name,
                        "width": dimensions.width,
                        "height": dimensions.height
                    }]
                });
            } else {
                return next({status: 500, message: "파일 업로드 실패하였습니다."});
            }
        });
    } catch(err) {
        next(err);
    }
});

/* 에디터 이미지 출력 */
router.get('/edit-img/:fileNm', async (req, res, next) => {
    try {
        let fileNm = req.params.fileNm;
        if(fileNm != null){
            var src = path.join(fileSrc, fileNm);
            fs.readFile(src, (error, data) => {
                res.writeHead(200,{'Content-type': mime.lookup(src)});
                res.end(data);
            });
        } else{
            return next({status: 404, message: "출력할 이미지가 없습니다."});
        }
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;