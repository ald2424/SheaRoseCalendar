const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('./routes/api/posts');
//const { json, urlencoded } = require('body-parser');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());


    //any route that goes to api/posts will be directed to posts.js file
app.use('/api/posts', posts);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));



