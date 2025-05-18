import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Menu = ({ onHomeClick }) => {
  const history = useSelector(state => state.history);
  const [financeItems, setFinanceItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/finance')
      .then(res => res.json())
      .then(data => setFinanceItems(data))
      .catch(err => console.error('Finance API error:', err));
  }, []);

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto text-dark">
            <Nav.Link as={Link} to="/" className="text-dark fw-bold" onClick={onHomeClick}>
              ANA SAYFA
            </Nav.Link>
            <Nav.Link href="https://www.sozcu.com.tr/son-dakika/" target="_blank" className="text-dark">SON DAKİKA</Nav.Link>
            <Nav.Link href="https://www.sozcu.com.tr/yazarlar" target="_blank" className="text-dark">YAZARLAR</Nav.Link>
            <Nav.Link href="https://www.sozcu.com.tr/gundem" target="_blank" className="text-dark">GÜNDEM</Nav.Link>

            <NavDropdown title="EKONOMİ" id="ekonomi-dropdown" className="text-dark">
              <NavDropdown.Item href="https://www.sozcu.com.tr/ekonomi" target="_blank">Ekonomi Ana Sayfa</NavDropdown.Item>
              <NavDropdown.Item href="https://www.sozcu.com.tr/ekonomi/borsa/" target="_blank">Borsa</NavDropdown.Item>
              <NavDropdown.Item href="https://www.sozcu.com.tr/ekonomi/altin/" target="_blank">Altın</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="https://www.sozcu.com.tr/dunya" target="_blank" className="text-dark">DÜNYA</Nav.Link>
            <Nav.Link href="https://www.sozcu.com.tr/gunun-icinden" target="_blank" className="text-dark">GÜNÜN İÇİNDEN</Nav.Link>

            <NavDropdown title="SPOR" id="spor-dropdown" className="text-dark">
              <NavDropdown.Item href="https://www.sozcu.com.tr/spor" target="_blank">Spor Ana Sayfa</NavDropdown.Item>
              <NavDropdown.Item href="https://www.sozcu.com.tr/spor/futbol/" target="_blank">Futbol</NavDropdown.Item>
              <NavDropdown.Item href="https://www.sozcu.com.tr/spor/basketbol/" target="_blank">Basketbol</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="https://www.sozcu.com.tr/hayat" target="_blank" className="text-dark">HAYAT</Nav.Link>
            <Nav.Link href="https://www.sozcu.com.tr/magazin" target="_blank" className="text-dark">MAGAZİN</Nav.Link>
            <Nav.Link href="https://www.sozcu.com.tr/resmi-ilanlar" target="_blank" className="text-dark">RESMİ İLANLAR</Nav.Link>

            <NavDropdown title="FİNANS" id="finance-dropdown" className="text-dark">
              {financeItems.length === 0 && <NavDropdown.Item>Yükleniyor...</NavDropdown.Item>}
              {financeItems.map((item, index) => (
                <NavDropdown.Item key={index} href="#">
                  {item.name}: {item.value}{' '}
                  <span style={{
                    color:
                      item.change?.startsWith('+') ? 'green' :
                      item.change?.startsWith('-') ? 'red' : 'gray'
                  }}>
                    {item.change?.startsWith('+') && '▲'}
                    {item.change?.startsWith('-') && '▼'}
                    {item.change !== '0' && ` ${item.change}`}
                  </span>
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Geçmiş" id="nav-dropdown-history" className="text-dark">
              {history.length === 0 && <NavDropdown.Item>Henüz ziyaret yok</NavDropdown.Item>}
              {history.map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  href={`/news/${item.slug}`}
                  style={{
                    maxWidth: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={item.title}
                >
                  {item.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
