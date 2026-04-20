import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        {/* LEFT SIDE CONTENT */}
  <div className="auth-left">
    <h1>Make smarter career decisions</h1>
    <p>Evaluate company stability before you join</p>

    {/* Floating Cards */}
    <div className="score-card">
      <span>📈 Stability Score</span>
      <strong>8.2 / 10</strong>
      <div className="tag">Safe</div>
    </div>

    <div className="risk-card">
      <span>⚠️ Layoff Risk</span>
      <strong>LOW</strong>
    </div>
  </div>

    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password (min 8 chars)"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </button>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
    </div>
  );
}