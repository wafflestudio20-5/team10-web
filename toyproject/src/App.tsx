import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './components/auth/SignUpPage';
import LoginPage from './components/auth/LoginPage';
import ModulePage from './components/module/ModulePage';
import BoardNavPage from './components/board/pages/BoardNavPage';
import AssignmentPage from './components/assignments/AssignmentPage';
import AssignmentDetailsPage from './components/assignments/AssignmentDetailsPage';
import DashBoardPage from './components/dashboard/DashBoardPage';
import QnABoardPage from './components/board/pages/QnABoardPage';
import NoticeBoardPage from './components/board/pages/NoticeBoardPage';
import NewBoardPage from './components/board/pages/NewBoardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashBoardPage />} />
        <Route path='/login/new' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/:subjectname' element={<ModulePage />} />
        <Route path='/:subjectname/boardnav' element={<BoardNavPage />} />
        <Route path='/:subjectname/qnaboard' element={<QnABoardPage />} />
        <Route path='/:subjectname/noticeboard' element={<NoticeBoardPage />} />
        <Route path='/:subjectname/board/new' element={<NewBoardPage />} />
        <Route path='/:subjectname/assignments' element={<AssignmentPage />} />
        <Route
          path='/:subjectname/assignments/:assignmentID'
          element={<AssignmentDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
