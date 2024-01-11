import { Route, Routes } from 'react-router-dom';

import BoardList from './component/BoardList';
import BoardInsert from './component/BoardInsert';
import BoardDetail from './component/BoardDetail';
import BoardUpdate from './component/BoardUpdate';

const BoardMain = () =>{
    return(
        <div>
            <h2>Board Main</h2>
            <Routes>
                <Route path='/list' element={<BoardList />} />
                <Route path='/insert' element={<BoardInsert />} />
                <Route path='/detail/:id' element={<BoardDetail />} />
                <Route path='/update/:id' element={<BoardUpdate />} />
                {/* <Route path='/delete/:id' element={<BoardDetail />} /> */}
            </Routes>
        </div>
    )
}

export default BoardMain