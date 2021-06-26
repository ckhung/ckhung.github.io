/* global $, document */
$(document).ready(function(){
  $('#qrcode').qrcode({width:128, text:window.location.href});
  $('img').each(function() {
    if ($(this).hasClass('nozoom')) { return; }
    var align = $(this).attr('align');
    align = align ? 'float:' + align : '';
    $(this).wrap('<a style="' + align + '" href="' + $(this).attr('src') + '" title="' + $(this).attr('alt') + '">').parent().fancybox({
	openEffect	: 'elastic',
	closeEffect	: 'elastic'
    });
  });
});
