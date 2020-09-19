$(function() {
    $("input").focus(function() {
      var ele = $(this).attr("id");
      $("." + ele).removeClass("hidden");
      $(this).attr("placeholder", "");
      $("." + ele).css("opacity", 1);
      $("." + ele).animate({
        top: "-6%"
      }, 500);
    });
  });