const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Create a new video
router.post('/videos', async (req, res) => {
  try {
    const { title, youtubeLink } = req.body;
    
    if (!title || !youtubeLink) {
      return res.status(400).json({ error: 'Title and YouTube link are required' });
    }

    const video = new Video({ title, youtubeLink });
    await video.save();
    
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// List all videos
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a video
router.delete('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;