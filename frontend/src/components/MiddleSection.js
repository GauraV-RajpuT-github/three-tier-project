import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MiddleSection = () => {
    return (
        <div style={{ padding: "20px 40px" }}>
            <motion.div
                className="paid-courses-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ marginTop: "50px" }}
            >
                <motion.h1
                    style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "40px", textAlign: "center" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    Premium Courses
                </motion.h1>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "40px",
                    marginTop: "30px"
                }}>
                    <Link to="/learn-mern" style={{ textDecoration: "none" }}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "10px",
                                padding: "30px",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                height: "600px",
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <h2 style={{ fontSize: "2.5rem", color: "#333" }}>MERN</h2>
                                <span style={{ fontSize: "2.5rem" }}>⚛️</span>
                            </div>
                            <img
                                src="https://www.bsitsoftware.com/images/mern/mongodb-BSIT-Software-Services-Web-And-App-Development-Company-In-India.jpg"
                                alt="MERN Stack"
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    marginBottom: "30px"
                                }}
                            />
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "20px",
                                borderRadius: "8px",
                                marginBottom: "30px",
                                flex: "1"
                            }}>
                                <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>What you'll learn:</h3>
                                <ul style={{ paddingLeft: "20px", color: "#666" }}>
                                    <li>MongoDB for Database</li>
                                    <li>Express.js Backend</li>
                                    <li>React Frontend</li>
                                    <li>Node.js Server</li>
                                </ul>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/learn-dsa" style={{ textDecoration: "none" }}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "10px",
                                padding: "30px",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                height: "600px",
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <h2 style={{ fontSize: "2.5rem", color: "#333" }}>DSA</h2>
                                <span style={{ fontSize: "2.5rem" }}>🔍</span>
                            </div>
                            <img
                                src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"
                                alt="DSA"
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    marginBottom: "30px"
                                }}
                            />
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "20px",
                                borderRadius: "8px",
                                marginBottom: "30px",
                                flex: "1"
                            }}>
                                <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>What you'll learn:</h3>
                                <ul style={{ paddingLeft: "20px", color: "#666" }}>
                                    <li>Data Structures</li>
                                    <li>Algorithms & Analysis</li>
                                    <li>Problem Solving</li>
                                    <li>Interview Preparation</li>
                                </ul>
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/learn-data-science" style={{ textDecoration: "none" }}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "10px",
                                padding: "30px",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                height: "600px",
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <h2 style={{ fontSize: "2.5rem", color: "#333" }}>Data Science</h2>
                                <span style={{ fontSize: "2.5rem" }}>📊</span>
                            </div>
                            <img
                                src="https://img.freepik.com/free-vector/tiny-scientists-developing-ai-using-machine-learning-brain-computing-data-flat-vector-illustration-artificial-intelligence-technology-science-concept-banner-website-design-landing-web-page_74855-22578.jpg"
                                alt="Data Science"
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    marginBottom: "30px"
                                }}
                            />
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "20px",
                                borderRadius: "8px",
                                marginBottom: "30px",
                                flex: "1"
                            }}>
                                <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>What you'll learn:</h3>
                                <ul style={{ paddingLeft: "20px", color: "#666" }}>
                                    <li>Machine Learning</li>
                                    <li>Data Analysis</li>
                                    <li>Python & Libraries</li>
                                    <li>Statistical Methods</li>
                                </ul>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default MiddleSection;