const db = require('../config/connection');
const { User, Task } = require('../models');
const userSeeds = require('./userSeeds.json');
const taskSeeds = require('./taskSeeds.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Task.deleteMany({});

        await User.create(userSeeds);
        await Task.create(taskSeeds);
        

        
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
    console.log('all done!');
        process.exit(0);
})