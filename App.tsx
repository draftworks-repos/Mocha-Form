import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1C1C1C',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '8px',
            border: '1px solid #333',
          },
          success: {
            iconTheme: {
              primary: '#E23744',
              secondary: '#fff',
            },
            duration: 4000,
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            duration: 5000,
          },
        }}
      />
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;