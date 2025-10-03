function updateClock() {
   const timezone = document.getElementById('timezone').value;
   const now = new Date();
   const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
      hour12: false
   };
   const timeString = now.toLocaleString('en-US', options);
   document.getElementById('clock').textContent = timeString;
}

function generateCalendar(year, month) {
   const today = new Date();
   const firstDay = new Date(year, month, 1);
   const lastDay = new Date(year, month + 1, 0);
   const calendar = [];
   let week = [];

   // Fill initial empty days
   for (let i = 0; i < firstDay.getDay(); i++) {
      week.push('');
   }

   // Fill days of the month
   for (let day = 1; day <= lastDay.getDate(); day++) {
      week.push(day);
      if (week.length === 7) {
         calendar.push(week);
         week = [];
      }
   }
   // Fill remaining days
   if (week.length > 0) {
      while (week.length < 7) week.push('');
      calendar.push(week);
   }

   // Generate HTML
   let html = `<table>
        <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
            <th>Thu</th><th>Fri</th><th>Sat</th>
        </tr>`;
   for (let w = 0; w < calendar.length; w++) {
      html += '<tr>';
      for (let d = 0; d < 7; d++) {
         const dayNum = calendar[w][d];
         let cls = '';
         if (
            dayNum === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
         ) {
            cls = 'today';
         }
         html += `<td class="${cls}">${dayNum ? dayNum : ''}</td>`;
      }
      html += '</tr>';
   }
   html += '</table>';
   return html;
}

function populateMonthSelect() {
   const monthSelect = document.getElementById('monthSelect');
   const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];
   monthSelect.innerHTML = '';
   monthNames.forEach((name, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = name;
      monthSelect.appendChild(opt);
   });
}

function populateYearSelect() {
   const yearSelect = document.getElementById('yearSelect');
   const currentYear = new Date().getFullYear();
   yearSelect.innerHTML = '';
   for (let y = currentYear - 100; y <= currentYear + 100; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
   }
}

function updateCalendar() {
   const month = parseInt(document.getElementById('monthSelect').value, 10);
   const year = parseInt(document.getElementById('yearSelect').value, 10);
   const calendarDiv = document.getElementById('calendar');
   calendarDiv.innerHTML = generateCalendar(year, month);
}

document.getElementById('timezone').addEventListener('change', updateClock);

populateMonthSelect();
populateYearSelect();

const now = new Date();
document.getElementById('monthSelect').value = now.getMonth();
document.getElementById('yearSelect').value = now.getFullYear();

document.getElementById('monthSelect').addEventListener('change', updateCalendar);
document.getElementById('yearSelect').addEventListener('change', updateCalendar);

updateClock();
updateCalendar();
setInterval(updateClock, 1000);