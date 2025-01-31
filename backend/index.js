const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectToDB = require('./config/database');
const bodyParser = require('body-parser');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const cors = require('cors');

dotenv.config();
connectToDB()

app.use(bodyParser.json());
app.use(cors())

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.get('/ping', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});