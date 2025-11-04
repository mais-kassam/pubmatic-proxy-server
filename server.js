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

// PubMatic API endpoints
const PUBMATIC_SPONSORED_API = 'https://cmpbid.pubmatic.com/convert/sponsored';
const PUBMATIC_ONSITE_API = 'https://cmpbid.pubmatic.com/convert/onsite/multi';

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'PubMatic Proxy Server is running',
        endpoints: {
            health: '/api/health',
            sponsored: '/api/sponsored-products (for Walmart demo)',
            onsite: '/api/onsite-bid (for Uber demo)'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is healthy' });
});

// Endpoint 1: Sponsored Products (for Walmart demo)
app.post('/api/sponsored-products', async (req, res) => {
    try {
        console.log('Received request for SPONSORED products');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const response = await fetch(PUBMATIC_SPONSORED_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error(`PubMatic API returned status: ${response.status}`);
        }

        const data = await response.json();
        console.log('PubMatic sponsored response received successfully');

        res.json(data);
    } catch (error) {
        console.error('Error fetching sponsored products:', error);
        res.status(500).json({
            error: 'Failed to fetch sponsored products',
            message: error.message,
        });
    }
});

// Endpoint 2: Onsite Bid (for Uber demo)
app.post('/api/onsite-bid', async (req, res) => {
    try {
        console.log('Received request for ONSITE bid');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const response = await fetch(PUBMATIC_ONSITE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error(`PubMatic API returned status: ${response.status}`);
        }

        const data = await response.json();
        console.log('PubMatic onsite response received successfully');

        res.json(data);
    } catch (error) {
        console.error('Error fetching onsite bid:', error);
        res.status(500).json({
            error: 'Failed to fetch onsite bid',
            message: error.message,
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Endpoints available:`);
    console.log(`  - POST /api/sponsored-products`);
    console.log(`  - POST /api/onsite-bid`);
});