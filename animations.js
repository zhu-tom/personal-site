$(document).ready(function() {
    console.log("ready")
    $("#next").click(function() {
        console.log("clicked");
        console.log($('header').css("height") + " " + $("#about").offset().top);
        $('html, body').animate({
            scrollTop: $("#about").offset().top - parseInt($('header').css('height'))
        }, 1000);
    });
});