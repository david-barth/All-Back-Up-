//Scraper Dependencies: 
const Twit = require('twit');
const mongoose = require('mongoose'); 
const tweet = require('./TweetModels');
const vector = require('./predictionVector'); 
const wordMap = require('./wordMap'); 
const Vectorizer = require('./vectorizer').Vectorizer; 
const Refiner = require('./sorting_truncation').Refiner; 
  

//Instanitations and Global Variables: 
const cleaner = new Vectorizer(null); 
const classLabels = ['World Affairs1', 'World Affairs2', 'World Affairs3', 'World Affairs4', 'Science and Technology1', 'Science and Technology2', 'Science and Technology3', 'Science and Technology4', 'Business1', 'Business2', 'Business3', 'Business4', 'Football1', 'Football2', 'Football3', 'Football4', 'Environment1', 'Environment2', 'Environment3', 'Environment4'];   
const subjects = ['pop star', 'minaj', 'bill clinton', 'Iraq War', 'clock', 'atomic', 'smart car', 'bill nye', 'Crude Oil Prices', 'Salary', "Executive Bonus", 'prices', "kids soccer", 'soccer ball', 'US soccer', 'soccer news', 'hippy', 'green earth', 'save the environment', 'climate activism'];  

//const phase = 'Growth';
const phase = 'Vectorize';
const signal = 4; 


//Setting up Mongoose Connection: 

mongoose.connect('mongodb://localhost/tweetData'); 

const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection successful');
});


//Scrapping Program Structure: 

//1. Create new Twit Instance: 

const T = new Twit({
    consumer_key:         '3xy04LnYOaKpODIYsF2fpLABq',
    consumer_secret:      '7eu2FqgGuE1EtlgwjTro205Jg3xEpQJ8iMiVO6mxxIoSFUpWs8',
    access_token:         '1212427908901294080-aSPrQh72AQUSLV6ZfpKc4XKdWY2sBz',
    access_token_secret:  'HDOJ825sllT2g3f5lTCNWWfu4iahmCQLGd2CVe249oyS2',
  }); 


function saveToDB(model, saveType) {
    model.save((err, result) => {
        if (err) {
            console.log(err); 
        }
        else {
            console.log(`${saveType} Saved to Database`); 
        }
    });
}
 
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



  //2. Get a sample of Twitter posts: 

  //Generalization: Function can be used for multiple calls, using a loop and an array of label calls: 

    //Issue to fix: Create a way to prevent duplicate tweets from being added to the DB. 

  async function getData(apiEndpoint, querySubject, getValue, label, otherParams={}) {

    T.get(apiEndpoint, { q: querySubject, count: 100, lang: 'en',  /*geocode: '34.0522,118.2437,4000mi'*/}, (err, data) => {   
        //Iterate through the twitter response: 
        const dataResponse = data.statuses;
        

        for (let i = 0; i < dataResponse.length; i++) {
            //Extract twitter response information to appropriate variables: 
            let currentTweets, repeatSignal; 
            const tweetText = data.statuses[i].text;
            const tweetLabel = label; 

             //Check for repeat Tweets: 
            if (i > 0) {
                currentTweets = dataResponse.slice(0, i); 
                repeatSignal = repeatCheck(tweetText, currentTweets);  
            }
           

            if (repeatSignal) {
                //Prevent Tweet Placement into DB: 
                console.log('repeat');    
            } else {
                //Instantiate tweetData model instance with information: 
                const tweetData = new tweet({
                    text: tweetText, 
                    label: tweetLabel, 
                });     

                //Save Data to MongoDb sever: 
                saveToDB(tweetData, 'Tweet');     
            }
        }
      });
  }
  

//3. Access Data and Assign it to a document or collection using Mongoose querying methods: 

//Generalization: 
        //1. Expand the search options to include multiple options for the input object of the find() method. 

        //2. Build the loop into the function in order to create an array of 'subject' queries. 

        //3. Use array iteration to decompose the tweet batches into appropriate information.  

            //This will require two loops. 

