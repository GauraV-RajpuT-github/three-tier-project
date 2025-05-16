import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const NotesManagement = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingNote, setEditingNote] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Programming',
        pdfFile: null
    });

    // Fetch all notes
    const fetchNotes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:5002/api/notes');
            setNotes(response.data || []);
        } catch (err) {
            setError('Failed to fetch notes');
            setNotes([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleInputChange = (e) => {
        if (e.target.name === 'pdfFile') {
            setFormData({ ...formData, pdfFile: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            if (formData.pdfFile) {
                data.append('file', formData.pdfFile);
            }

            if (editingNote) {
                await axios.put(`http://localhost:5002/api/notes/${editingNote._id}`, data);
            } else {
                await axios.post('http://localhost:5002/api/notes', data);
            }

            fetchNotes();
            setFormData({ title: '', category: 'Programming', pdfFile: null });
            setEditingNote(null);
        } catch (err) {
            setError('Failed to save note');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            setLoading(true);
            setError(null);
            await axios.delete(`http://localhost:5002/api/notes/${id}`);
            fetchNotes();
        } catch (err) {
            setError('Failed to delete note');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/notes/download/${id}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'note.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError('Failed to download note');
        }
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setFormData({
            title: note.title,
            category: note.category,
            pdfFile: null
        });
    };

    return (
        <div style={containerStyle}>
            <h2 style={subHeadingStyle}>
                {editingNote ? 'Edit Note' : 'Upload New Note'}
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
                        <option value="Data Structures">Data Structures</option>
                        <option value="Algorithms">Algorithms</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div style={formGroupStyle}>
                    <label>PDF File:</label>
                    <input
                        type="file"
                        name="pdfFile"
                        onChange={handleInputChange}
                        accept=".pdf"
                        required={!editingNote}
                        style={fileInputStyle}
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
                        {loading ? 'Saving...' : editingNote ? 'Update Note' : 'Upload Note'}
                    </motion.button>

                    {editingNote && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => {
                                setEditingNote(null);
                                setFormData({ title: '', category: 'Programming', pdfFile: null });
                            }}
                            style={cancelButtonStyle}
                        >
                            Cancel
                        </motion.button>
                    )}
                </div>
            </form>

            <h2 style={subHeadingStyle}>Notes List</h2>

            {loading && <div style={loadingStyle}>Loading...</div>}

            <div style={notesListStyle}>
                {notes.map((note) => (
                    <motion.div
                        key={note._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={noteCardStyle}
                    >
                        <h3 style={noteTitleStyle}>{note.title}</h3>
                        <p style={noteCategoryStyle}>{note.category}</p>
                        <div style={noteActionsStyle}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDownload(note._id)}
                                style={downloadButtonStyle}
                            >
                                Download
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(note)}
                                style={editButtonStyle}
                            >
                                Edit
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(note._id)}
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

const fileInputStyle = {
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

const notesListStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
};

const noteCardStyle = {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff'
};

const noteTitleStyle = {
    fontSize: '1.2rem',
    marginBottom: '5px',
    color: '#333'
};

const noteCategoryStyle = {
    color: '#666',
    marginBottom: '10px'
};

const noteActionsStyle = {
    display: 'flex',
    gap: '10px'
};

const downloadButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
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

export default NotesManagement;
