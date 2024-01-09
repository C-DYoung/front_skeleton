import { Routes, Route } from 'react-router-dom';

import Header from './home/component/Header';
import Footer from './home/component/Footer';
import HomeMain from './home/HomeMain';

const App = () => {
  return(
    <div>
      {/* Header, Footer 가 전체화면에서 항상 고정으로 나온다면 아래처럼
        각 화면별로 Header, Footer가 상이하게 적용된다면 Route 되는 Component 내에..
      */}
      <Header />
      {/* 각 화면이 라우딩 되게 등록...
        각 업무의 첫 화면만 등록하고 그 안에서의 화면전환은 중첩 라우팅으로 처리..
        즉 xxxMain만 이곳에서 등록하고 xxx 업무에 의한 화면 라우팅은 xxxMain 에 명시
      */}
      <Routes>
        <Route path='/' element={<HomeMain />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App 