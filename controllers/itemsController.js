const db = require('../models/db');

// Get all items
exports.getItems = (req, res) => {
    db.all('SELECT * FROM items ORDER BY date_created DESC', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.render('index', { items: rows });
        }
    });
};

// Add a new item
exports.addItem = (req, res) => {
    const { name, description } = req.body;
    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.redirect('/');
        }
    });
};

// Get a single item for editing
exports.getEditItem = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.render('editItem', { item: row });
        }
    });
};

// Edit an item
exports.editItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.redirect('/');
        }
    });
};

// Delete an item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.redirect('/');
        }
    });
};
