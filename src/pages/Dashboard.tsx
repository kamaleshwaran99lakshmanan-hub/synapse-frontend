import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { name, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
   <Header 
        name={name || ""}   // 👈 important fix
        onLogout={handleLogout} 
      />
  <section>

  </section>
</>
  );
}