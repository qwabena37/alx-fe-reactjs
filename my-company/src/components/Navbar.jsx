import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#ffcc00' : 'white',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background 0.3s',
  });

  return (
    <nav
      style={{
        backgroundColor: '#222',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '25px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Link to="/" style={linkStyle('/')}>Home</Link>
      <Link to="/about" style={linkStyle('/about')}>About</Link>
      <Link to="/services" style={linkStyle('/services')}>Services</Link>
      <Link to="/contact" style={linkStyle('/contact')}>Contact</Link>
    </nav>
  );
}

export default Navbar;
