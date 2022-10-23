const express = require('express');
const cors = require('cors');
const memberRouter = require('./routers/memberRouter');
const app = express();
require('./configs/database');
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('/api/members', memberRouter);
app.listen(8000, () => {
    console.log("hello port 8000");
})