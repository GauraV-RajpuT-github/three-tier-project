import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedBlogId, setExpandedBlogId] = useState(null);

    // Pre-made blogs data
    const preMadeBlogs = [
        {
            _id: 'premade-1',
            title: "Getting Started with React",
            content: "React is a popular JavaScript library for building user interfaces. In this blog, we'll explore the basics of React components, state management, and hooks. Learn how to create your first React application and understand the core concepts that make React so powerful.",
            author: "John Doe",
            date: "2024-03-15",
            category: "Web Development"
        },
        {
            _id: 'premade-2',
            title: "Understanding Node.js Backend Development",
            content: "Node.js has revolutionized backend development with its event-driven architecture. This blog post covers the fundamentals of Node.js, Express.js framework, and how to build robust RESTful APIs. We'll also discuss best practices for error handling and security.",
            author: "Jane Smith",
            date: "2024-03-20",
            category: "Backend Development"
        },
        {
            _id: 'premade-3',
            title: "The Future of AI in Software Development",
            content: "Artificial Intelligence is transforming the way we develop software. From automated code generation to intelligent debugging tools, AI is making developers more productive. This blog explores current AI tools in development and what the future might hold.",
            author: "Alex Johnson",
            date: "2024-03-25",
            category: "Technology"
        }
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/blogs');
                // Combine fetched blogs with pre-made blogs
                const combinedBlogs = [...response.data, ...preMadeBlogs];
                setBlogs(combinedBlogs);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to load blogs from server. Showing pre-made blogs instead.');
                setBlogs(preMadeBlogs); // Fallback to pre-made blogs
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const toggleBlog = (blogId, e) => {
        e.stopPropagation(); // Prevent event bubbling
        setExpandedBlogId(blogId === expandedBlogId ? null : blogId);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '20px',
                color: 'red'
            }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: 'white', // Greyish-black background
            minHeight: '100vh', // Full height of the viewport
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                backgroundColor: 'white', // Keep the main content white
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        marginBottom: '30px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        filter: expandedBlogId ? 'blur(4px)' : 'none',
                        transition: 'filter 0.3s ease'
                    }}
                >
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '20px',
                        color: '#333'
                    }}>
                        Latest Blog Posts
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {blogs.map((blog) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    padding: '20px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    overflow: 'hidden'
                                }}
                                onClick={(e) => toggleBlog(blog._id, e)}
                            >
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '10px',
                                    color: '#333'
                                }}>
                                    {blog.title}
                                </h3>

                                <motion.p
                                    style={{
                                        color: '#666',
                                        marginBottom: '15px',
                                        lineHeight: '1.6',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {blog.content}
                                </motion.p>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',
                                    borderTop: '1px solid #eee',
                                    paddingTop: '10px'
                                }}>
                                    <p style={{
                                        color: '#888',
                                        fontSize: '0.9rem',
                                        margin: '5px 0'
                                    }}>
                                        By {blog.author}
                                    </p>
                                    <p style={{
                                        color: '#888',
                                        fontSize: '0.9rem',
                                        margin: '5px 0'
                                    }}>
                                        {new Date(blog.date).toLocaleDateString()}
                                    </p>
                                    <span style={{
                                        backgroundColor: '#f0f0f0',
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        fontSize: '0.8rem',
                                        color: '#666',
                                        alignSelf: 'flex-start'
                                    }}>
                                        {blog.category}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <AnimatePresence>
                    {expandedBlogId && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    zIndex: 999,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        width: '80%',
                                        maxWidth: '800px',
                                        maxHeight: '80vh',
                                        backgroundColor: 'white',
                                        borderRadius: '15px',
                                        padding: '30px',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                        zIndex: 1000,
                                        overflow: 'auto',
                                        position: 'relative'
                                    }}
                                >
                                    <button
                                        onClick={(e) => toggleBlog(expandedBlogId, e)}
                                        style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            fontSize: '24px',
                                            cursor: 'pointer',
                                            color: '#666',
                                            padding: '5px'
                                        }}
                                    >
                                        ×
                                    </button>

                                    {blogs.find(blog => blog._id === expandedBlogId) && (
                                        <>
                                            <h2 style={{
                                                fontSize: '2rem',
                                                marginBottom: '20px',
                                                color: '#333',
                                                paddingRight: '40px'
                                            }}>
                                                {blogs.find(blog => blog._id === expandedBlogId).title}
                                            </h2>
                                            <p style={{
                                                color: '#666',
                                                lineHeight: '1.8',
                                                whiteSpace: 'pre-wrap',
                                                fontSize: '1.1rem',
                                                marginBottom: '20px'
                                            }}>
                                                {blogs.find(blog => blog._id === expandedBlogId).content}
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px',
                                                borderTop: '1px solid #eee',
                                                paddingTop: '15px'
                                            }}>
                                                <p style={{
                                                    color: '#888',
                                                    fontSize: '0.9rem',
                                                    margin: '5px 0'
                                                }}>
                                                    By {blogs.find(blog => blog._id === expandedBlogId).author}
                                                </p>
                                                <p style={{
                                                    color: '#888',
                                                    fontSize: '0.9rem',
                                                    margin: '5px 0'
                                                }}>
                                                    {new Date(blogs.find(blog => blog._id === expandedBlogId).date).toLocaleDateString()}
                                                </p>
                                                <span style={{
                                                    backgroundColor: '#f0f0f0',
                                                    padding: '5px 10px',
                                                    borderRadius: '15px',
                                                    fontSize: '0.8rem',
                                                    color: '#666',
                                                    alignSelf: 'flex-start'
                                                }}>
                                                    {blogs.find(blog => blog._id === expandedBlogId).category}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Blogs;
