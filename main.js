// ============================================================
// 行程資料 — 在這裡新增或修改每天的行程
// ============================================================
const ITINERARY = [
  {
    phase: '第一階段：東京初探',
    phaseDates: '8/31 – 9/4',
    days: [
      {
        date: '8/31',
        dayNum: 'Day 1',
        title: '抵達東京 · 涉谷絕美夜景',
        summary: '搭機抵達羽田，辦理入住，傍晚涉谷屋頂夜景',
        illustration: './images/shibuya.jpg',
        activities: [
          {
            time: '13:35',
            name: '✈️ 抵達羽田機場 (HND)',
            desc: '搭乘 NH 7545 抵達。完成入關與行李提取（預計需 1.5 小時）。',
            address: '東京都大田區羽田空港 3-3-2',
            mapLink: 'https://maps.google.com/?q=Haneda+Airport+Tokyo',
            notes: '入關後請取行李、換現金（機場有 7-Eleven ATM），再前往巴士乘車處。',
          },
          {
            time: '15:00',
            name: '🚌 搭機場大巴前往涉谷',
            desc: '購買 15:15 或 15:45 班次的機場巴士，目的地：涉谷 (Shibuya)。',
            address: '羽田機場第三航廈 1F 巴士站',
            mapLink: 'https://maps.google.com/?q=Haneda+Airport+Terminal+3+Bus+Stop',
            notes: '此時間非通勤高峰，路況良好。票價約 ¥1,300，可現場購票或 IC 卡支付。',
          },
          {
            time: '16:00',
            name: '🏨 抵達涉谷站 · 步行至酒店',
            desc: '在涉谷 Fukuras 下車，通過無障礙人行天橋直達 Sakura Stage 的 Hyatt House 酒店，推行李約 5 分鐘可達。',
            address: '渋谷区桜丘町 1-4（Hyatt House Tokyo Shibuya）',
            mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya',
            notes: '',
          },
          {
            time: '16:30',
            name: '🛎️ 辦理入住，安頓行李',
            desc: '',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '17:15',
            name: '🍽️ 錯峰晚餐（涉谷站周邊）',
            desc: '避開晚高峰，在涉谷站周邊（如 Scramble Square 或 Fukuras 樓上）享用晚餐。',
            address: '涉谷 Scramble Square（渋谷区渋谷 2-24-12）',
            mapLink: 'https://maps.google.com/?q=Shibuya+Scramble+Square+Tokyo',
            notes: '建議提早吃，避免 18:00–20:00 的人潮高峰。',
          },
          {
            time: '18:00',
            name: '🌆 Fukuras 17F 屋頂花園（SHIBU NIWA）',
            desc: '坐直梯至酒店天橋對面的 Fukuras 17F 屋頂花園。免費入場、無需預約、嬰兒車可直達，可俯瞰涉谷十字路口夜景。',
            address: '東京都渋谷区道玄坂 1-2-3 渋谷フクラス 17F',
            mapLink: 'https://maps.google.com/?q=Shibu+Niwa+Rooftop+Fukuras+Shibuya',
            notes: '完全免費！無需預約，直梯可上。是觀賞涉谷夜景的隱藏好地點。',
          },
          {
            time: '19:00',
            name: '🛒 MEGA Don Quijote 涉谷本店',
            desc: '前往採購首日嬰兒用品與生活補給（尿布、零食、飲料等）。',
            address: '東京都渋谷区宇田川町 28-6',
            mapLink: 'https://maps.google.com/?q=MEGA+Don+Quijote+Shibuya',
            notes: '商場通道較窄且晚間人流多，建議乘坐直梯移動。可考慮分頭行動：一人購物，另一人在外照顧嬰兒車。',
          },
          {
            time: '20:30',
            name: '🌙 返回酒店休息',
            desc: '早些休息，適應時差，為明天做好準備。',
            address: '',
            mapLink: '',
            notes: '',
          },
        ],
      },
      // 之後的天數陸續在此新增…
    ],
  },
];

