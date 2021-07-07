const express = require('express');
const postdb = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
    postdb.get(req.body)
    .then(post => {
        res.status(201).json(post);
    })
});

router.get('/:id', (req, res) => {
    postdb.getById(req.params.id)
    .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'post not found' });
        }
      })
});

router.delete('/:id', (req, res) => {
    postdb.remove(req.params.id)
    .then(post => {
        if (post) {
          res.status(200).json('post was deleted');
        } else {
          res.status(404).json({ message: 'post not found' });
        }
      })
});

router.put('/:id', (req, res) => {
    postdb.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
  });

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;