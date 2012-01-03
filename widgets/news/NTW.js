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

function setTitle(title) {
    var data = {
        head: 'NewTabWidgets-setTitle',
        content: title
    }
    chrome.extension.sendRequest(NTWID, data);
}

function setHeight(height) {
    var data = {
        head: 'NewTabWidgets-setHeight',
        content: height
    }
    chrome.extension.sendRequest(NTWID, data);
}