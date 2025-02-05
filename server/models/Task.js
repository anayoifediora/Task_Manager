const { Schema, model } = require('mongoose');

const taskSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    description: {
        type: String,
        required: true,
        maxLength: 5800,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Todo', 'In Progress', 'Completed']
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
    },
    taskAuthor: {
        type: String,
        required: true,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true,
        get: (date) => { return date.toDateString()}
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return date.toDateString()}
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return date.toDateString()}
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);


const Task = model('Task', taskSchema);

module.exports = Task;