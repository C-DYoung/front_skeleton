// 이 파일은 dbms를 위한 필요한 connection을 미리 준비하는 파일
// app에서 db와 연동하기 위해서는 db에 connection해야함
// db 내부적으로 connection은 성능상 상당히 부담스럽다.

// 그래서 app에서 db connection을 한정된 갯수내에서만 활용할 수 있게 
// 보통의 경우 connection pool을 운영하고 그 pool의 connection 만을 
// 활용하게하는 것이 일반적임

// mysql 연동 드라이버
const mysql = require('mysql2/promise')

let pool
// 앱에서 dbms 작업이 필요하면 이 함수를 호출하여 
// connection을 얻어서 실행함. 
module.exports = function getPool(){
    if(pool){
        return pool
    }
    // 초기 pool구성 즉, 초기 connection 을 언하는 갯수만큼 만들어서 유지
    const config = {
        host: process.env.DB_URL,
        prot: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 10
    }
    return mysql.createPool(config)
}