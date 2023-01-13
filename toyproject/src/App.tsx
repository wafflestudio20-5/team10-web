import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./components/auth/SignUpPage";
import LoginPage from "./components/auth/LoginPage";
import ModulePage from "./components/module/ModulePage";
import BoardNavPage from "./components/board/pages/BoardNavPage";
import AssignmentPage from "./components/assignments/AssignmentPage";
import AssignmentDetailsPage from "./components/assignments/AssignmentDetailsPage";
import DashBoardPage from "./components/dashboard/DashBoardPage";
import QnABoardPage from "./components/board/pages/QnABoardPage";
import NoticeBoardPage from "./components/board/pages/NoticeBoardPage";
import NewBoardPage from "./components/board/pages/NewBoardPage";
import StudentsPage from "./components/students/StudentsPage";
import GradesPage from "./components/grades/GradesPage";
import { BoardProvider } from "./context/BoardContext";
import BoardDetailPage from "./components/board/pages/BoardDetailPage";
import { SessionProvider } from "./context/SessionContext";
import KakaoLoginPage from "./components/auth/KakaoLoginPage";

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashBoardPage />} />
          <Route path='/login/new' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/:subjectname' element={<ModulePage />} />
          <Route path='/:subjectname/boardnav' element={<BoardNavPage />} />
          <Route path='/:subjectname/qnaboard' element={<QnABoardPage />} />
          {/*이렇게 같은 컴포넌트를 url만 다르게 해서 랜더링 해도 되는 것인가..?*/}
          <Route
            path='/:subjectname/qnaboard/:qnaBoardId'
            element={<BoardDetailPage />}
          />
          <Route
            path='/:subjectname/noticeboard/:noticeBoardId'
            element={<BoardDetailPage />}
          />
          <Route
            path='/:subjectname/noticeboard'
            element={<NoticeBoardPage />}
          />
          <Route
            path='/:subjectname/board/new'
            element={
              <BoardProvider>
                <NewBoardPage />
              </BoardProvider>
            }
          />
          <Route path='/:subjectname/students' element={<StudentsPage />} />{" "}
          <Route
            path='/:subjectname/assignments'
            element={<AssignmentPage />}
          />
          <Route
            path='/:subjectname/assignments/:assignmentID'
            element={<AssignmentDetailsPage />}
          />
          <Route path='/:subjectname/grades' element={<GradesPage />} />{" "}
          <Route path='/kakaoLogin' element={<KakaoLoginPage />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
