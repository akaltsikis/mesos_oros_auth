// ==UserScript==
// @name        mesos_oros_ects
// @namespace   https://github.com/nohponex/mesos_oros_ects
// @author      nohponex
// @contributor ioantsaf
// @description Created for students of Electrical & Computer Engineering — AUTh, Υπολογισμός (νέου) μέσου όρου βάση των μονάδων ECTS στην ιστοσελίδα του ITC για το auth.gr
// @include     https://sis.auth.gr/new/all_grades*
// @version     2.0
// @grant       none
// @date        23.05.2015
// @updateURL   https://raw.githubusercontent.com/nohponex/mesos_oros_ects/master/mesos_oros_ects.user.js
// @run-at document-end
// ==/UserScript==

(function(){
  /**
   * Main function
   */
  var average_calculation = function(){
    //Get all tr with course data
    var items = document.querySelectorAll('#adminTable3>tbody>tr');
    if(!items){//If not found exit the function 
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
      var item = items[i];
      //Parse ECTS FROM 5th td
      var ECTS = parseInt(item.querySelectorAll('td')[5].innerHTML.trim());
      //Parse grade FROM 8th td
      var grade = item.querySelectorAll('td')[8].innerHTML.trim();
      //If grade is numeric
      if (!isNaN(grade)) {
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
    var mean = Math.round((sum / passed_courses) * 100) / 100;
    
    var mean_ects = Math.round((total / total_ECTS) * 100) / 100;
    
    //Get the information's row
    var result_tr = document.querySelector('h3:last-child');
    
    if (!result_tr) { //If not found alert the result
      alert('Νέος Μέσος Όρος (ECTS) :' + mean_ects);
    } else { //Add result to the end of the element
      result_tr.insertAdjacentHTML('beforeend', ' Νέος Μέσος Όρος (ECTS) : <b>' + mean_ects + '</b>');
    }
  };
  average_calculation();
})();
