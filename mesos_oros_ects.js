// ==UserScript==
// @name        mesos_oros_ects
// @namespace   nohponex
// @description Υπολογισμός (νέου) μέσου όρου βάση των μονάδων ECTS στην ιστοσελίδα του ITC για το auth.gr
// @include     https://sw*.eng.auth.gr/unistudent/stud_CResults.asp?studPg=1*
// @version     1
// @grant       none
// ==/UserScript==

//Include jQuery if not included
if (typeof jQuery == 'undefined') {
    if (typeof $ == 'function') {
        // warning, global var
        thisPageUsingOtherJSLibrary = true;
    }
    function getScript(url, success) {
        var script = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName('head') [0],
        done = false;
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                // callback function provided as param
                success();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            };
        };
        head.appendChild(script);
    };
    getScript('//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', function () {
        if (typeof jQuery == 'undefined') {
            // Super failsafe - still somehow failed...
        } else {
            // jQuery loaded! Make sure to use .noConflict just in case
            mesos_oros_ects();
        }
    });
} else {
    mesos_oros_ects();
};

//Main function
function mesos_oros_ects() {
    //Get all tr with course data
    var items = $('#mainTable>tbody>tr:nth-child(2) table>tbody>tr[height="25"]:not(.italicHeader)');
    var sum = 0;
    var passed = 0;
    var total_ECTS = 0;
    var total = 0;
    for (var i = 0, l = items.length; i < l; ++i) {
        var item = $(items[i]);
        var ECTS = parseInt($.trim(item.children('td') [5].innerHTML));
        var grade = $.trim($(item.children('td') [6]) .children('span')[0].innerHTML) .replace(',', '.');
        //If grade is numberic
        if ($.isNumeric(grade)) {
            grade = parseFloat(grade);
            //If grade is 
            if (grade >= 5) {
                total += grade * ECTS;
                total_ECTS += ECTS;
                sum += grade;
                ++passed;
            }
        }
    }
    var mean = Math.round((sum / passed) * 100) / 100;
    //alert( mean );
    var mean_ects = Math.round((total / total_ECTS) * 100) / 100;
    //alert( mean_ects );
    var result_tr = $('#mainTable>tbody>tr:nth-child(2) table>tbody>tr[height="20"]:last > td:last > b');
    if (!result_tr) {
        alert('Νέος Μέσος Όρος (ECTS) :' + mean_ects);
    } else {
        result_tr.append(' Νέος Μέσος Όρος (ECTS) : <span class="error">' + mean_ects + '</span>');
    }
}
