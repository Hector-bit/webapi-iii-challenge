const express = require('express');
const userdb = require('./userDb');
const router = express.Router();

//custom middleware

function validateUserId(req, res, next) {
    if (!req.body.id) {
        res.status(400).json({ message: "missing user" });
      } 
      next();
};

function validateUser(req, res, next) {
    console.log("validateUser", req.body);
    if (!req.body) {
      res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
    }
    next();
  }

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing post data" });
      } else if (!req.body.name) {
        res.status(400).json({ message: "missing required text field" });
      }
      next();
};

router.post('/', validateUser, (req, res) => {
    // console.log("router.post", req.body);

    // const user = req.body;

    userdb.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error adding the user'} )
    })
});

router.post('/:id/posts', validatePost, (req, res) => {
    userdb.insert(req.body)
    .then(newPost => {
        res.status(200).json(newPost)
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({ error: "the users post was not added"})
    })
});

router.get('/', (req, res) => {
    userdb.get(req.body)
    .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'post not found' });
        }
      })
});

router.get('/:id', (req, res) => {
    userdb.getById(req.params.id)
    .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'post not found' });
        }
      })
});

router.get('/:id/posts', (req, res) => {
    userdb.getUserPosts(req.params.id)
    .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'post not found' });
        }
      })
});

router.delete('/:id', (req, res) => {
    userdb.remove(req.params.id)
    .then(user => {
        if (user) {
          res.status(200).json('user was deleted');
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      })
});

router.put('/:id', (req, res) => {

});

module.exports = router;
