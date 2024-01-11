const getPool = require('../common/pool')

// 이곳에 필요한 sql 등록
const sql = {
    boardList: 'SELECT * FROM board' ,
    // 게시물 입력 sql
    insert:'INSERT INTO board (name, title, content) VALUES (?, ?, ?)', 
}

const boardDAO = {
    // 게시물 조회요청이 들어왔을 때 router에 의해 실행 .. dbms
    boardList: async (callback) => {
        let conn = null
        try{
            console.log('00')
            conn = await getPool().getConnection()
            console.log('11') // 실행확인

            const [resp] = await conn.query(sql.boardList,[])

            callback({status: 200, message: 'ok', data: resp})
            console.log('22')

        }catch(error){
            return {status: 500, message: '게시물 조회 실패', error: error}
        }finally{
            if(conn !== null) conn.release()
        }

    },
    insert: async (item, callback) => {
        // item - inset시킬 데이터 받기
        // callback - insert 성공 후 보낼 데이터? 
        // const {name, title, content} = item
        let conn=null
        try{
            console.log('00')
            conn = await getPool().getConnection()
            console.log('11', item)

            // 데이터를 받아온 것을 가져오면 뒤에 작성.
            const [resp] = await conn.query(sql.insert, [item.name, item.title, item.content])
            
            callback({status: 200, message: 'ok', data: resp})
            console.log('22')
        }catch(error){

            // error가 무엇이 뜨는지 확인하는 consloe .
            console.log(error)
            return {status: 500, message: '게시물 등록 실패', error: error}
        }finally{
            if(conn !== null) conn.release()
        }

    }
}

module.exports = boardDAO