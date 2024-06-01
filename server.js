const express = require('express');
const bodyParser = require('body-parser');
const braintree = require('braintree');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox, // Use Environment.Production for live
    merchantId: 'YOUR_MERCHANT_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
    privateKey: 'YOUR_PRIVATE_KEY'
});

app.get('/client_token', (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response.clientToken);
        }
    });
});

app.post('/checkout', (req, res) => {
    const nonceFromTheClient = req.body.nonce;

    gateway.transaction.sale({
        amount: '10.00', // Replace with the actual amount
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (result.success) {
            res.json({ success: true, transaction: result.transaction });
        } else {
            res.status(500).json({ success: false, error: err });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
