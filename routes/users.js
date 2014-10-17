var express = require('express');
var router = express.Router();
var store = require('../store');

/* GET permalink id listing */

router.get ('/:name/tweets/:tweetid', function(req, res) {
  var name = req.params.name;
  // tweetid in req.params.tweetid has to match the variable designated above after the colon
  // by default, params comes in as a string
  // data.length is an integer so we need to search by integer
  var tweetid = parseInt(req.params.tweetid);
  // tweetid below is referring to tweetid defined in the line above
  var list = store.find({id: tweetid});
  res.render('index', {heading: "Single Tweet: " + tweetid, tweets: list});
})


/* GET users listing. */
// because you're in the users route, the / below actually refers to /users/
// :name is the variable
// this is the callback function that's called when someone goes to this route and a get request is sent
router.get('/:name', function(req, res) {
  // req.params.name will abstrac that variable piece of the path and store it as a variable called name
  var name = req.params.name;
  // list will find all the tweets that have the given name extension for key name
  // the first name is a key that will be available in the view
  // the second name refers to the variable desribed above
  // the tweets keyword is used here because our view depends on the fact that the object is called tweets
  var list = store.find({name: name});
  // pass the name variable here so that we can prefill the submit form with a name if it exists
  res.render('index', { name: name, heading: 'Tweets by '+name, tweets: list, show_form: true});
});

module.exports = router;
