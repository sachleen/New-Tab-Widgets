/**
* Stuff to be done at launch
*/
$(function () {
    var installedWidgets = JSON.parse(localStorage['installedWidgets']);
    
    chrome.management.getAll(function(list) {
        for (var i in list)
        {
            var ext = list[i];
            if(ext.enabled && !ext.isApp)
            {
                var extId = ext.id;
                chrome.extension.sendRequest(extId, "NewTabWidgets-op");
            }
        }
    });
    
    $('#wallpapers').hide();
    
    $("button[action=add]").live('click', function() {
        var extId = $(this).attr('extId');
        addWidget(extId);
        location.reload()
    });
    $("button[action=remove]").live('click', function() {
        var extId = $(this).attr('extId');
        removeWidget(extId);
        location.reload()
    });
    
    $('#wallpapers img').live('click', function() {
        var id = $(this).attr('id');
        console.log(id);
        localStorage['wallpaper'] = id;
        alert("Wallpaper changed!");
    });
});

/*
 * Add widgets to the availableWidgets list in alphabetical order
 */
widgets = new Array();
chrome.extension.onRequestExternal.addListener(function(request, sender, sendResponse) {
    if(request.head && request.head == 'NewTabWidgets-opback') {
        request['id'] = sender.id;
        
        /*
         * Widgets
         */
        if(request.type == 'widget') {
            $('#noWidgets').hide();
            
            console.log(sender.id);
            if(isInstalled(sender.id))
                request['installed'] = 'true';
            
            /*
             * I store the information of all the widgets in localStorage so it's easier
             * to load on the new tab page. The alternative is to fetch it from the widget
             * each time, but I'd have to send a request and have a listener that adds the
             * widgets to the DOM. The order in which they respond cannot be predicted so
             * the widgets are often out of order.
             */
            widgets.push(request);
            localStorage['widgets'] = JSON.stringify(widgets);
            $("#widgetTemplate").tmpl(request, templateFunctions).appendTo('#availableWidgets');
            
            /*
             * Inserting the items into their correct position would be more efficient but 
             * resulted in a duplicate insertion for one item some of the time. I think it has
             * to do with the request callbacks happening at once but could not pinpoint the issue.
             */
            $('#availableWidgets li').sort(sortAscending).appendTo('#availableWidgets');
        }
        /*
         * Wallpaper Packs
         */
        else if(request.type == 'wallpack') {
            $('#noWalls').hide();
            $('#wallpapers').show();
            $("#wallpaperTemplate").tmpl(request, templateFunctions).appendTo('#wallpapers');
        }
    }
});


function sortAscending(a, b) {
    return $(a).find('img').attr('alt') > $(b).find('img').attr('alt') ? 1 : -1;
};
function sortDescending(a, b) {
    return $(a).find('img').attr('alt') < $(b).find('img').attr('alt') ? 1 : -1;
};