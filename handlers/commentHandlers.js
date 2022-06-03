const Comment = require("../models/Comment.js")
const {User} = require("../models/User.js")
const {validationResult} = require("express-validator")

const addComment = (user, newComment,res) => {
  newComment
  .save(err => {
    if(err) console.log(err)
    else {
      user.comments.push(newComment._id)
      user
      .save(error=>{
        if(error) console.log(err)
        res.send(newComment)
      })
    }
  })
}

const addNewUserandAddComment = (newUser, newComment, res) => {
  newUser.save(err => {
    if(err) console.log(err)
    else {
      addComment(newUser, newComment, res)
    }
  })
}

exports.postComment = (req, res) => {
  let valCommentError = (validationResult(req)).array()

  if(valCommentError.length != 0){
    let err_mess = []
    valCommentError.forEach(err=>{
        err_mess.push(err.msg)
    })
    res.send(err_mess)
  }else{
    let new_comment = new Comment({
      date: req.body.date,
      text: req.body.text,
      username: req.body.nickname
    })
  
    User
    .findOne({email:req.body.email})
    .exec()
    .then(user => {
      if(user != null){
        addComment(user, new_comment, res)
      }else{
        let newUser = new User({
          email: req.body.email
        })
        addNewUserandAddComment(newUser, new_comment, res)
      }
    })
  }
}

exports.getComment = (req, res) => {
  Comment.find({date:req.params.date})
  .then(results=>{
      res.send(results)
  })
  .catch(err=>res.send(err))
}

exports.postEmail = (req,res) => {
  let valCommentError = (validationResult(req)).array()
  
  if(valCommentError.length != 0) res.send(valCommentError[0].msg)
  else {
    let new_user = new User({
      email: req.body.email
    })

    User
    .findOne({email:req.body.email})
    .exec()
    .then(user => {
        if(user != null){
          res.send("This email was used. Seem like you already subcribed to our website")
        }else{
          new_user.save(err => {
            if   (err) console.log(err)
            else res.send("Thanks for your subscription")
        })
      }
    })
  }
}