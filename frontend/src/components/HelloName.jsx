import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloName = () => {

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [welcomeLoading, setWelcomeLoading] = useState(true);
  const [welcomeMessageEnabled, setWelcomeMessageEnabled] = useState(false);
  const [flagLoading, setFlagLoading] = useState(true);

  const API_BASE = 'http://localhost:8000'

  const [userName, setUserName] = useState('');
  

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

    console.log('Handling welcome user:', userName);
    if (!userName.trim()) {
      setError('Please enter a name');
      return;
    }

    setWelcomeLoading(true);
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
      setWelcomeLoading(false);
    }
  }

  useEffect(() => {
    checkWelcomeFeature();
  }, []);
  



  return (
    <div style={{ 
      backgroundColor: '#e8f5e8', 
      padding: '2rem', 
      borderRadius: '8px',
      marginBottom: '2rem',
      border: '2px solid #4CAF50'
    }}>
      <h3 style={{ color: '#2c3e50' }}>Feature Flag: Welcome Message</h3>
      
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
                {console.log('Welcome loading:', welcomeLoading)}
                <button 
                  onClick={handleWelcomeUser}
                  // disabled={welcomeLoading || !userName.trim()}
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
  );
};
export default HelloName;

