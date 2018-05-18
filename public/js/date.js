const m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");

const d = new Date();
const curr_date = d.getDate();
let sup = "";
if (curr_date == 1 || curr_date == 21 || curr_date ==31)
   {
   sup = "st";
   }
else if (curr_date == 2 || curr_date == 22)
   {
   sup = "nd";
   }
else if (curr_date == 3 || curr_date == 23)
   {
   sup = "rd";
   }
else
   {
   sup = "th";
   }

const curr_month = d.getMonth();
const curr_year = d.getFullYear();

document.getElementById('header-date').innerHTML = `Today is ${curr_date}<SUP>${sup}</SUP> ${m_names[curr_month]} ${curr_year}`;