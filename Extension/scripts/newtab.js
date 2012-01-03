/**
* Stuff to be done at launch
*/
$(function () {
    /* Generate a key to use when sending a request to extensions.
     * The key is important when there are multiple new tab pages open
     * at the same time. This prevents other tabs from picking up the
     * pokeback and adding duplicate widgets.
     */
    key = new Date().getTime();
    
    var installedWidgets = JSON.parse(localStorage['installedWidgets']);
    var widgets = JSON.parse(localStorage['widgets']);
    
    /*
     * Populate the new tab page with the installed widgets
     */
    for(var col in installedWidgets) {
        var widgetsCol = installedWidgets[col];
        for(var w in widgetsCol) {
            for(i in widgets) {
                if(widgets[i].id == widgetsCol[w]) {
                    //var h = widgets[i].height;
                    //h = h * 100 + (37*(h-1));
                    widgets[i].height = calculateHeight(widgets[i].height);
                    $("#widgetTemplate").tmpl(widgets[i], templateFunctions).appendTo("#col_" + col);
                    break;
                }
            }
        }
    }
    
    /*
     * Makes widgets sortable by drag and drop
     */
    $(".column").sortable({ 
        handle : '.header',
        placeholder: "ui-state-highlight",
        connectWith: ".column",
        containment: 'body',
        tolerance: 'pointer',
        helper: function() {
            return $(document.createElement('div'))
        },
        update : function () {
            installedWidgets = new Array();
            $(".column").each(function(elem) {
                installedWidgets.push($(this).sortable('toArray'));
            });
            
            localStorage['installedWidgets'] = JSON.stringify(installedWidgets);
        } 
    });
    
    // Modal window stuff
    $("#modal").hide();
    $("#modalBG").hide();
    $("#closeModal").live('click', function() {
        closeModal();
    });
    
    /*
     * Sets some CSS rules based on user's preferences
     */
    $("body").css("background", "url('" + localStorage['wallpaper'] + "') top center");
    
    /* 
     * Handle widgets wanting to change things dynamically
     */
    chrome.extension.onRequestExternal.addListener(function(request, sender, sendResponse) {
        if(request.head) {
            if(request.head == 'NewTabWidgets-setTitle') {
                $('#' + sender.id + ' .title').html(request.content);
            } else if(request.head == 'NewTabWidgets-setHeight') {
                $('#' + sender.id + ' iframe').attr('style', 'height:' + calculateHeight(request.content) + 'px');
            }
        }
    });
});

function calculateHeight(height) {
    return height * 100 + (37*(height-1));
}

/**
 * Opens a modal window
 *
 * @param HTML element widget This element must have the following attributes:
 *                            extName (string) The neame of the widget
 *                            extId (string) The ID of the extension
 *                            extOptions (string) The name of the options file to load.
 */
function openModal(widget) {
    var data = {
        title: $(widget).attr('extName'),
        id: $(widget).attr('extId'),
        options: $(widget).attr('extOptions')
    }
    $("#modal").html($("#modalTemplate").tmpl(data, templateFunctions));
    
    $("#modalBG").fadeIn(function() { $("#modal").fadeIn(); });
    $("body").addClass("hideOverflow");
}

/**
 * Closes the modal window.
 */
function closeModal() {
    $("#modal").fadeOut(function() { $("#modalBG").fadeOut(); });
    $("body").removeClass("hideOverflow");
}