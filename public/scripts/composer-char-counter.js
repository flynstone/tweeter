$(document).ready(function() {
  $('textarea').on('input', function (event) {
    let len = $(this).val().length
    let $counter= $(this).parent('form').find('.counter')
    counting($counter, len)
  })
})

function counting($counter, len) {
  let charsLeft = 140 - len
  $counter.text(charsLeft)
  $counter.css('color', 'floralwhite')
  if (charsLeft < 0) {
    $counter.css('color', 'red')
  }
}
