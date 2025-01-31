const express = require('express');
const authMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

const products = [
    {
        "name": "product1",
        "price": 100
    },
    {
        "name": "product2",
        "price": 200
    },
    {
        "name": "product3",
        "price": 300
    }
]

router.get('/get', authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        data: products
    })
});

module.exports = router;