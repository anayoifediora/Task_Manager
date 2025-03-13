const { ApolloServer } = require('@apollo/server');

const typeDefs = `
    type User {
        _id: ID,
        username: String!,
        email: String!,
        password: String!,
        createdAt: String,
        tasks: [Task],
        totalTasks: Int,
    }
    
    type Task {
        _id: ID,
        title: String,
        description: String,
        status: String,
        priority: String,
        taskAuthor: String!,
        dueDate: String,
        createdAt: String,
        updatedAt: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        completedTasks(taskAuthor: String): [Task]
        user(username: String!): User
        task(taskId: ID!): Task
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addTask(title: String!, description: String!, status: String!, priority: String!, taskAuthor: String!, dueDate: String): Task
        removeTask(taskId: ID!): Task
        updateTask(taskId: ID!, title: String!, description: String!, status: String!, priority: String!, dueDate: String!, updatedAt: String): Task
        markComplete(taskId: ID!, status: String, updatedAt: String): Task
    }

`;

module.exports = typeDefs;