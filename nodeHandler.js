const Comment = require("./models/Comment.js");
const {User} = require("./models/User.js");
const {validationResult} = require("express-validator");

const axios = require("axios");

let handleAPIrequest = (url, req ,res, next) => {
    let valCommentError = (validationResult(req)).array();
    if(valCommentError.length == 0){
        axios.get(url)
            .then(result => {
                res.send(result.data);
            }).catch(err => {
                if(err.response.status == "404") {
                    next();
                }
            });
    }else{
        let err_mess = [];
        valCommentError.forEach(err=>{
            err_mess.push(err.msg);
        });
        let temp1 = new Set(err_mess);
        err_mess = [...temp1];
        res.send(err_mess);
    }  
    
};

exports.gettodayImg = (req, res, next)=> handleAPIrequest(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`, req ,res, next);
exports.getfromtoImg = (req, res, next)=> handleAPIrequest(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${req.params.fromDate}&end_date=${req.params.toDate}`,req , res, next);
exports.getspecificdateImg = (req, res, next)=> handleAPIrequest(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&date=${req.params.date}`,req , res, next);

exports.postComment = (req, res) => {
    let valCommentError = (validationResult(req)).array();
    if(valCommentError.length == 0){
        let new_comment = new Comment({
            date: req.body.date,
            text: req.body.text,
            username: req.body.nickname
        });

        User.findOne({email:req.body.email})
        .exec()
        .then(result => {
            if(result == null){
                let new_user = new User({
                    email: req.body.email
                });
                
                new_user.save(err => {
                    if(err){
                        console.log(err);
                    }else{
                        new_comment.save(err=>{
                            if(err){
                                console.log(err);
                            }else{
                                new_user.comments.push(new_comment._id);
                                new_user.save((err)=>{
                                    if(err)
                                        console.log(err);
                                    res.send(new_comment);
                                });
                            }
                        });
                    }
                });
            }else{
                new_comment.save(err=>{
                    if(err){
                        console.log(err);
                    }else{
                        result.comments.push(new_comment._id);
                        result.save((err)=>{
                            if(err)
                                console.log(err);
                            res.send(new_comment);
                        });
                    }
                });
            }
        });
    }else{
        let err_mess = [];
        valCommentError.forEach(err=>{
            err_mess.push(err.msg);
        });
        res.send(err_mess);
    }
};

exports.getComment = (req, res) => {
    Comment.find({date:req.params.date})
    .then(results=>{
        res.send(results);
    })
    .catch(err=>res.send(err));
};

exports.postEmail = (req,res) => {
    let valCommentError = (validationResult(req)).array();
    if(valCommentError.length == 0){
        let new_user = new User({
            email: req.body.email
        });
        User.findOne({email:req.body.email})
        .exec()
        .then(result => {
            if(result == null){
                new_user.save(err => {
                    if(err){
                        console.log(err);
                    }else{
                        res.send("Thanks for your subscription");
                    }
                });
            }else{
                res.send("This email was used. Seem like you already subcribed to our website");
            }
        });
    }else{
        res.send(valCommentError[0].msg)
    }
};