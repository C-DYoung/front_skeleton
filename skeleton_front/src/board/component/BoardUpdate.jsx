import axios from 'axios'
import React, {useCallback, useState, useEffect}  from 'react'
import {useNavigate, useParams}  from 'react-router-dom'

const BoardUpdate = () => {
    // constrolled component 처리
    // 컴포넌트가 나오자 마자 .. 서버에서 데이터 획득..
    // 획득한 데이터가 화면에 출력되고 유저가 수정
    // 즉 서버연동이 2번 발생 -> 과거 데이터가 있음 => 그것을 수정
    // BoardDetail 참고하여 작성할 것 

    // const navigate = useNavigate();

    // const {id} = useParams();
    // const [boardUpdate, setBoardUpdate] = useState([])

    // const changeData = useCallback((e) => {
    //     setBoardUpdate((boardUpdate) => ({ ...boardUpdate, [e.target.name]: e.target.value }))
    // }, [boardUpdate])

    // const getBoardUpdate = async() => {
    //     const resp = await axios.post('http://localhost:8000/boards/update', boardUpdate)

    // }

    // useEffect(() => {
    //     getBoardUpdate()
    // }, [])

    const navigate = useNavigate();
    const { id } = useParams();

    const [board, setBoard] = useState({ id: "", name: "", email: "", title: "", content: "" });

    const changeData = (e) => {
        setBoard({ ...board, [e.target.name]: e.target.value })
    }

    // 화면에 찍기위한 데이터부터 획득
    const getData = async () => {
        // 화면에 찍기 위한 데이터라 get으로 받음
        // url 잘 확인 하기 ... ㅎㅎ 
        const resp = await axios.get('http://localhost:8000/boards/board/' + id)
        setBoard(resp.data.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const updateBoard = async (e) => {
        await axios.post('http://localhost:8000/boards/update/', board)
        navigate('/board/list')
    }

    return (
        <main id="main">
            {/* <!-- ======= Intro Single ======= --> */}
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">게시물 수정</h1>
                                <span className="color-text-a">Update</span>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Properties Grid
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Intro Single--> */}

            <section className="property-grid grid">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>타이틀</td>
                                        <td>
                                            <input type="text" className="form-control" name="title"
                                                value={board.title} onChange={changeData} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>내용</td>
                                        <td>
                                            <textarea cols="80" rows="10" name="content" className="form-control"
                                                value={board.content} onChange={changeData}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-end">
                                            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/board/list')}>취소</button>
                                            {/* 살짝 띄우기 위해서 아래 공백추가 */}
                                            {" "}
                                            <button type="button" className="btn btn-warning btn-sm" onClick={updateBoard}>수정</button>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default BoardUpdate