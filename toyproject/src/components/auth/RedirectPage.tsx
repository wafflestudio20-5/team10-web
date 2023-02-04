import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '../../context/SessionContext';

export default function RedirectPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useSessionContext();
  useEffect(() => {
    navigate('/login');
    setIsLoggedIn(false);
    localStorage.removeItem('refresh');
  });
  return <div>loading</div>;
}
