#!/usr/bin/env node
"use strict";

var express = require('express'),
    router = require('../lib/router.js'),
    config = require('../config.json'),
    weibo = require('weibo'),
    mongoose = require('mongoose'),
    g = require('../lib/global');

var app = express(),
    db = null;

// Set up weibo
weibo.init('weibo', config.APP_KEY, config.APP_SECRET);

// Set up database connection
mongoose.connect('mongodb://localhost/weibocon_db');
db = mongoose.connection;
db.on('error', function() {
    throw new Error('Cannot connect to database');
});
db.once('open', function() {
    console.info('Database connection established');
});

// Set up server
//app.use(express.logger());
app.use(express.bodyParser());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../static'));
app.use(express.cookieParser());
app.use(express.session({secret : 'asxcfrgth'}));
app.use(app.router);
app.use(weibo.oauth({
    loginPath: '/login',
    logoutPath: '/logout',
    blogtypeField: 'type',
    afterLogin: function (req, res, callback) {
        console.log(req.session.oauthUser.screen_name, ' 授权成功');
        g.set('oauthUser', req.session.oauthUser);
        process.nextTick(callback);
    },
    beforeLogout: function (req, res, callback) {
        console.log(req.session.oauthUser.screen_name, ' 授权取消');
        g.unset('oauthUser');
        process.nextTick(callback);
    }
}));
router.route(app);
app.listen(config.SERVER_PORT);

// run robot
require('../lib/robots');