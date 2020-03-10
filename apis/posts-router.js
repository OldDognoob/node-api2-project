const express = require("express");

const db = require("../data/db");

//instantiating a pice of express app
const router = express.Router();

//[GET] find()
//We are returning an array of posts that included in the database
router.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(error => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});
module.exports = router;

//[GET]findById()
//We are expecting to return a post with an id parameter from the database.
//If this will not happened then we will get an array of posts with out the id parameter.username
router.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(posts => {
      console.log(posts[0]);
      if (posts) {
        res.status(200).json(posts);
      } else {
        res
          .status(400)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//[GET] findPostComments(): the findPostComments accepts a postId as its first parameter
//and returns all comments on the post associated with the post id.
//We are expecting to return all comments connected to a post with the id.
router.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findPostComments(id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//[POST]
//We create a post using the information provides to us from the req.body
router.post("/", (req, res) => {
  const NewPost = { title: req.body, content: req.body };
  if (!NewPost.title || !NewPost.content) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

//[POST] findById()
//We expecting a created comments with the id provided by the req.body information
router.post("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  db.findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else {
        insertComment({ text, post_id: id }).then(comment => {
          res.status(201).json(comment);
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

//[DELETE]
//The post has been removed
router.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});
