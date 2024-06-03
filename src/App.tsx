
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Main from './layout/rootLayout';

import ModalRegister from './component/auth/FormRegister';
import ModalLogin from '../src/component/auth/FormLogin';
import DetailThread from './component/home/detailThread';
import Search from './component/serch'
import ProfilePages from './pages/profilePages';
import Follow from './pages/follow';
import ProfilePagesById from './pages/profileByid';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=
            {<Main>
              <Home />
            </Main>} />
          <Route path='/profile/:id' element={<Main> <ProfilePagesById /></Main>} />

          <Route path='/login' element={<ModalLogin />} />
          <Route path='/register' element={< ModalRegister />} />
          <Route path="detail/:threadId" element={<Main> <DetailThread /> </Main>} />
          <Route path="/search" element=
            {<Main>
              <Search />
            </Main>} />
          <Route path="/profile" element=
            {<Main>
              <ProfilePages />
            </Main>} />

          <Route path="/follow" element=
            {<Main>
              <Follow />
            </Main>} />


        </Routes>
      </BrowserRouter>
    </>
  );
}




export default App;
