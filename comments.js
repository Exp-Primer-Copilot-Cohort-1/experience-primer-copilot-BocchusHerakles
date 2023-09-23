// Create web server application 
// to handle comments data

const express = require('express');
const router = express.Router();
const fs = require('fs');

// Get comments
router.get('/', (req, res) => {
    const comments = fs.readFileSync('./data/comments.json');
    res.send(JSON.parse(comments));
});

// Get comment by id
router.get('/:id', (req, res) => {
    const comments = fs.readFileSync('./data/comments.json');
    const commentsArray = JSON.parse(comments);
    const comment = commentsArray.filter(comment => comment.id === parseInt(req.params.id));
    if (comment.length === 0) res.status(404).send('Comment not found');
    res.send(comment[0]);
});

// Add comment
router.post('/', (req, res) => {
    const comments = fs.readFileSync('./data/comments.json');
    const commentsArray = JSON.parse(comments);
    const newComment = {
        id: commentsArray.length + 1,
        name: req.body.name,
        email: req.body.email,
        body: req.body.body
    };
    commentsArray.push(newComment);
    fs.writeFileSync('./data/comments.json', JSON.stringify(commentsArray));
    res.send(newComment);
});

// Update comment
router.put('/:id', (req, res) => {
    const comments = fs.readFileSync('./data/comments.json');
    const commentsArray = JSON.parse(comments);
    const comment = commentsArray.filter(comment => comment.id === parseInt(req.params.id));
    if (comment.length === 0) res.status(404).send('Comment not found');
    comment[0].name = req.body.name;
    comment[0].email = req.body.email;
    comment[0].body = req.body.body;
    fs.writeFileSync('./data/comments.json', JSON.stringify(commentsArray));
    res.send(comment[0]);
});

// Delete comment
router.delete('/:id', (req, res) => {
    const comments = fs.readFileSync('./data/comments.json');
    const commentsArray = JSON.parse(comments);
    const comment = commentsArray.filter(comment => comment.id === parseInt(req.params.id));
    if (comment.length === 0) res.status(404).send('Comment not found');
    const index = commentsArray.indexOf(comment[0]);
    commentsArray.splice(index, 1);
    fs.writeFileSync('./data/comments.json', JSON.stringify(commentsArray));
    res.send(comment[0]);
});

module.exports = router;

