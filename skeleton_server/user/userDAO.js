const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

const sql = {
    // sql문이 여러개가 들어온다면 관리 차원에 정의해놓고 씀
    // 이메일 중복을 체크하기 위한 sql
    // ? 는 프로그램 데이터가 들어갈 자리임
    checkId: 'SELECT * FROM user WHERE email = ?', // 중복되는지 확인
    signup: 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
}

// DAO(Data Access Object) - dbms(데이터 베이스 연동)처리.
const userDAO = {
    // item - 클라이언트 요청 데이터..
    // callback - dbms가 성공한 후에 호출할 개발자 함수
    signup: async (item, callback) => {
        let conn = null
        try {
            // 정상적으로 실행될 로직
            // pool에서 connection을 획득하고 
            conn = await getPool().getConnection()

            // 디버깅을 위함
            console.log('dao', item)

            // email check sql 실행
            const [respCheck] = await conn.query(sql.checkId, item.email)
            if (respCheck[0]) {
                // 이메일로 select 되는 데이터가 있다면 이미 item.email로 가입된 회원이 있음
                callback({ status: 500, message: '사용자가 존재합니다.' })
            } else {
                // 데이터가 없다면 email 중복되지 않았다는 이야기 
                // 회원가입하게.. table에 insert하면 된다.
                // 유저 password는 hash문자열로 변형시켜서 저장
                const salt = await bcrypt.genSalt()
                bcrypt.hash(item.password, salt, async (error, hash) => {
                    if (error) callback({ status: 500, message: '암호화 실패', error: error })
                    else {
                        // db insert 
                        const [resp] = await conn.query(sql.signup, [item.name, item.email, hash]) // ?의 개수만큼
                        callback({status: 200, message: 'ok', data: resp})
                    }
                })
            }
        } catch (error) {
            // 에러 발생시 실행될 로직
            return {status: 500, message: '유저 입력 실패', error: error}
        } finally {
            // 마지막에 정상 실행되든, 에러가 실행되든, 마지막에 처리할 로직이 있다면
            // 사용했던 connection을 pool에 반환해서 다른곳에서 사용하게.. 
            if(conn !== null) conn.release()
        }
    },
    login: async (item, callback) => {
        // 유저 입력 데이터 획득 
        const {email, password} = item //json 객체라 배열이 아님. 그렇기에 중괄호{}로 받아야함
        let conn=null
        try{
            console.log('00')
            conn = await getPool().getConnection()
            console.log('11') // 실행확인
            //sql 실행 
            const [user] = await conn.query(sql.checkId, [email])
            console.log('22', user) // 안찍히면 sql문 오류
            if(!user[0]) {
                // db에 데이터가 없다는 이야기 .. 유저가 입력한 이메일이 잘못되었다는 이야기
                callback({status:500, message: '아이디, 패스워드를 확인해주세요. '})
            } else{
                // db데이터 있다는 이야기.. 유저 입력 비밀번호와 db에서 뽑은 비밀번호 비교
                console.log('33', password, user[0].password)
                // db에 비밀번호가 해시로 저장되어 있어서
                // 유저입력 비밀번호를 해시로 만들어 비교해야한다
                bcrypt.compare(password, user[0].password, async (error, result)=> {// compare가 비교하는 함수. 
                    if(error) {
                        callback({status:500, message: '아이디, 패스워드를 확인해주세요. '})
                    } else if(result) {
                        console.log("44")
                        callback({status: 200, message: 'ok',
                            data:{name: user[0].name}, email:user[0].email})
                    } else {
                        callback({status:500, message: '아이디, 패스워드를 확인해주세요. '})
                    }
                }) 

            }
        }catch(e){
            return {status: 500, message: 'login 실패', error: error}
        }finally { 
            if(conn !== null) conn.release()
        }
    }
}

module.exports = userDAO