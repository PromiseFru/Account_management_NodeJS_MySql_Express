const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');

module.exports = function (app, model) {
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };

    app.post('/register', (req, res, next) => {
        const hash = bcrypt.hashSync(req.body.password, saltRounds)
        model.findOne({
            where: {
                username: req.body.username
            }
        }, (err, user) => {
            if (err) {
                next(err);
            } else if (user) {
                req.redirect('/');
            } else {
                model.create({
                    firstname: req.firstname,
                    lastname: req.lastname,
                    username: req.body.username,
                    password: hash,
                    last_login: Date.now()
                }, (err, doc) => {
                    if (err) {
                        res.redirect('/');
                    } else {
                        next(null, doc);
                    }
                })
            }
        }, passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res, next) => {
            res.redirect('/profile');
        })
    });


    app.post("/login", passport.authenticate("local", {
        failureRedirect: "/"
    }), (req, res) => {
        res.redirect("/profile");
    })

    app.get("/profile", ensureAuthenticated, (req, res) => {
        res.send(`Welcome ${req.user.username}`);
    })

}