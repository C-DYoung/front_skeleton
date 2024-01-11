import React, { useCallback, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardDetail = () => {
    // const {id} = useParams()
    // const navigate = useNavigate()

    // // 응답 받을 데이터
    // const [board, setBoard] = useState({ status: "", message: "", data: [] })

    // // 데이터 가져오기
    // const getBoard = useCallback = (async () => {
    //     const resp = await axios.get('http://localhost:8000/boards/detail'+id, board)
    //     setBoard(resp.data.data)
    // }, [])

    // useEffect(() => {
    //     // // getBoard()
    //     // const detail = board.boards.find((detail) => detail.id == parseInt(id ? id : "", 10))
    //     // // id를 찾은 경우
    //     // if(detail){
    //     //     setBoard(detail.board ? detail.board : "")
    //     //     getBoard()
    //     // }else{
    //     //     navigate('/boards')
    //     // }

        
    // }, [])

    const navigate = useNavigate()
    // 라우터에의해 내가 출력되었는데.. 출력시킨 path 조건에서 데이터 획득
    // 즉 자신은 board/1 이런 구조의 url에 의해 실행.. 1 값 획득..
    const {id} = useParams();

    // 서버에서 받은 데이터.. 초기값
    const [board, setBoard] = useState({name:"", content:"", title:"", cnt:"", createdAt:""})

    // 서버 연동을 위한 함수.. 어디선가 호출한다.. 
    const getBoardDetail = async() => {
        const resp = await axios.get('http://localhost:8000/boards/board/'+id)
        // 
        setBoard(resp.data.data)
    }

    const deleteBoard = async (id) => {
        // ajax 통신
        // 버튼 클릭시에 호출되어 .. 서버에 매개변수 데이터 삭제되게 요청함.
        // 삭제 후 화면 목록으로 자동전환.
        // const resp = await axios.post('http://localhost:8000/boards/delete/'+id)
        // navigate('/board/list')
        // if (resp.data.status === 500) window.alert('삭제할 수 없습니다.')
        await axios.post('http://localhost:8000/boards/delete/'+id)
        navigate('/board/list')
    }

    // 최초한번 실행
    useEffect(() => {
        getBoardDetail()
    }, [])

    return (
        <main id="main">
            {/* <!-- ======= Intro Single ======= --> */}
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">게시물 상세</h1>
                                <span className="color-text-a"> board</span>
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
                                            {board.title}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>내용</td>
                                        <td>
                                        {board.content}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>작성일</td>
                                        <td>
                                            {board.createdAt}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-end">
                                            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/board/list')}>목록</button>
                                            {/* 살짝 띄우기 위해서 아래 공백추가 */}
                                            {" "}
                                            <button type="button" className="btn btn-warning btn-sm" onClick={() => navigate('/board/update/'+board.id)}>수정</button>
                                            {" "}
                                            <button type="button" className="btn btn-warning btn-sm" onClick={() => deleteBoard(board.id)}>삭제</button>
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

export default BoardDetail
