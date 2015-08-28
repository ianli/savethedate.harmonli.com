(function($, _, undefined) {
  $(document).ready(function() {
    start();
  });

  function start() {
    $('.app-postcard').css({
      marginTop: $(window).height() + 10
    });

    _.delay(function() {
      reveal();
    }, 500);
  }

  function reveal() {
    $('.app-bg-obfuscator')
        .addClass('is-visible');

    var $postcard = $('.app-postcard');

    // Compute the offset so that the card is in the middle of screen.
    var offset = ($(window).height() - $postcard.height()) / 2;

    // Offset is never smaller than the minimum offset.
    if (offset < 100) {
      offset = 100;
    }

    $postcard
        .css({
          marginTop: offset
        })
        .addClass('is-visible');
  }
})(jQuery, _);
