$(document).ready(function(){
  $('img')
    .wrap('<span"></span>')
    .css('display', 'block')
    .parent()
    .zoom();
});
