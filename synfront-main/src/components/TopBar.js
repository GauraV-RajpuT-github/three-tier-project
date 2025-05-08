import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import chillGuyImage from '../chillguy.jpg';

const TopBar = () => {
  const location = useLocation();
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  };

  return (
    <div>
      <nav style={{
        backgroundColor: '#333',
        padding: '1rem',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <Link to="/" style={{ ...linkStyle, fontSize: '1.5rem', fontWeight: 'bold' }}>
            SyntaxShiksha
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/learn-cpp" style={location.pathname === '/learn-cpp' ? activeLinkStyle : linkStyle} className="nav-link">C++</Link>
            <Link to="/learn-java" style={location.pathname === '/learn-java' ? activeLinkStyle : linkStyle} className="nav-link">Java</Link>
            <Link to="/learn-js" style={location.pathname === '/learn-js' ? activeLinkStyle : linkStyle} className="nav-link">JavaScript</Link>
            <Link to="/learn-python" style={location.pathname === '/learn-python' ? activeLinkStyle : linkStyle} className="nav-link">Python</Link>
            <Link to="/notes" style={location.pathname === '/notes' ? activeLinkStyle : linkStyle} className="nav-link">Notes</Link>
            <Link to="/blogs" style={location.pathname === '/blogs' ? activeLinkStyle : linkStyle} className="nav-link">Blogs</Link>
            <Link to="/contact" style={location.pathname === '/contact' ? activeLinkStyle : linkStyle} className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      <style>
        {`
          .nav-link {
            position: relative;
          }
          .nav-link:hover {
            background-color: rgba(255, 165, 0, 0.2);
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background-color: orange;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          .nav-link:hover::after {
            width: 100%;
          }
          body {
            background-image: url(${chillGuyImage});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 100vh;
            padding-top: 80px;
          }
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.9);
            z-index: -1;
          }
        `}
      </style>
    </div>
  );
};

export default TopBar;
