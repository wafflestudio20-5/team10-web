import React from "react";
import { useSessionContext } from "../context/SessionContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useSessionContext();

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }
  return <>{children}</>;
}
