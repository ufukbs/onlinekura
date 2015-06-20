$(document).ready(function(){
    $('#get-result').click(function(e){
        e.preventDefault();
        var lines = $('#user-input').val().replace(/(\r\n|\n|\r)/gm,' ').replace(',',' ').trim().split(' ');
        var message = "";
        var nomineeCount = $('#count').val();
        if((lines.length -1 < nomineeCount))
        {
            message = "<div class='alert alert-danger text-center'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span></button>";
            message += "Number of nominees should be higher than number of winners !";
            message += "</div>";
        }
        else if (nomineeCount<1)
        {
            message = "<div class='alert alert-danger text-center'>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Kapat'>" +
                "<span aria-hidden='true'>&times;</span></button>";
            message += "Number of winners should be higher than 0 !";
            message += "</div>";
        }
        else
        {
            message += "<div class='alert alert-success text-center'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span></button>";
            message += "<h3 class='special-border'><i class='fa fa-trophy'></i> Congratulations! <i class='fa fa-trophy'></i></h3>";
            message += "<ul class='ordered-list'>";
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
        $("meta[property='og\\:description']").attr("content", $("#result").text());
    });
    // paylaş butonları
    $("body").floatingSocialShare({
        buttons: ["facebook","twitter"],
        text: "Share: ",
        title: "Results",
        description: $("#result").text(),
        url: "http://www.onlinekura.com"
    });
    // analitik
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-63148072-1', 'auto');
    ga('send', 'pageview');
});