const {check} = require("express-validator");

exports.cmtValidator = [
    //Nickname validator
    check("nickname")
    .escape()
    .trim()
    .isLength({max:25}).withMessage("Nickname must be less than 25 characters"),
    
    //Email validator
    check("email")
    .escape()
    .trim()
    .isEmail().withMessage("Please enter a valid email address"), 
    
    //Check comment
    check("text")
    .escape()
    .trim()
    .isLength({min:1}).withMessage("Please say something in the comment box!")
];

let today = new Date();
let today_str = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`;

exports.dateValidator = [
    check("date")
    .escape()
    .trim()
    .isDate({format:"YYYY/MM/DD"}).withMessage("Date should be in format YYYY/MM/DD. Eg: 2011-02-03")
    .isAfter("1995/06/16").withMessage(`Date must be after 1995/06/16`)
    .isBefore().withMessage(`Date must be before ${today_str}`),
];

exports.fromtodateValidator = [
    check("fromDate")
    .escape()
    .trim()
    .isDate({format:"YYYY/MM/DD"}).withMessage("Date should be in format YYYY/MM/DD. Eg: 2011-02-03")
    .isAfter("1995/06/16").withMessage(`Date must be after 1995/06/16`)
    .isBefore().withMessage(`Date must be before ${today_str}`),
    
    check("toDate")
    .escape()
    .trim()
    .isDate({format:"YYYY/MM/DD"}).withMessage("Date should be in format YYYY/MM/DD. Eg: 2011-02-03")
    .isBefore().withMessage(`Date must be before ${today_str}`)
];

exports.emailValidator = [
    //Email validator
    check("email")
    .escape()
    .trim()
    .isEmail().withMessage("Please enter a valid email address"), 
];