const Twit = require("twit");
const path = require("path");
const config = require("./config");

const myTweetObj = {
  content: "IT'S ONLY MY THIRD DAY OUT HERE, I DON'T KNOW",
  twitter_handle: "ITSONLYMYTHIRD3"
};

tweetDankMeme(myTweetObj);

function tweetDankMeme(myTweetObj) {
  const TWEET = new Twit(config);
  const PATH = path.join(__dirname, "./video.mp4");

  TWEET.postMediaChunked({ file_path: PATH }, function(err, data, response) {
    const mediaIdStr = data.media_id_string;
    const meta_params = { media_id: mediaIdStr };

    TWEET.post("media/metadata/create", meta_params, function(err, data, response) {
      if (!err) {
        const params = { status: myTweetObj.content, media_ids: [mediaIdStr] };

        T.post("statuses/update", params, function(err, tweet, response) {
          const base = "https://twitter.com/";
          const handle = myTweetObj.twitter_handle;
          const tweet_id = tweet.id_str;
          console.log(`${base}${handle}/status/${tweet_id}`);
        });
      } else {
        console.log(err);
      }
    });
  });
}
