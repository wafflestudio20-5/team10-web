import React from 'react';
import './App.css';
import { SideNavBar } from './components/sideNavbar/SideNavBar';
import { DashBoard } from './components/dashboard/DashBoard';
import { RightSide } from './components/dashboard/RightSide';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './components/auth/SignUpPage';
import LoginPage from './components/auth/LoginPage';
import BoardDetailPage from './components/board/BoardDetailPage';
import BoardNavPage from './components/board/BoardNavPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <div className='wrapper'>
                <SideNavBar />
                <div className='body'>
                  <DashBoard />
                  <RightSide />
                </div>
              </div>
            </>
          }
        ></Route>
        <Route
          path='/login/new'
          element={
            <>
              <SignUpPage></SignUpPage>
            </>
          }
        ></Route>
        <Route
          path='/login'
          element={
            <>
              <LoginPage></LoginPage>
            </>
          }
        ></Route>
        <Route
          path='/:subjectname/boardnav'
          element={
            <>
              <BoardNavPage></BoardNavPage>
            </>
          }
        ></Route>
        <Route
          path='/:subjectname/board'
          element={
            <>
              <BoardDetailPage></BoardDetailPage>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
