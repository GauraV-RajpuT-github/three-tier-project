import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const BlogsManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Programming'
    });

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:5002/api/blogs');
            // Initialize empty array if response.data is null/undefined
            setBlogs(response.data || []);
        } catch (err) {
            setError('Failed to fetch blogs');
            setBlogs([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            if (editingBlog) {
                await axios.put(`http://localhost:5002/api/blogs/${editingBlog._id}`, formData);
            } else {
                await axios.post('http://localhost:5002/api/blogs', formData);
            }

            fetchBlogs();
            setFormData({ title: '', content: '', category: 'Programming' });
            setEditingBlog(null);
        } catch (err) {
            setError('Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        
        try {
            setLoading(true);
            setError(null);
            await axios.delete(`http://localhost:5002/api/blogs/${id}`);
            fetchBlogs();
        } catch (err) {
            setError('Failed to delete blog');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            category: blog.category
        });
    };

    return (
        <div style={containerStyle}>
            <h2 style={subHeadingStyle}>
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h2>

            {error && (
                <div style={errorStyle}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={inputStyle}
                    >
                        <option value="Programming">Programming</option>
                        <option value="Technology">Technology</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Structures">Data Structures</option>
                        <option value="Algorithms">Algorithms</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div style={formGroupStyle}>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        style={{ ...inputStyle, minHeight: '200px' }}
                    />
                </div>

                <div style={buttonGroupStyle}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        style={submitButtonStyle}
                    >
                        {loading ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}
                    </motion.button>

                    {editingBlog && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => {
                                setEditingBlog(null);
                                setFormData({ title: '', content: '', category: 'Programming' });
                            }}
                            style={cancelButtonStyle}
                        >
                            Cancel
                        </motion.button>
                    )}
                </div>
            </form>

            <h2 style={subHeadingStyle}>Blogs List</h2>

            {loading && <div style={loadingStyle}>Loading...</div>}

            <div style={blogsListStyle}>
                {blogs.map((blog) => (
                    <motion.div
                        key={blog._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={blogCardStyle}
                    >
                        <h3 style={blogTitleStyle}>{blog.title}</h3>
                        <p style={blogCategoryStyle}>{blog.category}</p>
                        <p style={blogContentStyle}>{blog.content}</p>
                        <div style={blogActionsStyle}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(blog)}
                                style={editButtonStyle}
                            >
                                Edit
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(blog._id)}
                                style={deleteButtonStyle}
                            >
                                Delete
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const containerStyle = {
    padding: '20px'
};

const subHeadingStyle = {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#333'
};

const formStyle = {
    marginBottom: '30px'
};

const formGroupStyle = {
    marginBottom: '15px'
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '5px'
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
};

const submitButtonStyle = {
    padding: '10px 20px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
};

const cancelButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
};

const errorStyle = {
    padding: '10px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
    marginBottom: '20px'
};

const loadingStyle = {
    textAlign: 'center',
    padding: '20px',
    color: '#666'
};

const blogsListStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
};

const blogCardStyle = {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff'
};

const blogTitleStyle = {
    fontSize: '1.2rem',
    marginBottom: '5px',
    color: '#333'
};

const blogCategoryStyle = {
    color: '#666',
    marginBottom: '10px'
};

const blogContentStyle = {
    color: '#444',
    marginBottom: '15px',
    lineHeight: '1.4'
};

const blogActionsStyle = {
    display: 'flex',
    gap: '10px'
};

const editButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

const deleteButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default BlogsManagement;
