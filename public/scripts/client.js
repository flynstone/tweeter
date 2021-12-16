/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const data = [
  {
    'user': {
      'name': 'Newton',
      'avatars': 'https://i.imgur.com/73hZDYK.png',
      'handle': '@SirIsaac'
    },
    'content': {
      'text': 'If I have seen further it is by standing on the shoulders of giants'
    },
    'created_at': 1461116232227
  },
  {
    'user': {
      'name': 'Descartes',
      'avatars': 'https://i.imgur.com/nlhLi3I.png',
      'handle': '@rd'
    },
    'content': {
      'text': 'Je pense , donc je suis'
    },
    'created_at': 1461113959088
  }
];

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

$(document).ready(function () {
  $('form.newTweet').on('submit', function (event) {
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    });
  });
  renderTweets(data);
});

