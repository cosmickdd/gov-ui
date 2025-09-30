import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - User:', !!user, 'Loading:', isLoading, 'RequireAuth:', requireAuth);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <LoadingContainer>
        <Spin size="large" tip="Checking authentication..." />
      </LoadingContainer>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !user) {
    console.log('Auth required but no user, redirecting to login');
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access login page
  if (!requireAuth && user) {
    console.log('User authenticated but accessing public route, redirecting to dashboard');
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  console.log('ProtectedRoute allowing access to children');
  return <>{children}</>;
};

export default ProtectedRoute;