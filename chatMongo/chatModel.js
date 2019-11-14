// chatModel.js
var mongoose = require('mongoose');
// Setup schema
var chatSchema = mongoose.Schema({
	name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Chat model
var Chat = module.exports = mongoose.model('chat', chatSchema);
module.exports.get = function (callback, limit) {
    Chat.find(callback).limit(limit);
}