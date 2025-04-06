//Import all required packages/libraries

//Sets up GraphQL Server
const { ApolloServer } = require('@apollo/server');

//Integrates Apollo with Express
const { expressMiddleware } = require('@apollo/server/express4');

const express = require('express');
const path = require('path');

//Middleware to allow cross-origin requests
const cors = require('cors');

//Middleware to parse incoming JSON data
const bodyParser = require('body-parser');

//GraphQL schema and resolvers
const { typeDefs, resolvers } = require('./schemas');

const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// Use middleware for CORS and body parsing
app.use(cors());

//Parse JSON request bodies
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const server = new ApolloServer({
    typeDefs, //GraphQL schema definition
    resolvers, //Functions to fetch data based on schema
    context: authMiddleware, //Adds authentication data to each request
})

//Upon deployment, serve the built React frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
    //Start Apollo Server
    await server.start(); 
    //Attach GraphQL to Express at '/graphql'
    app.use('/graphql', expressMiddleware(server));

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        })
    })
};

startApolloServer().catch((err) => console.error('Error starting server: ', err));