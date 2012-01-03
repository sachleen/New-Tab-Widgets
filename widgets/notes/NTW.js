var NTWID = 'amhmpgdbfmjbfhdiapabmmikpeifjeeb';

function registerWidget(info) {
    chrome.extension.onRequestExternal.addListener(function(request, sender, sendResponse) {
        var parts = request.split('-');
        if(parts[0] == 'NewTabWidgets') {
            info['head'] = request + "back";
            chrome.extension.sendRequest(NTWID, info);
        }
    });
}