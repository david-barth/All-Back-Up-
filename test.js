const Twit = require('twit')
const mongoose = require('mongoose'); 
const tweet = require('./TweetModels');

/*mongoose.connect('mongodb://localhost/tweetData'); 

const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection successful');
});*/






function repeatCheck (text, array) {
  let repeat = false;

  //Iterate through array of tweets: 
  for (let tweet of array) {
    let tArray1, tArray2; 
    [tArray1, tArray2] = [tweet.text.split(' '), text.split(' ')]; 

    //Run iterative comparison of text elements in tweet text and input text if lengths of both match: 
    if (tArray1.length === tArray2.length) {
      let matchCount, x;
      [matchCount, x] = [0, 0];
      while (x < tArray1.length) {
        if (tArray1[x] === tArray2[x]) {
          //Add 1 for each matching array element in both text arrays: 
          matchCount ++  
        }
        x++ 
      }
      if (tArray1.length === matchCount) {
        //Break loop and return positive match if all array elements match: 
        return repeat = true
      }
    }
  }
  return repeat; 
}

const check = repeatCheck('tick tack brick aback', test); 



