/*! bh-lay.com 2014-06-17 */
define&&define(function(a,b){function c(a,b,c,d){"share"==c?f(a,d):"opus"==c?g(a,d):"friends"==c?i(a,d):"labs"==c?h(a,d):"user"==c?k(a,d):e(a,d),b.find("a").removeClass("active"),b.find('a[data-type="'+c+'"]').addClass("active")}function d(a,b){var b=b||{},d=b.id||null,e=b.active||"article";if("user"==e)c(a,f,e,d);else{a.html(l);var f=a.find(".publish_cpt"),g=a.find(".publish_cnt");c(g,f,e,d),f.on("click","a",function(){var a=$(this).attr("data-type");c(g,f,a,null),admin.push("publish/"+a)})}}a("/frontEnd/publish/publish.css");var e=a("/frontEnd/publish/article.js"),f=a("/frontEnd/publish/share.js"),g=a("/frontEnd/publish/opus.js"),h=a("/frontEnd/publish/labs.js"),i=a("/frontEnd/publish/friends.js"),j=a("/frontEnd/publish/power.js"),k=a("/frontEnd/publish/user.js"),l=['<div class="publish">','<div class="publish_cpt">','<a href="javascript:void(0)" data-type="article" class="active">博文</a>','<a href="javascript:void(0)" data-type="share">分享</a>','<a href="javascript:void(0)" data-type="labs">实验室</a>','<a href="javascript:void(0)" data-type="opus">作品</a>','<a href="javascript:void(0)" data-type="friends">友情链接</a>',"</div>",'<div class="publish_cnt"></div>',"</div>"].join("");b.init=d,b.article=e,b.share=f,b.opus=g,b.labs=h,b.friends=i,b.power=j,b.user=k});