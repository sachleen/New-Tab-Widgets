/**
* Stuff to be done at launch
*/
$(function () {
    purgeOldWidgets();
    
    templateFunctions = {
        /**
         * Truncates a string to a specified length
         * 
         * @param string string     The string to be truncated
         * @param length int        Length of truncated string (including optional dots)
         * @param showDots boolean  If true, three dots (...) will be concatinated to the end of the string.
         *
         * @return string   Returns the truncate string with optional dots at the end.
         *                  The total length of the string will be that of the length paramater.
         */
        truncate: function(string, length, showDots) {
            if(string.length <= length)
                return string;
            
            var dots = '';
            if(showDots) {
                length -= 3;
                dots = '...';
            }
            return string.substring(0, Math.min(length, string.length)) + dots;
        }
    }
});

/**
 * Checks to see if a widget is currently installed
 *
 * @param string widgetId The ID of the widget (Chrome extension ID) to check
 * @return boolean Returns true if widget is installed. False otherwise.
 */
function isInstalled(widgetId) {
    var installedWidgets = JSON.parse(localStorage['installedWidgets']);
    
    for(var col in installedWidgets) {
        var widgets = installedWidgets[col];
        for(var w in widgets) {
            if(widgetId == widgets[w])
                return true;
        }
    }
    
    return false;
}

/**
 * Adds a widget to the new tab page.
 *
 * @param string widgetId The ID of the widget (Chrome extension ID) to add
 */
function addWidget(widgetId) {
    var installedWidgets = JSON.parse(localStorage['installedWidgets']);
    installedWidgets[0].push(widgetId);
    localStorage['installedWidgets'] = JSON.stringify(installedWidgets);
}

/**
 * Removes a widget from the new tab page.
 *
 * @param string widgetId The ID of the widget (Chrome extension ID) to add
 */
function removeWidget(widgetId) {
    var installedWidgets = JSON.parse(localStorage['installedWidgets']);
    
    // Remove widget from installedWidgets
    for(var col in installedWidgets) {
        var widgets = installedWidgets[col];
        for(var w in widgets) {
            if(widgetId == widgets[w]) {
                installedWidgets[col].splice(parseInt(w), 1);
                break;
            }
        }
    }
    localStorage['installedWidgets'] = JSON.stringify(installedWidgets);
}

/**
 * Removes widgets that no longer exist (uninstalled or disabled) from the home page.
 */
function purgeOldWidgets() {
    var installedWidgets = JSON.parse(localStorage['installedWidgets']);
    
    for(var col in installedWidgets) {
        var widgets = installedWidgets[col];
        for(var w in widgets) {
            var widgetId = widgets[w];
            chrome.management.get(widgetId, function(result) {
                if(!result || !result.enabled) {
                    removeWidget(result.id);
                }
            });
        }
    }
}

/**
 * Gets widget information for specified widget.
 * Information includes name, type, description, icon, icon, height
 *
 * @param string widgetId The ID of the widget (Chrome extension ID) to add
 * @return array Returns an array with the widget's information
 */
function getWidgetInfo(widgetId) {
    chrome.management.get(widgetId, function(result) {
        
    });
}

/*************************/
(function(){
    // remove layerX and layerY
    var all = $.event.props,
        len = all.length,
        res = [];
    while (len--) {
      var el = all[len];
      if (el != 'layerX' && el != 'layerY') res.push(el);
    }
    $.event.props = res;
}());
/*************************/