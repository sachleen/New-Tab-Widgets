/**
* Stuff to be done at launch
*/
$(function () {
    var widgets = new Array();
    
    widgets.push({
        name: 'Clock',
        icon: 'images/widgetIcons/clock.png',
        description: 'Digital clock',
        url: 'https://chrome.google.com/webstore/detail/honapcbjnpignpncmckkcbelnaibpani'
    });
    
    widgets.push({
        name: 'News Reader',
        icon: 'images/widgetIcons/news.png',
        description: 'RSS Feed Reader',
        url: 'https://chrome.google.com/webstore/detail/fpfflfmbiphcfeobaipcmhnkabnaojcl'
    });
    
    widgets.push({
        name: 'Notes',
        icon: 'images/widgetIcons/notes.png',
        description: 'Simple notepad widget',
        url: 'https://chrome.google.com/webstore/detail/ohlgbaalfighcjhmhblmoibaadojdnmd'
    });
    
    widgets.push({
        name: 'Weather',
        icon: 'images/widgetIcons/weather.png',
        description: 'Shows the weather for multiple locations',
        url: 'https://chrome.google.com/webstore/detail/cghhhjkhaepapddmcghgadmkiajjgnid'
    });
    
    for(w in widgets) {
        $("#widgetTemplate").tmpl(widgets[w]).appendTo('#widgetContainer');
    }
    
    $('#widgetContainer div.widget').click(function() {
        window.open($(this).attr('id'));
    });
    
    $('#dontShowWelcome').click(function() {
        localStorage['showWelcome'] = 'false';
        $(this).fadeOut();
    });
});