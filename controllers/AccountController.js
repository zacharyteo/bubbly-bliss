const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Customer = require('../models/Customer');

exports.reset = (req, res) => {
    console.log("Destroying the session");
    req.session.destroy(() => {
        res.redirect('/');
    });
};

exports.register = async (req, res) => {
    if (req.method === 'GET') {
        
        let error = req.query.error || null;
        res.render('register', { error });

    } else if ( req.method === 'POST') {
        const { name, email, password, role } = req.body;

        // only store password hash in the database, not the plaintext password
        let passwordHash = await bcrypt.hash(password, 10);
        
        try {
            let user;

            /* this check is redundant because we already have authMiddleware.isExistingUser to prevent duplicate emails, but we keep it here just in case
            // let existingUser = await Admin.findByEmail(email) || await Customer.findByEmail(email);
            // if (existingUser) {
            //     return res.status(400).render('register', { error: 'Email already in use' });
            // } */

            if (role === 'admin') {
                user = await Admin.createAccount({ name, email, password: passwordHash });
            } else {
                user = await Customer.createAccount({ name, email, password: passwordHash });
            }
            console.log(`New user created: ${user.name} (${user.email}) with role ${role}`);

            res.redirect('/account/login');
        } catch (error) {
            res.status(500).render('error', { error: error.message });
        }
    }
};

// handle both GET and POST for login
exports.login = async (req, res) => {
    if (req.method === 'GET') {

        let error = req.query.error || null;
        res.render('login', { error });

    } else if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            let user = await Admin.findByEmail(email);
            let role = 'admin';

            if (!user) {
                user = await Customer.findByEmail(email);
                role = 'customer';
            }

            let match = await bcrypt.compare(password, user.password);
            if (!user || !match) {
                return res.status(401).render('login', { error: 'Invalid email or password' });
            }
            console.log(`User logged in: ${user.name} (${user.email}) with role ${role}`);

            // Store user info in session
            req.session.userId = user._id;
            req.session.email = user.email;
            req.session.role = role;
            res.redirect('/');

        } catch (error) {
            res.status(500).render('error', { error: error.message });
        }
    }
};

