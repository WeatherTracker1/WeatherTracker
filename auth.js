import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import db from './db.js';

class Authentication {
    constructor(app) {
        app.use(session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        }));

        app.use(passport.initialize()); // init passport on every route call
        app.use(passport.session());
        passport.use(new LocalStrategy(this.verifyIdentity));

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));
    }

    async verifyIdentity(username, password, done) {
        const collection = db.collection("users");
        const query = { user: username };
        const userFromDB = await collection.findOne(query);
        
        if (!userFromDB) {
            // If the user was not found, return an error.
            return done(new Error('Invalid username or password'));
        }
        // Compare the password entered by the user with the password stored in the database.
        if (userFromDB.password !== password) {
             return done(new Error('Invalid username or password'));
        }
        // The user is authenticated, so return them.
        console.log("Login OK");    
            return done(null, userFromDB);
    }

    checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { 
            return next(); 
        }
        res.redirect("/login");
    }

}

export default Authentication;
