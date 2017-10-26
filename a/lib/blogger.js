/* global $, document */
$(document).ready(function(){
  $('img').each(function() {
    if ($(this).hasClass('nozoom')) { return; }
    align = $(this).attr('align');
    align = align ? 'float:' + align : '';
    $(this).wrap('<a style="' + align + '" href="' + $(this).attr('src') + '" title="' + $(this).attr('alt') + '">').parent().fancybox({
	openEffect	: 'elastic',
	closeEffect	: 'elastic'
    });
  });
});
