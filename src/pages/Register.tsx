import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import '../App.css';
import { User, Mail, Lock } from 'lucide-react'; // Added User icon for the name field! 👤✉️🔒

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Added the React.FormEvent<HTMLFormElement> type for strict TypeScript safety 🛡️
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* We reuse the "login-form" class because the styling is perfectly identical! */}
      <form onSubmit={handleSubmit} className="login-form">
        
        <div className="form-header">
          <h3>Synapse</h3>
          <h2>Join Synapse</h2>
          <p>Create an account to continue</p>
        </div>
        
        {error && <p className="error-text">{error}</p>}

        {/* 👤 Name Input Wrapper */}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <User className="input-icon" size={18} />
        </div>

        {/* ✉️ Email Input Wrapper */}
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <Mail className="input-icon" size={18} />
        </div>

        {/* 🔒 Password Input Wrapper */}
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password (min 8 chars)"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
          <Lock className="input-icon" size={18} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}