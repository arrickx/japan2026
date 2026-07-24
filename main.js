// main.js - Japan Travel Web App Logic

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCountdown();
  initItineraryFilter();
  initCardExpandable();
  initChecklist();
  initPhrasebook();
});

/* -------------------------------------------------------------
 * 1. Bottom Tab Navigation (View Transitions Progressive Enhancement)
 * ------------------------------------------------------------- */
function initNavigation() {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTabId = item.getAttribute('data-tab');

      const updateDOM = () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        tabPanels.forEach(panel => {
          if (panel.id === targetTabId) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      // Modern View Transitions API check
      if (document.startViewTransition) {
        document.startViewTransition(updateDOM);
      } else {
        updateDOM();
      }
    });
  });
}

/* -------------------------------------------------------------
 * 2. Countdown Timer
 * ------------------------------------------------------------- */
function initCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 60000);
}

/* -------------------------------------------------------------
 * 3. Itinerary Filter
 * ------------------------------------------------------------- */
function initItineraryFilter() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.timeline-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const selectedDay = chip.getAttribute('data-day');

      cards.forEach(card => {
        if (selectedDay === 'all' || card.getAttribute('data-day') === selectedDay) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 4. Expandable Details Toggle
 * ------------------------------------------------------------- */
function initCardExpandable() {
  const toggleBtns = document.querySelectorAll('.btn-detail-toggle');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cardBody = btn.closest('.card-body');
      const details = cardBody.querySelector('.card-expandable-details');

      if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        btn.textContent = '收起详情 👆';
      } else {
        details.classList.add('hidden');
        btn.textContent = '查看攻略详情 👇';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. Interactive Checklist (LocalStorage)
 * ------------------------------------------------------------- */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.check-items input[type="checkbox"]');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('checklist-percentage');

  const savedState = JSON.parse(localStorage.getItem('japan_trip_checklist') || '{}');

  function updateProgress() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      const id = cb.getAttribute('data-id');
      if (savedState[id]) {
        cb.checked = true;
        checkedCount++;
      } else {
        cb.checked = false;
      }
    });

    const pct = checkboxes.length ? Math.round((checkedCount / checkboxes.length) * 100) : 0;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${pct}%`;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-id');
      savedState[id] = cb.checked;
      localStorage.setItem('japan_trip_checklist', JSON.stringify(savedState));
      updateProgress();
    });
  });

  updateProgress();
}

/* -------------------------------------------------------------
 * 6. Phrasebook (Speech Synthesis & Copy)
 * ------------------------------------------------------------- */
function initPhrasebook() {
  const speechBtns = document.querySelectorAll('.btn-speech');
  const copyBtns = document.querySelectorAll('.btn-copy');

  speechBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      if (!('speechSynthesis' in window)) {
        alert('您的浏览器暂不支持声音播放');
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    });
  });

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = '✅ 已复制!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      });
    });
  });
}
