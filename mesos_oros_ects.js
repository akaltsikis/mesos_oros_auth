// ==UserScript==
// @name        mesos_oros_ects
// @namespace   https://github.com/NohponeX/mesos_oros_ects
// @author      NohponeX
// @description Υπολογισμός (νέου) μέσου όρου βάση των μονάδων ECTS στην ιστοσελίδα του ITC για το auth.gr
// @include     https://sw*.eng.auth.gr/unistudent/stud_CResults.asp?studPg=1*
// @version     1.2
// @grant       none
// @date        22.06.2014
// @updateURL   https://openuserjs.org/install/nohponex/httpsgithub.comNohponeXmesos_oros_ects/mesos_oros_ects.user.js
// ==/UserScript==

/**
 * Helper function, include a script and run a callback when it's loaded
 */
function getScript(url, success) {
    var script = document.createElement('script');
    script.src = url;
    var head = document.getElementsByTagName('head')[0],
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
//Include jQuery if not included
if (typeof jQuery == 'undefined') {    
    //Include jQuery script and run callback 
    getScript('//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', average_calculation );
} else {
    average_calculation();
};

/**
 * Main function
 */
function average_calculation(){
    //Get all tr with course data
    var items = $('#mainTable>tbody>tr:nth-child(2) table>tbody>tr[height="25"]:not(.italicHeader)');
    if( !items ){//If not found exit the function 
        return;
    }
    //Calculate mean
    var sum = 0;
    var passed_courses = 0;
    //To mean_ects
    var total_ECTS = 0;
    var total = 0;
    //For every course;  
    for (var i = 0, l = items.length; i < l; ++i) {
        var item = $(items[i]);
        //Parse ECTS FROM 5th td
        var ECTS = parseInt($.trim(item.children('td') [5].innerHTML));
        //Parse grade FROM 6th td
        var grade = $.trim($(item.children('td') [6]) .children('span')[0].innerHTML) .replace(',', '.');
        //If grade is numeric
        if ($.isNumeric(grade)) {
            grade = parseFloat(grade);
            //Ignore grades less than 5
            if (grade >= 5) {
                total += grade * ECTS;
                total_ECTS += ECTS;
                sum += grade;
                ++passed_courses;
            }
        }
    }
    var mean = Math.round( ( sum / passed_courses ) * 100 ) / 100;
    
    var mean_ects = Math.round( ( total / total_ECTS ) * 100 ) / 100;
    
    //Get the information's row
    var result_tr = $('#mainTable>tbody>tr:nth-child(2) table>tbody>tr[height="20"]:last > td:last > b');
    
    if (!result_tr) { //If not found alert the result
        alert('Νέος Μέσος Όρος (ECTS) :' + mean_ects);
    } else { //Add result to the end of the element
        result_tr.append(' Νέος Μέσος Όρος (ECTS) : <span class="error">' + mean_ects + '</span>');
    }
};
