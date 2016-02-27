var error_nominee_no_text, error_nominee_count_text, success_text, share_text, title_text, close_text, error_unique_winner_text;

if(document.URL.indexOf("en") >= 0) {
    close_text = "Close";
    error_nominee_no_text = "Number of nominees should be higher than number of winners !";
    error_nominee_count_text = "Number of winners should be higher than 0 !";
    error_unique_winner_text = "Number of unique nominees should be higher than number of winners !";
    success_text = "Congratulations!";
    share_text = "share: ";
    title_text = "Winner";
} else {
    close_text = "Kapat";
    error_nominee_no_text = "Aday sayısı kazanan sayısından fazla olmalıdır !";
    error_nominee_count_text = "Kazanan sayısı en az 1 olmalıdır !";
    error_unique_winner_text = "Farklı aday sayısı, muhtemel kazanan sayısından fazla olmalıdır !";
    success_text = "Tebrikler";
    share_text = "paylaş: ";
    title_text = "Kazananlar";
}

function failureTheme(error_text) {
    return "<div class='alert alert-danger text-center'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='"+close_text+"'>" +
        "<span aria-hidden='true'>&times;</span></button>" +
        error_text +
        "</div>";
}

function successTheme(success_text) {
    return "<div class='alert alert-success text-center'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='"+close_text+"'>" +
        "<span aria-hidden='true'>&times;</span></button>" +
        "<h3 class='special-border'><i class='fa fa-trophy'></i> "+success_text+" <i class='fa fa-trophy'></i></h3>" +
        "<ul class='ordered-list'>";
}

var error_nominee_no = failureTheme(error_nominee_no_text),
    error_nominee_count = failureTheme(error_nominee_count_text),
    error_unique_winner = failureTheme(error_unique_winner_text),
    success = successTheme(success_text);

$(function() {
    $('#get-result').click(function(e) {
        e.preventDefault();
        var lines = $('#user-input').val().replace(/[^\u00BF-\u1FFF\u2C00-\uD7FF\w]+/g," ").trim().split(' '),
            initial_length = lines.length,
            lines = $.unique(lines), // eval on unique values only
            final_length = lines.length,
            message = "",
            nomineeCount = $('#count').val();

        if(initial_length > final_length && final_length - 1 < nomineeCount) {
            message += error_unique_winner;
        }
        else if(final_length - 1 < nomineeCount) {
            message += error_nominee_no;
        }
        else if (nomineeCount < 1) {
            message += error_nominee_count;
        }
        else {
            message += success;
            var winners = [];
            while(nomineeCount != 0) {
                for(var i = 0; i < nomineeCount; i++) {
                    var winner = lines[Math.floor(final_length * Math.random())];
                    if($.inArray(winner, winners) <= -1) {
                        winners[i] = winner;
                        message += "<li>" + winner + "</li>";
                        nomineeCount--;
                    }
                }
            }
            message += "</ul></div>";
        }
        $("#result").hide().html(message).fadeIn('slow');
        // scroll to func: $('body').scrollTo('#result');
        $("meta[property='og\\:description']").attr("content", $("#result").text());
    });
    // share buttons
    $("body").floatingSocialShare({
        buttons: ["facebook","twitter"],
        text: share_text,
        title: title_text,
        description: $("#result").text(),
        url: window.location.href,
        counter: false
    });
});
