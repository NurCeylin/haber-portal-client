import React, { useState } from 'react';
import './AdContainer.css';

const AdContainer = () => {
  const [leftAdVisible, setLeftAdVisible] = useState(true);
  const [rightAdVisible, setRightAdVisible] = useState(true);

  return (
    <>
      {leftAdVisible && (
        <div className="ad-box ad-left">
          <button className="ad-close" onClick={() => setLeftAdVisible(false)}>×</button>
          <a href="https://www.mercedes-benz.com.tr/" target="_blank" rel="noopener noreferrer">
            <img src="/ads/left-ad.jpg" alt="Left Ad" className="ad-img" />
          </a>
        </div>
      )}
      {rightAdVisible && (
        <div className="ad-box ad-right">
          <button className="ad-close" onClick={() => setRightAdVisible(false)}>×</button>
          <a href="https://www.mercedes-benz.com.tr/" target="_blank" rel="noopener noreferrer">
            <img src="/ads/right-ad.jpg" alt="Right Ad" className="ad-img" />
          </a>
        </div>
      )}
    </>
  );
};

export default AdContainer;
