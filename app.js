const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()



const { getProducts } = require('./mongo');
const { createProduct } = require('./mongoose');

const app = express();

console.log(process.env.MONGO_URL);
app.use(bodyParser.json());

app.post('/products', createProduct);

app.get('/products', getProducts);

app.listen(3000);