const getPool = require('../common/pool')

// 이곳에 필요한 sql 등록
const sql = {
    boardList: 'SELECT * FROM board' ,
    // 게시물 입력 sql
    insert:'INSERT INTO board (name, title, content) VALUES (?, ?, ?)', 
    // where 조건 필요. -> id 로 조건(primary키이기 때문.)
    board: 'SELECT * FROM board WHERE id = ? ', 
    delete:'DELETE FROM board WHERE id = ?' ,
    update:'UPDATE board SET title = ?, content = ? WHERE id = ?' ,
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

    },
    board: async (item, callback) => {
        // // data가 있어야함. => 몇 번 글인가 알아내기 위하여
        // let conn = null
        // try{
        //     console.log('00')
        //     conn = await getPool().getConnection()
        //     console.log('11', item)

        //     // const [detail] = await conn.query(sql.board, [item])
        //     // console.log('22', detail)


        // }catch(error){
        //     console.log(error)
        //     return {status: 500, message: '게시글 상세보기 실패', error: error}

        // }finally{
        //     if(conn !== null) conn.release()
        // }

        let conn=null
        try{
            conn = await getPool().getConnection()
            // 데이터를 받아온 것을 가져오면 뒤에 작성.
            const [resp] = await conn.query(sql.board, item)
            // where 조건에 의해 디비에서 하나의 row 만 획득 되지만
            // select 문은 항상 여러건의 데이터를 획득할 수 있는 상황이어서 배열로
            // 즉 [{~~~}] dlfjgrp sjadjdhsek
            callback({status: 200, message: 'ok', data: resp[0]})
        }catch(error){

            // error가 무엇이 뜨는지 확인하는 consloe .
            console.log(error)
            return {status: 500, message: '게시물 상세보기 실패', error: error}
        }finally{
            if(conn !== null) conn.release()
        }
    },
    delete: async (item, callback) => {
        // let conn=null
        // try{
        //     conn = await getPool().getConnection()

        //     const [resp] = await conn.query(sql.delete, item)
        //     callback({status: 200, message: 'ok', data: resp[0]})

        // }catch(error){
        //     console.log(error)
        //     return {status: 500, message: '게시물 삭제 실패', error: error}
        // }finally{
        //     if(conn !== null) conn.release()
        // }

        let conn=null
        try{
            conn = await getPool().getConnection()
            // 데이터를 받아온 것을 가져오면 뒤에 작성.
            const [resp] = await conn.query(sql.delete, item) // item - id
            callback({status: 200, message: 'ok'}) // data 전달 굳이x
        }catch(error){
            console.log(error)
            return {status: 500, message: '게시물 상세보기 실패', error: error}
        }finally{
            if(conn !== null) conn.release()
        }
    }, 
    update: async (item, callback) => {
        // let conn=null
        // try{
        //     console.log('update-dao00')
        //     conn = await getPool().getConnection()

        //     // 데이터를 받아온 것을 가져오면 뒤에 작성.
        //     console.log('update-dao11')
        //     const [resp] = await conn.query(sql.update, [item.title, item.content, item.id])
        //     console.log('update-dao22')
        //     callback({status: 200, message: 'ok', data: resp})

        // }catch(error){

        //     // error가 무엇이 뜨는지 확인하는 consloe .
        //     console.log(error)
        //     return {status: 500, message: '게시물 등록 실패', error: error}
        // }finally{
        //     if(conn !== null) conn.release()
        // }
        let conn=null
        try{
            conn = await getPool().getConnection()
            // 데이터를 받아온 것을 가져오면 뒤에 작성.
            const [resp] = await conn.query(sql.update, [item.title, item.content, item.id]) // item - id
            callback({status: 200, message: 'ok'}) // data 전달 굳이x
        }catch(error){
            console.log(error)
            return {status: 500, message: '게시물 입력 실패', error: error}
        }finally{
            if(conn !== null) conn.release()
        }
        
    },
}

module.exports = boardDAO