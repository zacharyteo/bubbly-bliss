// const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Customer = require('../models/Customer');

exports.isLoggedIn = (req, res, next) => {
    if (!req.session.email) {
        console.log("User not logged in, redirecting to login");
        return res.redirect('/account/login?error=Please log in first!');
        //return res.status(401).render('login', { error: "Please log in first!" });
    }
    next();
}

exports.isExistingUser = async (req, res, next) => {
     const email= req.body.email || "";
            
    try {
        let existingUser = await Admin.findByEmail(email) || await Customer.findByEmail(email);
        if (existingUser) {
            console.log("Email already in use, redirecting to register");
            return res.redirect('/account/register?error=Email already in use!');
             //return res.status(401).render('register', { error: "Email already in use!" });
        }

    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (!req.session.email) {
        console.log("User not logged in, redirecting to login");
        return res.redirect('/account/login?error=Please log in first!');
        //return res.status(401).render('login', { error: "Please log in first!" });

    }
    if (req.session.role !== "admin") {
        console.log("Not an admin user, redirecting to home");
        return res.redirect('/');
    }
    next();
}