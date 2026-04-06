const express = require('express');
const session = require("express-session");
const passport = require('passport');

require('dotenv').config();
require('./auth');

const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}


app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`
        <h1>Hello ${req.user.displayName}</h1>
        <a href='/logout'>Logging Out</a>
        `);


});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure', (req, res) => {
    res.send('<h1>YOU ARE NOT LOGGING</h1>');
})

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy();
        res.send("GoodBye");
    });

})



app.listen(3000);