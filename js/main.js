(function($, _, undefined) {
  $(document).ready(function() {
    start();

    _.delay(function() {
      reveal();
    }, 500);

    $(window).scroll(_.throttle(function() {
      var windowHeight = $(window).height();
      var scrollHeight = $(document.body).prop('scrollHeight');
      var scrollTop = $(document.body).scrollTop();

      var ratioFromBottom = 1 - (scrollTop / (scrollHeight - windowHeight));

      updateObfuscator(ratioFromBottom);
    }, 100));
  });

  function start() {
    // Make sure that we're scrolled to the top.
    $(document.body).scrollTop(0);

    $('.app-postcard').css({
      marginTop: $(window).height() + 10
    });
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

  function updateObfuscator(ratioFromBottom) {
    $('.app-bg-obfuscator').css({
      opacity: (0.5) * ratioFromBottom
    });
  }
})(jQuery, _);
