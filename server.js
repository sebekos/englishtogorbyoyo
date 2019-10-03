const express = require('express');
const connectDB = require('./config/db');
const axios = require('axios');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// -------------------------------------------------------------
// Schema
// -------------------------------------------------------------
const TextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    translation: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Text = mongoose.model('text', TextSchema);

// -------------------------------------------------------------
// Express routes
// -------------------------------------------------------------
app.post('/api/translate', async (req, res) => {
    const textToTranslate = req.body.translate;

    // Verify text format
    const verifyEnglish = englishVerification(textToTranslate);
    if (verifyEnglish) {
        return res.send({ error: 'Input English string should be all LOWERCASE and have no punctuation' })
    }

    // Get english to Dorbdorb array from API
    const resData = await translateEnglishToDorbdorb(textToTranslate);

    // Translate Dorbdorb to Gorbyoyo
    const gorbArray = translateDorbToGorb(resData.data);

    // Verify Gorbyoyo
    const verifyResponse = await verifyDorb(gorbArray.join(""));

    // If success then save to mongoDB
    if (verifyResponse) {
        try {
            const field = new Text({ text: textToTranslate, translation: gorbArray });
            await field.save();
            res.status(200).send({ translation: gorbArray, text: textToTranslate });
        } catch (err) {
            res.status(500).send({ error: 'MongoDB Error' })
        }
    } else {
        res.send({ error: 'Invalid translation' })
    }
});

app.get('/api/history', async (req, res) => {
    try {
        const text = await Text.find().sort({ $natural: -1 });
        res.json(text);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------
const translateEnglishToDorbdorb = text => {
    return new Promise(async (resolve, reject) => {
        let apiRes = null;
        try {
            apiRes = await axios.post(
                'https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/translateEnglishToAlien',
                { textToTranslate: text },
                { headers: { 'Content-Type': 'application/json' } }
            );
        } catch (err) {
            reject(err);
        } finally {
            resolve(apiRes);
        }
    });
}

const verifyDorb = text => {
    return new Promise(async (resolve, reject) => {
        try {
            await axios.post(
                'https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/confirmtranslation',
                { textToVerify: text },
                { headers: { 'Content-Type': 'application/json' } }
            );
            resolve(true);
        } catch (error) {
            resolve(false);
        }
    });
}

// -------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------
const englishVerification = text => {
    if (text.length < 1 || /[^a-z ]/g.test(text))
        return true;
    return false;
}

const translateDorbToGorb = items => {
    return items.map(item => {
        const char = item.match(/[a-z]/).pop();
        const nums = item.split(char);
        return char + 'yo' + (parseInt(nums[0]) + parseInt(nums[1]));
    });
}

// -------------------------------------------------------------
// App setup
// -------------------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));