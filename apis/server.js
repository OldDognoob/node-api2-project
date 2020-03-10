//import express app and cors
const express = require('express');
const cors = require("cors");
const postsRouter = require('./posts-router')

//initiate the app
const app = express();

//configure app to responses & enable CORS
app.use(cors());

//opt-in to body-parsing enabling express
app.use(express.json());

//we connect the router using .use
app.use(postsRouter)

module.exports =app

