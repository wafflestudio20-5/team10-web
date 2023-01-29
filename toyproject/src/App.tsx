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
import PostEdittingPage from './components/board/postEdit/PostEdittingPage';
import StudentsPage from './components/students/StudentsPage';
import GradesPage from './components/grades/GradesPage';
import BoardDetailPage from './components/board/pages/BoardDetailPage';
import { SessionProvider } from './context/SessionContext';
import KakaoLoginPage from './components/auth/KakaoLoginPage';
import UserPage from './components/user/page/UserPage';
import { SubjectProvider } from './context/SubjectContext';
import SelectSubjectPage from './components/selectSubject/page/SelectSubjectPage';
import DescriptionPage from './components/description/DescriptionPage';
import EvaluationPage from './components/evaluation/pages/EvaluationPage';
import EvaluationDetailPage from './components/evaluation/pages/EvaluationDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <SubjectProvider>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <DashBoardPage />
                </ProtectedRoute>
              }
            />
            <Route path='/login/new' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/:subjectid' element={<ModulePage />} />
            <Route path='/selectsubject' element={<SelectSubjectPage />} />
            <Route path='/:subjectid/boardnav' element={<BoardNavPage />} />
            <Route path='/:subjectid/questions' element={<QnABoardPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route
              path='/:subjectid/questions/:qnaBoardId'
              element={<BoardDetailPage />}
            />
            <Route
              path='/:subjectid/announcements/:noticeBoardId'
              element={<BoardDetailPage />}
            />
            <Route
              path='/:subjectid/announcements'
              element={<NoticeBoardPage />}
            />
            <Route
              path='/:subjectid/questions/new'
              element={<NewBoardPage />}
            />
            <Route
              path='/:subjectid/announcements/new'
              element={<NewBoardPage />}
            />
            <Route
              path='/:subjectid/announcements/:noticeBoardId/edit'
              element={<PostEdittingPage />}
            />
            <Route
              path='/:subjectid/questions/:qnaBoardId/edit'
              element={<PostEdittingPage />}
            />
            <Route path='/:subjectid/students' element={<StudentsPage />} />
            <Route
              path='/:subjectid/assignments'
              element={<AssignmentPage />}
            />
            <Route
              path='/:subjectid/assignments/:assignmentID'
              element={<AssignmentDetailsPage />}
            />
            <Route path='/:subjectid/grades' element={<GradesPage />} />{' '}
            {/*새로고침 완성*/}
            <Route path='/evaluation' element={<EvaluationPage />} />
            <Route
              path='/evaluation/:subjectid'
              element={<EvaluationDetailPage />}
            />
            <Route path='/description' element={<DescriptionPage />} />
            <Route
              path='/authentication/kakao/callback'
              element={<KakaoLoginPage />}
            />
          </Routes>
        </SubjectProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
