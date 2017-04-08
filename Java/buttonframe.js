var selectedText;

var selectionEndTimeout = null;

// bind selection change event to my function
document.onselectionchange = userSelectionChanged;

function userSelectionChanged() {
    // wait 500 ms after the last selection change event
    if (selectionEndTimeout) {
        clearTimeout(selectionEndTimeout);
        $('.log ol').append('<li>User Selection Changed</li>');
        // scroll to bottom of the div
        $('.log').scrollTop($('.log ol').height());
    }
    selectionEndTimeout = setTimeout(function () {
        $(window).trigger('selectionEnd');
    }, 500);
}


// helper function
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}


function changeAnkiLink(){
    var link = 'anki://x-callback-url/addnote?' + encodeURIComponent('profile=User 1&type=Basic&=Default&fldFront=' + selectedText);
    document.getElementById("ankilink").href = link; 
    //alert(link);
}

(function(){

    // the minimum version of jQuery we want
    var v = "1.3.2";

    // check for jQuery. if it exists, verify it's not too old.
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "https://apps.bdimg.com/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }
    
    function initMyBookmarklet() {
        $(window).bind('selectionEnd', function () {
            // reset selection timeout
            selectionEndTimeout = null;

            // TODO: Do your cool stuff here........

            // get user selection
            selectedText = getSelectionText();
            // if the selection is not empty show it :)
            if(selectedText != ''){
                // change anki link
                changeAnkiLink();
            }
        });
        
        (window.myBookmarklet = function() {
            $("body").append("\
            <div id='ankiframe'>\
                <div id='ankiframe_veil' style=''>\
                    <a id='ankilink' href=\"anki://\"><img src=\"https://raw.githubusercontent.com/ninja33/anki-excel-helper/master/Java/plus_64.png\"></a>\
                </div>\
                <style type='text/css'>\
                    #ankiframe { float: right; }\
                    #ankiframe_veil { display: block; position: fixed; bottom: 10px; right: 10px; cursor: pointer; z-index: 900; }\
                </style>\
            </div>");
        })();
    }

})();
