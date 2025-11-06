// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    background: '#0f172a',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(2,6,23,0.12)'
  };
  const brandStyle = { color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 18 };
  const linksStyle = { display: 'flex', gap: 12, alignItems: 'center' };
  const linkStyle = { color: '#e6eef8', textDecoration: 'none', padding: '8px 10px', borderRadius: 6 };

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>My Company</Link>
      <div style={linksStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}
