const express = require("express");

const db = require("../data/db");

//instantiating a pice of express app
const router = express.Router();

//[GET]
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

//We are expecting to return all comments connected to a post with the id.
router.get("/api/posts/:id/comments",(req,res)=>{
    const{id}=req.params;
db.findPostComments(id)
.then(comments =>{
    if(comments){
        res.status(200).json(comments);
    }else{
        res.status(404).json({message: "The post with the specified ID does not exist."});
    }
})
.catch(error =>{
    res.status(500).json({error: "The comments information could not be retrieved."});
});
});

//[POST]
