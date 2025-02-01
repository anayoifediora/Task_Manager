const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.TOKEN_SECRET
const expiration = '2h';

//This middleware is used to verify the authenticity of the token by the server
//This middleware is then attached to the server file under the ApolloServer as "context"
module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    //This is because we attached "Bearer" to the actual token, but we only need the token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      //This is verifying and decoding the token to find out what's in it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      //Whatever is decoded from the token is assigned to the user here.
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
