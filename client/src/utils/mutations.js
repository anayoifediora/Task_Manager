import { gql } from '@apollo/client';

//Mutation to login a user
export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
            _id
            username
            }
        }
    }
`
export const ADD_USER = gql`

    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
            _id
            username
            email
            }
        }
    }

`