import React, { useEffect, useState } from 'react';
import './FinanceBar.css';

const FinanceBar = () => {
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/finance`)
      .then((res) => res.json())
      .then((data) => setFinanceData(data))
      .catch((err) => console.error('Finance API error:', err));
  }, []);

  return (
    <div className="finance-bar">
      <div className="finance-items">
        {financeData.map((item, index) => (
          <div key={index} className="finance-item">
            <strong>{item.name}</strong>: {item.value}{' '}
            <span
              className={
                item.change?.startsWith('+')
                  ? 'finance-up'
                  : item.change?.startsWith('-')
                  ? 'finance-down'
                  : 'finance-neutral'
              }
            >
              {item.change?.startsWith('+') && '▲'}
              {item.change?.startsWith('-') && '▼'}
              {item.change !== '0' && ` ${item.change}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceBar;
