require('dotenv').config();
const LocalStrategy = require('passport-local');
const passport = require('passport');
const session = require('express-session');

module.exports = function (app, model) {
    // For passport
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session()); //persistent login sessions

    // passport strategy
    passport.use(new LocalStrategy(
        function (username, password, done) {
            model.findOne({
                where: {
                    username: username
                }
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!bcrpyt.compareSync(password, user.password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });
        }
    ));

    // serialize and deserialize
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        model.findOne({
            where: {
                id: id
            }
        }, (err, doc) => {
            done(null, doc);
        });
    });
}