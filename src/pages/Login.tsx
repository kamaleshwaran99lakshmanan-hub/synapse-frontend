import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import '../App.css';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // TypeScript automatically infers the types for this state based on the initial values (strings)! ✨
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Added React.FormEvent<HTMLFormElement> to properly type the form submission 🛠️
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', form);
      login(data.name, data.access_token);
      navigate('/dashboard');
    } catch (err: any) { // Added 'any' to handle the Axios error response smoothly 🪲
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="login-form">
        
        <div className="form-header">
          <h3>Synapse</h3>
          <h2>Welcome to Synapse</h2>
          <p>Login to continue</p>
        </div>
        
        {error && <p className="error-text">{error}</p>}

        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            // TypeScript knows 'e.target.value' is a string because of the 'type="email"' attribute!
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <Mail className="input-icon" size={18} />
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <Lock className="input-icon" size={18} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="register-link">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}