const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        completed: Boolean,
    },
})

module.exports = mongoose.model('Task', TaskSchema)