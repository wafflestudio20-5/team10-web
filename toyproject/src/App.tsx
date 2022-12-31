import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './components/auth/SignUpPage';
import LoginPage from './components/auth/LoginPage';
import BoardDetailPage from './components/board/BoardDetailPage';
import BoardNavPage from './components/board/BoardNavPage';
import AssignmentPage from './components/assignments/AssignmentPage';
import AssignmentDetailsPage from './components/assignments/AssignmentDetailsPage';
import DashBoardPage from './components/dashboard/DashBoardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <DashBoardPage></DashBoardPage>
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
        <Route
          path='/:subjectname/assignments'
          element={
            <>
              <AssignmentPage></AssignmentPage>
            </>
          }
        ></Route>
        <Route
          path='/:subjectname/assignments/:assignmentID'
          element={
            <>
              <AssignmentDetailsPage></AssignmentDetailsPage>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
