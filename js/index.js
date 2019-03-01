$(document).ready(function(){

  $(".h-hamburger").click(function(e) {
      $(".h-mobile-menu").slideToggle();
  });
  if (window.location.pathname == "/tsa-webmaster/index.html" || window.location.pathname == "/tsa-webmaster/") {
     $(".c-m-f-submit").click(function(e) {
        $(".c-mailinglist").height($(".c-mailinglist").height()); //Locks the height so we don't get any dramatic flow shifts
        $(".c-m-form").fadeOut();
        $(".c-m-description").fadeOut();
        $(".c-m-title").fadeOut(400,function() {
          $(".c-m-title").text("Thanks for signing up! We'll send you periodic updates.");
              $(".c-m-title").fadeIn();
        });
     });
  }
});
