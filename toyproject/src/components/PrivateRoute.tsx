import { ReactElement, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSessionContext } from '../context/SessionContext';

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Component Element
  authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반드시 하지 않아야만 접속 가능
}

export default function PrivateRoute({ authentication }: PrivateRouteProps) {
  /**
   * 로그인 했는지 여부
   * 로그인 했을 경우 : true 반환
   * 로그인 안했을 경우 : null or false(로그아웃 버튼 눌렀을경우 false로 설정) 반환
   */

  const { isLoggedIn } = useSessionContext();

  if (authentication) {
    // 인증이 반드시 필요한 페이지

    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
    return isLoggedIn === null || isLoggedIn === false ? (
      <Navigate to='/login' />
    ) : (
      <Outlet />
    );
  } else {
    // 인증이 반드시 필요 없는 페이지

    // 인증을 안햇을 경우 해당 페이지로 인증을 한 상태일 경우 main페이지로
    return isLoggedIn === null || isLoggedIn === false ? (
      <Outlet />
    ) : (
      <Navigate to='/' />
    );
  }
}
