const getPool = require('../common/pool')

// 이곳에 필요한 sql 등록
const sql = {
    boardList: 'SELECT * FROM board' ,
}

const boardDAO = {
    // 게시물 조회요청이 들어왔을 때 router에 의해 실행 .. dbms
    boardList: async (item, callback) => {
        const {name, title, content} = item
        let conn = null
        try{
            console.log('00')
            conn = await getPool().getConnection()
            console.log('11') // 실행확인

            const [resp] = await conn.query(sql.boardList, [item.name, item.title, item.content])
            callback({status: 200, message: 'ok', data: resp})
            console('22')

        }catch(error){
            return {status: 500, message: '게시물 조회 실패', error: error}
        }finally{
            if(conn !== null) conn.release()
        }

    }
}

module.exports = boardDAO