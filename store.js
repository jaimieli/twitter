var _ = require('underscore');

// by using closure, the parenthese before the function and the parentese at the end before it's called, we can protect the data but expose the store function to be used
var store = (function () {
  var data = [];
  return {
    // data.length is the easiest way to generate an id - it'll be unique at each instance of adding items to the data
    // push function takes a name and text
    // the name and text are then added as an object to the data array;
    // 'name' is simply a key
    // the name in the parameter is the variable that's passed in
    push: function(name, text) {
      var id = data.length;
      data.push({
        'name': name,
        'text': text,
        'id': id
      });
      // we need to return the id when you store new tweets;
      return id;
    },
    // list function will return the data array with all the names and tweet text
    list: function() {
      return data;
    },
    // the find function will take in an object's key value/pair properties and will search through the data array
    // use find function on an object and pass in a key-value pair you're searching to match
    find: function(properties) {
      return _.where(data, properties);
    }
  }
})(); // the parenthese indicate that this store function is immediately invoked

// how the find funtction works
// var data = [
//   {name: "Jaimie", text: "Hey"},
//   {name: "Rhick", text: "Hey"}];
// data.where({name: "Rhick"});

// by setting store to module.exports, the store function will be available elsewhere in our project, wherever we require the store function;
module.exports = store;

// the code below is simply used to generate fake tweets
var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
  store.push(getFakeName(), getFakeTweet());
}