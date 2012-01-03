$(function () {
    fetchNews();
});

function fetchNews () {
    $('#news').empty();
    
    $.each(get('feeds', 'http://news.google.com/news?ned=us&topic=h&output=rss').split('\n'), function(index, value) {
        parseRSS(value, function(feed) {
            
            $('#news').append("<strong>"+feed.title+"</strong> &bull; <a target='_blank' class='more' href='"+feed.link+"'>More</a>");
            $.each(feed.entries, function(index) {
                //if(index < get('numArticles', 7))
                    $('#news').append("<a target='_blank' href='"+this.link+"'>"+this.title + "</a>");
            });
            
        });
    });
}

function parseRSS(url, callback) {
  $.ajax({
    url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+get('numArticles', 7)+'&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      callback(data.responseData.feed);
    }
  });
}

/**
 * Sets an option in localStorage
 * Modified version from main.js as setting options for specific widgets is not necessary
 *
 * @param option option to set
 * @param value  value of option
 */
function set(option, value)
{
    localStorage[option] = value;
}

/**
 * Gets an option from localStorage
 * Modified version from main.js as getting options from specific widgets is not necessary
 *
 * @param option        option to set
 * @param defaultValue  default value of option if it does not already exist.
 * @return              value of option from localStorage if it exists, defaultValue otherwise
 */
function get(option, defaultValue)
{
    if(localStorage[option] == undefined || !localStorage[option].length)
    {
        localStorage[option] = defaultValue;
        return defaultValue;
    }
    return localStorage[option];
}