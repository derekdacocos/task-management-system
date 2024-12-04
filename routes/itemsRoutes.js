const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');


router.get('/', itemsController.getItems);
router.post('/add', itemsController.addItem);
router.get('/add', (req, res) => {
    res.render('addItem');
});
router.get('/edit/:id', itemsController.getEditItem);
router.post('/edit/:id', itemsController.editItem);
router.post('/delete/:id', itemsController.deleteItem);

module.exports = router;
