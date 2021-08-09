const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['mapper/post.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertPost = async (conn, postForm) => {
    try {
        let sql = mybatisMapper.getStatement('post', 'insertPost', postForm, sqlFormat);
        console.log(sql);
        let [result] = await conn.execute(sql);
        console.log("Insert ID: " + result.insertId);
        return result.insertId;
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.selectPost = async (conn, postForm) => {
    try {
        let sql = mybatisMapper.getStatement('post', 'selectPost', postForm, sqlFormat);
        console.log(sql);
        let [postInfo] = await conn.query(sql);
        console.log(postInfo);
        return postInfo[0];
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

