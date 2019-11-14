// chatController.js
// Import chat model
Chat = require('./chatModel');

// Handle index actions
exports.index = function (req, res) {
    Chat.get(function (err, chats) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            //status: "success",
            //message: "Chats retrieved successfully",
            data: chats
        });
    });
};

// Handle create chat actions
exports.new = function (req, res) {
    var chat = new Chat();
	chat.name = req.body.name ? req.body.name : chat.name;
    chat.message = req.body.message ? req.body.message : chat.message;
	//chat.name = req.query.name;
	//chat.message = req.query.message;

// save the chat and check for errors
    chat.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New chat created!',
            data: chat
        });
    });
};

// Handle view chat info
exports.view = function (req, res) {
    /*Chat.findById(req.params.chat_id, function (err, chat) {
        if (err)
            res.send(err);
        res.json({
            //message: 'Chat details loading..',
            data: chat
        });
    });*/

    Chat.find({
    name: req.params.name // search query
    }, function (err, chat){
        if (err)
            res.send(err);
        res.json({
            data: chat
        });
    })
};

// Handle update chat info
exports.update = function (req, res) {
Chat.findById(req.params.chat_id, function (err, chat) {
        if (err)
            res.send(err);
chat.message = req.body.message ? req.body.message : chat.message;

// save the chat and check for errors
        chat.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Chat Info updated',
                data: chat
            });
        });
    });
};

// Handle delete chat
exports.delete = function (req, res) {
    Chat.remove({
 //       _id: req.params.name
	name: req.params.name
    }, function (err, chat) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Chat deleted'
        });
    }); 

  /*  Chat.remove({
        _name: req.params.name
    }, function (err, chat) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Chat deleted'
        });
    }); */
};