const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('mongoose').model('User');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['access_token'];
    }

    return token;
};

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
};

const strategy = new JWTStrategy(opts, (payload, done) => {
    User.findById(payload.id)
    .then(user => {
        if (user)
            return done(null, user);
        else    
            return done(null, false);
    })
    .catch(err => done(err, null));
});

module.exports = passport => {
    passport.use(strategy);
};

