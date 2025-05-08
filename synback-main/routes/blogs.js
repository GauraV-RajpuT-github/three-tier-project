const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single blog
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a blog
router.post('/', async (req, res) => {
    try {
        // Validate required fields
        const { title, content, author, category, date } = req.body;
        if (!title || !content || !author || !category || !date) {
            return res.status(400).json({
                message: 'All fields are required',
                missingFields: {
                    title: !title,
                    content: !content,
                    author: !author,
                    category: !category,
                    date: !date
                }
            });
        }

        const blog = new Blog({
            title,
            content,
            author,
            category,
            date: new Date(date)
        });

        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {})
            });
        }
        res.status(500).json({ message: error.message });
    }
});

// Update a blog
router.put('/:id', async (req, res) => {
    try {
        const { title, content, author, category, date } = req.body;

        // Validate required fields
        if (!title || !content || !author || !category || !date) {
            return res.status(400).json({
                message: 'All fields are required',
                missingFields: {
                    title: !title,
                    content: !content,
                    author: !author,
                    category: !category,
                    date: !date
                }
            });
        }

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.title = title;
        blog.content = content;
        blog.author = author;
        blog.category = category;
        blog.date = new Date(date);

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {})
            });
        }
        res.status(500).json({ message: error.message });
    }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await blog.deleteOne();
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
