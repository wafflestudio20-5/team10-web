import React from 'react';
import './App.css';
import { SideNavBar } from './components/sideNavbar/sideNavBar';
import { DashBoard } from './components/dashboard/dashBoard';
import { RightSide } from './components/dashboard/rightSide';

function App() {
  return (
    <>
      <SideNavBar />
      <DashBoard />
      <RightSide />
    </>
  );
}

export default App;
