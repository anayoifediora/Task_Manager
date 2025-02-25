const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql') ;
const { signToken } = require('../utils/auth');

const { User, Task } = require('../models');

const resolvers = {

    Query: {

        users: async () => {
            return await User.find().populate('tasks');
        },
        tasks: async () => {
            return await Task.find();
        },
        task: async (parent, { taskId }) => {
            return Task.findOne({ _id: taskId })
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('tasks');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('tasks');
                return userData;
            }
            console.log('Not logged in');
        }
        
    },
    //Set up mutations to handle creating a user, logging a user in, adding, removing and updating a task.
    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new GraphQLError('Incorrect Email or Password!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }
            //Confirm password is correct
            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword) {
                throw new GraphQLError('Incorrect Email or Password!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }
            const token = signToken(user);
            return { token, user };
        },
        addTask: async (parent, { title, description, status, priority, taskAuthor, dueDate, }) => {
            const task = await Task.create({ title, description, status, priority, taskAuthor, dueDate });
                await User.findOneAndUpdate(
                    { username: taskAuthor },
                    { $addToSet: { tasks: task._id }},
                    { runValidators: true, new: true }
                )
            return task;
        },
        removeTask: async (parent, { taskId }) => {
            return Task.findOneAndDelete(
                { _id: taskId }
            );
        },
        updateTask: async (parent, { taskId, title, description, status, priority, dueDate }) => {
            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId },
                { title, description, status, priority, dueDate },
                { new: true }
            );
            return updatedTask;
        }
    }
}

module.exports = resolvers;