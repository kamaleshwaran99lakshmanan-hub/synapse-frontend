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
  <div style={{ background: 'radial-gradient(circle at center, #ffffff 0%, #dfeddf 100%)', minHeight: '100vh' }}>
      <Header 
        name={name || ""} 
        onLogout={handleLogout} 
      />
      
      {/* Main Dashboard Container */}
      <main className="dashboard-container">
        
        {/* 1. Title & Search Section */}
        <section className="hero-section">
          <div className="hero-text">
            <h1>Find safe companies to join</h1>
            <p>Real data. Real signals. No guesswork.</p>
          </div>
          <div className="hero-search">
            {/* Search Bar Placeholder */}
            <input type="text" placeholder="Search company..." />
          </div>
        </section>

        {/* 2. Top Companies Split View (Safe vs Volatile) */}
        <section className="companies-split-grid">
          
          {/* LEFT SIDE: Safe Companies */}
          <div className="category-column safe-column">
            <h2>🛡️ Top Safe Companies</h2>
            
            {/* Large Featured Card */}
            <div className="card feature-card safe-feature">
              {/* Infosys Big Card Content will go here */}
            </div>

            {/* Small Cards Grid (2 columns) */}
            <div className="small-cards-grid">
              <div className="card small-card">
                 {/* Infosys Small Card */}
              </div>
              <div className="card small-card">
                 {/* Zoho Small Card */}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Volatile Companies */}
          <div className="category-column volatile-column">
            <h2>⚠️ Top Volatile Companies</h2>
            
            {/* Large Featured Card */}
            <div className="card feature-card volatile-feature">
              {/* Byju's Big Card Content will go here */}
            </div>

            {/* Small Cards Grid (2 columns) */}
            <div className="small-cards-grid">
              <div className="card small-card">
                 {/* Paytm Small Card */}
              </div>
              <div className="card small-card">
                 {/* Zomato Small Card */}
              </div>
            </div>
          </div>

        </section>

        {/* 3. Bottom Row (Comparisons) */}
        <section className="comparisons-section">
          <h2>Top Compared Companies</h2>
          
          <div className="comparisons-grid">
            {/* Comparison Card 1 */}
            <div className="card comparison-card">
               {/* TCS vs Infosys */}
            </div>

            {/* Comparison Card 2 */}
            <div className="card comparison-card">
               {/* Zoho vs Freshworks */}
            </div>

            {/* Add Comparison Button Card */}
            <div className="card add-comparison-card">
               {/* Dashed border card */}
               <button>+ Add Comparison</button>
            </div>
          </div>
        </section>

      </main>
      </div>
    </>
  );
}