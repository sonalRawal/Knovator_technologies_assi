const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {userAuth} = require('../middleware/authenticationMiddleware');
const { body } = require('express-validator');
// Create a post
router.post('/', [
    userAuth,
    body('title').notEmpty(),
    body('body').notEmpty(),
    body('active').isBoolean(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric()
  ], postController.createPost);
  
  // Get all posts created by the authenticated user
  router.get('/', userAuth, postController.getPosts);
  
  // Get a specific post by ID
  router.get('/:id', userAuth, postController.getPostById);
  
  // Update a post
  router.put('/:id', [
    userAuth,
    body('title').notEmpty(),
    body('body').notEmpty(),
    body('active').isBoolean(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric()
  ], postController.updatePost);
  
  // Delete a post
  router.delete('/:id', userAuth, postController.deletePost);
router.get('/nearby', userAuth, postController.getPostsNearby);
router.get('/counts', userAuth, postController.getPostCounts);
module.exports = router;