import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import chillGuyBg from '../assets/chillguy.jpg';

const Cart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (location.state?.course) {
            setCourse(location.state.course);
        } else {
            navigate('/');
        }
    }, [location, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        if (!formData.name) newErrors.name = 'Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Simulate payment processing
            setPaymentSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            width: '100vw',
            height: 'calc(100vh - 60px)',
            backgroundImage: `url(${chillGuyBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            top: '80px',
            left: 0,
            paddingTop: '40px'
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="cart-container"
                style={{
                    width: '600px',
                    height: '600px',
                    margin: '0 0 0 50px',
                    padding: '35px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    overflowY: 'auto'
                }}
            >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Checkout</h2>

                {/* Course Details */}
                <div className="course-details" style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{course.title}</h3>
                    <p style={{ color: '#666', marginBottom: '8px', fontSize: '0.9rem' }}>{course.description}</p>
                    <p className="price" style={{
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: '#FF8C00'
                    }}>₹{course.price}</p>
                </div>

                {paymentSuccess ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="success-message"
                        style={{
                            textAlign: 'center',
                            padding: '15px',
                            backgroundColor: '#d4edda',
                            borderRadius: '8px',
                            color: '#155724'
                        }}
                    >
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Payment Successful!</h3>
                        <p>Thank you for your purchase. Redirecting to home page...</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Cardholder Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '5px',
                                    border: errors.name ? '1px solid red' : '1px solid #ddd',
                                    fontSize: '0.9rem'
                                }}
                            />
                            {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '5px',
                                    border: errors.cardNumber ? '1px solid red' : '1px solid #ddd',
                                    fontSize: '0.9rem'
                                }}
                            />
                            {errors.cardNumber && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.cardNumber}</span>}
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '5px',
                                        border: errors.expiryDate ? '1px solid red' : '1px solid #ddd',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                {errors.expiryDate && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.expiryDate}</span>}
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '5px',
                                        border: errors.cvv ? '1px solid red' : '1px solid #ddd',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                {errors.cvv && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.cvv}</span>}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#FF8C00',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                marginTop: '15px'
                            }}
                        >
                            Pay ₹{course.price}
                        </motion.button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Cart;
