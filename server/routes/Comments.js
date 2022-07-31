const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

router.get('/:postId', async (req, res) => {
    // extracting postId from URL
    const postId = req.params.postId;
    // querying to find all comments with same postId
    const comments = await Comments.findAll({
        where: { PostId: postId }
    });
    res.json(comments)
})

router.post('/', async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment)
})

module.exports = router