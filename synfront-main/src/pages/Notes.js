import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        'all',
        'Programming',
        'Data Structures',
        'Algorithms',
        'Web Development',
        'Other'
    ];

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5002/api/notes');
            setNotes(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch notes. Please try again later.');
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (note) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/notes/download/${note._id}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', note.fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError('Failed to download note. Please try again.');
        }
    };

    const filteredNotes = notes.filter(note => {
        const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            note.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Study Notes</h1>

            <div style={filterContainerStyle}>
                <div style={searchContainerStyle}>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={searchInputStyle}
                    />
                </div>

                <div style={categoryFilterStyle}>
                    {categories.map(category => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                ...categoryButtonStyle,
                                backgroundColor: selectedCategory === category ? 'orange' : '#f0f0f0',
                                color: selectedCategory === category ? 'white' : '#333'
                            }}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </motion.button>
                    ))}
                </div>
            </div>

            {error && <div style={errorStyle}>{error}</div>}
            {loading && <div style={loadingStyle}>Loading notes...</div>}

            <div style={notesGridStyle}>
                {filteredNotes.map(note => (
                    <motion.div
                        key={note._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={noteCardStyle}
                    >
                        <div style={noteContentStyle}>
                            <h3 style={noteTitleStyle}>{note.title}</h3>
                            <span style={categoryBadgeStyle}>{note.category}</span>
                            <p style={dateStyle}>
                                {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownload(note)}
                            style={downloadButtonStyle}
                        >
                            Download
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            {!loading && filteredNotes.length === 0 && (
                <div style={noNotesStyle}>
                    No notes found matching your criteria.
                </div>
            )}
        </div>
    );
};

const containerStyle = {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
};

const headingStyle = {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center'
};

const filterContainerStyle = {
    marginBottom: '30px'
};

const searchContainerStyle = {
    marginBottom: '20px'
};

const searchInputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none'
};

const categoryFilterStyle = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '20px'
};

const categoryButtonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease'
};

const notesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
};

const noteCardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
};

const noteContentStyle = {
    marginBottom: '15px'
};

const noteTitleStyle = {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px'
};

const categoryBadgeStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '8px'
};

const dateStyle = {
    fontSize: '0.9rem',
    color: '#888'
};

const downloadButtonStyle = {
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%'
};

const errorStyle = {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
};

const loadingStyle = {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '1.2rem'
};

const noNotesStyle = {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '1.1rem'
};

export default Notes;
