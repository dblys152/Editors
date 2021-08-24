const dbConfig = require('../../../config/dbConn.js');

const postDao = require('../dao/postDao');

exports.insertPost = async (postForm, mbrNo) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        conn.beginTransaction();    //트랜잭션 시작

        postForm.setWrtMbrNo(mbrNo);
        postForm.setRegNo(mbrNo);
        postForm.setModNo(mbrNo);
        let pstNo = await postDao.insertPost(conn, postForm);
        postForm.setPstNo(pstNo);
        await postDao.insertPostContents(conn, postForm);
        if(postForm.tagNm != null && postForm.tagNm != '') {
            let tagList = postForm.tagNm.split(',');
            for(let i = 0; i < tagList.length; i++) {
                postForm.setTagNm(tagList[i].trim());
                postForm.setTagSeq(i+1);
                await postDao.insertPostTag(conn, postForm);
            }
        }

        conn.commit();              //트랜잭션 종료(COMMIT)
        conn.release();             //DB연결 반환
        return pstNo;
    } catch(err) {
        conn.rollback();            //트랜잭션 종료(ROLLBACK)
        conn.release();             //DB연결 반환
        throw err;
    }
};

exports.selectPost = async (pstNo) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        let postInfo = await postDao.selectPost(conn, {"pstNo": pstNo});
        postInfo.tagList = await postDao.selectPostTagList(conn, {"pstNo": pstNo});
        conn.release();             //DB연결 반환
        return postInfo;
    } catch(err) {
        conn.release();             //DB연결 반환
        throw err;
    }
};
