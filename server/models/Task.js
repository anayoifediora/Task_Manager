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
        enum: ['Todo', 'In Progress', 'Completed']
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
    dueDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

const Task = model('Task', taskSchema);

module.exports = Task;