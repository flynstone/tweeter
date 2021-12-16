$(document).ready(function() {
  $('textarea').on('input', function (event) {
    let val = $(this).val().length
    let $counter= $(this).parent('form').find('.counter')
    counting($counter, val)
  })
})

function counting($counter, val) {
  let count = 140 - val
  $counter.text(count)
  $counter.css('color', 'floralwhite')
  if (count < 0) {
    $counter.css('color', 'red')
  }
}
