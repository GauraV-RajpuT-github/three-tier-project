import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Mern = () => {
    const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSyllabus = () => {
        setIsSyllabusOpen(!isSyllabusOpen);
    };

    const handleBuyNow = () => {
        const courseData = {
            id: 'mern-course',
            title: 'MERN Stack Course',
            description: 'Complete MERN Stack Development Course covering MongoDB, Express.js, React, and Node.js',
            price: 599
        };
        navigate('/cart', { state: { course: courseData } });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ textAlign: "center", padding: "20px 20px" }}
        >
            {/* Section 1: Heading and Technologies */}
            <motion.div
                className="course-section"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "20px" }}
            >
                <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>MERN Stack Course</h1>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0" }}>Technologies Covered</h2>
                <ul style={{ listStyleType: "none", padding: 0, fontSize: "1.2rem" }}>
                    <li>MongoDB - NoSQL Database</li>
                    <li>Express.js - Web Application Framework</li>
                    <li>React - Frontend Library</li>
                    <li>Node.js - JavaScript Runtime</li>
                    <li>HTML, CSS, and JavaScript</li>
                    <li>RESTful APIs</li>
                    <li>Authentication and Authorization</li>
                    <li>Deployment and DevOps</li>
                </ul>
            </motion.div>

            {/* Section 2: Syllabus */}
            <motion.div
                className="syllabus-section"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "20px" }}
            >
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0" }}>Syllabus</h2>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSyllabus}
                    style={{ backgroundColor: "black", color: "white", padding: "10px 20px", border: "2px solid orange", borderRadius: "5px", marginBottom: "20px" }}
                >
                    {isSyllabusOpen ? "Hide Syllabus" : "Show Syllabus"}
                </motion.button>
                {isSyllabusOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: "left" }}
                    >
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Month 1</h3>
                        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                            <li>Introduction to Web Development</li>
                            <li>HTML, CSS, and JavaScript Basics</li>
                            <li>Introduction to Node.js and Express.js</li>
                            <li>Setting up MongoDB</li>
                        </ul>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Month 2</h3>
                        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                            <li>Advanced JavaScript</li>
                            <li>Building RESTful APIs with Express.js</li>
                            <li>Frontend Development with React</li>
                            <li>State Management with Redux</li>
                        </ul>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Month 3</h3>
                        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                            <li>Authentication and Authorization</li>
                            <li>Deployment and DevOps</li>
                            <li>Project Work</li>
                            <li>Final Assessment</li>
                        </ul>
                    </motion.div>
                )}
            </motion.div>

            {/* Section 3: Payment */}
            <motion.div
                className="payment-section"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0" }}>Course Price</h2>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FF8C00" }}>Rs599</p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={buttonStyle}
                    onClick={handleBuyNow}
                >
                    Buy Now
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

const buttonStyle = {
    background: "linear-gradient(135deg, #FFA500, #FF8C00)",
    border: "none",
    color: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    transition: "background 0.3s ease",
};

export default Mern;