/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


const createTimeStamp = (stamp) => {
  let tweets = timeago.format(data.created_at);
  for (let tweet of stamp) {
    tweets += `<span class="timestamp" datetime="${data.created_at}">${tweet}</span>`;
  }
  return tweets;
}



const createTweetElement = (data) => {
  const $tweet = $(`
    <article class="tweet">              
      <header>       
        <div class="inline">              
          <img src="${data.user.avatars}" alt="face">        
          <label class="title">${data.user.name}</label>       
        </div>     
        <label><b>${data.user.handle}</b></label>    
      </header>

      <div class="tweet-content">
        <textarea>${data.content.text}</textarea>
      </div>

      <footer>
        <span class="timeago">${timeago.format(data.created_at)}</span>

        <span class="icon-group">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </span>
      </footer>
    </article>
  `);

  return $tweet;
}


const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}


const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((err) => {
      throw err;
    })
};

loadTweets();

$(document).ready(function () {
  $('form.newTweet').on('submit', function (event) {
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
    .then(function(tweet) {
      $('.tweet-text').val('')
    })
    .catch((err) => {
      throw err;
    })
  });
  renderTweets(data);
});

