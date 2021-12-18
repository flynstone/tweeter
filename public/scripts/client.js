/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const createTweetElement = (data) => {
  const $tweet = $(`
  <article class="tweet">              
    <header class="tweet-header">       
      <div class="inline">              
        <img src="${data.user.avatars}" class="avatar" alt="face">        
        <label class="title">${data.user.name}</label>       
      </div>     
      <label><b>${data.user.handle}</b></label>    
    </header>
    <div class="tweet-content">
      <p>${escapeFunc(data.content.text)}</p>
    </div>
    <footer class="tweet-footer">
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

const escapeFunc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const renderTweets = (tweets) => {
  tweets = tweets.reverse();
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}


const loadTweets = function () {
  $.get("/tweets/", function($tweets) {
    renderTweets($tweets);
  });
};

$(document).ready(function() {
  loadTweets()
});

$(document).ready(function () {
  $("form").on("submit", function(event) {
    event.preventDefault();
    const $form = $(this);
    const $postLength = $form.children('textarea').val().length;

    if ($postLength === 0) {
      $form.append($(`<p class='tweet-error'>Text area is empty</p>`))
      return;
    }
    // Checks the length
    if ($postLength > 140) {
      $form.append($(`<p class='tweet-error'>Tweet is more than 140 characters long</p>`))
      return;
    }

    // Ajax insetrs a new post
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      success: function (data) {
        // Insetrs new tweet after the tweet form
        location.reload();
      }
    });
    // Clears the text area once the tweet is posted
    $form.children('textarea').val('');
  });
});
/*
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

});*/

/*
$(document).ready(function() {
  console.log('doc is ready')

  $('form.tweet-submit').on('submit', submitTweetPost);

  $('.writeTweet').on('click', function() {
    $('.new-tweet').toggle(200);
  });
});*/