async function accessDatasets(labelArray) { 
    //Initialize arrays:
    let tweetBatches = [];  
    let features = []; 
    let labels = []; 

    //Read information from tweets database: 
    for (let i in labelArray) {
        const tweetQuery = await tweet.find({label: labelArray[i]}); 
        tweetBatches.push(tweetQuery); 
    }

    //Data Decomposition to document blobs: 
    tweetBatches.forEach((batch, i) => {
        let textBlobFeature = [];  
        for (let object of batch) { 
            labels.push(object.label);
            textBlobFeature.push(object.text); 
        }
        features.push(textBlobFeature);
    })

    return {features: features} 
}


//4. Compiling the information into a document blob

//Generalizing: Use a loop to encapsulate the concatenation steps.  


async function documentBlobbing(labelArray, vectorizer) {
    //Initialize document array: 
    let docArray = [];

    //Load data: 
    const loadedData = await accessDatasets(labelArray); 

    //Iterative cleaning and reduction of texts: 
    for (let i in loadedData.features) {
         //Clean up the features Arrays:
        vectorizer.switchList(loadedData.features[i]); 
        const cleanedTweets = await vectorizer.clean();

        //Concatenation of tweet arrays and pushing to docArray: 
        const tweetBlob = cleanedTweets.reduce((current, combined) => combined.concat(current)); 
        docArray.push(tweetBlob)        
    }
    
    return {docs: docArray};
}; 

 



//5. Creating a word map of the docArray to see frequencies of the word: 

//Generalization: Here, the word/char map creation must be extended to a 2D array treatment. 
 


function wordMapGen(sample, incrementStep, initialValue) {
    //Initialize a blank object for the charMap (word map): 
    let map = {}; 

    //Use double layered iteration to handle 2D array sample input: 
    sample.forEach((tweetBlob) => {
        //Iterate over individual tweetBlob documents to add words to the word map: 
        for (let word of tweetBlob) {
            if (map[word]) {
                //Increment word frequency of CharMap if property exists: 
                map[word] += incrementStep; 
            } else {
                //Else initialize property of CharMap to start the count: 
                map[word] = initialValue; 
            }
        }
    }) 

    return map; 
}

async function wordTruncation (docArray) {
    //Array container initializations: 
    let docWordCollection = docArray; 
    let docVectors = [];  

    //Iterate over document collection to create docVectors array: 
    for (let document of docWordCollection) {
        //Reinitialize word map with a new call to the cut corpus: 
        let dbCall = await wordMap.find({representation: "cut corpus"});
        let docMap = dbCall[0].wordMap; 

        //Create dictionary and iterate through each document blob: 
        let dictionary = Object.keys(docMap);
        document.forEach(word =>{
            //Increment the word frequency if a match is found: 
            if (dictionary.includes(word)) {
                docMap[word] ++ 
            } 
        });
        //Push the document word map to the appropriate vector array: 
        docVectors.push(Object.values(docMap));  
    }
    
    return docVectors; 
}; 


/**
 * Consideration for the use of the CharMap and TF-IDF Vectorization: 
 * tfidf(word, t, textlist); ---> Form of the tfidf usage. 
 * 
 * A total 1D row representation of the dictionary must be obtained from the total character map of the documents. 
 * Upon corpus representation, the character map can be obtained in array / vector form. 
 */

async function storeVectors(inputs, labels) {
    //Iterate over inputs
    for (let i in inputs) {
          //Instantiate Model (or models):  
          const newVector = new vector({
            vector: inputs[i], 
            label: labels[i]
        }); 

        //Save model:
         await saveToDB(newVector, 'predictionVector'); 
    }
}; 


//Growng the Corpus function: 


async function mergeObjects(object1, object2) {
    //Convert corpus to array for use of includes() method: 
    const corpus = Object.keys(object2); 

    //Iterate over update object (object1): 
    for (let update in object1) {
        //Check for presence of update collection word within corpus collection
        const newValue = object1[update];  
        if (corpus.includes(update)) {
            //Increment value of corpus object property by the update value if update word is present in corpus array: 
            object2[update] += newValue; 
        } else {
            //Add update word to corpus and its associated value if update word is not present in corpus array: 
            object2[update] = newValue; 
        }
    }

    return object2; 
}

function deleteTweets(tweetModel) {
    tweetModel.deleteMany({location: 'Independent'}, (err) => {
        if (err) {
            console.log(err); 
        }
    })
}


