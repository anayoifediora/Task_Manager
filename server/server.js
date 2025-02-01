//Import all required packages/libraries
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// Use middleware for CORS and body parsing
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }

const startApolloServer = async () => {
    await server.start();
    app.use('/graphql', expressMiddleware(server));

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}`);
        })
    })
};

startApolloServer().catch((err) => console.error('Error starting server: ', err));