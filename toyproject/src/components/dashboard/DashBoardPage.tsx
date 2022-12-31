import React from 'react';
import { SideNavBar } from '../sideNavbar/SideNavBar';
import { DashBoard } from './DashBoard';
import { RightSide } from './RightSide';

export default function DashBoardPage() {
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
