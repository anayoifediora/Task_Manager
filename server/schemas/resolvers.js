const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql') ;
const { signToken } = require('../utils/auth');

const { User, Task } = require('../models');

const resolvers = {

    Query: {

        users: async () => {
            return await User.find().populate('tasks');
        },
        //Return all tasks marked "completed"
        completedTasks: async (parent, { taskAuthor }) => {
            return await Task.find({ $and: [{ taskAuthor }, {status: "Completed"}] }).sort({ createdAt: -1 });
        },
        //Fetches a single task
        task: async (parent, { taskId }) => {
            return Task.findOne({ _id: taskId })
        },
        // Request to GET a single user, including the associated tasks not completed, sorted by "newest first".
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate({
                path: "tasks",
                match: { status: ["Todo", "In Progress"]},
                options: { sort: { createdAt: -1 }}
            })
        },
        //Request to GET a loggedin User
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('tasks');
                return userData;
            }
            console.log('Not logged in');
        },
        
    },
    //Set up mutations to handle creating a user, logging a user in, adding, removing and updating a task.
    Mutation: {
        //Registers a new user 
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);

            return { token, user };
        },
        //Logs in a user by checking email and password
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
        //Creates a new task and updates the task's author to include the task in their list
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
        updateTask: async (parent, { taskId, title, description, status, priority, dueDate, updatedAt }) => {
            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId },
                { title, description, status, priority, dueDate, updatedAt },
                { new: true }
            );
            return updatedTask;
        },
        markComplete: async (parent, { taskId, status, updatedAt}) => {
            const completedTask = await Task.findOneAndUpdate(
                { _id: taskId },
                { status, updatedAt },
                { new: true }
            );
            return completedTask;
        } 
    }
}

module.exports = resolvers;