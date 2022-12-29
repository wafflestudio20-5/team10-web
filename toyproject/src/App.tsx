import React from 'react';
import './App.css';
import { SideNavBar } from './components/sideNavbar/SideNavBar';
import { DashBoard } from './components/dashboard/DashBoard';
import { RightSide } from './components/dashboard/RightSide';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Loginpage from './components/LoginPage';

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
              <SignUp></SignUp>
            </>
          }
        ></Route>
        <Route
          path='/login'
          element={
            <>
              <Loginpage></Loginpage>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
