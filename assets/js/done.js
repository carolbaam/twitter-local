//varaibles

const tweetList=document.querySelector('#tweet-list')


//eventListeners

eventListeners();

function eventListeners(){
    document.querySelector('#form').addEventListener('submit', newTweet)
    //remove tweet frim the list
    tweetList.addEventListener('click', removeTweet)
    //load localStorage
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}




//Functions

function newTweet(e){
    e.preventDefault()
    //read the textarea value

   let tweet=document.querySelector('#tweet').value;

   //create remove button
   const removeBtn=document.createElement('a')
   removeBtn.classList="remove-tweet";
   removeBtn.textContent='X'

    //create neW LIST element
    const li=document.createElement('li');
    li.textContent=tweet;
    li.appendChild(removeBtn)
    tweetList.appendChild(li);
    let textarea=document.querySelector('#tweet')
    addTweetToLocalStorage(tweet);
   this.reset();

    //add Tweet to local Storage

    
}

function addTweetToLocalStorage(tweet){
  let tweets=getTweetsFromStorage()
  tweets.push(tweet)
  //convert tweet array into string
  localStorage.setItem('tweets', JSON.stringify(tweets))
}

function getTweetsFromStorage(){
    let tweets;
    const tweetsLS=localStorage.getItem('tweets')

    if(tweetsLS===null){
        tweets=[]
    }else{
        tweets=JSON.parse(tweetsLS)
    }
    return tweets;
}


//removeTweet function

function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove()
    }

    //remove from Storage
    //console.log(e.target.parentElement.textContent)
    removeTweetFromStorage(e.target.parentElement.textContent);
}


function localStorageOnLoad(){
    let tweets=getTweetsFromStorage();
    //loop through storage and print the values

    tweets.forEach(function(tweet){
        const removeBtn=document.createElement('a')
        removeBtn.classList="remove-tweet";
        removeBtn.textContent='X'
     
         //create neW LIST element
         const li=document.createElement('li');
         li.textContent=tweet;
         li.appendChild(removeBtn)
         tweetList.appendChild(li);

    })
}

//remove the Tweet from localstorage

function removeTweetFromStorage(tweet){
    //get tweets from storage
 let tweets=getTweetsFromStorage()
 //remove the X from the tweet

const deleteX=tweet.substring(0, tweet.length -1);

tweets.forEach(function(tweetsLS, index){
    if(tweetsLS===deleteX){
        tweets.splice(index, 1)
    }
})
 localStorage.setItem('tweets', JSON.stringify(tweets))
}

