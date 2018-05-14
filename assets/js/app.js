//variables
const tweetList = document.querySelector('#tweet-list');
//eventListeners
eventListeners()
function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newTweet)
    tweetList.addEventListener('click', removeTweet)
    document.addEventListener('DOMContentLoaded', loadLSTweets)
}
//functions

function newTweet(e) {
    e.preventDefault()
    const tweet = document.querySelector('#tweet').value;
    //console.log(tweet)
    const removeBtn = document.createElement('a')
    removeBtn.classList = "remove-tweet";
    removeBtn.textContent = 'X'
    const newTweet = document.createElement('li')
    newTweet.textContent = tweet;
    newTweet.appendChild(removeBtn)
    tweetList.appendChild(newTweet);
    saveTweetInLocalStorage(tweet);
    this.reset()

}

function saveTweetInLocalStorage(tweet) {
    let tweets = getTweetsFromLS()
    tweets.push(tweet)
    localStorage.setItem('tweets', JSON.stringify(tweets))


}

function getTweetsFromLS() {
    let tweets
    const tweetsLS = localStorage.getItem('tweets')

    if (tweetsLS === null) {
        tweets = []
    } else {
        tweets = JSON.parse(tweetsLS)
    }
    return tweets
}

function removeTweet(e) {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove()
    }

    removeTweetFromLS(e.target.parentElement.textContent);
}

function loadLSTweets() {
    let tweets = getTweetsFromLS();

    tweets.forEach(function (tweet) {
        const removeBtn = document.createElement('a')
        removeBtn.classList = "remove-tweet";
        removeBtn.textContent = 'X'

        //create neW LIST element
        const li = document.createElement('li');
        li.textContent = tweet;
        li.appendChild(removeBtn)
        tweetList.appendChild(li);
    })
}

function removeTweetFromLS(tweet) {
    let tweets = getTweetsFromLS()
    const deleteX = tweet.substring(0, tweet.length - 1)
    console.log(deleteX)
    tweets.forEach(function (tweetLS, index) {
        if (tweetLS === deleteX) {
            tweets.splice(index, 1)
        }
    })
    localStorage.setItem('tweets', JSON.stringify(tweets))
}