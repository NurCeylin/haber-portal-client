import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Menu from './components/Navbar';
import AdContainer from './components/AdContainer';
import Slider from './components/Slider';
import History from './components/History';
import FinanceBar from './components/FinanceBar';
import WeatherBox from './components/WeatherBox';

const NewsDetail = ({ slug }) => (
  <div style={{ padding: '20px 60px' }}>
    <h2>Haber Detayı: {slug}</h2>
    <p>Bu haberin detay içeriği şimdilik örnektir.</p>
  </div>
);

const NewsDetailWrapper = () => {
  const { slug } = useParams();
  return <NewsDetail slug={slug} />;
};

function App() {
  const [adResetKey, setAdResetKey] = useState(0);

  const handleHomeClick = () => {
    setAdResetKey(prev => prev + 1);
  };

  return (
    <Router>
      <Menu onHomeClick={handleHomeClick} />
      <FinanceBar />
      <div className="d-none d-md-block">
        <AdContainer key={adResetKey} />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                maxWidth: '1200px',
                margin: '40px auto',
                padding: '0 20px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px',
              }}
            >
              {/* Slider */}
              <div style={{ width: '660px', minWidth: '320px' }}>
                <Slider />
              </div>

              {/* Görsel + Hava */}
              <div
                style={{
                  width: '400px',
                  minWidth: '280px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <img
                    src="/images/haber_anasayfa.jpg"
                    alt="Haber görseli"
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      maxHeight: '200px'
                    }}
                  />
                  <p
                    style={{
                      marginTop: '8px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center'
                    }}
                  >
                    Dünyanın en zengin kadınları ve servetleri açıklandı
                  </p>
                </div>
                <WeatherBox />
              </div>
            </div>
          }
        />
        <Route path="/news/:slug" element={<NewsDetailWrapper />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
