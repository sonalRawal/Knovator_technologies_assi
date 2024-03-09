const Post = require('../models/Post');
const { validationResult } = require('express-validator');

module.exports = {
  createPost: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, body, active, latitude, longitude } = req.body;
      const createdBy = req.user._id; // Assuming user ID is stored in req.user after authentication

      const post = new Post({
        title,
        body,
        createdBy,
        active,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      });

      await post.save();
      res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
      next(error);
    }
  },

  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.find({ createdBy: req.user._id });
      res.json(posts);
    } catch (error) {
      next(error);
    }
  },

  getPostById: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      res.json(post);
    } catch (error) {
      next(error);
    }
  },

  updatePost: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, body, active, latitude, longitude } = req.body;
      const updatedPost = {
        title,
        body,
        active,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      };

      const post = await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      res.json({ message: 'Post updated successfully', post });
    } catch (error) {
      next(error);
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
  getPostsNearby: async (req, res, next) => {
    try {
      const { latitude, longitude, radius } = req.query;
      if (!latitude || !longitude || !radius) {
        return res.status(400).json({ message: 'Latitude, longitude, and radius are required' });
      }

      const posts = await Post.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            $maxDistance: parseInt(radius)
          }
        }
      });

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  getPostCounts: async (req, res, next) => {
    try {
      const activeCount = await Post.countDocuments({ active: true, createdBy: req.user._id });
      const inactiveCount = await Post.countDocuments({ active: false, createdBy: req.user._id });

      res.json({ activeCount, inactiveCount });
    } catch (error) {
      next(error);
    }
  }
};