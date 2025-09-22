import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloWorld = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMessage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/hello`);
      setMessage(response.data.message);
    } catch (err) {
      setError('Failed to fetch message from backend');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>
        Hello World React + FastAPI
      </h1>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '2rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
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
      </div>

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

