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
//Mutation to create a task
export const ADD_TASK = gql`

        mutation Mutation($title: String!, $description: String!, $status: String!, $priority: String!, $taskAuthor: String!, $dueDate: String!) {
            addTask(title: $title, description: $description, status: $status, priority: $priority, taskAuthor: $taskAuthor, dueDate: $dueDate) {
                updatedAt
                title
                taskAuthor
                status
                priority
                dueDate
                description
                createdAt
                _id
            }
    }
`
//Mutation to delete a task
export const DELETE_TASK = gql`
    mutation RemoveTask($taskId: ID!) {
        removeTask(taskId: $taskId) {
            title
            description
            _id
            taskAuthor
            status
            priority
            dueDate
            updatedAt
            createdAt
        }
    }
`
//Mutation to update a task
export const UPDATE_TASK = gql`
    mutation Mutation($taskId: ID!, $title: String!, $description: String!, $status: String!, $priority: String!, $dueDate: String!) {
        updateTask(taskId: $taskId, title: $title, description: $description, status: $status, priority: $priority, dueDate: $dueDate) {
            title
            description
            _id
            createdAt
            dueDate
            priority
            status
            taskAuthor
            updatedAt
        }
    }
`