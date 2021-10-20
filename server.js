const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

dotEnv.config();

const app = express();

//db connectivity
dbConnection();

//config cors the third party middlware 
app.use(cors());

//request payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//create a route to handle userSingup API
app.use('/api/user', require('./routes/userRoutes'));

const PORT = process.env.PORT ||  3000;

app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`);
});

//error handling error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
     status: 500,
     message: err.message,
     body:{}
    });
})