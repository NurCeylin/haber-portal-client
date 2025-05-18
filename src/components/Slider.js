import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../redux/historySlice';
import './Slider.css'; // özel stil dosyası

const Slider = () => {
  const [news, setNews] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3001/api/news')
      .then(res => setNews(res.data))
      .catch(err => console.error('Haberler alınamadı:', err));
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleClick = (item) => {
    dispatch(addToHistory(item));
    navigate(`/news/${item.slug}`);
  };

  return (
    <>
      <Carousel
        fade
        interval={4000}
        indicators={false}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {news.map(item => (
          <Carousel.Item
            key={item.id}
            onClick={() => handleClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <img
              className="d-block"
              src={`/images/${item.image}`}
              alt={item.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '600px',
                objectFit: 'contain',
                backgroundColor: '#000',
                borderRadius: '6px'
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="custom-indicators mt-2 text-center">
        {news.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${index === idx ? 'active' : ''}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </>
  );
};

export default Slider;
