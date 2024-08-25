const express = require('express');
const router = express.Router();

router.get('/bfhl', (req, res) => {
    try {
        res.status(200).json({
            operation_code: 1
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ 
            is_success: false,
            msg: "Server Error" 
        });
    }
});

router.post('/bfhl', async (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            throw new Error('Invalid input: data must be an array');
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highestLowercaseAlphabet = alphabets
            .filter(char => char.length === 1 && char.toLowerCase() === char)
            .sort((a, b) => b.localeCompare(a))
            .slice(0, 1);

        res.status(200).json({
            is_success: true,
            user_id: process.env.USER_ID,
            email: process.env.EMAIL,
            roll_number: process.env.ROLL_NUMBER,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ 
            is_success: false,
            msg: error.message || "Server Eroor"
        });
    }
});

module.exports = router;