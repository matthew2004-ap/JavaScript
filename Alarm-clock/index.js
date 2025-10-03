// Alarm Clock - Plays sound at set time
const clockDisplay = document.getElementById('clockDisplay');
const alarmForm = document.getElementById('alarmForm');
const alarmTimeInput = document.getElementById('alarmTime');
const clearAlarmBtn = document.getElementById('clearAlarm');
const alarmStatus = document.getElementById('alarmStatus');
const alarmSound = document.getElementById('alarmSound');

let alarmTime = null;
let alarmTimeout = null;

function updateClock() {
   const now = new Date();
   const h = String(now.getHours()).padStart(2, '0');
   const m = String(now.getMinutes()).padStart(2, '0');
   const s = String(now.getSeconds()).padStart(2, '0');
   clockDisplay.textContent = `${h}:${m}:${s}`;

   if (alarmTime && `${h}:${m}` === alarmTime) {
      triggerAlarm();
   }
}

function triggerAlarm() {
   alarmSound.currentTime = 0;
   alarmSound.play();
   alarmStatus.textContent = '⏰ Alarm ringing!';
   alarmTime = null;
   setTimeout(() => {
      alarmSound.pause();
      alarmSound.currentTime = 0;
      alarmStatus.textContent = '';
   }, 30 * 1000); // auto-stop after 30s
}

alarmForm.addEventListener('submit', function (e) {
   e.preventDefault();
   const timeVal = alarmTimeInput.value;
   if (!timeVal) {
      alarmStatus.textContent = 'Please select a time.';
      return;
   }
   alarmTime = timeVal;
   alarmStatus.textContent = `Alarm set for ${alarmTime}`;
});

clearAlarmBtn.addEventListener('click', function () {
   alarmTime = null;
   alarmStatus.textContent = 'Alarm cleared.';
   alarmSound.pause();
   alarmSound.currentTime = 0;
});

setInterval(updateClock, 1000);
updateClock();
