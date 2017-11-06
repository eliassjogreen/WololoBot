require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

/* Reddit part */

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const r = new Snoowrap({
    userAgent: 'reddit-bot-aoe2-wololo',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

const streamOpts = {
    subreddit: 'aoe2'/* 'testingground4bots' */,
    results: 25
};

const comments = client.CommentStream(streamOpts);

console.log("Listening for Wololo's");
comments.on('comment', (comment) => {
    if (comment.body.toLowerCase().includes('wololo') && comment.author.name !== process.env.REDDIT_USER) {
        console.log("Wololo detected: ");
        console.log("   Comment: " + comment.body);
        console.log("   Author:  " + comment.author.name);
        comment.reply('[Wololo](https://wololobot.herokuapp.com/)\n---\n^(I am a bot | ALL HAIL KING OF THE LOSERS!)');
    }
});

/* Express/website */
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8080);
