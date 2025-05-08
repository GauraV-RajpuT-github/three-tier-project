import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const teamMembers = [
        {
            name: "Yash Verma",
            role: "Frontend Developer",
            github: "https://github.com/yashverma",
            email: "yash.verma@example.com",
            linkedin: "https://linkedin.com/in/yashverma",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
            name: "Apoorv Singh",
            role: "Backend Developer",
            github: "https://github.com/apoorv",
            email: "apoorv.singh@example.com",
            linkedin: "https://linkedin.com/in/apoorv",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
            name: "Gaurav Rajput",
            role: "Full Stack Developer",
            github: "https://github.com/gaurav",
            email: "gaurav.rajput@example.com",
            linkedin: "https://linkedin.com/in/gaurav",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
            name: "Nitin Bisht",
            role: "UI/UX Designer",
            github: "https://github.com/nitesh",
            email: "nitesh.singla@example.com",
            linkedin: "https://linkedin.com/in/nitesh",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
            name: "Nitish Singla",
            role: "Backend Developer",
            github: "https://github.com/nitish",
            email: "nitish.singla@example.com",
            linkedin: "https://linkedin.com/in/nitish",
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '80px 20px 20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    color: '#333',
                    marginBottom: '30px',
                    textAlign: 'center'
                }}>Meet Our Team</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    padding: '20px'
                }}>
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease'
                            }}
                            whileHover={{ transform: 'translateY(-5px)' }}
                        >
                            <div style={{
                                height: '250px',
                                backgroundImage: `url(${member.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }} />
                            <div style={{ padding: '25px' }}>
                                <h2 style={{
                                    fontSize: '1.8rem',
                                    marginBottom: '5px',
                                    color: '#333'
                                }}>{member.name}</h2>
                                <p style={{
                                    color: '#FF8C00',
                                    fontSize: '1.1rem',
                                    marginBottom: '15px'
                                }}>{member.role}</p>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    <a href={`mailto:${member.email}`} style={{
                                        color: '#666',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span>📧</span> {member.email}
                                    </a>

                                    <a href={member.github} target="_blank" rel="noopener noreferrer" style={{
                                        color: '#666',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span>🐙</span> GitHub Profile
                                    </a>

                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{
                                        color: '#666',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span>💼</span> LinkedIn Profile
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact; 