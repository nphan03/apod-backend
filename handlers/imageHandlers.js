const {validationResult} = require("express-validator")

const axios = require("axios")

let handleAPIrequest = (url, req ,res, next) => {
    let valCommentError = (validationResult(req)).array()
    
    if(valCommentError.length == 0){
      axios
      .get(url)
      .then(NASAAPIresults => {
          res.send(NASAAPIresults.data)
      })
      .catch(err => {
        if(err.response.status == "404") {
            next()
        }
      })
    }else{
        let err_mess = []
        valCommentError.forEach(err=>{
            err_mess.push(err.msg)
        })
        let tempErr = new Set(err_mess)
        err_mess = [...tempErr]
        res.send(err_mess)
    }  
    
}

exports.gettodayImg = (req, res, next)=> handleAPIrequest(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`, req ,res, next)
exports.getfromtoImg = (req, res, next)=> handleAPIrequest(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${req.params.fromDate}&end_date=${req.params.toDate}`,req , res, next)
exports.getspecificdateImg = (req, res, next)=> handleAPIrequest(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&date=${req.params.date}`,req , res, next)

