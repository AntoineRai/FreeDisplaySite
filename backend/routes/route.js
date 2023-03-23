const express = require('express');
const router = express.Router();
const posts = require('../services/post');
const comments = require('../services/comment')

/* Route pour le service 'Posts' */
router.get('/getPosts',  async function(req, res, next) {
    try {
      res.json(await posts.getPosts());
    } catch (err) {
      console.error(`Error while getting posts `, err.message);
      next(err);
    }
  });

  router.get('/getPost',  async function(req, res, next) {
    try {
      res.json(await posts.getPost(req.query.id));
    } catch (err) {
      console.error(`Error while getting posts `, err.message);
      next(err);
    }
  });

router.post('/createPost', async function(req, res, next) {
  try {
    res.json(await posts.createPost(req.body))
  } catch (err) {
    console.error(`Error while creating post `, err.message);
    next(err);
  }
})

/* Route pour le service 'Comment' */
router.get('/getComments',  async function(req, res, next) {
    try {
      res.json(await comments.getComments());
    } catch (err) {
      console.error(`Error while getting comments `, err.message);
      next(err);
    }
  });

router.get('/getComment', async function(req, res, next) {
  try {
    res.status(200).json(await comments.getComment(req.query.id));
  } catch (err) {
    console.error(`Error while getting comments `, err.message);
    next(err);
  }
});

router.post('/createComment', async function(req, res, next) {
  try {
    res.json(await comments.createComment(req.body))
  } catch (err) {
    console.error(`Error while creating comment `, err.message);
    next(err);
  }
})

module.exports = router;