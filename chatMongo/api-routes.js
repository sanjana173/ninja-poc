// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome to ChatPlat'
    });
});

// Import chat controller
var chatController = require('./chatController');
// Chat routes
router.route('/chats')
    .get(chatController.index)
    .post(chatController.new);
/*router.route('/chats/:chat_id')
    .get(chatController.view)
    .patch(chatController.update)
    .put(chatController.update)
    .delete(chatController.delete);*/
router.route('/chats/:name')
    .get(chatController.view)
    .patch(chatController.update)
    .put(chatController.update)
    .delete(chatController.delete);

// Export API routes
module.exports = router;