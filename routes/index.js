var express = require('express');
// we need store.js in this routes folder
// because we'll want to render the tweet data on our webpage
var store = require('../store.js');
var router = express.Router();

/* GET home page. */
// whenever someone goes to the root route, a get request will be sent, and the below function will be called
// it says get because this function below is handling get requests only
router.get('/', function(req, res) {
  // request and response
  // request object has info about the incoming request
  // response object is used to respond to the request
  // let's get a list of all our tweets
  var tweets = store.list();
  // the 'tweets' key is set to the tweets object, which is a list of all our data, as defined in the line above
  // any key in the hash described in the next line will be a varaible in the view
  // use the tweets variables in the index.html when you want to access the data from store
  res.render('index', {heading: 'TWITTER', tweets: tweets, show_form: true});
});

/* POST submit form  */
// req.body holds parameters that are sent up throuhg a post request
router.post('/submit', function(req, res) {
  // name is the designated name value for the name input field
  var name = req.body.name;
  // text is the designated name value for the text/tweet input field
  var tweet = req.body.tweet;
  var id = store.push(name, tweet);
  // redirect back to slash (refreshing the page)
  // must come from the server side to send down the channel
  // everyone who's listening to this channel will hear the new tweet
  io.sockets.emit("new_tweet", {name: name, tweet: tweet, id: id});
  // GET request route will render the new tweet onto the page
  res.redirect('/');
});
module.exports = router;
