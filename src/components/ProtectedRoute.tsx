import { type ReactNode } from 'react'; // 👈 1. Import ReactNode
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 👇 2. Change JSX.Element to ReactNode
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  
  // If no token redirect to login
  if (!token) return <Navigate to="/login" replace />;
  
  return children;
}