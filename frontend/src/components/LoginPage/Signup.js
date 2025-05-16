import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import chillGuyImage from '../../chillguy.jpg';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'student'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

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
        if (!formData.username || !formData.password || !formData.email) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5002/api/auth/signup', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                userType: 'student'
            });

            console.log('Server response:', response.data); // Debug log

            // Check if we got a successful response
            if (response.data && response.data.success) {
                window.alert('Sign up successful! You will be redirected to login page.');
                navigate('/login');
            } else {
                setError('Unexpected response from server');
            }
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during signup');
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
                <h1 style={headingStyle}>Sign Up</h1>
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
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Enter your email"
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
                    <div style={inputContainerStyle}>
                        <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Confirm your password"
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label htmlFor="userType" style={labelStyle}>User Type</label>
                        <select
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {error && <p style={errorStyle}>{error}</p>}
                    {success && <p style={successStyle}>{success}</p>}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={buttonStyle}
                        type="submit"
                    >
                        Sign Up
                    </motion.button>
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Already have an account? <a href="/login" style={{ color: 'orange', textDecoration: 'none' }}>Login</a>
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

const successStyle = {
    color: '#28a745',
    marginBottom: '20px',
    fontSize: '0.9rem',
    textAlign: 'center',
    backgroundColor: '#d4edda',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #c3e6cb'
};

export default Signup;
