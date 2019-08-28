const Twit = require("twit");
const path = require("path");
const config = require("./config");

const myTweetObj = {
  content: "IT'S ONLY MY THIRD DAY OUT HERE, I DON'T KNOW",
  twitter_handle: "ITSONLYMYTHIRD3"
};

// My EC2 instance is always running so this will make it specifically run once on the third day of every month at 3:00pm.
let now = new Date();
if (
  now.getDate() == 3 &&
  now.getHours() == 15 &&
  now.getMinutes() == 0 &&
  now.getSeconds() == 0
) {
  tweetDankMeme(myTweetObj);
}

function tweetDankMeme(myTweetObj) {
  const T = new Twit(config);

  const PATH = path.join(__dirname, "./videoplayback.mp4");

  T.postMediaChunked({ file_path: PATH }, function(err, data, response) {
    const mediaIdStr = data.media_id_string;
    const meta_params = { media_id: mediaIdStr };

    T.post("media/metadata/create", meta_params, function(err, data, response) {
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
