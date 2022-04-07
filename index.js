const Twitter = require('twitter');
const config = require('./config.js');

const client = new Twitter(config);

let params = {
    q: '@pikaso_me has:images is:reply',
    count: 50,
    result_type: 'recent',
    lang: 'en'
};


client.get('/search/tweets', params, (error, tweets, response) => {
    if (!error) {
        tweets.statuses.forEach((tweet) => {
            client.post(`statuses/retweet/${tweet.id_str}`, (error, response) => {
                if (!error) {
                    console.log('Retweeted: ', tweet.id_str);
                }
            });
        });
    }
});
