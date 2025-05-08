import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        text: "The courses are well-structured and easy to follow. The instructors are knowledgeable and the content is presented in a way that's easy to understand.",
        author: "Siddhath Kumar",
        role: "Computer Science Student"
    },
    {
        id: 2,
        text: "I love the interactive exercises and projects. They help me apply what I learn in real-world scenarios. The community support is excellent!",
        author: "Rajat Singh",
        role: "Web Developer"
    },
    {
        id: 3,
        text: "Great platform for both beginners and advanced learners. The progression from basic to advanced topics is smooth and well-organized.",
        author: "Sachin Aswal",
        role: "Software Engineer"
    },
    {
        id: 4,
        text: "The support from the community is amazing. Whenever I have questions, there's always someone ready to help. The learning experience is top-notch!",
        author: "Disha Sahu",
        role: "Full Stack Developer"
    },
    {
        id: 5,
        text: "The hands-on projects are what make this platform stand out. I've built a portfolio of real applications while learning. Highly recommended!",
        author: "Pragya Dube",
        role: "Frontend Developer"
    },
    {
        id: 6,
        text: "The course structure is perfect for self-paced learning. I can balance my job and studies effectively. The quality of content is exceptional!",
        author: "Sujeet Kumar",
        role: "Data Analyst"
    },
    {
        id: 7,
        text: "The instructors are not just teachers but mentors. They go above and beyond to ensure we understand the concepts thoroughly.",
        author: "Shruti Kumari",
        role: "Backend Developer"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 2500); // Change testimonial every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="testimonials-section"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
                marginTop: "30px",
                backgroundColor: "#f9f9f9",
                padding: "40px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                minHeight: "500px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <motion.h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "40px",
                    textAlign: "center"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                What Our Students Say
            </motion.h1>

            <div style={{
                position: "relative",
                height: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            backgroundColor: "#fff",
                            padding: "30px",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            position: "absolute",
                            width: "80%",
                            maxWidth: "800px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <div style={{
                            fontSize: "1.4rem",
                            lineHeight: "1.6",
                            marginBottom: "20px",
                            color: "#333",
                            maxWidth: "700px"
                        }}>
                            "{testimonials[currentIndex].text}"
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px"
                        }}>
                            <p style={{
                                color: "orange",
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                margin: 0
                            }}>
                                {testimonials[currentIndex].author}
                            </p>
                            <p style={{
                                color: "#666",
                                fontStyle: "italic",
                                margin: 0
                            }}>
                                {testimonials[currentIndex].role}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                gap: "15px"
            }}>
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: currentIndex === index ? "orange" : "#ddd",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            transform: currentIndex === index ? "scale(1.2)" : "scale(1)"
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Testimonials; 