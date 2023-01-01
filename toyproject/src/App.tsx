import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './components/auth/SignUpPage';
import LoginPage from './components/auth/LoginPage';
import BoardNavPage from './components/board/pages/BoardNavPage';
import AssignmentPage from './components/assignments/AssignmentPage';
import AssignmentDetailsPage from './components/assignments/AssignmentDetailsPage';
import DashBoardPage from './components/dashboard/DashBoardPage';
import QnABoardPage from './components/board/pages/QnABoardPage';
import NoticeBoardPage from './components/board/pages/NoticeBoardPage';

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
          path='/:subjectname/qnaboard'
          element={
            <>
              <QnABoardPage />
            </>
          }
        ></Route>
        <Route
          path='/:subjectname/noticeboard'
          element={
            <>
              <NoticeBoardPage></NoticeBoardPage>
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
