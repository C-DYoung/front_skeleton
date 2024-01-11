import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const BoardList = () => {
    //url path 조정
    const navigate = useNavigate()

    // const [data, setData] = useState({ name: '', title: '', content: '' })
    // const changeData = useCallback((e) => {
    //     setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    // }, [])

    // const boardlist = useCallback(async (e) => {
    //     e.preventDefault()
    //     const resp = await axios.get('http://localhost:8000/boards/boardList', data)
    //     if (resp.data.status === 500) window.alert(resp.data.message)
    //     // else navigate('/')
    // }, [data, navigate])

    
    const [boardList, setBoardList] = useState({
        status: "", message: "", data: []
    })

    const getBoardList = useCallback(async () => {
        const resp = await axios.get('http://localhost:8000/boards/boardList')
        setBoardList(resp.data)
    },[])

    useEffect(() => {
        //서버에서 최초에 한번만 데이터를 받아오면 되지 않을까 싶어서..
        getBoardList()
    }, [getBoardList])

    // ADD 버튼 클릭 이벤트 
    const add = useCallback(async (e) => {
        e.preventDefault()
        navigate('/board/insert')
    }, [navigate])


    return (
        <main id="main">
            {/* <!-- ======= Intro Single ======= --> */}
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">게시물 목록</h1>
                                <span className="color-text-a">board list</span>
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
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>타이틀</th>
                                        <th>이름</th>
                                        <th>작성일</th>
                                        <th>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardList.data.map((board) => (
                                        <tr key={board.id}>
                                            <td>{board.id}</td>
                                            <td>{board.title}</td>
                                            <td>{board.name}</td>
                                            <td>{board.createdAt}</td>
                                            <td>{board.cnt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5} className="text-end">
                                            <button className="btn btn-primary btn-sm" onClick={add}>ADD</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )

}

export default BoardList