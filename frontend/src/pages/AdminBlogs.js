import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const AdminBlogs = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        category: 'Web Development',
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
            setFormData(response.data);
        } catch (err) {
            console.error('Error fetching blog:', err);
            setError('Failed to load blog');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await axios.put(`http://localhost:5000/api/blogs/${id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/blogs', formData);
            }
            navigate('/admin/blogs');
        } catch (err) {
            console.error('Error saving blog:', err);
            setError('Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
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
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '20px',
                    color: '#333'
                }}>
                    {isEditMode ? 'Edit Blog' : 'Create New Blog'}
                </h2>

                {error && (
                    <div style={{
                        color: 'red',
                        marginBottom: '20px',
                        padding: '10px',
                        backgroundColor: '#ffebee',
                        borderRadius: '5px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: '#666'
                        }}>
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: '#666'
                        }}>
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                height: '200px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: '#666'
                        }}>
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: '#666'
                        }}>
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="Backend Development">Backend Development</option>
                            <option value="Technology">Technology</option>
                            <option value="Programming">Programming</option>
                            <option value="Data Science">Data Science</option>
                        </select>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: '#666'
                        }}>
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '20px'
                    }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update Blog' : 'Create Blog')}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => navigate('/admin/blogs')}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#666',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Cancel
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminBlogs; 