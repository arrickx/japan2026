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
      {
        date: '9/1',
        dayNum: 'Day 2',
        title: '淺草與上野一日遊',
        summary: '早上淺草寺，下午上野恩賜公園與阿美橫町，傍晚東京晴空塔',
        illustration: '',
        activities: [
          {
            time: '09:00',
            name: '前往淺草',
            desc: '搭乘地鐵前往淺草站。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:00',
            name: '雷門與淺草寺',
            desc: '參觀雷門、仲見世商店街與淺草寺。',
            address: '東京都台東區淺草2-3-1',
            mapLink: 'https://maps.google.com/?q=Sensoji+Temple',
            notes: '',
          },
          {
            time: '16:00',
            name: '東京晴空塔',
            desc: '參觀東京晴空塔，欣賞東京市區全景。',
            address: '東京都墨田區押上1-1-2',
            mapLink: 'https://maps.google.com/?q=Tokyo+Skytree',
            notes: '',
          },
        ],
      },
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

// 從 open.er-api.com 取得最新 USD → JPY 匯率（免費、無需 key、已驗證可用）
async function fetchRate() {
  const btn = document.getElementById('rate-btn');
  const display = document.getElementById('rate-display');
  if (!btn || !display) return;

  btn.classList.add('loading');
  display.textContent = '更新中…';

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.result !== 'success') throw new Error('API error');
    const rate = data.rates.JPY;
    display.textContent = `JPY: ${rate.toFixed(2)}`;
    btn.title = `更新時間：${data.time_last_update_utc.slice(0, 16)}，點擊刷新`;
  } catch (err) {
    display.textContent = '匯率暫時無法載入';
    console.warn('fetchRate error:', err);
  } finally {
    btn.classList.remove('loading');
  }
}

// 根據瀏覽器當前日期自動展開對應行程卡
function autoExpandToday() {
  const now = new Date();
  const todayMonth = now.getMonth() + 1; // 1–12
  const todayDay = now.getDate();

  document.querySelectorAll('.day-card').forEach(card => {
    const dateStr = card.getAttribute('data-date'); // e.g. "8/31"
    if (!dateStr) return;
    const [m, d] = dateStr.split('/').map(Number);
    if (m === todayMonth && d === todayDay) {
      card.classList.add('open');
      card.querySelector('.day-header')?.setAttribute('aria-expanded', 'true');
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  });
}
