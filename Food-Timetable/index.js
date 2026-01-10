(() => {
   const STORAGE_KEY = 'foodTimetable_v1';
   const defaults = [
      { meal: 'Breakfast', time: '07:00' },
      { meal: 'Mid-morning Snack', time: '10:30' },
      { meal: 'Lunch', time: '13:00' },
      { meal: 'Afternoon Snack', time: '16:00' },
      { meal: 'Dinner', time: '19:00' },
      { meal: 'Bedtime Snack', time: '21:30' }
   ];

   const $ = selector => document.querySelector(selector);
   const tbody = document.querySelector('#timetable tbody');
   const nowTime = $('#nowTime');
   const nextMealLabel = $('#nextMeal');
   const countdownLabel = $('#countdown');
   const saveBtn = $('#saveBtn');
   const resetBtn = $('#resetBtn');

   function loadSchedule() {
      try {
         const raw = localStorage.getItem(STORAGE_KEY);
         if (!raw) return defaults.slice();
         const parsed = JSON.parse(raw);
         if (!Array.isArray(parsed)) return defaults.slice();
         return parsed;
      } catch (e) { return defaults.slice() }
   }

   function saveSchedule(schedule) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
   }

   function renderTable(schedule) {
      tbody.innerHTML = '';
      schedule.forEach((row, idx) => {
         const tr = document.createElement('tr');
         tr.dataset.index = idx;

         const numberTd = document.createElement('td');
         numberTd.textContent = String(idx + 1);

         const mealTd = document.createElement('td');
         const mealInput = document.createElement('input');
         mealInput.type = 'text';
         mealInput.value = row.meal;
         mealInput.addEventListener('input', () => schedule[idx].meal = mealInput.value);
         mealTd.appendChild(mealInput);

         const timeTd = document.createElement('td');
         const timeInput = document.createElement('input');
         timeInput.type = 'time';
         timeInput.value = row.time;
         timeInput.addEventListener('input', () => schedule[idx].time = timeInput.value);
         timeTd.appendChild(timeInput);

         tr.appendChild(numberTd);
         tr.appendChild(mealTd);
         tr.appendChild(timeTd);
         tbody.appendChild(tr);
      });
   }

   function parseTodayTime(hhmm) {
      const [hh, mm] = hhmm.split(':').map(Number);
      const d = new Date();
      d.setHours(hh, mm, 0, 0);
      return d;
   }

   function getNextMeal(schedule) {
      const now = new Date();
      // map to today's Date objects
      const times = schedule.map((s, i) => ({
         i,
         meal: s.meal,
         timeStr: s.time,
         date: parseTodayTime(s.time)
      }));

      // find next with date > now
      for (const t of times) {
         if (t.date.getTime() > now.getTime()) return t;
      }
      // none left -> return first meal tomorrow (add 1 day)
      const first = times[0];
      const dt = new Date(first.date.getTime() + 24 * 60 * 60 * 1000);
      return { ...first, date: dt };
   }

   function formatHMS(totalMs) {
      if (totalMs < 0) totalMs = 0;
      const sec = Math.floor(totalMs / 1000) % 60;
      const min = Math.floor(totalMs / 60000) % 60;
      const hr = Math.floor(totalMs / 3600000);
      return [hr, min, sec].map(n => String(n).padStart(2, '0')).join(':');
   }

   function updateClock(schedule) {
      const now = new Date();
      nowTime.textContent = now.toLocaleTimeString();
      const next = getNextMeal(schedule);
      nextMealLabel.textContent = `${next.meal} (${next.timeStr})`;
      const ms = next.date.getTime() - now.getTime();
      countdownLabel.textContent = formatHMS(ms);

      // highlight row
      Array.from(tbody.children).forEach(tr => tr.classList.remove('next'));
      const idx = next.i % schedule.length;
      const row = tbody.querySelector(`tr[data-index="${idx}"]`);
      if (row) row.classList.add('next');
   }

   // init
   let schedule = loadSchedule();
   renderTable(schedule);
   updateClock(schedule);

   // tick every second
   setInterval(() => updateClock(schedule), 1000);

   saveBtn.addEventListener('click', () => {
      saveSchedule(schedule);
      saveBtn.textContent = 'Saved ✓';
      setTimeout(() => saveBtn.textContent = 'Save', 1400);
   });

   resetBtn.addEventListener('click', () => {
      if (!confirm('Reset schedule to sensible defaults?')) return;
      schedule = defaults.map(d => ({ ...d }));
      renderTable(schedule);
      saveSchedule(schedule);
   });

   // allow Enter to save when focused in inputs
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
         saveSchedule(schedule);
         saveBtn.textContent = 'Saved ✓';
         setTimeout(() => saveBtn.textContent = 'Save', 1200);
      }
   });

})();
