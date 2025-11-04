// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - allow your GitHub Pages domain
app.use(cors({
    origin: [
        'https://mais-kassam.github.io',  // REPLACE with your actual GitHub Pages URL
        'http://localhost:3000',           // For local testing
        'http://127.0.0.1:3000',           // For local testing
        'http://localhost:3001',           // For local testing
        'http://127.0.0.1:3001',           // For local testing
        'http://localhost:3002',           // For local testing
        'http://127.0.0.1:3002'            // For local testing
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Add security headers
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "frame-src 'self' https://*.pubmatic.com https://commercecdn.pubmatic.com;");
    next();
});

// PubMatic API endpoint
const PUBMATIC_API_URL = 'https://cmpbid.pubmatic.com/convert/sponsored';

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'PubMatic Proxy Server is running',
        endpoints: {
            health: '/api/health',
            sponsored: '/api/sponsored-products'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is healthy' });
});

// Proxy endpoint for PubMatic sponsored products
app.post('/api/sponsored-products', async (req, res) => {
    try {
        console.log('Received request for sponsored products');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        // Make request to PubMatic API
        const response = await fetch(PUBMATIC_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`PubMatic API returned status: ${response.status}`);
        }

        // Parse and return the response
        const data = await response.json();
        console.log('PubMatic response received successfully');

        res.json(data);
    } catch (error) {
        console.error('Error fetching sponsored products:', error);
        res.status(500).json({
            error: 'Failed to fetch sponsored products',
            message: error.message,
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: /api/sponsored-products`);
});
