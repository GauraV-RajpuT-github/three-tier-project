import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BlogManagement = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        category: 'Web Development',
        date: new Date().toISOString().split('T')[0]
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/blogs');
            setBlogs(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError('Failed to fetch blogs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Format the data before sending
            const blogData = {
                title: formData.title,
                content: formData.content,
                author: formData.author,
                category: formData.category,
                date: formData.date
            };

            if (editingId) {
                await axios.put(`http://localhost:5000/api/blogs/${editingId}`, blogData);
            } else {
                await axios.post('http://localhost:5000/api/blogs', blogData);
            }

            // Reset form
            setFormData({
                title: '',
                content: '',
                author: '',
                category: 'Web Development',
                date: new Date().toISOString().split('T')[0]
            });
            setEditingId(null);
            await fetchBlogs();
            setError(null);
        } catch (err) {
            console.error('Error saving blog:', err);
            setError(err.response?.data?.message || 'Failed to save blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (blog) => {
        setFormData({
            title: blog.title,
            content: blog.content,
            author: blog.author,
            category: blog.category,
            date: blog.date
        });
        setEditingId(blog._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                setLoading(true);
                await axios.delete(`http://localhost:5000/api/blogs/${id}`);
                await fetchBlogs();
                setError(null);
            } catch (err) {
                console.error('Error deleting blog:', err);
                setError('Failed to delete blog. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '20px'
                }}
            >
                <h2 style={{ marginBottom: '20px', color: '#333' }}>
                    {editingId ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                {error && (
                    <div style={{
                        backgroundColor: '#ffebee',
                        color: '#c62828',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '20px'
                    }}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="5"
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '16px',
                                resize: 'vertical'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '16px',
                                backgroundColor: 'white'
                            }}
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="Backend Development">Backend Development</option>
                            <option value="Frontend Development">Frontend Development</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Blockchain">Blockchain</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            width: '100%'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
                    </motion.button>
                </form>
            </motion.div>

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
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Manage Blogs</h2>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading blogs...</div>
                ) : blogs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        No blogs found. Create your first blog!
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {blogs.map(blog => (
                            <motion.div
                                key={blog._id}
                                whileHover={{ scale: 1.02 }}
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                <h3 style={{ marginBottom: '10px', color: '#333' }}>{blog.title}</h3>
                                <p style={{ color: '#666', marginBottom: '10px' }}>{blog.content.substring(0, 100)}...</p>
                                <div style={{ color: '#888', fontSize: '14px', marginBottom: '15px' }}>
                                    <div>Author: {blog.author}</div>
                                    <div>Category: {blog.category}</div>
                                    <div>Date: {new Date(blog.date).toLocaleDateString()}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleEdit(blog)}
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Edit
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDelete(blog._id)}
                                        style={{
                                            backgroundColor: '#f44336',
                                            color: 'white',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Delete
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default BlogManagement; 