import React from 'react';
import './App.css';
import { SideNavBar } from './components/sideNavbar/SideNavBar';
import { DashBoard } from './components/dashboard/DashBoard';
import { RightSide } from './components/dashboard/RightSide';

function App() {
  return (
    <div className='wrapper'>
      <SideNavBar />
      <div className='body'>
        <DashBoard />
        <RightSide />
      </div>
    </div>
  );
}

export default App;
