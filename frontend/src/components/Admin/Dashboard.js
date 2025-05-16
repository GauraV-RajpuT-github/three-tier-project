import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogManagement from './BlogManagement';
import NotesManagement from './NotesManagement';

const Dashboard = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);

    return (
        <div style={{
            display: 'flex',
            minHeight: 'calc(100vh - 80px)',
            backgroundColor: '#f5f5f5'
        }}>
            {/* Sidebar */}
            <div style={{
                width: '250px',
                backgroundColor: '#333',
                color: 'white',
                padding: '20px',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    marginBottom: '30px',
                    color: 'orange',
                    textAlign: 'center'
                }}>
                    Admin Dashboard
                </h2>
                <nav>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                    }}>
                        <li style={{ marginBottom: '15px' }}>
                            <Link
                                to="/admin/dashboard"
                                style={{
                                    color: activeTab === '/admin/dashboard' ? 'orange' : 'white',
                                    textDecoration: 'none',
                                    display: 'block',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    backgroundColor: activeTab === '/admin/dashboard' ? '#444' : 'transparent',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => setActiveTab('/admin/dashboard')}
                            >
                                Overview
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link
                                to="/admin/dashboard/blogs"
                                style={{
                                    color: activeTab === '/admin/dashboard/blogs' ? 'orange' : 'white',
                                    textDecoration: 'none',
                                    display: 'block',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    backgroundColor: activeTab === '/admin/dashboard/blogs' ? '#444' : 'transparent',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => setActiveTab('/admin/dashboard/blogs')}
                            >
                                Blog Management
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link
                                to="/admin/dashboard/notes"
                                style={{
                                    color: activeTab === '/admin/dashboard/notes' ? 'orange' : 'white',
                                    textDecoration: 'none',
                                    display: 'block',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    backgroundColor: activeTab === '/admin/dashboard/notes' ? '#444' : 'transparent',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => setActiveTab('/admin/dashboard/notes')}
                            >
                                Notes Management
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: '20px',
                overflow: 'auto'
            }}>
                <Routes>
                    <Route path="/" element={
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <h2>Admin Overview</h2>
                            <p>Welcome to the admin dashboard. Use the sidebar to navigate to different sections.</p>
                        </motion.div>
                    } />
                    <Route path="/blogs" element={<BlogManagement />} />
                    <Route path="/notes" element={<NotesManagement />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
