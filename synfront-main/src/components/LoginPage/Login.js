import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import chillGuyImage from '../../chillguy.jpg';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.username || !formData.password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5002/api/auth/login', {
                username: formData.username,
                password: formData.password,
                userType: 'student'
            });

            // Store user data in context
            login({
                username: formData.username,
                userType: 'student',
                email: response.data.email
            });

            navigate('/');
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during login');
            }
        }
    };

    return (
        <div style={containerStyle}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={formContainerStyle}
            >
                <h1 style={headingStyle}>Student Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={inputContainerStyle}>
                        <label htmlFor="username" style={labelStyle}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div style={inputContainerStyle}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <p style={errorStyle}>{error}</p>}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={buttonStyle}
                        type="submit"
                    >
                        Login
                    </motion.button>
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    <div style={{ marginBottom: '10px' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'orange', textDecoration: 'none' }}>Sign up</Link>
                    </div>
                    <Link to="/admin-login" style={{ color: 'orange', textDecoration: 'none' }}>
                        Login as Admin
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${chillGuyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px'
};

const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    backdropFilter: 'blur(5px)',
    marginLeft: '100px'
};

const headingStyle = {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center'
};

const inputContainerStyle = {
    marginBottom: '20px'
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontSize: '0.9rem'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
};

const buttonStyle = {
    backgroundColor: 'orange',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold'
};

const errorStyle = {
    color: '#dc3545',
    marginBottom: '20px',
    fontSize: '0.9rem',
    textAlign: 'center'
};

export default Login;