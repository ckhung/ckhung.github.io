$(document).ready(function(){
  $('img').each(function() {
    $(this).wrap('<a style="float:right" href="' + $(this).attr('src') + '" title="' + $(this).attr('alt') + '">').parent().zoom().fancybox({
	openEffect	: 'elastic',
	closeEffect	: 'elastic'
    });
  });
});
