const express = require('express');
const app = express();
const mongoDB = require('./database');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
mongoDB();

const port = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send('hello world');
})

app.use(express.json());

app.use('/api', require('./Routes/userRoutes'));
app.use('/api', require('./Routes/displayData'));
app.use('/api', require('./Routes/ordersRoute'));
app.use('/api/payment', require('./Routes/payment'));

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})