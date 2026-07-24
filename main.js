// ============================================================
// 行程資料 — 在這裡新增或修改每天的行程
// ============================================================
const ITINERARY = [
  {
    day: 1,
    date: '第 1 天',
    title: '東京抵達 · 淺草初探',
    summary: '抵達成田機場，辦理入住，傍晚漫步淺草寺',
    activities: [
      {
        time: '14:00',
        name: '成田國際機場抵達',
        address: '〒282-0004 千葉縣成田市取香 1-1',
        mapLink: 'https://maps.google.com/?q=Narita+International+Airport',
        notes: '乘坐 Narita Express (N\'EX) 直達東京站，車程約 1 小時，票價 ¥3,070。建議事先在網上預購優惠票。',
      },
      {
        time: '16:30',
        name: '酒店辦理入住',
        address: '依訂房確認',
        mapLink: '',
        notes: '先行寄存行李，換上輕便服裝再出門。',
      },
      {
        time: '18:00',
        name: '淺草寺 & 雷門',
        address: '〒111-0032 東京都台東區淺草 2-3-1',
        mapLink: 'https://maps.google.com/?q=Senso-ji+Temple+Asakusa+Tokyo',
        notes: '淺草寺全天開放免費入場。雷門前容易塞車，建議步行前往。傍晚燈光亮起後特別漂亮，適合拍照。',
      },
      {
        time: '19:30',
        name: '晚餐：仲見世通周邊',
        address: '〒111-0032 東京都台東區淺草 1-36-3',
        mapLink: 'https://maps.google.com/?q=Nakamise+Shopping+Street+Asakusa',
        notes: '推薦嘗試天婦羅丼或鰻魚飯，人均消費約 ¥1,500–2,500。',
      },
    ],
  },
  {
    day: 2,
    date: '第 2 天',
    title: '東京市區 · 新宿 · 涉谷',
    summary: '白天逛新宿御苑，傍晚前往涉谷展望台俯瞰夜景',
    activities: [
      {
        time: '09:30',
        name: '新宿御苑',
        address: '〒160-0014 東京都新宿區內藤町 11',
        mapLink: 'https://maps.google.com/?q=Shinjuku+Gyoen+National+Garden+Tokyo',
        notes: '入場費 ¥500，開放時間 09:00–16:30（最終入場 16:00）。園內禁止飲酒，請注意。',
      },
      {
        time: '13:00',
        name: '午餐：新宿高島屋美食廣場',
        address: '〒151-0051 東京都澀谷區千馱谷 5-24-2',
        mapLink: 'https://maps.google.com/?q=Takashimaya+Times+Square+Shinjuku',
        notes: '地下二樓有多種日式定食選擇，適合一家人口味不同的情況。',
      },
      {
        time: '17:00',
        name: '涉谷 Sky 展望台',
        address: '〒150-6145 東京都澀谷區澀谷 2-24-12（涉谷 Scramble Square 45F）',
        mapLink: 'https://maps.google.com/?q=Shibuya+Sky+Tokyo',
        notes: '強烈建議提前 2–3 週網上訂票，票價 ¥2,000。選擇日落前 45 分鐘入場，可同時看夕陽與夜景。頂層戶外平台風大，請穿外套。',
      },
    ],
  },
];

// ============================================================
// 渲染邏輯（無需修改）
// ============================================================
function renderItinerary() {
  const container = document.getElementById('itinerary-list');
  if (!container) return;

  ITINERARY.forEach(day => {
    const card = document.createElement('div');
    card.className = 'day-card';

    // 頭部
    const header = document.createElement('div');
    header.className = 'day-header';
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    header.innerHTML = `
      <span class="day-number">${day.date}</span>
      <div class="day-title-group">
        <div class="day-title">${day.title}</div>
        <div class="day-summary">${day.summary}</div>
      </div>
      <span class="day-arrow">▼</span>
    `;

    // 內容
    const body = document.createElement('div');
    body.className = 'day-body';

    const list = document.createElement('ul');
    list.className = 'activity-list';

    day.activities.forEach(act => {
      const li = document.createElement('li');
      li.className = 'activity-item';

      const mapBtn = act.mapLink
        ? `<a class="btn-map" href="${act.mapLink}" target="_blank" rel="noopener">🗺️ 在 Google Maps 開啟</a>`
        : '';

      const notes = act.notes
        ? `<div class="activity-notes">${act.notes}</div>`
        : '';

      li.innerHTML = `
        <div class="activity-time">${act.time}</div>
        <div class="activity-name">${act.name}</div>
        <div class="activity-address">${act.address}</div>
        ${mapBtn}
        ${notes}
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
}

document.addEventListener('DOMContentLoaded', renderItinerary);
