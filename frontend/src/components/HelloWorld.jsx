import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloWorld = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  // Feature flag states
  const [welcomeMessageEnabled, setWelcomeMessageEnabled] = useState(false);
  const [flagLoading, setFlagLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [welcomeLoading, setWelcomeLoading] = useState(true);

  const API_BASE = 'http://localhost:8000'
  // Fetch feature flags

  const fetchMessage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/hello`);
      console.log('Hello message:', response.data.message);
      setMessage(response.data.message);
    } catch (err) {
      setError('Failed to fetch message from backend');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkWelcomeFeature = async () => {
    setFlagLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/feature-flags/welcome_message/enabled`);
      setWelcomeMessageEnabled(response.data.enabled);
      console.log('Welcome message feature flag status:', response.data.enabled);
    } catch (err) {
      setFlagError('Failed to fetch welcome message feature flag');
      console.error('Error:', err);
    } finally {
      setFlagLoading(false);
    }
  };

  const handleWelcomeUser = async () => {
    if (!userName.trim()) {
      setError('Please enter a name');
      return;
    }

    setWelcomeMessageLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE}/welcome`, { name: userName });
      setWelcomeMessage(response.data.message);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Feature flag "welcome_message" is not enabled');
      } else {
        setError('Failed to fetch welcome message');
        console.error('Error:', err);
      }
    } finally {
      setWelcomeMessageLoading(false);
    }
  }



useEffect(() => {
  fetchMessage();
  checkWelcomeFeature();
}, []);

return (
  <div style={{
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto'
  }}>
    <h1 style={{ color: '#333', marginBottom: '2rem' }}>
      Hello World React + FastAPI with Feature Flags
    </h1>

    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '2rem',
      borderRadius: '8px',
      marginBottom: '2rem'
    }}>
      <h3>Basic Hello Message</h3>
      {loading && <p>Loading message from backend...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && !loading && !error && (
        <p style={{
          fontSize: '1.2rem',
          color: '#2c3e50',
          fontWeight: 'bold'
        }}>
          {message}
        </p>
      )}
    

    <button
      onClick={fetchMessage}
      disabled={loading}
      style={{
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        opacity: loading ? 0.6 : 1
      }}
    >
      {loading ? 'Loading...' : 'Refresh Message'}
    </button>
    </div>

    {/* Feature Flag Controlled Welcome Section */}
    <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '2rem', 
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '2px solid #4CAF50'
      }}>
        <h3>Feature Flag: Welcome Message</h3>
        
        {flagLoading ? (
          <p>Checking feature flag status...</p>
        ) : (
          <div>
            <p style={{ 
              color: welcomeMessageEnabled ? '#4CAF50' : '#f44336',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Status: {welcomeMessageEnabled ? '✅ ENABLED' : '❌ DISABLED'}
            </p>
            
            {welcomeMessageEnabled ? (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      marginRight: '10px',
                      fontSize: '1rem'
                    }}
                  />
                  <button 
                    onClick={handleWelcomeUser}
                    disabled={welcomeLoading || !userName.trim()}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: welcomeLoading ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      opacity: (welcomeLoading || !userName.trim()) ? 0.6 : 1
                    }}
                  >
                    {welcomeLoading ? 'Loading...' : 'Get Welcome Message'}
                  </button>
                </div>
                
                {welcomeMessage && (
                  <div style={{
                    backgroundColor: '#d4edda',
                    padding: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #c3e6cb',
                    marginTop: '1rem'
                  }}>
                    <p style={{ 
                      fontSize: '1.1rem', 
                      color: '#155724',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      {welcomeMessage}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                The welcome message feature is currently disabled.
              </p>
            )}
          </div>
        )}
      </div>
    <div style={{
      marginTop: '2rem',
      fontSize: '0.9rem',
      color: '#666'
    }}>
      <p>Frontend: React with Vite</p>
      <p>Backend: FastAPI</p>
      <p>API Endpoint: http://localhost:8000/hello</p>
    </div>
  </div>
);
};

export default HelloWorld;

