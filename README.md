mesos_oros_ects
===============
Υπολογισμός (νέου) μέσου όρου βάση των μονάδων ECTS στην ιστοσελίδα του ITC για το auth.gr

### Εγκατάσταση με Greasemonkey για Firefox ή Tampermonkey για Chrome ###
https://openuserjs.org/libs/nohponex/mesos_oros_ects

### Εναλλακτικά μέσω κονσόλας σε Firefox και Chrome ###
**Έχοντας ανοιχτή τη σελίδα των βαθμολογιών στo itc, αντιγράψτε τον κώδικα :**

``function mesos_oros_ects(){var e=$('#mainTable>tbody>tr:nth-child(2) table>tbody>tr[height="25"]:not(.italicHeader)');var t=0;var n=0;var r=0;var i=0;for(var s=0,o=e.length;s<o;++s){var u=$(e[s]);var a=parseInt($.trim(u.children("td")[5].innerHTML));var f=$.trim($(u.children("td")[6]).children("span")[0].innerHTML).replace(",",".");if($.isNumeric(f)){f=parseFloat(f);if(f>=5){i+=f*a;r+=a;t+=f;++n}}}var l=Math.round(t/n*100)/100;var c=Math.round(i/r*100)/100;var h=$('#mainTable>tbody>tr:nth-child(2) table>tbody>tr[height="20"]:last > td:last > b');if(!h){alert("Νέος Μέσος Όρος (ECTS) :"+c)}else{h.append(' Νέος Μέσος Όρος (ECTS) : <span class="error">'+c+"</span>")}}if(typeof jQuery=="undefined"){if(typeof $=="function"){thisPageUsingOtherJSLibrary=true}function getScript(e,t){var n=document.createElement("script");n.src=e;var r=document.getElementsByTagName("head")[0],i=false;n.onload=n.onreadystatechange=function(){if(!i&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){i=true;t();n.onload=n.onreadystatechange=null;r.removeChild(n)}};r.appendChild(n)}getScript("//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js",function(){if(typeof jQuery=="undefined"){}else{mesos_oros_ects()}})}else{mesos_oros_ects()}``


**Κάντε επικόλληση στην Console του Firefox ή του Chrome και πατήστε Enter.**
Η ένδειξη του Μ.Ο. με τα ECTS εμφανίζεται κάτω κάτω διπλά στον κανονικό Μ.Ο. 
