const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5005;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, err => {
    if (err) throw err;
    console.log('Server is running on ' + port);
});

app.post('/payment', (req, res) => {
    if (Object.keys(req.body).length > 1) {
        const body = {
            source: req.body.token.id,
            amount: req.body.amount,
            currency: 'inr',
            description: 'My First Test Charge',
        }
        stripe.charges.create(body, (stripeErr, stripeRes) => {
            if (stripeErr) {
                console.log('500', stripeErr)
                res.status(500).send({ error: stripeErr });
            } else {
                console.log('200', stripeRes)
                res.status(200).send({ success: stripeRes });
            }
        });
    }
});