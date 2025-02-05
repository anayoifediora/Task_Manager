const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({

        username: {
            type: String,
            required: true,
            trim: true,
            maxLength: 30,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => { return date.toDateString()}
        },
        tasks: [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
        }]
    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//virtual property "totalTasks" that's computed from tasks
userSchema.virtual('totalTasks')
    .get(function() {
        return this.tasks.length;
    });
//Set up pre-save middleware to hash the password before it's created
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10; 
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

//Compare incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;