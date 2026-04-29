/*author:kamaleshwaran
  date:2024-06-15
  description:Dashboard page for Synapse application. Displays user-specific data and allows logout.
*/

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
  <div style={{ background: 'radial-gradient(circle at center, #ffffff 0%, #ffffff 100%)', minHeight: '100vh' }}>
      <Header 
        name={name || ""} 
        onLogout={handleLogout} 
      />
      
      <main className="dashboard-container">
        <section className="hero-section">
          <div className="hero-text">
            <h1>Find safe companies to join</h1>
            <p>Real data. Real signals. No guesswork.</p>
          </div>
          <div className="hero-search">
            <input type="text" placeholder="Search company..." />
          </div>
        </section>
        <section className="companies-split-grid">
          <div className="category-column safe-column">
            <h2>🛡️ Top Safe Companies</h2>
            <div className="card feature-card safe-feature">
            </div>
            <div className="small-cards-grid">
              <div className="card small-card">
              </div>
              <div className="card small-card">
              </div>
            </div>
          </div>
          <div className="category-column volatile-column">
            <h2>⚠️ Top Volatile Companies</h2>
            <div className="card feature-card volatile-feature">
            </div>
            <div className="small-cards-grid">
              <div className="card small-card">
              </div>
              <div className="card small-card">
              </div>
            </div>
          </div>

        </section>
        <section className="comparisons-section">
          <h2>Top Compared Companies</h2>
          
          <div className="comparisons-grid">
            <div className="card comparison-card">
            </div>
            <div className="card comparison-card">
            </div>
            <div className="card add-comparison-card">
               <button>+ Add Comparison</button>
            </div>
          </div>
        </section>
      </main>
      </div>
    </>
  );
}