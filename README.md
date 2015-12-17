mesos_oros_ects
===============
_Created for students of Electrical & Computer Engineering — AUTh_

Υπολογισμός (νέου?) μέσου όρου βάση των μονάδων ECTS στην ιστοσελίδα του ITC για το auth.gr

### Εγκατάσταση με Greasemonkey για Firefox ή Tampermonkey για Chrome ###
https://openuserjs.org/scripts/nohponex/mesos_oros_ects

### Εναλλακτικά μέσω κονσόλας σε Firefox και Chrome ###
**Έχοντας ανοιχτή τη σελίδα των βαθμολογιών στo itc, αντιγράψτε τον κώδικα :**

```javascript
!function(){var e=function(){var e=document.querySelectorAll('#adminTable3>tbody>tr');if(e){for(var t=0,r=0,a=0,l=0,n=0,o=e.length;o>n;++n){var i=e[n],d=parseInt(i.querySelectorAll('td')[5].innerHTML.trim()),c=i.querySelectorAll('td')[8].innerHTML.trim();isNaN(c)||(c=parseFloat(c),c>=5&&(l+=c*d,a+=d,t+=c,++r))}var h=(Math.round(t/r*100)/100,Math.round(l/a*100)/100),u=document.querySelector('h3:last-child');u?u.insertAdjacentHTML('beforeend',' Νέος Μέσος Όρος (ECTS) : <b>'+h+'</b>'):alert('Νέος Μέσος Όρος (ECTS) :'+h)}};e()}();
```


**Κάντε επικόλληση στην Console του Firefox ή του Chrome και πατήστε Enter.**
Η ένδειξη του Μ.Ο. με τα ECTS εμφανίζεται κάτω κάτω διπλά στον κανονικό Μ.Ο.
