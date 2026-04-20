import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import '../App.css';
import { AlertTriangle, TrendingUp } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', form);
      login(data.name, data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
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
      <span className="card-title"> <TrendingUp size={20} />
       Stability Score
     </span>
      <strong>8.2 / 10</strong>
      <div className="tag">Safe</div>
    </div>

    <div className="risk-card">
     <span className="card-title">
  <AlertTriangle size={18} />
  Layoff Risk
</span>
      <strong>LOW</strong>
    </div>
  </div>

    <form onSubmit={handleSubmit}>
      <h2>Synapse</h2>
      <h2 style={{marginBottom:"0px"}}>Welcome to Synapse</h2>
      <p style={{marginTop:"0px"}}>Login to continue</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Login'}
      </button>

      <p>No account? <Link to="/register">Register</Link></p>
    </form>
    </div>
  );
}