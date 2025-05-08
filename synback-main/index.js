import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.use(cors()); // Enable CORS
app.use(json());

app.get('/', (_req, res) => {
    res.send('Hello, World! Your Node.js backend is running.');
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'This is sample data from your API.' });
});

// Add a login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Simple in-memory check (replace with database check in real application)
    if (username === '123' && password === '123') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});