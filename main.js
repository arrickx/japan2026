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
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
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
        title: '下町風情與文化森林',
        summary: '淺草雷門、河畔午餐、明治神宮',
        illustration: './images/asakusa_meiji.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        activities: [
          {
            time: '09:15',
            name: '🚇 搭銀座線前往淺草站',
            desc: '09:15 之後出發，徹底避開地鐵通勤高峰。',
            address: '',
            mapLink: '',
            notes: '09:15 後的車廂明顯空曠，攜推車更舒適。',
          },
          {
            time: '10:00',
            name: '⛩️ 雷門・淺草寺',
            desc: '抵達雷門，漫步仲見世通。',
            address: '東京都台東区浅草 2-3-1',
            mapLink: 'https://maps.google.com/?q=Senso-ji+Temple+Asakusa+Tokyo',
            notes: '推車建議走仲見世通旁邊的平行街道以避開人流，空間更寬敞。',
          },
          {
            time: '11:15',
            name: '🍱 錯峰午餐：Tokyo Mizumachi 沿河餐廳',
            desc: '準時 11:15 入座，避開正午人潮。',
            address: '東京都墨田区向島 1 丁目（Tokyo Mizumachi）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Mizumachi+Asakusa',
            notes: '餐廳動線寬敞，嬰兒推車可直接推入桌旁。建議不要晚於 11:30 入座。',
          },
          {
            time: '13:30',
            name: '🌧️ 雨天備選：墨田水族館',
            desc: '若遇強降雨，取消戶外散步，改走無障礙連廊直達全室內的墨田水族館。',
            address: '東京都墨田区押上 1-1-2（東京晴空塔 6F）',
            mapLink: 'https://maps.google.com/?q=Sumida+Aquarium+Tokyo+Skytree',
            notes: '無需出門即可直達，推車全程室內移動，是雨天最佳替代方案。',
          },
          {
            time: '15:30',
            name: '🚃 移動前往原宿區域',
            desc: '確保在 17:30 晚高峰開始前完成地鐵移動。',
            address: '',
            mapLink: '',
            notes: '15:30 出發可保留充裕緩衝時間，避開下班人潮。',
          },
          {
            time: '16:00',
            name: '🌿 明治神宮',
            desc: '從原宿南參道入口進入，此段路面最平坦，適合推車行走。',
            address: '東京都渋谷区代々木神園町 1-1',
            mapLink: 'https://maps.google.com/?q=Meiji+Shrine+Tokyo',
            notes: '南參道入口（原宿站側）無階梯，推車友善。神宮內道路均為平整砂石路。',
          },
          {
            time: '17:30',
            name: '🍽️ 晚高峰物理避讓・就近晚餐',
            desc: '17:30–19:30 此時段不安排任何地鐵移動。在原宿／表參道周邊就近晚餐，或叫車（GO App）返回酒店。',
            address: '原宿・表参道周邊',
            mapLink: 'https://maps.google.com/?q=Omotesando+Harajuku+Tokyo',
            notes: '打車建議使用 GO App（日本本地叫車，支持中文，支付寶付款）。',
          },
        ],
      },

      // ── Day 3 ──────────────────────────────────────────────
      {
        date: '9/2',
        dayNum: 'Day 3',
        title: '沉浸光影與江戶海濱漫步',
        summary: 'teamLab Planets・豐洲千客萬來・LaLaport',
        illustration: './images/teamlab_toyosu.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        activities: [
          {
            time: '08:30',
            name: '🌅 舒緩起床與悠閒早餐',
            desc: '全家不設過早鬧鐘，於酒店內或附近咖啡廳悠閒早餐、喂奶及處理寶寶護理。',
            address: '',
            mapLink: '',
            notes: '今天全程打車，完全不趕地鐵，可以放鬆出發。',
          },
          {
            time: '10:15',
            name: '🚕 打車直達新豐洲',
            desc: '從涉谷 Hyatt House 叫車前往 Shin-Toyosu（新豐洲），車程約 20–25 分鐘，費用約 ¥4,000。',
            address: '',
            mapLink: '',
            notes: 'GO / Uber 均可叫車。到站後步行約 5 分鐘即達 teamLab Planets。',
          },
          {
            time: '11:00',
            name: '🌊 teamLab Planets TOKYO（豐洲・涉水版）',
            desc: '參觀水上沉浸式光影展，建議預約 11:00 場次。',
            address: '東京都江東区豊洲 6-1-16',
            mapLink: 'https://maps.google.com/?q=teamLab+Planets+Tokyo+Toyosu',
            notes: '⚠️ 帶娃必看：推車停放於門口專用區，館內全程用嬰兒背帶。水深至成人小腿，1 歲寶寶在涉水區必須抱抱。請全員穿可捲至膝蓋以上的長褲或短褲。鏡面地板區域請避免穿裙裝。出口提供免費毛巾擦腳。',
          },
          {
            time: '13:15',
            name: '🍱 豐洲千客萬來・江戶美食街',
            desc: '打車 3 分鐘或步行前往「豐洲千客萬來」，享用錯峰午餐（海鮮丼、鰻魚飯或日式定食）。餐後乘直梯上 8F 免費足湯庭園遠眺海景。',
            address: '東京都江東区豊洲 6-5-1',
            mapLink: 'https://maps.google.com/?q=Toyosu+Senkyakubanrai+Tokyo',
            notes: '8F 足湯庭園完全免費，推車可乘電梯上去，海景開闊，是難得的休憩好地點。',
          },
          {
            time: '14:45',
            name: '🏬 LaLaport 豐洲海濱公園',
            desc: '移步至相鄰的 Urban Dock LaLaport 豐洲，利用頂配母嬰室洗漱休整，大人在沿海咖啡廳小憩，寶寶可在推車內做下午覺。',
            address: '東京都江東区豊洲 2-4-9',
            mapLink: 'https://maps.google.com/?q=LaLaport+Toyosu+Tokyo',
            notes: '母嬰室設施完善（哺乳室、換尿布台、熱水），推薦提前確認樓層位置。',
          },
          {
            time: '16:30',
            name: '🚕 晚高峰前打車返回',
            desc: '叫車返回涉谷 Hyatt House 休息。',
            address: '',
            mapLink: '',
            notes: '16:30 出發可在 17:30 晚高峰前到達，避開堵車。預計車程約 20 分鐘。',
          },
        ],
      },
      // ── Day 4 ──────────────────────────────────────────────
      {
        date: '9/3',
        dayNum: 'Day 4',
        title: '橫濱全天親子遊',
        summary: '麵包超人博物館・港未來摩天輪・錯峰返回涉谷',
        illustration: './images/yokohama.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        activities: [
          {
            time: '09:15',
            name: '🚃 搭東急東橫線直達橫濱',
            desc: '09:15 之後從涉谷站出發，搭乘「東急東橫線（直通港未來線）」，無需換乘，直達橫濱港未來區域。',
            address: '',
            mapLink: '',
            notes: '此線路推車家庭極為友好，全程無需換車。避開通勤高峰後車廂寬敞。',
          },
          {
            time: '10:30',
            name: '🍞 橫濱麵包超人兒童博物館',
            desc: '抵達橫濱麵包超人兒童博物館，適合帶小寶寶的親子活動。',
            address: '神奈川県横浜市西区みなとみらい 6-2-9',
            mapLink: 'https://maps.google.com/?q=Yokohama+Anpanman+Children+Museum',
            notes: '館內設有推車停放區及母嬰室。建議提前網上購票，現場排隊時間較長。',
          },
          {
            time: '11:15',
            name: '🍽️ 錯峰館內主題餐廳',
            desc: '提前於 11:15 前往館內主題餐廳用餐，避開正午搶位高峰。',
            address: '橫濱麵包超人兒童博物館館內',
            mapLink: 'https://maps.google.com/?q=Yokohama+Anpanman+Children+Museum',
            notes: '11:15 入座可避開 12:00 後的排隊高峰，且推車可直接推入餐廳。',
          },
          {
            time: '15:30',
            name: '🎡 港未來 21 散步・Cosmo Clock 21 摩天輪',
            desc: '前往港未來 21 區海濱散步，搭乘 Cosmo Clock 21 大摩天輪俯瞰橫濱港。',
            address: '神奈川県横浜市西区みなとみらい 2-8-1',
            mapLink: 'https://maps.google.com/?q=Cosmo+Clock+21+Yokohama',
            notes: '摩天輪票價約 ¥1,000，每圈約 15 分鐘。海濱步道平坦，推車友善。',
          },
          {
            time: '17:30',
            name: '🍜 晚高峰物理規避・港未來晚餐',
            desc: '17:30–19:30 不在此時段帶娃搭地鐵回東京。就近在港未來周邊享用晚餐並海濱散步。',
            address: '港未來 21 周邊（みなとみらい）',
            mapLink: 'https://maps.google.com/?q=Minato+Mirai+21+Yokohama',
            notes: '港未來一帶有多間適合家庭的餐廳，推車移動方便，海景開闊，適合傍晚休閒。',
          },
          {
            time: '19:45',
            name: '🚃 錯峰乘車返回涉谷',
            desc: '晚高峰基本散去後，搭乘東急東橫線直達電車返回涉谷。',
            address: '',
            mapLink: '',
            notes: '19:45 後車廂明顯空曠，帶推車乘車更舒適。全程無需換乘。',
          },
        ],
      },
    ],
  },

  // ============================================================
  // 第二階段：北海道大環線
  // ============================================================
  {
    phase: '第二階段：北海道大環線',
    phaseDates: '9/4 – 9/13',
    days: [
      // 北海道行程陸續新增…
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

      // 手風琴模式：同一時間只允許一個卡片展開
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');

        // 先關閉所有卡片
        document.querySelectorAll('.day-card').forEach(c => {
          c.classList.remove('open');
          c.querySelector('.day-header')?.setAttribute('aria-expanded', 'false');
        });

        // 若原本是關閉的，則展開並滾動到頂部
        if (!isOpen) {
          card.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
          setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderItinerary();
  autoExpandToday();
  fetchRate();
  setupHotelFab();

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

// ============================================================
// 浮動酒店導航按鈕
// 用 IntersectionObserver 偵測目前畫面中佔比最大的已展開卡片
// 自動顯示對應酒店，點擊跳轉 Google Maps
// ============================================================
function setupHotelFab() {
  const fab = document.getElementById('hotel-fab');
  const fabName = document.getElementById('hotel-fab-name');
  if (!fab || !fabName) return;

  // 建立 date → hotel 對照表（從 ITINERARY 資料中提取）
  const hotelMap = {};
  ITINERARY.forEach(phase => {
    phase.days.forEach(day => {
      if (day.hotel) hotelMap[day.date] = day.hotel;
    });
  });

  let currentHotel = null;
  let expandTimer = null;

  // 更新 FAB 顯示
  function updateFab(hotel) {
    if (!hotel) {
      fab.classList.add('hidden');
      return;
    }
    fab.classList.remove('hidden');
    fabName.textContent = hotel.name;
    currentHotel = hotel;
  }

  // IntersectionObserver：追蹤哪個已展開卡片在畫面中佔比最大
  const visibilityMap = new Map();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      visibilityMap.set(entry.target, entry.intersectionRatio);
    });

    // 找出目前可見比例最高且已展開的卡片
    let bestCard = null;
    let bestRatio = 0;
    visibilityMap.forEach((ratio, card) => {
      if (ratio > bestRatio && card.classList.contains('open')) {
        bestRatio = ratio;
        bestCard = card;
      }
    });

    const dateStr = bestCard?.getAttribute('data-date');
    updateFab(dateStr ? hotelMap[dateStr] ?? null : null);
  }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });

  // 觀察所有 day-card
  document.querySelectorAll('.day-card').forEach(card => observer.observe(card));

  // 卡片展開/收合時重新觸發
  document.querySelectorAll('.day-card').forEach(card => {
    card.querySelector('.day-header')?.addEventListener('click', () => {
      // 短暫延遲讓 DOM 更新，再重算
      setTimeout(() => {
        visibilityMap.forEach((_, c) => observer.unobserve(c));
        document.querySelectorAll('.day-card').forEach(c => observer.observe(c));
      }, 50);
    });
  });

  // 點擊 FAB：展開顯示酒店名，再點擊跳轉 Maps
  fab.addEventListener('click', () => {
    if (!currentHotel) return;

    if (!fab.classList.contains('expanded')) {
      // 第一次點：展開顯示名稱
      fab.classList.add('expanded');
      clearTimeout(expandTimer);
      expandTimer = setTimeout(() => fab.classList.remove('expanded'), 3000);
    } else {
      // 已展開：跳轉導航
      window.open(currentHotel.mapLink, '_blank', 'noopener');
    }
  });

  // 手機 touch：點外面收合
  document.addEventListener('click', e => {
    if (!fab.contains(e.target)) {
      fab.classList.remove('expanded');
    }
  });
}
