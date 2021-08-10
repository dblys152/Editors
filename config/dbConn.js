const mysql = require('mysql2/promise');
require('dotenv').config({ path : ".env.development" });  //env 환경변수 사용 모듈

const db_info = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NM,
    multipleStatements: true,
    connectionLimit: 10
};

const pool = mysql.createPool(db_info);

const getMysqlConn = async () => { 
    try {
        const conn = await pool.getConnection(async conn => conn);
        return conn;
    } catch(err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    getMysqlConn
};
