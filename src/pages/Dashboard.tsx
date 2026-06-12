/*author:kamaleshwaran
  date:2024-06-15
  description:Dashboard page for Synapse application. Displays user-specific data and allows logout.
*/

import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { name, logout } = useAuth();
  const navigate = useNavigate();

  // --- Synapse ML Engine State ---
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // --- API Fetch Function ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Calls your NestJS Gateway
      const response = await fetch(
  `http://localhost:3000/api/prediction/${encodeURIComponent(company)}`
)
      
      if (!response.ok) {
        throw new Error('Failed to fetch data. Please check the company and try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <>
      <div style={{ background: 'radial-gradient(circle at center, #ffffff 0%, #ffffff 100%)', minHeight: '100vh' }}>
        <Header 
          name={name || ""} 
          onLogout={handleLogout} 
        />
        
        <main className="dashboard-container">
          {/* --- HERO SECTION & SEARCH --- */}
          <section className="hero-section">
            <div className="hero-text">
              <h1>Find safe companies to join</h1>
              <p>Real data. Real signals. No guesswork.</p>
            </div>
            <div className="hero-search" style={{ marginTop: '20px' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <input 
                  type="text" 
                  placeholder="Enter Company (e.g., META, AMZN)..." 
                  value={company}
                  onChange={(e) => setCompany(e.target.value.toUpperCase())}
                  style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ccc', width: '300px', fontSize: '16px', textTransform: 'uppercase', color: '#333',
    backgroundColor: '#fff' }}
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    padding: '12px 24px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    backgroundColor: loading ? '#999' : '#000', 
                    color: '#fff', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Analyzing...' : 'Analyze Risk'}
                </button>
              </form>
            </div>
          </section>

          {/* --- ERROR DISPLAY --- */}
          {error && (
            <div style={{ maxWidth: '800px', margin: '0 auto 20px', padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {/* --- ML PREDICTION RESULTS --- */}
          {result && (
            <section style={{ maxWidth: '800px', margin: '0 auto 40px', padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '24px' ,color: '#333'}}>{result.company_name}</h2>
                  <p style={{ margin: '0px 0 0', color: '#666' }}>FY: {result.fiscal_year_analyzed}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h1 style={{ margin: 0, fontSize: '32px', color: result.risk_assessment === 'High Risk' ? '#d32f2f' : '#2e7d32' }}>
                    {(result.layoff_probability * 100).toFixed(1)}%
                  </h1>
                  <span style={{ 
                    display: 'inline-block', padding: '4px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold',
                    backgroundColor: result.risk_assessment === 'High Risk' ? '#ffebee' : '#e8f5e9', 
                    color: result.risk_assessment === 'High Risk' ? '#c62828' : '#2e7d32' 
                  }}>
                    {result.risk_assessment}
                  </span>
                </div>
              </div>

              <div>
                <h4 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>🧠 AI Intelligence Signals</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                    <p
  style={{
    margin: "0 0 8px",
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
  }}
>
  CEO Language Signals
</p>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  }}
>
  {Object.entries(
  (result.intelligence_signals.panic_word_frequencies || {}) as Record<
    string,
    number
  >
).map(([word, count]) => (
  <span
    key={word}
    style={{
      background: "#ffebee",
      color: "#c62828",
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: 600,
    }}
  >
    {word} × {count}
  </span>
))}
</div>

<p
  style={{
    marginTop: "10px",
    fontSize: "13px",
    color: "#666",
  }}
>
  Total occurrences:{" "}
  <strong>
    {result.intelligence_signals.ceo_panic_words}
  </strong>
</p>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Macro Interest Rate</p>
                    <strong style={{ fontSize: '18px', color: '#333' }}>
                      {result.intelligence_signals.fed_interest_rate}%
                    </strong>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>NDX Sector Contagion</p>
                    <strong style={{ fontSize: '18px', color: '#333' }}>
                      {(result.intelligence_signals.nasdaq_trend * 100).toFixed(1)}%
                    </strong>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* --- EXISTING STATIC CONTENT (Hides when a result is shown) --- */}
          {!result && (
            <>
              <section className="companies-split-grid">
                <div className="category-column safe-column">
                  <h2>🛡️ Top Safe Companies</h2>
                  <div className="card feature-card safe-feature"></div>
                  <div className="small-cards-grid">
                    <div className="card small-card"></div>
                    <div className="card small-card"></div>
                  </div>
                </div>
                <div className="category-column volatile-column">
                  <h2>⚠️ Top Volatile Companies</h2>
                  <div className="card feature-card volatile-feature"></div>
                  <div className="small-cards-grid">
                    <div className="card small-card"></div>
                    <div className="card small-card"></div>
                  </div>
                </div>
              </section>

              <section className="comparisons-section">
                <h2>Top Compared Companies</h2>
                <div className="comparisons-grid">
                  <div className="card comparison-card"></div>
                  <div className="card comparison-card"></div>
                  <div className="card add-comparison-card">
                    <button>+ Add Comparison</button>
                  </div>
                </div>
              </section>
            </>
          )}

        </main>
      </div>
    </>
  );
}