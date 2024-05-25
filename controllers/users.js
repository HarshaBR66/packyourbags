const User = require("../models/user");


module.exports.renderSignupForm = (req,res) => {
    return res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email, username});
        const registeredUser =await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=> {
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wanderlust!");
            return   res.redirect("/listings");
        })
     
    }
    catch(e){
        req.flash("error",e.message);
        return  res.redirect("/signup");
    }

};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
    // return res.redirect(req.session.redirectUrl);
};

module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome back ! you are now logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    return  res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=> {
        if(err){
           return next(err);
        }
        req.flash("success","You are now logged out!");
        return res.redirect("/listings");
    })
};

