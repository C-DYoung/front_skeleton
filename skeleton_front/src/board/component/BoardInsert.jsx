import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

const BoardInsert = () => {
    const navigate = useNavigate()

    // 유효입력데이터
    const [data, setData] = useState({ name: '', title: '', content: '' });

    const changeData = useCallback((e) => {
        console.log('11')
        setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }, [])

    const insert = useCallback(async (e) => {
        console.log('00')
        e.preventDefault()
        const resp = await axios.post('http://localhost:8000/board/insert')
        console.log('33')
        if (resp.data.status === 500) window.alert(resp.data.message)
        else {
            console.log('22')
            setData(resp.data)
            navigate('/board/list')
        }
    }, [data, navigate])

    const cancel = useCallback(async (e) => {
        e.preventDefault()
        navigate('/board/list')
    }, [navigate])

    return (
        <main id="main">
            {/* <!-- ======= Intro Single ======= --> */}
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">게시물 입력</h1>
                                <span className="color-text-a">Insert</span>
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
                                        <td>이름</td>
                                        <td>
                                            <input type="text" className="form-control" name='name'
                                                value={data.name} onChange={changeData} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>타이틀</td>
                                        <td>
                                            <input type="text" className="form-control" name="title"
                                                value={data.title} onChange={changeData} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>내용</td>
                                        <td>
                                            <textarea cols="80" rows="10" name="content" className="form-control"
                                                value={data.content} onChange={changeData}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-end">
                                            <button type="button" className="btn btn-primary btn-sm" onClick={cancel}>취소</button>
                                            {/* 살짝 띄우기 위해서 아래 공백추가 */}
                                            {" "}
                                            <button type="button" className="btn btn-warning btn-sm" onClick={insert}>입력</button>
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

export default BoardInsert