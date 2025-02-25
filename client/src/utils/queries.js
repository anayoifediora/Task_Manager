import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
    query Query($username: String!) {
        user(username: $username) {
            email
            _id
            totalTasks
            tasks {
                title
                status
                priority
                dueDate
                createdAt
                _id
            }
        }
    }

`

export const QUERY_SINGLE_TASK = gql`
    query Query($taskId: ID!) {
        task(taskId: $taskId) {
            title
            taskAuthor
            updatedAt
            status
            priority
            dueDate
            description
            createdAt
            _id
        }
    }

`