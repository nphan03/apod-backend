const express = require("express");
const app = express();
const cors = require('cors')
const { cmtValidator, dateValidator, fromtodateValidator, emailValidator } = require("./tests/validators.js");
const { getComment, postComment, postEmail } = require("./handlers/commentHandlers.js"); 
const { gettodayImg, getfromtoImg, getspecificdateImg } = require("./handlers/imageHandlers.js");
const connection = require("./db/connection");

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

app.get("/images", gettodayImg);
app.get("/images/:fromDate&:toDate", fromtodateValidator, getfromtoImg);
app.get("/images/:date", dateValidator, getspecificdateImg);

app.post("/subcribe", emailValidator, postEmail);

app.post("/comments", cmtValidator, postComment);
app.get("/comments/:date", getComment);

connection.once('open', ()=>{
   console.log('connected to db');
  
    const server = app.listen(process.env.PORT || 3030, ()=>{
        console.log(`listening on ${process.env.PORT}`);
    });
}); 