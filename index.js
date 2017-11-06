require('dotenv').config();

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
    if (comment.body.toLowerCase().includes('wololo') && comment.author.name !== "WololoBot") {
        console.log("Wololo detected: ");
        console.log("   Comment: " + comment.body);
        console.log("   Author:  " + comment.author.name);
        comment.reply('[Wololo](http://wololo.se/)\n---\n^(I am a bot | ALL HAIL KING OF THE LOSERS! My creator u/E-Mouse)');
    }
});
