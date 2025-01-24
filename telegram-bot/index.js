const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = '8191661883:AAEZnLpX6SHVDpyZ09tIXqn6xS3s_9sSTZs';
const GAME_URL = 'http://localhost/ObtainiumLand/index.html';
app.use(bodyParser.json());

app.post(`/webhook/${TELEGRAM_BOT_TOKEN}`, (req, res) => {
    const { message } = req.body;

    if (message && message.text === '/start') {
        const chatId = message.chat.id;
        const gameMessage = {
            chat_id: chatId,
            text: 'Play the game!',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Play Now',
                            url: GAME_URL
                        }
                    ]
                ]
            }
        };

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameMessage)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error sending message:', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(200);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});