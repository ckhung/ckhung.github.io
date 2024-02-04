// import dotclear tag to blogspot
// 詳見 http://people.ofset.org/~ckhung/b/js/xdomain.php
$(function() {
    var tag_src="http://blog.ofset.org/ckhung/index.php?tag/";
    var tag = location.href.match(/search\/label\/(.*)/);
    // 注意: 用 decodeURIComponent 解中文字串編碼才對; 不應用 unescape。 詳見:
    // http://stackoverflow.com/questions/619323/decodeuricomponent-vs-unescape-what-is-wrong-with-unescape
    if (!tag || tag.length<=1) return;
    $.get(tag_src+tag[1], function(data){
	posts = $(data.responseText).find("div#main div#content div.post");
	posts.find(".post-tags").each(function () {
	    txt = $(this).html();
	    txt = txt.replace(/<\/?ul.*?>/g, "");
	    txt = txt.replace(/<li.*?>/g, "");
	    txt = txt.replace(/<\/li>/g, ", ");
	    $(this).html("標籤: " + txt);
	});
	$(".blog-posts").append("<p class='hilight1'># # 以下同樣標有 「" +
	  decodeURIComponent(tag[1]) + "」 的 " + posts.length +
	  " 篇文章, 來自舊的部落格 <a href=" +
	  "'http://blog.ofset.org/ckhung/'>「資訊人權貴隨便記」</a> # #"
	);
        $(".blog-posts").append(posts);
    });
});

