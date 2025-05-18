import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../redux/historySlice';
import './Slider.css';

const Slider = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news`);
        setNews(res.data);
      } catch (err) {
        console.error('Haberler alınamadı:', err);
      }
    };
    fetchNews();
  }, []);

  const handleClick = (item) => {
    dispatch(addToHistory(item));
    navigate(`/news/${item.slug}`);
  };

  return (
    <Carousel fade interval={4000} indicators className="custom-slider">
      {news.map((item) => (
        <Carousel.Item
          key={item.id}
          onClick={() => handleClick(item)}
          style={{ cursor: 'pointer' }}
        >
          <img
            className="d-block slider-image"
            src={`/images/${item.image}`}
            alt={item.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
