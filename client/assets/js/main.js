$(document).ready(function(){
    $("#owl-demo").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 6,
        itemsDesktop : [1199,6],
        itemsDesktopSmall : [979,4],
        itemsTablet : [768,3],
        itemsMobile : [479,2],
    });
    setInterval(function () {$('.playing').toggleClass('d-none');}, 300);
});