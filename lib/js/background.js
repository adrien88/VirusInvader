$(document).ready(function() {
var movementStrength = 15;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
$("#movingbg").mousemove(function(e){
          var pageX = e.pageX - ($(window).width() / 2);
          var pageY = e.pageY - ($(window).height() / 2);
          var newvalueX = width * pageX * -1 - -50;
          var newvalueY = height * pageY * -1 - -30;
          $('#movingbg').css("background-position", newvalueX+"%     "+newvalueY+"%");
});
});