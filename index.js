const Twitter = require('twitter');
const config = require('./config.js');

const client = new Twitter(config);

let params = {
    q: '@pikaso_me has:images',
    count: 50,
    result_type: 'recent',
    lang: 'en'
};


client.get('/search/tweets', params, (error, tweets, response) => {
    if (!error) {
        tweets.statuses.forEach((tweet) => {
            client.post('/statuses/update', {
                status: `@pikaso_me ${tweet.text}`,
                in_reply_to_status_id: tweet.id_str
            }, (error, tweet, response) => {
                if (!error) {
                    console.log(`${tweet.user.screen_name} replied to ${tweet.in_reply_to_screen_name}`);
                } else {
                    console.log(error);
                }
            });
        });
    }
});
