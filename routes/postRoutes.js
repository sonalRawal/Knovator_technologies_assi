const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const { body } = require('express-validator');
// Create a post
router.post('/', [
    authenticationMiddleware,
    body('title').notEmpty(),
    body('body').notEmpty(),
    body('active').isBoolean(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric()
  ], postController.createPost);
  
  // Get all posts created by the authenticated user
  router.get('/', authenticationMiddleware, postController.getPosts);
  
  // Get a specific post by ID
  router.get('/:id', authenticationMiddleware, postController.getPostById);
  
  // Update a post
  router.put('/:id', [
    authenticationMiddleware,
    body('title').notEmpty(),
    body('body').notEmpty(),
    body('active').isBoolean(),
    body('latitude').isNumeric(),
    body('longitude').isNumeric()
  ], postController.updatePost);
  
  // Delete a post
  router.delete('/:id', authenticationMiddleware, postController.deletePost);
router.get('/nearby', authenticationMiddleware, postController.getPostsNearby);
router.get('/counts', authenticationMiddleware, postController.getPostCounts);
module.exports = router;