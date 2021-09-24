const Twitter = require('twitter');
const config = require('./config.js');

const client = new Twitter(config);

let params = {
    q: '30daysofgooglecloud -filter:retweets',
    count: 100,
    result_type: 'mixed',
    lang: 'en'
};


client.get('/search/tweets', params, (error, tweets, response) => {
    if (!error) {
        tweets.statuses.forEach((tweet) => {
            client.post(`statuses/retweet/${tweet.id_str}`, (error, response) => {
                if (!error) {
                    console.log('Retweeted: ', tweet.id_str);
                } else {
                    console.log('Error: ', error);
                }
            });
        });
    }
});
