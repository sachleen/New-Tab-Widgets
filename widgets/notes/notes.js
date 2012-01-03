$(function () {
        $("#notes").html(get('notes', ''));
        
        $("#notes").keyup(function() {
            set('notes', $("#notes").html());
        });
});

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