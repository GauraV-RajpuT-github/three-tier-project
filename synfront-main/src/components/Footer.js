import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: '40px 20px',
            marginTop: '40px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
            }}>
                {/* Contact Information */}
                <div>
                    <h3 style={{ color: 'orange', marginBottom: '20px' }}>Contact Us</h3>
                    <div style={{ lineHeight: '1.8' }}>
                        <p><strong>Email:</strong> info@SyntaxShiksha.com</p>
                        <p><strong>Phone:</strong> +91 1234567890</p>
                        <p><strong>Address:</strong> A-111 , Cybercity , Gurgaon , Haryana, 123456</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 style={{ color: 'orange', marginBottom: '20px' }}>Quick Links</h3>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
                        <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
                        <li><Link to="/courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</Link></li>
                        <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link></li>
                        <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 style={{ color: 'orange', marginBottom: '20px' }}>Follow Us</h3>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        marginTop: '10px'
                    }}>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'white',
                                fontSize: '28px',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none',
                                display: 'inline-block',
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                lineHeight: '40px'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#E1306C'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'white',
                                fontSize: '28px',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none',
                                display: 'inline-block',
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                lineHeight: '40px'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#333'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                        >
                            <i className="fab fa-github"></i>
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'white',
                                fontSize: '28px',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none',
                                display: 'inline-block',
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                lineHeight: '40px'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#1877F2'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 style={{ color: 'orange', marginBottom: '20px' }}>Newsletter</h3>
                    <p style={{ marginBottom: '15px' }}>Subscribe to our newsletter for updates</p>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                padding: '10px',
                                border: 'none',
                                borderRadius: '4px 0 0 4px',
                                flex: 1
                            }}
                        />
                        <button style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '0 4px 4px 0',
                            cursor: 'pointer'
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div style={{
                textAlign: 'center',
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <p>&copy; {new Date().getFullYear()} SyntaxShiksha. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 