// ============================================================
// 渲染邏輯
// ============================================================
function renderItinerary() {
  const container = document.getElementById('itinerary-list');
  if (!container) return;

  ITINERARY.forEach(phase => {
    // 階段標題
    const phaseEl = document.createElement('div');
    phaseEl.className = 'phase-header';
    phaseEl.innerHTML = `
      <div class="phase-line"></div>
      <div class="phase-label">🗺️ ${phase.phase}（${phase.phaseDates}）</div>
      <div class="phase-line"></div>
    `;
    container.appendChild(phaseEl);

    // 每天的卡片
    phase.days.forEach(day => {
      const card = document.createElement('div');
      card.className = 'day-card';
      card.setAttribute('data-date', day.date); // e.g. "8/31"

      // 插圖（若有）
      const illustHtml = day.illustration
        ? `<img src="${day.illustration}" alt="${day.title}" class="card-illus" loading="lazy" />`
        : '';

      // 頭部
      const header = document.createElement('div');
      header.className = 'day-header';
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', 'false');
      header.innerHTML = `
        <div class="day-badge">
          <span class="badge-day">${day.dayNum}</span>
          ${day.date}
        </div>
        <div class="day-title-group">
          <div class="day-title">${day.title}</div>
          <div class="day-summary">${day.summary}</div>
        </div>
        <span class="day-arrow">▼</span>
      `;

      // 內容
      const body = document.createElement('div');
      body.className = 'day-body';

      // 插圖放在展開內容頂部
      if (day.illustration) {
        const img = document.createElement('img');
        img.src = day.illustration;
        img.alt = day.title;
        img.className = 'card-illus';
        img.loading = 'lazy';
        body.appendChild(img);
      }

      const list = document.createElement('ul');
      list.className = 'activity-list';

      day.activities.forEach(act => {
        if (!act.name && !act.desc) return;

        const li = document.createElement('li');
        li.className = 'activity-item';

        const addressHtml = act.address
          ? act.mapLink
            ? `<a class="activity-address" href="${act.mapLink}" target="_blank" rel="noopener">${act.address}</a>`
            : `<div class="activity-address">${act.address}</div>`
          : '';

        const mapBtn = '';

        const descHtml = act.desc
          ? `<div class="activity-desc">${act.desc}</div>`
          : '';

        const notesHtml = act.notes
          ? `<div class="activity-notes"><span class="notes-label">⚠️ 注意事項</span>${act.notes}</div>`
          : '';

        li.innerHTML = `
          <div class="activity-name-row">
            <div class="activity-name">${act.name}</div>
            ${act.time ? `<span class="activity-time">${act.time}</span>` : ''}
          </div>
          ${descHtml}
          ${addressHtml}
          ${mapBtn}
          ${notesHtml}
        `;
        list.appendChild(li);
      });

      body.appendChild(list);
      card.appendChild(header);
      card.appendChild(body);
      container.appendChild(card);

      // 展開 / 收合
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        card.classList.toggle('open', !isOpen);
        header.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderItinerary();
  autoExpandToday();
  fetchRate();

  document.getElementById('rate-btn')?.addEventListener('click', fetchRate);
});

// 從 Frankfurter.app 取得最新 USD → JPY 匯率（免費，每日更新，無需 API key）
async function fetchRate() {
  const btn = document.getElementById('rate-btn');
  const display = document.getElementById('rate-display');
  if (!btn || !display) return;

  btn.classList.add('loading');
  display.textContent = '更新中…';

  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=JPY');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    const rate = data.rates.JPY;
    display.textContent = `$1 ≈ ¥${rate.toFixed(0)}`;
    btn.title = `更新日期：${data.date}，點擊重新整理`;
  } catch {
    display.textContent = '匯率載入失敗';
  } finally {
    btn.classList.remove('loading');
  }
}

// 根據今天日期自動展開對應的行程卡
function autoExpandToday() {
  const now = new Date();
  // 以日本時間 (UTC+9) 為準
  const jstOffset = 9 * 60;
  const jstNow = new Date(now.getTime() + (jstOffset - now.getTimezoneOffset()) * 60000);
  const todayMonth = jstNow.getMonth() + 1; // 1-12
  const todayDay = jstNow.getDate();

  // 找到對應今天日期的卡片 (date 格式: "8/31", "9/1" 等)
  const cards = document.querySelectorAll('.day-card');
  const headers = document.querySelectorAll('.day-header');

  cards.forEach((card, i) => {
    const header = headers[i];
    const badge = header?.querySelector('.badge-day');
    // 從 data-date 屬性取得日期
    const dateStr = card.getAttribute('data-date');
    if (!dateStr) return;

    const [m, d] = dateStr.split('/').map(Number);
    if (m === todayMonth && d === todayDay) {
      card.classList.add('open');
      header?.setAttribute('aria-expanded', 'true');
      // 滾動到當天卡片
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  });
}