async function growCorpusMap() {
    //Blob the tweets for easier processing:
    const blobbedDocuments = await documentBlobbing(classLabels, cleaner);  
     
    
    //Iterate through the 2D array to add the words to the corpus word map: 
    const update = await wordMapGen(blobbedDocuments.docs, 1, 1); 

    //Find and merge the update wordMap with the corpus wordMap: 
    const corpusWordMap = await wordMap.find({representation: 'corpus'});
   
    const merged = await mergeObjects(update, corpusWordMap[0].wordMap);

    
    //Instantiate updated corpus map model and save to DB: 

    await wordMap.deleteMany({representation: "corpus"});
     
    const savedWordMap = new wordMap({
        wordMap: merged, 
        representation: 'corpus', 
    }); 
    
     
    await saveToDB(savedWordMap, 'Updated Corpus Word Map');
    

    //Deleting the tweets after updating: 
    await deleteTweets(tweet); 
}

async function initializeCorpus() {
    //Read Corpus from DB. 
    const tweets = await tweet.find({location: 'Independent'}); 

    //Blob the tweets to documents: 
    const docBlobs = await documentBlobbing(classLabels, cleaner); 

    //Generate map: 
    const initialWordMap = wordMapGen(docBlobs.docs, 1, 1); 

    //Instantiate corpus map model and save to DB: 
     
    const savedWordMap = new wordMap({
        wordMap: initialWordMap, 
        representation: 'corpus', 
    }); 
    
     
    await saveToDB(savedWordMap, 'Corpus Word Map');
    
    //Delete Tweets from DB: 
    await deleteTweets(tweet); 
}


async function iterateGet(getValue) {
    for (let i in classLabels) {
        await getData('search/tweets', subjects[i], 250, classLabels[i]); 
    }; 
}




//Overall functions: 

async function gather() {
    //1. A. Get Tweets by Subject: 
    if (signal === 1) {
        await iterateGet(); 
    }
    

    //B. Generate Initial Corpus: 
    if (signal === 2) {
        await initializeCorpus();
    }
    
    
    //2. Grow the corpus map via the obtained tweets: 
    if (signal === 3) {
        growCorpusMap(); 
    }
}


async function Vectorize() {
    //1. Blob the cleaned tweets into a document: 
    const blobbedDocuments = await documentBlobbing(classLabels, cleaner);  

    //2. Vectorize the documents to an mono-gram (frequency based) representatin vector: 
    const vectoredInputs = await wordTruncation(blobbedDocuments.docs);
    const assignedLabels = classLabels; 
    

    //3. Store the vectors into the proper database: 
    await storeVectors(vectoredInputs, assignedLabels);  
}


//Continuation: Finish this scraping process by focusing on the storeVectors function. 



async function run() {
    //1. Get Data from twitter, store to database, and grow tweet corpus:
    if (phase === 'Growth') {
        gather(); 
    } 


    //2. Sort and truncate the corpus word map: 
    if (phase === 'Refine') {
        const corpusWordMap = await wordMap.find({representation: 'corpus'}); 
        const refiner = new Refiner(corpusWordMap[0].wordMap, 2000)

        const segmented = await new wordMap({
            wordMap: refiner.refine(), 
            representation: 'cut corpus'
        });

        saveToDB(segmented, 'Cut Corpus');
    }


    //3. Refine the data to document blobs, vectorize, and store the vectors to the database: 
    if (phase === 'Vectorize' && signal === 4) {
        Vectorize(); 
    }
}

run(); 


 /**Current Operating Procedure: 
  * A. Corpus Growth phase: 
  *     i. Use the getData() function in isolation in order to obtain initial selection of tweets. 
  *    ii. Then use initializeCorpus() in isolation to delete tweets from db and save initial corpus map to the database. 
  *   iii. Finally, use getData() and growCorpus() in isolation of each other in order to grow a proper corpus word map.
  * 
  * B. Corpus Refinement phase: 
  *     i. Use the entire refiner code block to sort and cut corpus. 
  *    ii. The cut corpus will be saved to the proper collection in the db. 
  * 
  * C. Vectorize() phase: 
  *    i. Use the getData() function in isolation in order to get a samle of tweets. 
  *   ii. Then use Vectorize() in isolation to store the document vectors to the db collection for later use. 
  * 
  * Step C can be repeated as often is needed until an appropriate number of vectors have been stored into the db.  
  * This involves switching the subject array to different sub-categories related to the labels. 
  * The labels are kept constant for a specific neural network. 
  */