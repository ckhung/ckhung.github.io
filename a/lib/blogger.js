/* global $, document */

$(document).ready(function() {

  // for blogger:
  // $.fn.fancyzoom.defaultsOptions.imgDir= top_url + '/i/jq/fancyzoom/resources/';

  $('img').each(function() {
    if (!$(this).attr("title"))
      $(this).attr("title", $(this).attr("alt")); 
    if ($(this).hasClass('nozoom')) return;
    align = $(this).attr('align');
    align = align ? 'float:' + align : '';
    if ($(this).parent().get(0).tagName == "A")
      wrapped = $(this).parent();
    else
      wrapped = $(this).wrap('<a style="' + align + '" href="' + $(this).attr('src') + '" title="' + $(this).attr('alt') + '">');
    if (wrapped.hasClass('mag-image')) { return; }
    wrapped.parent().fancybox({
	openEffect	: 'elastic',
	closeEffect	: 'elastic'
    });
  });

  $('.mag-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
	return item.img.attr('alt') ? item.img.attr('alt') : item.attr('title');
      }
    }
  });

  // This one is popular but suspicious:
  // https://davidshimjs.github.io/qrcodejs/
  // Contains obfuscated code and is reported as fingerprinting by 
  // https://addons.mozilla.org/zh-TW/firefox/addon/canvas-fingerprint-defender/
  // although the latter does not provide a github repo either...
  // So switch to the older, original version:
  // https://github.com/jeromeetienne/jquery-qrcode

  // $('#qrcode').qrcode("https://frdm.cyut.edu.tw" + window.location.pathname);
  $('#qrcode').qrcode({width:128, height:128, text:window.location.href});
});
