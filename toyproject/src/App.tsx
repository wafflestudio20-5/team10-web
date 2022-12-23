import React from 'react';
import './App.css';
import { SideNavBar } from './components/sideNavbar/sideNavBar';
import { DashBoard } from './components/dashboard/dashBoard';
import { RightSide } from './components/dashboard/rightSide';

function App() {
  return (
    <div className='wrapper'>
      <SideNavBar />
      <DashBoard />
      <RightSide />
    </div>
  );
}

export default App;
