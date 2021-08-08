const dbConfig = require('../../../config/dbConn.js');

const postDao = require('../dao/postDao');

exports.insertPost = async (postForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        conn.beginTransaction();    //트랜잭션 시작

        await postDao.insertPost(conn, postForm);

        conn.commit();              //트랜잭션 종료(COMMIT)
        conn.release();             //DB연결 반환
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
        await postDao.selectPost(conn, {"pstNo": pstNo});
        conn.release();             //DB연결 반환
    } catch(err) {
        conn.release();             //DB연결 반환
        throw err;
    }
};
