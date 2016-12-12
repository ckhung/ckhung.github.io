/* global $, document */
$(document).ready(function(){
  $('img').each(function() {
    if ($(this).hasClass('nozoom')) { return; }
    align = $(this).attr('align') ? 'float:right' : '';
    $(this).wrap('<a style="' + align + '" href="' + $(this).attr('src') + '" title="' + $(this).attr('alt') + '">').parent().zoom().fancybox({
	openEffect	: 'elastic',
	closeEffect	: 'elastic'
    });
  });
});
