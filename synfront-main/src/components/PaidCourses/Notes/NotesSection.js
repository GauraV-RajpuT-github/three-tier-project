import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesSection = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/notes');
            setNotes(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch notes');
            setLoading(false);
        }
    };

    const downloadNote = async (noteId, title) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/notes/download/${noteId}`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading note:', err);
            alert('Failed to download note');
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px 20px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Notes Section</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
                {notes.map((note) => (
                    <div key={note._id} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{note.title}</h2>
                        <button
                            onClick={() => downloadNote(note._id, note.title)}
                            style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', border: '2px solid orange', borderRadius: '5px', marginTop: '10px' }}
                        >
                            Download PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesSection;