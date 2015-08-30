var error_nominee_no_text, error_nominee_count_text, success_text, share_text, title_text, close_text;

if(document.URL.indexOf("en") >= 0){
    close_text = "Close";
    error_nominee_no_text = "Number of nominees should be higher than number of winners !";
    error_nominee_count_text = "Number of winners should be higher than 0 !";
    success_text = "Congratulations!";
    share_text = "share: ";
    title_text = "Winner";
} else{
    close_text = "Kapat";
    error_nominee_no_text = "Aday sayısı kazanan sayısından fazla olmalıdır";
    error_nominee_count_text = "Kazanan sayısı en az 1 olmalıdır.";
    success_text = "Tebrikler";
    share_text = "paylaş: ";
    title_text = "Kazananlar";
}

var error_nominee_no = "<div class='alert alert-danger text-center'>" +
    "<button type='button' class='close' data-dismiss='alert' aria-label='"+close_text+"'>" +
    "<span aria-hidden='true'>&times;</span></button>" +
    error_nominee_no_text +
    "</div>";

var error_nominee_count = "<div class='alert alert-danger text-center'>" +
    "<button type='button' class='close' data-dismiss='alert' aria-label='"+close_text+"'>" +
    "<span aria-hidden='true'>&times;</span></button>" +
    error_nominee_count_text +
    "</div>";

var success = "<div class='alert alert-success text-center'>" +
    "<button type='button' class='close' data-dismiss='alert' aria-label='"+close_text+"'>" +
    "<span aria-hidden='true'>&times;</span></button>" +
    "<h3 class='special-border'><i class='fa fa-trophy'></i> "+success_text+" <i class='fa fa-trophy'></i></h3>" +
    "<ul class='ordered-list'>";

$(document).ready(function(){
    $('#get-result').click(function(e){
        e.preventDefault();
        var lines = $('#user-input').val().replace(/[^\u00BF-\u1FFF\u2C00-\uD7FF\w]+/g," ").trim().split(' ');
        var message = "";
        var nomineeCount = $('#count').val();
        if((lines.length -1 < nomineeCount))
        {
            message += error_nominee_no;
        }
        else if (nomineeCount<1)
        {
            message += error_nominee_count;
        }
        else
        {
            message += success;
            var winners = [];
            while(nomineeCount != 0)
            {
                for(var i = 0; i < nomineeCount; i++)
                {
                    var winner = lines[Math.floor(lines.length * Math.random())];
                    if($.inArray(winner, winners) <= -1)
                    {
                        winners[i] = winner;
                        message += "<li>" + winner + "</li>";
                        nomineeCount--;
                    }
                }
            }
            message += "</ul>";
            message += "</div>";
        }
        $("#result").hide().html(message).fadeIn('slow');
        // scroll to func: $('body').scrollTo('#result');
        $("meta[property='og\\:description']").attr("content", $("#result").text());
    });
    // paylaş butonları
    $("body").floatingSocialShare({
        buttons: ["facebook","twitter"],
        text: share_text,
        title: title_text,
        description: $("#result").text(),
        url: window.location.href
    });
    // analitik
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-63148072-1', 'auto');
    ga('send', 'pageview');
});
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter32203149 = new Ya.Metrika({
                id:32203149,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
            });
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");
