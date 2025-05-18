import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const History = () => {
  const history = useSelector(state => state.history);

  return (
    <div className="container mt-4">
      <h2>Son Ziyaret Edilen Haberler</h2>
      {history.length === 0 ? (
        <p>Henüz bir haber görüntülemediniz.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <Link to={`/news/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
