$(function () {
    order = get('locations', '95823').split(',')
    
    var height = order.length;
    if(height > 3) height = 3;
    setHeight(height);
    
    $.each(order, function(index, value) {
        order[order.indexOf(value)] = $.trim(value);
        set('locations', order);
        getWeather(value, get('units', 'f'));
    });
    
    function getWeather(zip, units) {
        $.simpleWeather({
            zipcode: zip,
            unit: units,
            success: function(weather) {
                html  = '<div class="weatherBox" id="' + zip + '" style="background:url(\'' + weather.image + '\') 0 -5px no-repeat">';
                html += '<div class="weatherData">';
                html += '<div class="location">'+weather.city + ', ' + weather.region+' [<a href="http://www.weather.com/weather/5-day/'+weather.city + "+" + weather.region + "+" + zip+'" id="more">More</a>]</div>';
                html += '<div class="currentTemp">'+weather.temp + '&deg;' + weather.units.temp+'</div>';
                html += '<div class="today">'+weather.high + '&deg;' + weather.units.temp + ' / ' + weather.low + '&deg;' + weather.units.temp+'</div>';
                html += '<div class="tomorrow">'+weather.tomorrow.day+ ': '+weather.tomorrow.forecast + ", " + weather.tomorrow.high + '&deg;' + weather.units.temp + ' / ' + weather.tomorrow.low + '&deg;' + weather.units.temp+'</div>';
                html += '</div></div></div>';
                $("#weather .content").append(html);
                
                $('.weatherBox').sort(sortAscending).appendTo('.content');
            },
            error: function(error) {
                $("#weather .content").html("<p>"+error+"</p>");
            }
        });
    }
});


function sortAscending(a, b) {
    var order = get('locations', '95823').split(',');
    return order.indexOf($(a).attr('id')) > order.indexOf($(b).attr('id')) ? 1 : -1;
};


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