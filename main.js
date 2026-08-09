// ============================================================
// 日落時間系統（sunrisesunset.io API + 靜態回退）
// ============================================================

// 每天對應的城市坐標（用於 API 查詢）
const SUNSET_COORDS = {
  '8/31': { lat: 35.6762, lng: 139.6503, city: '東京',       apiDate: '2026-08-31' },
  '9/1':  { lat: 35.6762, lng: 139.6503, city: '東京',       apiDate: '2026-09-01' },
  '9/2':  { lat: 35.6762, lng: 139.6503, city: '東京',       apiDate: '2026-09-02' },
  '9/3':  { lat: 35.3175, lng: 139.5503, city: '鎌倉',       apiDate: '2026-09-03' },
  '9/4':  { lat: 43.0618, lng: 141.3545, city: '札幌',       apiDate: '2026-09-04' },
  '9/5':  { lat: 43.0618, lng: 141.3545, city: '札幌',       apiDate: '2026-09-05' },
  '9/6':  { lat: 43.1907, lng: 140.9945, city: '小樽',       apiDate: '2026-09-06' },
  '9/7':  { lat: 43.0618, lng: 141.3545, city: '札幌',       apiDate: '2026-09-07' },
  '9/8':  { lat: 43.3480, lng: 142.3830, city: '美瑛',       apiDate: '2026-09-08' },
  '9/9':  { lat: 43.3408, lng: 142.3834, city: '富良野',     apiDate: '2026-09-09' },
  '9/10': { lat: 41.7750, lng: 140.7291, city: '函館',       apiDate: '2026-09-10' },
  '9/11': { lat: 41.7750, lng: 140.7291, city: '函館',       apiDate: '2026-09-11' },
  '9/12': { lat: 42.6043, lng: 140.8567, city: '洞爺',       apiDate: '2026-09-12' },
  '9/13': { lat: 42.7828, lng: 141.3625, city: '千歲',       apiDate: '2026-09-13' },
  '9/14': { lat: 35.6762, lng: 139.6503, city: '東京',       apiDate: '2026-09-14' },
  '9/15': { lat: 35.5165, lng: 138.7527, city: '河口湖',     apiDate: '2026-09-15' },
  '9/16': { lat: 35.6329, lng: 139.8804, city: '浦安',       apiDate: '2026-09-16' },
  '9/17': { lat: 35.6762, lng: 139.6503, city: '東京',       apiDate: '2026-09-17' },
  '9/18': { lat: 35.5533, lng: 139.7811, city: '羽田',       apiDate: '2026-09-18' },
};

// 靜態回退值（萬一 API 掛了也有保底數據）
const SUNSET_FALLBACK = {
  '8/31': '18:06', '9/1': '18:04', '9/2': '18:03', '9/3': '18:01',
  '9/4': '18:01', '9/5': '17:59', '9/6': '17:57', '9/7': '17:55',
  '9/8': '17:52', '9/9': '17:51', '9/10': '17:51', '9/11': '17:49',
  '9/12': '17:47', '9/13': '17:46', '9/14': '17:48', '9/15': '17:47',
  '9/16': '17:45', '9/17': '17:44', '9/18': '17:42',
};

// API 動態緩存（先用靜態回退值填充，API 成功後會覆蓋）
const SUNSET_TABLE = {};
Object.keys(SUNSET_COORDS).forEach(k => {
  SUNSET_TABLE[k] = { time: SUNSET_FALLBACK[k] || '--:--', city: SUNSET_COORDS[k].city };
});

// 將 "6:11:54 PM" 轉為 "18:11"
function parseSunsetTime(str) {
  const match = str.match(/^(\d{1,2}):(\d{2}):\d{2}\s*(AM|PM)$/i);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m}`;
}

// 按需獲取單日日落時間（展開那天才 fetch，緩存後不重複請求）
async function fetchSunsetForDate(dateKey) {
  // 已經從 API 拿過就跳過
  if (SUNSET_TABLE[dateKey]?.fromApi) return SUNSET_TABLE[dateKey];

  const info = SUNSET_COORDS[dateKey];
  if (!info) return null;

  try {
    const url = `https://api.sunrisesunset.io/json?lat=${info.lat}&lng=${info.lng}&date=${info.apiDate}&timezone=Asia/Tokyo`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'OK') throw new Error('API status not OK');
    const time = parseSunsetTime(data.results.sunset);
    if (!time) throw new Error('Parse failed');

    SUNSET_TABLE[dateKey] = { time, city: info.city, fromApi: true };
    console.log(`🌅 Sunset API: ${dateKey} (${info.city}) → ${time}`);
    return SUNSET_TABLE[dateKey];
  } catch (err) {
    console.warn(`🌅 Sunset API fallback for ${dateKey}:`, err.message);
    return SUNSET_TABLE[dateKey]; // 返回靜態回退值
  }
}

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
        title: '抵達東京 · 涉谷夜景',
        summary: '羽田抵達 · 涉谷入住 · 屋頂夜景',
        illustration: './images/shibuya.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        activities: [
          {
            time: '13:35',
            name: '✈️ 抵達羽田機場 (HND)',
            desc: '搭乘 NH 7545 抵達。完成入關與行李提取（預計需 1.5 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '15:00',
            name: '🚌 搭機場大巴前往涉谷',
            desc: '購買 15:15 或 15:45 班次的機場巴士，目的地：涉谷 (Shibuya)。',
            address: '',
            mapLink: '',
            notes: '',
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
            name: '🍽️ 錯峰晚餐：つるとんたん 烏冬麵 (Scramble Square 13F)',
            desc: '17:15 避開晚高峰，前往涉谷站 Scramble Square 13F 享用知名名店「つるとんたん (TsuruTonTan)」創意大碗烏冬麵。電梯直達 13F 全程平路，麵質軟爛適合寶寶，兼具高空景色。',
            address: '東京都渋谷区渋谷 2-24-12（渋谷スクランブルスクエア 13F）',
            mapLink: 'https://maps.google.com/?q=Tsurutontan+UDON+NOODLE+Brasserie+Shibuya',
            notes: '',
          },
          {
            time: '18:00',
            name: '🌆 Fukuras 17F 屋頂花園（SHIBU NIWA）',
            desc: '坐直梯至酒店天橋對面的 Fukuras 17F 屋頂花園。免費入場、無需預約、嬰兒車可直達，可俯瞰涉谷十字路口夜景。',
            address: '東京都渋谷区道玄坂 1-2-3 渋谷フクラス 17F',
            mapLink: 'https://maps.google.com/?q=Shibu+Niwa+Rooftop+Fukuras+Shibuya',
            notes: '',
          },
          {
            time: '19:00',
            name: '🛒 MEGA Don Quijote 涉谷本店',
            desc: '前往採購首日嬰兒用品與生活補給（尿布、零食、飲料等）。',
            address: '東京都渋谷区宇田川町 28-6',
            mapLink: 'https://maps.google.com/?q=MEGA+Don+Quijote+Shibuya',
            notes: '',
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
        title: '下町風情與明治神宮',
        summary: '淺草雷門 · 河畔午餐 · 明治神宮',
        illustration: './images/asakusa_meiji.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        rainBackup: {
          emoji: '☔',
          title: '暴雨備選預案（僅強降雨時啟用）',
          tags: ['室內避雨', '無障礙連廊', '晴空塔 6F', '墨田水族館'],
          intro: '若當天遇到暴雨強降雨，取消戶外隅田公園散步與明治神宮參拜。午餐後直接通過無障礙連廊進入全室內的【墨田水族館 (Sumida Aquarium)】游覽，隨後直接返回酒店休整。',
          address: '東京都墨田区押上 1-1-2（東京晴空塔 6F）',
          mapLink: 'https://maps.google.com/?q=Sumida+Aquarium+Tokyo+Skytree',
          must: [
            '12:30–15:00 墨田水族館游覽 — 晴空塔 6F 全室內，設有企鵝池、水母水槽與海洋展區',
            '全程無障礙連廊 — 從 Mizumachi 沿河餐廳一路平地/電梯直達水族館，完全不淋雨',
            '15:00 提前返回酒店休整 — 搭地鐵/打車回 Hyatt House 客房休整，晚間就近晚餐'
          ],
          tip: '💡 晴空塔 6F 設有無障礙電梯與高端母嬰室。水族館全程可推推車。'
        },
        activities: [
          {
            time: '09:15',
            name: '🚇 避開早高峰：搭乘銀座線前往淺草站',
            desc: '09:15 之後搭乘地鐵銀座線前往淺草站，徹底避開地鐵通勤人潮。<br/>🎫 <strong>提示：本日有預訂傳統服飾拍照及化妝 (Klook 預訂)。</strong>',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:00',
            name: '⛩️ 雷門・淺草寺',
            desc: '抵達雷門，走仲見世通旁邊的平行街道避開密集人流。',
            address: '東京都台東区浅草 2-3-1',
            mapLink: 'https://maps.google.com/?q=Senso-ji+Temple+Asakusa+Tokyo',
            notes: '',
            highlight: {
              emoji: '⛩️',
              title: '雷門・淺草寺',
              tags: ['東京必訪', '千年古剎', '下町風情', '免費入場'],
              intro: '東京最古老的寺廟，建於公元 628 年，供奉聖觀世音菩薩。雷門（Kaminarimon）是全東京最具代表性的地標——那盞重達 700 公斤的大紅燈籠，是每位訪客必拍的角度。',
              must: [
                '雷門大燈籠正面仰拍 — 低角度搭配晴空最美，燈籠底部有隱藏龍雕',
                '仲見世通 250 公尺商店街 — 兩側 89 間店鋪，人形燒・雷おこし必買',
                '本堂燒香祈福 — 用手將香煙撫向身體，傳說可驅病消災',
                '寶藏門・五重塔 — 進入本堂前的巨大山門，塔高 53 公尺可遠眺',
                '淺草神社（三社祭本社）— 緊鄰淺草寺，安靜清幽，遊客少',
              ],
              tip: '💡 10:00 前到達人最少。推車建議走仲見世通側邊的平行小街，寬敞舒適。',
            },
          },
          {
            time: '11:15',
            name: '🍱 錯峰午餐：Tokyo Mizumachi 沿河餐廳',
            desc: '準時於 11:15 入座 Tokyo Mizumachi 沿河餐廳（錯開正午就餐高峰），推車可直接推入桌旁。',
            address: '東京都墨田区向島 1 丁目（Tokyo Mizumachi）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Mizumachi+Asakusa',
            notes: '',
          },
          {
            time: '12:30',
            name: '☕ 河畔慢逛與寶寶推車小憩',
            desc: '12:30–13:45 沿隅田公園及 Mizumachi 散步至晴空塔下。路面極為平整，非常適合寶寶在推車內睡下午覺，大人可在沿岸咖啡館休整。',
            address: '東京都墨田区向島 1 丁目（隅田公園）',
            mapLink: 'https://maps.google.com/?q=Sumida+Park+Tokyo',
            notes: '',
          },
          {
            time: '13:45',
            name: '🚃 錯峰移動：前往原宿/明治神宮',
            desc: '13:45–14:30 乘地鐵（銀座線至表參道，約 20 分鐘一車直達）或 GO App 打車前往原宿/明治神宮，避開晚高峰。',
            address: '東京都渋谷区神宮前 1 丁目（JR 原宿站 表參道口）',
            mapLink: 'https://maps.google.com/?q=Harajuku+Station+Omotesando+Exit',
            notes: '',
          },
          {
            time: '14:30',
            name: '🌿 明治神宮 (南參道入口 · 原宿口)',
            desc: '14:30–16:30 由原宿南參道入口進入（路面最平坦無台階），漫步參拜，時間充裕且採光極佳。',
            address: '東京都渋谷区代々木神園町 1-1（明治神宮 南參道鳥居・原宿口）',
            mapLink: 'https://maps.google.com/?q=Meiji+Jingu+Harajuku+Entrance',
            notes: '',
            highlight: {
              emoji: '🌿',
              title: '明治神宮 (南參道原宿口)',
              tags: ['都心森林浴', '明治天皇御祀', '免費入場', '推車友善'],
              intro: '供奉明治天皇與昭憲皇太后的神道聖地，建於 1920 年。神宮周圍被 70 公頃的人工森林環繞，約有 365 種不同樹木，在喧囂的東京城中形成一片難得的靜謐綠洲。',
              must: [
                '南參道大鳥居 — 日本最大的木製鳥居之一，高 12 公尺，進入神域的象徵',
                '酒樽與葡萄酒桶陳列廊 — 信奉者奉納的清酒桶＆法國葡萄酒桶，東西合璧獨一無二',
                '本堂燒香祈福 — 用手將香煙撫向身體，傳說可驅病消災',
                '御苑菖蒲園（需另購票）— 6 月菖蒲盛開，9 月仍可欣賞御苑庭園',
              ],
              tip: '💡 導航直達「南參道大鳥居（原宿口）」！傍晚採光極佳，從原宿南口進入全程無台階，推車最順暢。',
            },
          },
          {
            time: '16:30',
            name: '🛍️ 表參道/原宿區域輕鬆慢逛',
            desc: '16:30–17:30 在表參道/原宿區域輕鬆慢逛。17:30 晚高峰前 GO App 打車返回酒店或就近晚餐。',
            address: '東京都渋谷区神宮前',
            mapLink: 'https://maps.google.com/?q=Omotesando+Harajuku+Tokyo',
            notes: '',
          },
          {
            time: '17:30',
            name: '🍽️ 原宿/涉谷 Tabelog 嚴選晚宴 (包廂/推車/多人家宴)',
            desc: '17:30–19:30 避開地鐵晚高峰，精選 3 家高分 (Tabelog 3.5+)、空間寬敞、對推車與寶寶極友善的餐廳：',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🥩 黑毛和牛燒肉 (Tabelog 3.56)',
                title: '表參道 / 原宿 Yakiniku KINTAN',
                desc: '黑毛和牛頂級燒肉，擁有獨立包廂 (完全個室)，座位寬敞可輕鬆放推車，寶寶安靜不打擾他人。<br/>⚠️ <strong>預約需求：必須提前 1-2 週官網/TableCheck 預訂獨立包廂。</strong>',
                mapLink: 'https://maps.google.com/?q=Yakiniku+KINTAN+Omotesando',
                isPrimary: true
              },
              {
                badge: '🍲 頂級黑毛和牛壽喜燒 (Tabelog 3.48)',
                title: '木曽路 渋谷店 (Kisoji Shibuya)',
                desc: '日式老牌和牛壽喜燒/涮涮鍋，提供大型榻榻米包廂、寶寶餐椅與嬰兒餐具，服務極佳，大人小孩皆宜。<br/>⚠️ <strong>預約需求：建議提前預訂「個室包廂」套餐。</strong>',
                mapLink: 'https://maps.google.com/?q=Kisoji+Shibuya'
              },
              {
                badge: '🍜 創意巨碗烏冬與夜景 (Tabelog 3.58)',
                title: 'つるとんたん 渋谷 (Tsurutontan 13F)',
                desc: '位於 Shibuya Scramble Square 13F，高空夜景絕佳，電梯直達平地無台階。烏冬麵質軟爛適合 1 歲寶寶進食。<br/>⚠️ <strong>預約需求：建議提前 TableCheck 預訂卡座。</strong>',
                mapLink: 'https://maps.google.com/?q=Tsurutontan+UDON+NOODLE+Brasserie+Shibuya'
              }
            ]
          }
        ]
      },

      // ── Day 3 ──────────────────────────────────────────────
      {
        date: '9/2',
        dayNum: 'Day 3',
        title: '光影藝術與豐洲海濱',
        summary: 'teamLab · 豐洲千客萬來 · 購物',
        illustration: './images/teamlab_toyosu.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        activities: [
          {
            time: '08:30',
            name: '🌅 舒緩起床與悠閒早餐',
            desc: '全家不設過早鬧鐘，於酒店內或附近咖啡廳悠閒早餐、喂奶及處理寶寶護理。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:15',
            name: '🚕 打車直達新豐洲',
            desc: '從涉谷 Hyatt House 叫車前往 Shin-Toyosu（新豐洲），車程約 20–25 分鐘，費用約 ¥4,000。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '11:00',
            name: '🌊 teamLab Planets TOKYO（豐洲・涉水版）',
            desc: '參觀水上沉浸式光影展，建議預約 11:00 場次。',
            address: '東京都江東区豊洲 6-1-16',
            mapLink: 'https://maps.google.com/?q=teamLab+Planets+Tokyo+Toyosu',
            notes: '⚠️ 水區提示：館內有水深至小腿處展區（人造溪流）需赤腳行走。請備好小毛巾，大人可將褲管捲起。',
            highlight: {
              emoji: '🌊',
              title: 'teamLab Planets TOKYO',
              tags: ['沉浸式光影', '涉水體驗', '需預約', '親子推薦'],
              intro: '全球最受矚目的沉浸式數位藝術展館之一。豐洲版以「涉水」為核心體驗——赤腳踏入水中，腳下是無限延伸的鏡面光影宇宙，與光共舞，分不清真實與虛幻。',
              must: [
                '涉水區「宇宙」— 赤腳踩入水面，花卉與星空在腳下蔓延，必拍！',
                '無限水晶宇宙 — 巨型水晶球陣列，進入前請脫鞋，光影震撼感最強',
                '花卉與人共鳴互動牆 — 觸摸牆面花卉會綻放，與蝴蝶互動最受孩子喜歡',
                '冥想茶室 — 展覽動線終點，靜心茶飲，感受視覺後的沉澱',
              ],
              tip: '💡 館內全程赤腳，請穿易穿脫鞋款。寶寶在涉水區必須抱抱，推車停門口。出口有免費毛巾擦乾。',
            },
          },
          {
            time: '13:15',
            name: '🍱 豐洲千客萬來・江戶美食街',
            desc: '打車 3 分鐘或步行前往「豐洲千客萬來」，享用錯峰午餐（海鮮丼、鰻魚飯或日式定食）。餐後乘直梯上 8F 免費足湯庭園遠眺海景。',
            address: '東京都江東区豊洲 6-5-1',
            mapLink: 'https://maps.google.com/?q=Toyosu+Senkyakubanrai+Tokyo',
            notes: '',
          },
          {
            time: '14:45',
            name: '🏬 LaLaport 豐洲海濱公園',
            desc: '移步至相鄰的 Urban Dock LaLaport 豐洲，利用頂配母嬰室洗漱休整，大人在沿海咖啡廳小憩，寶寶可在推車內做下午覺。',
            address: '東京都江東区豊洲 2-4-9',
            mapLink: 'https://maps.google.com/?q=LaLaport+Toyosu+Tokyo',
            notes: '',
          },
          {
            time: '16:30',
            name: '🚕 晚高峰前打車返回',
            desc: '叫車返回涉谷 Hyatt House 休息。',
            address: '',
            mapLink: '',
            notes: '',
          },
        ],
      },
      // ── Day 4 ──────────────────────────────────────────────
      {
        date: '9/3',
        dayNum: 'Day 4',
        title: '鎌倉古都與湘南海岸',
        summary: '小町通 · 鎌倉大佛 · 灌籃高手平交道',
        illustration: './images/kamakura.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        activities: [
          {
            time: '09:15',
            name: '🚃 避開早高峰・一車直達 (JR 湘南新宿線)',
            desc: '從「涉谷站」搭乘 JR 湘南新宿線 (往逗子方向)，一車直達「鎌倉站」（約 52 分鐘，無需換乘）。',
            address: 'JR 涉谷站',
            mapLink: 'https://maps.google.com/?q=Shibuya+Station',
            notes: '',
          },
          {
            time: '10:15',
            name: '⛩️ 抵達鎌倉站 · 小町通與鶴岡八幡宮漫步',
            desc: '10:15 抵達鎌倉站。步行漫步小町通 (Komachi-dori) 嚐古風小吃，順路遊覽鶴岡八幡宮。',
            address: '神奈川県鎌倉市小町 1 丁目（小町通）',
            mapLink: 'https://maps.google.com/?q=Komachi-dori+Kamakura',
            notes: '',
            highlight: {
              emoji: '⛩️',
              title: '鶴岡八幡宮与小町通',
              tags: ['鎌倉標誌', '古都風貌', '古風小吃', '推車友善'],
              intro: '鎌倉最重要的神社，建於 1063 年，是源氏武士家族與鎌倉幕府的精神象徵。參道前面的「小町通」則是鎌倉最熱鬧的古風商業街。',
              must: [
                '小町通美食散步 — 現烤煎餅、靜岡抹茶冰淇淋、鎌倉半月燒必嚐',
                '舞殿與大石段 — 鶴岡八幡宮地標大石階，可遠眺整條若宮大路參道',
                '神池與段葛 — 參道中央植滿櫻花與杜鵑的段葛步道，古意盎然',
              ],
              tip: '💡 小町通上午 10:00 後店家陸續開門，此時遊人相對較少最舒適。',
            },
          },
          {
            time: '11:30',
            name: '🍱 錯峰午餐 (榻榻米庭園和食)',
            desc: '在鎌倉站 / 小町通周邊享用榻榻米 (Tatami) 庭園和食，方便將寶寶抱下地休息。',
            address: '神奈川県鎌倉市小町周邊',
            mapLink: 'https://maps.google.com/?q=Kamakura+Station',
            notes: '',
          },
          {
            time: '13:00',
            name: '🚕 🚊 極效移動：打車避暑 或 體驗江之電',
            desc: '【選項 A（打車避暑）】：於鎌倉站叫計程車 (Taxi，約 10 分鐘 / 1,500 日元直達高德院門前)。\n【選項 B（江之電）】：搭乘「江之電」至「長谷站」（3 站約 6 分鐘）後步行 7 分鐘直達高德院 (鎌倉大佛)。',
            address: '神奈川県鎌倉市長谷 4-2-28 (高德院)',
            mapLink: 'https://maps.google.com/?q=Kotoku-in+Kamakura+Daibutsu',
            notes: '',
          },
          {
            time: '13:15',
            name: '🗿 鎌倉大佛 (高德院) 與 長谷寺海景',
            desc: '13:15–14:30 參拜觀賞露天青銅大佛，隨後步行 5 分鐘前往長谷寺 (Hasedera)（推車停門口，換背帶登階梯俯瞰相模灣海景）。',
            address: '神奈川県鎌倉市長谷 3-11-2 (長谷寺)',
            mapLink: 'https://maps.google.com/?q=Hasedera+Temple+Kamakura',
            notes: '⚠️ 推車提示：高德院平坦可推車；長谷寺登高俯瞰海景需推車停門口，換背帶登階梯。',
            highlight: {
              emoji: '🗿',
              title: '鎌倉大佛与長谷寺',
              tags: ['國寶大佛', '由比濱海景', '地藏庭園', '鎌倉必訪'],
              intro: '高德院青銅大佛高 11.3 公尺，建於 1252 年，歷經海嘯地震仍屹立不倒。相鄰的長谷寺以四季花卉、良緣地藏與俯瞰由比濱海岸的見晴台聞名。',
              must: [
                '高德院阿彌陀如來坐像 — 仰拍大佛莊嚴雄偉全貌，可進入大佛內部胎內參觀',
                '長谷寺見晴台 — 登頂俯瞰由比濱海岸線與湘南波光，海景絕佳',
                '良緣地藏像 — 隱藏在寺內庭園竹林間的小地藏，超萌必尋找',
                '觀音堂十一面觀音 — 全日本最大的木造觀音立像（高 9.18 公尺）',
              ],
              tip: '💡 長谷寺設有專用推車寄放處，換背帶上山更省力。',
            },
          },
          {
            time: '14:45',
            name: '🏀 江之電經典海岸線与灌籃高手平交道',
            desc: '於長谷站搭乘「江之電」電車（4 站約 10 分鐘）直達 鎌倉高校前站，拍照打卡《灌籃高手》經典平交道與海景。',
            address: '神奈川県鎌倉市腰越 1-1（鎌倉高校前平交道）',
            mapLink: 'https://maps.google.com/?q=Kamakura-kokomae+Station',
            notes: '',
            highlight: {
              emoji: '🏀',
              title: '鎌倉高校前平交道 (灌籃高手朝聖)',
              tags: ['灌籃高手名場面', '湘南海岸', '江之電經典', '海景鐵道'],
              intro: '經典動漫《灌籃高手》片頭曲中櫻木花道與赤木晴子相遇的海岸平交道！背靠藍天碧海，綠色江之電電車從平交道前叮叮駛過，青春回憶滿滿。',
              must: [
                '經典平交道拍照 — 站在行人安全區域，等候江之電電車經過與大海同框',
                '七里濱海岸線散步 — 沿海沙灘步道，遠眺江之島與湘南波浪',
              ],
              tip: '💡 請勿站在車道上拍照，注意避讓交通。下午 15:00–16:00 順光海景拍照最藍！',
            },
          },
          {
            time: '16:10',
            name: '🍮 極效順路：江之島布丁 (Enoshima Pudding)',
            desc: '繼續搭乘江之電（2 站約 5 分鐘）至 江之島站 (Enoshima Station)，出站步行 4 分鐘至 江之島布丁 (Enoshima Pudding / 江の島プリン) 享用獨家大麥布丁與軟冰淇淋。',
            address: '神奈川県藤沢市片瀬海岸 1-11-27',
            mapLink: 'https://maps.google.com/?q=Enoshima+Pudding',
            notes: '',
          },
          {
            time: '16:45',
            name: '🚟 特色體驗：湘南懸空單軌電車 (Shonan Monorail)',
            desc: '步行 2 分鐘至隔壁【湘南江之島站】，搭乘懸掛式單軌電車前往【大船站】(Ofuna Station)（約 14 分鐘）。',
            address: '神奈川県藤沢市片瀬 3-15-1 (湘南江の島駅)',
            mapLink: 'https://maps.google.com/?q=Shonan-Enoshima+Station',
            notes: '',
            highlight: {
              emoji: '🚟',
              title: '湘南懸空單軌電車 (Shonan Monorail)',
              tags: ['日本稀有懸掛式', '空中過山車', '景色絕佳', '親子最愛'],
              intro: '全日本極少見的懸掛式單軌電車！車廂懸掛在軌道下方穿梭於過山丘陵與市街之間，離地面數十米高，行駛平穩又充滿驚險感。',
              must: [
                '車頭展望位 — 第一車廂大玻璃視野極佳，像在空中飛翔',
                '山洞隧道穿梭 — 穿過山體隧道與住宅區的高空俯瞰景色',
              ],
              tip: '💡 湘南江之島站至大船站僅需 14 分鐘，用 IC 卡 (Suica/Pasmo) 直接刷卡進站。',
            },
          },
          {
            time: '17:15',
            name: '🚆 一車直達回涉谷 (JR 湘南新宿線)',
            desc: '於大船站無縫換乘 JR 湘南新宿線（約 40 分鐘，一車直達）返回涉谷站。',
            address: 'JR 大船站',
            mapLink: 'https://maps.google.com/?q=Ofuna+Station+JR',
            notes: '',
          },
          {
            time: '18:15',
            name: '🏨 返抵涉谷 Hyatt House 徹底休息蓄能',
            desc: '18:15 返抵涉谷 Hyatt House 徹底休息蓄能，準備明天 (Day 5) 全家行李大轉運飛往北海道。',
            address: '東京都渋谷区桜丘町 1-4（Hyatt House Tokyo Shibuya）',
            mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya',
            notes: '',
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
      // ── Day 5 ──────────────────────────────────────────────
      {
        date: '9/4',
        dayNum: 'Day 5',
        title: '飛往札幌與租車自駕',
        summary: '飛往新千歲 · 取車自駕 · 入住 FAV LUX',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        driving: { distance: '約 45 公里 / 50 分鐘', route: '道央自動車道', rest: null, tips: ['夜間取車注意控制車速，機場周邊道路較暗', '停 Paraca 時注意不要誤入機械立體車位（Alphard 車高 1.95m）'] },
        activities: [
          {
            time: '11:15',
            name: '🏨 涉谷退房與移動',
            desc: '辦理退房，推大行李經由人行天橋步行至涉谷站 (Shibuya Fukuras) 乘車點。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '11:45',
            name: '🚌 搭機場大巴前往羽田',
            desc: '乘坐由酒店前台代訂好的機場巴士直達羽田機場 (HND)。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '12:30',
            name: '✈️ 羽田抵達與大件行李托運',
            desc: '抵達羽田機場，前往 JAL First Class 專屬櫃台優先托運大件行李。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '13:00',
            name: '🍱 JAL Diamond Premier Lounge 休息',
            desc: '在休息室享用咖哩包和輕食，全員充能休息。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '16:40',
            name: '🛫 飛往新千歲 (CTS)',
            desc: '搭乘 JAL 523 航班飛往新千歲機場。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '18:20',
            name: '🛬 抵達新千歲 · 提取行李',
            desc: '抵達新千歲機場，完成行李提取流程。',
            address: '北海道千歳市美々（新千歲機場）',
            mapLink: 'https://maps.google.com/?q=New+Chitose+Airport',
            notes: '',
          },
          {
            time: '19:15',
            name: '🚌 前往豐田租車營業所',
            desc: '全員直接前往 1F 豐田租車櫃台，搭乘免費接駁車前往營業所。',
            address: '北海道千歳市美々（新千歲機場 1F 豐田租車櫃台）',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+New+Chitose+Airport+Counter',
            mapLink: '',
            notes: '',
          },
          {
            time: '20:00',
            name: '🚗 辦理取車手續 (Toyota Rent-a-Car)',
            desc: '核對 W3 級 Alphard、確認 1 個安全座椅、現場辦理 ETC 卡租借與 HEP 通行證。',
            address: '北海道千歳市美々 758-134（Toyota Rent a Car Poplar）',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+Poplar+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '21:00',
            name: '🏨 驅車抵達札幌 · 入住 FAV LUX 札幌',
            desc: '驅車前往札幌市區，辦理入住。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '',
          },
        ],
      },
      // ── Day 6 ──────────────────────────────────────────────
      {
        date: '9/5',
        dayNum: 'Day 6',
        title: '札幌美食與啤酒博物館',
        summary: 'Ario 採購 · 啤酒博物館烤肉 · 湯咖哩',
        illustration: './images/sapporo_bbq.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        driving: { distance: '市區短途約 15 公里', route: null, rest: null, tips: ['Paraca 折扣券為一次性出庫券，停回後全家步行'] },
        activities: [
          {
            time: '10:00',
            name: '🛒 Ario 札幌母嬰補給',
            desc: '驅車前往 Ario 札幌（與啤酒博物館共用停車場）。在商場內逛阿卡醬本鋪 (Akachan Honpo) 集中採購輔食與紙尿褲，採購完畢直接放回車內。',
            address: '北海道札幌市東区北7条東9丁目 2-20',
            mapLink: 'https://maps.google.com/?q=Ario+Sapporo',
            notes: '',
          },
          {
            time: '13:00',
            name: '🥩 札幌啤酒博物館成吉思汗烤肉',
            desc: '步行 2 分鐘進入 Sapporo Beer Museum (札幌啤酒博物館) 享用已預訂的成吉思汗烤肉午餐。',
            address: '北海道札幌市東区北7条東9丁目 2-10',
            mapLink: 'https://maps.google.com/?q=Sapporo+Beer+Museum',
            notes: '',
          },
          {
            time: '15:00',
            name: '🚗 園區散步與回酒店休整',
            desc: '園區內輕鬆散步消食後，驅車返回 FAV LUX 札幌酒店停車。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '',
          },
          {
            time: '15:30',
            name: '😴 回房休息与下午觉',
            desc: '15:30–17:30 回房間休整，讓寶寶睡一個高質量的下午覺，全員恢復體力。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '17:45',
            name: '🍲 Asian Bar RAMAI 湯咖哩晚餐',
            desc: '全員步行 6 分鐘前往 Asian Bar RAMAI (札幌中央店) 享用湯咖哩晚餐。',
            address: '北海道札幌市中央区南4条西10丁目 1005-4',
            mapLink: 'https://maps.google.com/?q=Asian+Bar+RAMAI+Sapporo+Chuo',
            notes: '',
          },
          {
            time: '19:30',
            name: '🍰 薄野罐裝蛋糕宵夜与漫步',
            desc: '飯後散步 10 分鐘前往薄野 Pâtisserie OKASHI GAKU 自動販賣機購買罐裝蛋糕作宵夜，隨後漫步回酒店。',
            address: '北海道札幌市中央区南4条西2丁目 10-17',
            mapLink: 'https://maps.google.com/?q=Patisserie+OKASHI+GAKU+Sapporo',
            notes: '',
          },
        ],
      },
      // ── Day 7 ──────────────────────────────────────────────
      {
        date: '9/6',
        dayNum: 'Day 7',
        title: '分頭行動與小樽運河遊船',
        summary: '分頭行動 · 運河遊船 · 小樽晚宴',
        illustration: './images/otaru.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        driving: { distance: '單程約 40 公里 / 45 分鐘', route: '札樽自動車道', rest: null, tips: ['札樽高速沿海路段側風較大，雙手穩住方向盤', '若鶏時代なると本店自帶 21 車位免費車場，小樽運河 Times 車位充足'] },
        activities: [
          {
            time: '10:00',
            name: '🔀 分頭行動開始',
            desc: 'Team A 與 Team B 按興趣及帶娃需求分頭出發。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:15',
            name: '🏰 Team B: 白色戀人工廠',
            desc: '親仔組遊覽白色戀人工廠夢幻園區（歐式庭園、城堡鐘樓與童趣展覽）。',
            address: '北海道札幌市西区宮の沢2条2丁目 11-36',
            mapLink: 'https://maps.google.com/?q=Shiroi+Koibito+Park',
            notes: '',
          },
          {
            time: '10:30',
            name: '🥃 Team A: 余市威士忌酒廠 (Nikka Whisky)',
            desc: '品酒組搭乘 JR 函館本線前往余市蒸餾所，體驗日本威士忌發源地風采與試飲。',
            address: '北海道余市郡余市町黒川町 7-6',
            mapLink: 'https://maps.google.com/?q=Nikka+Whisky+Yoichi+Distillery',
            notes: '🎟️ 提醒：需提前 1 個月搶票預約品鑑。',
          },
          {
            time: '13:30',
            name: '🤝 小樽站匯合與停車方案 (首選觀光車場 / 備選車場)',
            desc: 'Team A 乘 JR 返回小樽站，與駕車抵達的 Team B 匯合。Alphard 建議停放於運河周邊大型露天平面停車場。',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '👑 最推薦 (碼頭對面)',
                title: '小樽市觀光停車場 (小樽市観光駐車場)',
                desc: '大型露天平面車場，緊鄰小樽運河遊覽船碼頭（步行僅 1 分鐘），車位極多，是首選停車點。',
                mapLink: 'https://maps.google.com/?q=Otaru+City+Tourism+Parking',
                isPrimary: true
              },
              {
                badge: '🅿️ 備選 1 (倉庫旁)',
                title: '三井 Repark 小樽運河倉庫第 1 / 第 2 停車場',
                desc: '就在小樽市觀光停車場隔壁，也是露天平面車場，24 小時營業。',
                mapLink: 'https://maps.google.com/?q=Mitsui+Repark+Otaru+Canal+Warehouse+Parking'
              },
              {
                badge: '🅿️ 備選 2 (黃金中點)',
                title: 'Times 小樽色內 1 丁目 (タイムズ小樽色内1丁目)',
                desc: '位於色內銀行街幾何中心點。往北走 3 分鐘到運河，往南走 5 分鐘到堺町通，往西走 8 分鐘到「若鶏時代 なると 本店」。',
                mapLink: 'https://maps.google.com/?q=Times+Otaru+Ironai+1-chome'
              }
            ]
          },
          {
            time: '14:00',
            name: '🚣‍♂️ 特色體驗：小樽運河遊覽船 (Otaru Canal Cruise)',
            desc: '14:00–14:40 體驗 40 分鐘環河巡航，水面視角遠比岸上開闊，且能讓全員坐在船上休整，免去推車在石板路走動顛簸。',
            address: '北海道小樽市港町 5-4',
            mapLink: 'https://maps.google.com/?q=Otaru+Canal+Cruise',
            notes: '',
            highlight: {
              emoji: '🚣‍♂️',
              title: '小樽運河遊覽船 (Otaru Canal Cruise)',
              tags: ['40分鐘巡航', '復古游船', '推車免費寄存', '中文語音'],
              intro: '小樽運河最浪漫的游覽方式！40 分鐘的復古游船帶你從水面視角穿梭於百年紅磚倉庫與南側運河之間，視野遠比岸上開闊，且全員可舒適坐著休整。',
              must: [
                '水面視角拍紅磚倉庫 — 復古倉庫群在水面的倒影極美',
                '中央橋與淺草橋巡航 — 穿過小樽運河最精華的兩座古橋',
                '中文語音講解 — 提供中文語音導覽，深度了解小樽港開埠歷史',
              ],
              tip: '💡 推車可免費寄存在售票處專用通道。建議提前預約 14:00 班次，光線最柔和！',
            },
          },
          {
            time: '14:45',
            name: '🍰 堺町通漫步與 LeTAO 下午茶',
            desc: '14:45–16:15 沿石板路漫步參觀玻璃工坊，前往 LeTAO 本店 3F 展望台看街景並享用雙層芝士蛋糕下午茶。',
            address: '北海道小樽市堺町 7-16（LeTAO 本店）',
            mapLink: 'https://maps.google.com/?q=LeTAO+Main+Store+Otaru',
            notes: '',
          },
          {
            time: '16:30',
            name: '🚗 運河沿岸散步與取車準備晚餐',
            desc: '16:30–16:45 運河沿岸散步放風，前往 Times 停車場取車，準備前往晚餐。',
            address: '北海道小樽市港町 5（Times 小樽運河前停車場）',
            mapLink: 'https://maps.google.com/?q=Otaru+Canal+Times+Parking',
            notes: '',
          },
          {
            time: '17:00',
            name: '🍗 小樽晚宴方案：若鶏時代 なると 本店 (早去戰術 / 備選預案)',
            desc: '【為什麼在小樽吃】：小樽百載名物「炸半雞定食」+ 鮮極壽司，在地體驗極強，自帶 21 車位免費專屬停車場，Alphard 隨到隨停。',
            address: '',
            mapLink: '',
            options: [
              {
                badge: '首選戰術',
                title: '若鶏時代 なると 本店 (早去免排隊)',
                desc: '若提前電話未訂到位切勿放棄！店內有 270 席位絕大部分放現場。只需在 16:45–17:00 到店取號避開 17:30 高峰，通常等 5–15 分鐘即可入座榻榻米包廂。',
                mapLink: 'https://maps.google.com/?q=Naruto+Main+Store+Otaru',
                isPrimary: true
              },
              {
                badge: '備選 1',
                title: '政寿司 ぜん庵 (Masazushi Zenan)',
                desc: '小樽頂級海景壽司，位於運河邊，環境極佳有榻榻米，推車友好（建議提前官網預訂）。',
                mapLink: 'https://maps.google.com/?q=Otaru+Masazushi+Zenan'
              },
              {
                badge: '備選 2',
                title: '小樽倉庫No.1 (Otaru Soko No.1)',
                desc: '運河沿岸紅磚倉庫德式/和洋餐廳，空間極巨大推車暢行無阻，氣氛輕鬆不怕寶寶鬧，提供烤肉、海鮮丼與披薩。',
                mapLink: 'https://maps.google.com/?q=Otaru+Soko+No.1'
              },
              {
                badge: '備選 3',
                title: '魚真 (Uomasa)',
                desc: '本地高分海鮮居酒屋，榻榻米包廂寬敞，海鮮極鮮，自帶免費停車場。',
                mapLink: 'https://maps.google.com/?q=Uomasa+Otaru'
              }
            ]
          },
          {
            time: '18:45',
            name: '🚗 高速返程：札樽自動車道返回札幌',
            desc: '18:45 驅車經札樽自動車道（高速約 40 分鐘）返回札幌 FAV LUX 酒店入庫，寶寶可在車上完成夜間睡眠過渡。',
            address: '',
            mapLink: '',
            notes: '',
          },
        ],
      },
      // ── Day 8 ──────────────────────────────────────────────
      {
        date: '9/7',
        dayNum: 'Day 8',
        title: '北海道神宮與場外海鮮',
        summary: '北海道神宮 · 場外市場帝王蟹 · 狸小路',
        illustration: './images/sapporo_crab.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        driving: { distance: '市區短途約 15 公里', route: null, rest: null, tips: ['北海道神宮參拜可享 2 小時免費停車，進場拿好停車券並蓋章'] },
        activities: [
          {
            time: '09:15',
            name: '⛩️ 神宮晨間禪意與現烤茶點輕早餐',
            desc: '09:15 全家稍作整理出發避開高峰。驅車前往円山公園与北海道神宮，在參道樹蔭下慢逛散步，直接在神宮內的六花亭茶屋享用現烤名物「判官さま」配熱茶（表面金黃微焦的軟糯紅豆餅）作為輕早餐。',
            address: '北海道札幌市中央区宮ケ丘 474',
            mapLink: 'https://maps.google.com/?q=Hokkaido+Shrine',
            notes: '',
          },
          {
            time: '11:00',
            name: '🚗 驅車前往場外市場停車場',
            desc: '11:00 驅車 8 分鐘直達 札幌場外市場 (Sapporo Outer Market) 大型免費露天停車場。',
            address: '北海道札幌市中央区北11条西21丁目 2-1（場外市場バス駐車場）',
            mapLink: 'https://maps.google.com/?q=Sapporo+Outer+Market+Bus+Parking',
            notes: '',
          },
          {
            time: '11:15',
            name: '🦀 頂級海鮮與帝王蟹大餐 (首選 UME堂 / 備選 おもひで食堂)',
            desc: '📍 位置說明：札幌場外市場店舖均集中在同一區塊，停好車後步行 1 分鐘均可到達。',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🌟 首選名店 (9折券)',
                title: '根室杉山水産 UME堂 (うめぇ堂)',
                desc: '根室 50 年水產老廠直營，現場挑選活帝王蟹/毛蟹，公開稱重當面蒸烤拆解，透明無宰客；店內平地無障礙，推車輕鬆推入。<br/>🎫 <strong>結帳出示 <a href="https://hokkaido.letsgojp.com/coupon/409826/" target="_blank" rel="noopener" style="color:#c0534a;text-decoration:underline;">樂吃購 9 折優惠券</a> 享專屬折扣！</strong>',
                mapLink: 'https://maps.google.com/?q=Nemuro+Sugiyama+Suisan+Umedo+Sapporo',
                isPrimary: true
              },
              {
                badge: '🍣 備選名店 (Plan B)',
                title: 'おもひで食堂 (北海道特産品銷售)',
                desc: '同商圈緊鄰店舖，由活蟹直營工廠運營，內設 8 個大型活水槽。除活帝王蟹/毛蟹蒸烤外，還提供活生蠔/帆立貝刺身与鐵盒蒸海鮮，海鮮丼免費附贈螃蟹湯。1F 平地無障礙，若 UME 堂排隊可無縫切換。',
                mapLink: 'https://maps.google.com/?q=Omohide+Shokudo+Sapporo'
              }
            ]
          },
          {
            time: '13:00',
            name: '🚗 返回酒店停放車輛',
            desc: '驅車返回 FAV LUX 札幌酒店停車（前台掃碼享單次 24 小時優惠）。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '',
          },
          {
            time: '13:30',
            name: '🛍️ 狸小路漫步与特色拿鐵外帶',
            desc: '全員從酒店步行 3–5 分鐘無縫接入狸小路商店街与地下街 (Pole Town / Aurora Town) 慢逛採購。順路前往附近的 Baristart Coffee 外帶自選北海道牧場鮮奶（如美瑛/澤田農場 Jersey 純奶）特調拿鐵，推著推車邊走邊喝。',
            address: '北海道札幌市中央区南4条西4丁目 1-2（Baristart Coffee）',
            mapLink: 'https://maps.google.com/?q=Baristart+Coffee+Sapporo',
            notes: '',
          },
        ],
      },
      // ── Day 9 ──────────────────────────────────────────────
      {
        date: '9/8',
        dayNum: 'Day 9',
        title: '美瑛花海與青池絕景',
        summary: '青池 · 美瑛農場 · 四季彩之丘 · 富良野',
        illustration: './images/biei_furano.jpg',
        hotel: { name: 'Fenix West (富良野)', mapLink: 'https://maps.google.com/?q=Fenix+West+Furano' },
        driving: { 
          distance: '總計約 210 公里 / 3.5 小時', 
          route: '札幌→美瑛 150km/2.5h、美瑛→富良野 30km/35min', 
          rest: { name: '砂川高速綠洲 (Sunagawa Highway Oasis)', desc: '行駛約 1h 處，北海道最大高速服務區，設有母嬰室', mapLink: 'https://maps.google.com/?q=Sunagawa+Highway+Oasis' }, 
          tips: ['美瑛/富良野轉為普通國道，限速 50-60 km/h', '傍晚 17:00 後鄉村道路無路燈，偶有蝦夷鹿穿出'] 
        },
        activities: [
          {
            time: '08:30',
            name: '🏨 札幌退房与驅車出發',
            desc: '札幌退房，滿載行李驅車前往美瑛（總車程約 2.5 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '09:30',
            name: '☕ 砂川高速綠洲短休 (Sunagawa Highway Oasis)',
            desc: '行駛約 1 小時後，停靠砂川高速綠洲休息區，全員伸展休整、補給水份。',
            address: '北海道砂川市北光 102',
            mapLink: 'https://maps.google.com/?q=Sunagawa+Highway+Oasis',
            notes: '',
          },
          {
            time: '11:00',
            name: '🌊 白金青池与白須瀑布',
            desc: '遊覽夢幻「白金青池」与磅礴「白須瀑布」。',
            address: '北海道上川郡美瑛町白金（白金青池）',
            mapLink: 'https://maps.google.com/?q=Shirogane+Blue+Pond+Biei',
            notes: '⚠️ 路況提示：青池沿湖步道多為泥土與樹根，強烈建議使用嬰兒背帶代替推車。',
          },
          {
            time: '13:30',
            name: '🍱 美瑛町內錯峰午餐',
            desc: '13:30 之後在美瑛町內享用午餐，避開中午排隊高峰。',
            address: '北海道上川郡美瑛町',
            mapLink: 'https://maps.google.com/?q=Biei+Town',
            notes: '',
          },
          {
            time: '14:30',
            name: '🐄 美瑛放牧酪農場 (Biei Farm)',
            desc: '驅車 10 分鐘前往美瑛放牧酪農場。在起伏的綠丘中觀賞牛群，享用鮮牛奶和軟冰淇淋。',
            address: '北海道上川郡美瑛町新田 第1',
            mapLink: 'https://maps.google.com/?q=Biei+Farm',
            notes: '',
          },
          {
            time: '15:30',
            name: '🌸 四季彩之丘花海巡游',
            desc: '順路前往四季彩之丘，租用拖拉機巴士巡游彩虹花海（預留 1.5 小時，時間充裕）。',
            address: '北海道上川郡美瑛町新星 第三',
            mapLink: 'https://maps.google.com/?q=Shikisai+no+Oka+Biei',
            notes: '',
          },
          {
            time: '16:45',
            name: '🚗 離開美瑛南下富良野',
            desc: '驅車半小時南下前往富良野。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '17:15',
            name: '🏨 入住 Fenix West 卸行李',
            desc: '抵達富良野，至 Fenix West 辦理 Check-in 卸下行李。',
            address: '北海道富良野市北の峰町 14-38（Fenix West）',
            mapLink: 'https://maps.google.com/?q=Fenix+West+Furano',
            notes: '',
          },
          {
            time: '17:45',
            name: '🍲 Kumagera (くまげら) 經典晚餐',
            desc: '驅車 10 分鐘前往富良野市中心的 Kumagera 享用特色晚餐。',
            address: '北海道富良野市日の出町 3-22',
            mapLink: 'https://maps.google.com/?q=Kumagera+Furano',
            notes: '⚠️ 提醒：富良野餐館普遍打烊極早，17:45 就餐極其穩妥省心！',
          },
          {
            time: '19:00',
            name: '🍈 Co-op Sapporo 富良野店水果補給',
            desc: '順路在隔壁的 Co-op Sapporo 富良野店採購鮮奶、哈密瓜和水果補給。',
            address: '北海道富良野市若葉町 2-1',
            mapLink: 'https://maps.google.com/?q=Co-op+Sapporo+Furano',
            notes: '',
          },
          {
            time: '19:45',
            name: '🌙 輕鬆返回 Fenix West 房間休息',
            desc: '輕鬆返回房間休息，零趕路與丟單壓力。',
            address: '北海道富良野市北の峰町 14-38',
            mapLink: 'https://maps.google.com/?q=Fenix+West+Furano',
            notes: '',
          },
        ],
      },
      // ── Day 10 ─────────────────────────────────────────────
      {
        date: '9/9',
        dayNum: 'Day 10',
        title: '富良野農場與登別溫泉',
        summary: '富田農場 · 登別瀧乃家入住 · 部屋食',
        illustration: './images/noboribetsu.jpg',
        hotel: { name: '登別 瀧乃家 (Takinoya)', mapLink: 'https://maps.google.com/?q=Takinoya+Noboribetsu' },
        driving: { 
          distance: '約 180 公里 / 2.5–3 小時', 
          route: '道東自動車道', 
          rest: { name: '占冠 PA (首選) / 夕張 PA (備選)', desc: '開出富良野約 45 分鐘先抵達占冠 PA（設有 7-Eleven 與授乳室）；若錯過可再行駛 30 分鐘至夕張 PA。', mapLink: 'https://maps.google.com/?q=Shimukappu+PA+Doto+Expressway' }, 
          tips: ['占冠至夕張段有單向單車道隧道，保持安全車距', '駛入登別溫泉街前有連續下坡彎道，注意減速'] 
        },
        activities: [
          {
            time: '08:30',
            name: '🏨 退房与驅車前往雙農場',
            desc: '退房，驅車 10 分鐘前往富田農場與相鄰的哈密瓜農場 (Tomita Melon House)。',
            address: '北海道空知郡中富良野町宮町 1-41（富田農場）',
            mapLink: 'https://maps.google.com/?q=Farm+Tomita+Furano',
            notes: '',
          },
          {
            time: '08:40',
            name: '🌸 薰衣草溫室与現切哈密瓜享用',
            desc: '08:40–09:40 欣賞溫室薰衣草和秋季花田，在哈密瓜農場享用現切哈密瓜。',
            address: '北海道空知郡中富良野町宮町 3-57（Tomita Melon House）',
            mapLink: 'https://maps.google.com/?q=Tomita+Melon+House+Furano',
            notes: '',
          },
          {
            time: '11:00',
            name: '🚗 準時出發南下登別 · 車上簡餐',
            desc: '11:00 準時出發南下（車程約 2.5 小時）。不在中途安排拉麵堂食，午餐在農場戶外熟食區打包哈密瓜披薩和男爵土豆在車上解決。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '13:45',
            name: '♨️ 抵達登別瀧乃家 · 無縫入住',
            desc: '13:45 抵達登別瀧乃家，無縫銜接 14:00 起的溫泉旅館入住服務。',
            address: '北海道登別市登別温泉町 162',
            mapLink: 'https://maps.google.com/?q=Takinoya+Noboribetsu',
            notes: '',
          },
          {
            time: '18:00',
            name: '🍱 一泊兩食 · D Type 部屋食尊享',
            desc: '在 D Type 房型內享受「部屋食（房間內用餐）」，品嚐頂級會席料理。',
            address: '',
            mapLink: '',
            notes: '',
          },
        ],
      },
      // ── Day 11 ─────────────────────────────────────────────
      {
        date: '9/10',
        dayNum: 'Day 11',
        title: '登別地獄谷與函館夜景',
        summary: '地獄谷 · 金森紅磚倉庫 · 函館夜景',
        illustration: './images/hakodate_night.jpg',
        hotel: { name: '平成館 潮騷亭 (Hakodate)', mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate' },
        driving: { 
          distance: '約 200 公里 / 2.5–3 小時', 
          route: '道央自動車道', 
          rest: { name: '八雲 PA / 噴火灣 Panorama Park', desc: '行駛約 1.5h 處，🌟 极度推荐！海景公園＋母嬰休息室', mapLink: 'https://maps.google.com/?q=Yakumo+PA+Panorama+Park+Hokkaido' }, 
          tips: ['大沼公園 IC 後轉為 5 號國道（約 30km），紅綠燈增多，預留充裕時間'] 
        },
        activities: [
          {
            time: '09:30',
            name: '🌋 登別地獄谷漫步',
            desc: '遊覽登別地獄谷壯麗火山地貌与蒸汽噴泉。',
            address: '北海道登別市登別温泉町 60',
            mapLink: 'https://maps.google.com/?q=Noboribetsu+Jigokudani',
            notes: '⚠️ 路況提示：木棧道設有台階，強烈建議使用嬰兒背帶代替推車。',
            highlight: {
              emoji: '🌋',
              title: '登別地獄谷 (Jigokudani)',
              tags: ['火山地貌', '北海道唯一', '硫磺溫泉源', '免費入場'],
              intro: '登別地獄谷是北海道最具震撼力的自然奇景，面積約 11 公頃的火山爆裂口遺跡。灰褐色的荒蕪大地上，數十個天然泉眼持續噴湧著 45–90°C 的高溫硫磺泉，白霧瀰漫，宛如地獄入口。',
              must: [
                '主棧道全景 — 俯瞰整片地獄谷，泉眼噴霧的視覺衝擊感最強，早晨霧氣最濃',
                '大湯沼 — 步行約 10 分鐘可達，直徑 450 公尺的天然硫磺沼，水溫高達 75°C',
                '鬼の花道 — 沿步道深入，地表蒸汽從腳邊裂縫噴出，臨場感十足',
                '地獄谷展望台 — 全景制高點，可同時拍到谷底泉眼群與遠山',
              ],
              tip: '💡 建議使用嬰兒背帶，部分棧道有台階推車不易通行。硫磺氣味較濃，呼吸道敏感者可帶口罩。',
            },
          },
          {
            time: '11:30',
            name: '🚗 驅車前往函館',
            desc: '11:30 驅車前往函館（總車程約 2.5–3 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '13:00',
            name: '☕ 八雲休息站休整 (Yakumo PA)',
            desc: '行駛約 1.5 小時後，停靠 Yakumo PA (八雲休息站) 舒展休整、補給水份。',
            address: '北海道二海郡八雲町浜松 368-8',
            mapLink: 'https://maps.google.com/?q=Yakumo+PA+Panorama+Park+Hokkaido',
            notes: '',
          },
          {
            time: '14:30',
            name: '🏨 潮騷亭 Check-in · 湯之川溫泉',
            desc: '14:30–15:15 直達湯之川「平成館 潮騷亭」辦理 Check-in 卸行李。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate',
            notes: '',
          },
          {
            time: '15:30',
            name: '🧱 金森紅磚倉庫群漫步',
            desc: '驅車 15–20 分鐘前往金森紅磚倉庫群 (Kanemori Red Brick Warehouse) 漫步購物。',
            address: '北海道函館市末広町 14-12',
            mapLink: 'https://maps.google.com/?q=Kanemori+Red+Brick+Warehouse+Hakodate',
            notes: '',
          },
          {
            time: '16:30',
            name: '🚡 函館山纜車觀夜景 (Mount Hakodate Ropeway)',
            desc: '車輛停放於山麓站停車場，全員換乘纜車 (Ropeway) 登函館山觀賞日落與百萬夜景。',
            address: '北海道函館市元町 19-7（山麓站）',
            mapLink: 'https://maps.google.com/?q=Mount+Hakodate+Ropeway',
            notes: '⚠️ 禁行提示：每日 17:00–22:00 登山道對私家車禁行！請停山麓站露天停車場乘纜車登頂（推車可上）。',
            highlight: {
              emoji: '🌃',
              title: '函館山百萬夜景',
              tags: ['世界三大夜景', '函館必訪', '纜車登頂', '日落＋夜景'],
              intro: '與摩納哥、香港並列「世界三大夜景」之一。海拔 334 公尺的函館山頂，城市被兩側海灣夾住形成獨特的「沙洲地形」，入夜後萬家燈火連結成一條閃爍腰帶，令人屏息。',
              must: [
                '日落前 30 分鐘抵達 — 傍晚天際由橘轉深藍，城市燈光逐漸亮起的過渡時刻最美',
                '展望台全景台 — 正面面對函館灣的觀景位置，必搶的最佳拍照機位',
                '夜景全景 360° — 沿展望台繞行一圈，函館港與津輕海峽盡收眼底',
                '纜車本身 — 3 分鐘登頂的纜車體驗，夜間透過玻璃看山腰燈光也很美',
              ],
              tip: '💡 17:00–22:00 私家車禁行登山道，必須停山麓站乘纜車。建議 17:30 前到山麓站排隊，避開日落後的人潮高峰。',
            },
          },
          {
            time: '18:30',
            name: '🍲 函館市區晚餐',
            desc: '18:30–20:00 下山後直接在函館市區/金森倉庫周邊享用晚餐（如 阿佐利壽喜燒 或市區高分海鮮餐廳）。',
            address: '北海道函館市宝来町 10-11（阿佐利本店）',
            mapLink: 'https://maps.google.com/?q=Asari+Sukiyaki+Hakodate',
            notes: '',
          },
          {
            time: '20:30',
            name: '♨️ 返回潮騷亭泡湯休息',
            desc: '輕鬆驅車 15 分鐘返回潮騷亭，憑已拿到的鑰匙直接回房泡湯休息，零趕路壓力。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate',
            notes: '',
          },
        ],
      },
      // ── Day 12 ─────────────────────────────────────────────
      {
        date: '9/11',
        dayNum: 'Day 12',
        title: '五稜郭要塞與海景休整',
        summary: '五稜郭塔俯瞰 · 潮騷亭海景泡湯',
        illustration: './images/goryokaku.jpg',
        hotel: { name: '平成館 潮騷亭 (Hakodate)', mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate' },
        driving: { distance: '市區零星移動約 20 公里', route: null, rest: null, tips: ['16:30 登函館山須停車於山麓纜車站，17:00–22:00 私家車禁行登山道'] },
        activities: [
          {
            time: '08:30',
            name: '☕ 舒緩起床與悠閒早餐',
            desc: '08:30–10:00 不急不趕，全家睡到自然醒，在潮騷亭或周邊享用早餐與愜意休整，徹底避免趕早市排隊的勞頓與被宰風險。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate',
            notes: '',
          },
          {
            time: '10:30',
            name: '⭐ 五稜郭公園与五稜郭塔登頂',
            desc: '前往 Goryokaku (五稜郭) 參觀星形要塞公園並登五稜郭塔俯瞰星形全景。',
            address: '北海道函館市五稜郭町 43-9',
            mapLink: 'https://maps.google.com/?q=Goryokaku+Tower+Hakodate',
            notes: '',
            highlight: {
              emoji: '⭐',
              title: '五稜郭公園・五稜郭塔',
              tags: ['日本唯一星形要塞', '幕末歷史', '函館必訪', '塔高 107 公尺'],
              intro: '日本唯一的五角星形西式城堡遺跡，建於 1864 年，是幕末最後一場戰役「箱館戰爭」的終結之地。從 107 公尺高的五稜郭塔俯瞰，完美的星形輪廓一覽無遺——這個視角是函館旅行中最令人震撼的瞬間之一。',
              must: [
                '五稜郭塔展望台 — 搭電梯登頂，俯瞰完整星形要塞輪廓，春季粉紅櫻花海壯觀',
                '塔內幕末歷史館 — 展示土方歲三等幕末英雄的蠟像與史料，立體感極強',
                '星形護城河散步 — 沿要塞外圍的五角形護城河漫步，推車完全友善',
                '函館奉行所（部分復原）— 要塞中心的江戶時代官廳建築，免費入場',
              ],
              tip: '💡 塔內無障礙電梯完善，推車可直接推上展望台。早上 10:30 前人最少，下午人潮逐漸增多。',
            },
          },
          {
            time: '11:15',
            name: '🍜 錯峰午餐：味彩拉麵 / 幸運小丑漢堡',
            desc: '準時在 11:15 入座五稜郭塔旁的 麺厨房あじさい (味彩拉麵 本店) 或旁邊的 幸運小丑漢堡 (五稜郭公園前店)。',
            address: '北海道函館市五稜郭町 29-22（味彩拉麵本店）',
            notes: '',
          },
          {
            time: '13:30',
            name: '♨️ 返回潮騷亭泡湯休整',
            desc: '返回平成館 潮騷亭，下午在酒店內徹底休息泡湯，讓寶寶在榻榻米房間內補覺。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate',
            notes: '',
          },
          {
            time: '17:30',
            name: '🍽️ 晚間餐飲三套靈活預案',
            desc: '湯之川溫泉街周邊極少適合全家晚餐的餐廳，提供三套靈活方案：',
            address: '北海道函館市宇賀浦町 14-4（函太郎 宇賀浦本店）',
            mapLink: 'https://maps.google.com/?q=Kantaro+Sushi+Ugaura+Hakodate',
            notes: '',
          },
        ],
      },
      // ── Day 13 ─────────────────────────────────────────────
      {
        date: '9/12',
        dayNum: 'Day 13',
        title: '洞爺湖火山與湖畔煙火',
        summary: '有珠山纜車 · 展望台 · 湖畔煙火',
        illustration: './images/toya.jpg',
        hotel: { name: '洞爺湖萬世閣 (Toya Manseikaku)', mapLink: 'https://maps.google.com/?q=Toya+Manseikaku+Hotel' },
        driving: { 
          distance: '約 160 公里 / 2–2.5 小時', 
          route: null, 
          rest: { name: '七飯町道之站 (Michi-no-Eki Nanae)', desc: '開出函館約 30min 處，男爵土豆主題食品與精品咖啡', mapLink: 'https://maps.google.com/?q=Michi-no-Eki+Nanae+Danshaku+Lounge' }, 
          tips: ['從虻田洞爺湖 IC 下高速有陡峭連續下坡，使用低檔 (B/S檔) 發動機制動'] 
        },
        activities: [
          {
            time: '09:30',
            name: '🚗 函館出發北上洞爺湖',
            desc: '09:30 函館退房，驅車向北前往洞爺湖（總車程約 2.5 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:30',
            name: '☕ 七飯町道之站短休 (Nanae Rest Area)',
            desc: '行駛 1 小時後，在七飯町道之站 (道の駅 なないろ・ななえ) 稍作 15 分鐘休整、補給水份。',
            address: '北海道亀田郡七飯町峠下 380-2',
            mapLink: 'https://maps.google.com/?q=Nanae+Roadside+Station+Hokkaido',
            notes: '',
          },
          {
            time: '11:15',
            name: '🌋 有珠山纜車与錯峰午餐 (Mount Usu Ropeway)',
            desc: '提早在 11:15 抵達有珠山周邊享用簡易定食，隨後登上有珠山纜車俯瞰洞爺湖与昭和新山。',
            address: '北海道有珠郡壮瞥町昭和新山 184-5',
            mapLink: 'https://maps.google.com/?q=Mount+Usu+Ropeway+Hokkaido',
            notes: '',
            highlight: {
              emoji: '🌋',
              title: '有珠山・昭和新山 (Usu Ropeway)',
              tags: ['活火山近距離', '洞爺湖全景', '昭和新山奇景', '纜車友善'],
              intro: '有珠山是北海道最活躍的活火山之一，最近一次噴發在 2000 年。乘纜車登頂後，腳下同時展開三個視角的壯麗景色：洞爺湖的湖面倒影、昭和新山的火山錐體、以及無垠太平洋海景。',
              must: [
                '纜車展望台 — 洞爺湖全景、昭和新山和羊蹄山同框，是北海道最震撼的視角之一',
                '西山火口散策路 — 展望台旁的步道可近距離看 2000 年噴發後的火口遺跡（30 分鐘）',
                '昭和新山（纜車站旁）— 1943 年從麥田中突然崛起的火山錐，世界奇觀',
                '山頂餐廳 — 邊吃邊俯瞰洞爺湖，天氣好時視野無限延伸',
              ],
              tip: '💡 上午 11:00–13:00 是山頂能見度最佳時段，下午容易起霧。纜車設施完善，推車可上展望台。',
            },
          },
          {
            time: '14:30',
            name: '📸 洞爺湖 Sairo 展望台 (Sairo Observatory)',
            desc: '驅車至 Sairo 展望台停留拍照，全景遠眺洞爺湖、中島及羊蹄山。',
            address: '北海道虻田郡洞爺湖町成香 3-5',
            mapLink: 'https://maps.google.com/?q=Sairo+Observatory+Lake+Toya',
            notes: '',
          },
          {
            time: '15:30',
            name: '🏨 入住洞爺湖萬世閣 (Toya Manseikaku)',
            desc: '辦理 Check-in 入住洞爺湖萬世閣。',
            address: '北海道虻田郡洞爺湖町洞爺湖温泉 21',
            mapLink: 'https://maps.google.com/?q=Toya+Manseikaku+Hotel',
            notes: '🅿️ 停車提醒：入場時請向工作人員說明 Alphard 為高頂車，以分配高頂車位。',
          },
          {
            time: '18:00',
            name: '🍲 洞爺湖晚餐與預案提示',
            desc: '洞爺湖溫泉街晚間餐廳絕大多數在 19:30–20:00 即停止營業。',
            address: '北海道虻田郡洞爺湖町洞爺湖温泉 21',
            mapLink: 'https://maps.google.com/?q=Toya+Manseikaku+Hotel',
            notes: '🍽️ 晚餐提醒：最遲 18:30 前前往望羊蹄/仙堂庵用餐，或提前向萬世閣加購自助晚餐。',
          },
          {
            time: '20:45',
            name: '🎆 洞爺湖花火大會 (Lake Toya Fireworks)',
            desc: '20:45 湖畔漫步道或客房內觀賞洞爺湖長期花火大會。',
            address: '',
            mapLink: '',
            notes: '',
          },
        ],
      },
      // ── Day 14 ─────────────────────────────────────────────
      {
        date: '9/13',
        dayNum: 'Day 14',
        title: '支笏湖散步與飛回東京',
        summary: '支笏湖 · 順暢還車 · 新千歲 · 飛羽田',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        driving: { 
          distance: '約 100 公里 / 1 小時 20 分鐘', 
          route: null, 
          rest: { name: '樽前 SA (Tarumae SA)', desc: '行駛約 45min 處，設有 7-Eleven 及授乳室', mapLink: 'https://maps.google.com/?q=Tarumae+Service+Area+Hokkaido' }, 
          tips: ['還車前需在周邊加油站加滿油並保留加油小票'] 
        },
        activities: [
          {
            time: '10:00',
            name: '🌊 洞爺湖退房与支笏湖散步',
            desc: '10:00 洞爺湖退房，驅車前往支笏湖 (Lake Shikotsu) 湖畔散步放電。',
            address: '北海道千歳市支笏湖温泉',
            mapLink: 'https://maps.google.com/?q=Lake+Shikotsu+Hokkaido',
            notes: '',
          },
          {
            time: '16:15',
            name: '⛽ 新千歲加油站加滿油',
            desc: '16:15 抵達新千歲機場周邊 ENEOS 加油站加滿油。',
            address: '北海道千歳市美々 758-134（ENEOS 新千歲空港店）',
            mapLink: 'https://maps.google.com/?q=Eneos+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '17:00',
            name: '🚗 辦理還車与 HEP 結算',
            desc: '17:00 準時還車：前往 Toyota Rent a Car (新千歲空港 Suzuran 店) 辦理還車，並根據 ETC 記錄結算 HEP 通行證。',
            address: '北海道千歳市美々 758-134',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+Suzuran+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '17:30',
            name: '🚌 接駁車抵達新千歲機場',
            desc: '搭乘營業所免費接駁車抵達新千歲機場航站樓。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '17:45',
            name: '🧳 托運与大件行李寄存',
            desc: '前往 JAL First Class 櫃台嘗試提前托運。若櫃台拒絕提前托運，果斷前往 1F/2F 寄存大件行李。',
            address: '新千歲機場國內線航站樓 1F/2F',
            mapLink: 'https://maps.google.com/?q=New+Chitose+Airport+Terminal',
            notes: '',
          },
          {
            time: '18:15',
            name: '🛍️ 航站樓深度體驗与 Royce\' 巧克力工廠',
            desc: '18:15–20:30 國內線航站樓 2–3F 免稅購物、遊覽 Royce\' 巧克力工廠。',
            address: '新千歲機場國內線 3F Royce Chocolate World',
            mapLink: 'https://maps.google.com/?q=Royce+Chocolate+World+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '19:30',
            name: '🍼 換裝哄睡防線（深夜大轉運）',
            desc: '在機場母嬰室內，提前為一歲寶寶完成餵奶、更換拉拉褲並換上純棉睡衣。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '21:10',
            name: '🛫 搭 JAL 528 飛回羽田 (HND)',
            desc: '搭乘 JAL 528 航班飛往羽田機場。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '22:55',
            name: '🚕 抵羽田 · 打車直達 Courtyard Ginza',
            desc: '22:55 抵達羽田機場。分乘 2 輛標準出租車直達 Courtyard Ginza（銀座萬怡），車程約 20 分鐘。',
            address: '東京都中央区銀座 6-14-10（Courtyard Ginza）',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
          {
            time: '00:15',
            name: '🏨 00:15 抵達銀座萬怡 · Late Check-in 入住',
            desc: '抵達酒店，辦理 Late Check-in。今日起 🏨 按鈕將自動導航回 Courtyard Ginza！',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '⚠️ 延時入住提示：抵達已過半夜，請務必提前電郵備註 Late Check-in，防止判定為 No Show！',
          },
        ],
      },
    ],
  },

  // ============================================================
  // 第三階段：無縫銜接與終極休整
  // ============================================================
  {
    phase: '第三階段：無縫銜接與終極休整',
    phaseDates: '9/14 – 9/18',
    days: [
      // ── Day 15 ─────────────────────────────────────────────
      {
        date: '9/14',
        dayNum: 'Day 15',
        title: '銀座漫步與集中購物',
        summary: '自然醒休整 · 銀座特色午餐 · 集中購物',
        illustration: './images/ginza.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '09:30',
            name: '😴 上午：自然醒與休整 (接檔深夜航班)',
            desc: '昨夜抵達較晚，今日全家不設鬧鐘，睡到自然醒，恢復體力。利用 Courtyard Ginza 箭步可達的極致地利優勢，完全免除電車勞頓。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '11:15',
            name: '🍱 11:15 步行享用 Lunch Special',
            desc: '中午 11:15 步行前往附近享用高性價比 Lunch Special（如銀座三越/松屋百貨高層定食或周邊名店）。',
            address: '東京都中央区銀座 4-6-16（銀座三越周邊）',
            mapLink: 'https://maps.google.com/?q=Ginza+Mitsukoshi',
            notes: '',
          },
          {
            time: '13:30',
            name: '🛍️ 下午：集中購物日',
            desc: '集中採購名品、伴手禮、藥妝。由於住在銀座核心區，買好的戰利品可以隨時讓家人提回酒店房間放妥，徹底解放雙手和推車空間。',
            address: '東京都中央区銀座 6-10-1（GINZA SIX / 百貨商圈）',
            mapLink: 'https://maps.google.com/?q=GINZA+SIX+Tokyo',
            notes: '',
          },
          {
            time: '18:00',
            name: '🍽️ 傍晚：銀座漫步與優雅晚餐',
            desc: '在銀座周邊輕鬆漫步，找一家環境優雅的餐廳享用晚餐。',
            address: '東京都中央区銀座',
            mapLink: 'https://maps.google.com/?q=Ginza+Tokyo',
            notes: '',
          },
        ],
      },
      // ── Day 16 ─────────────────────────────────────────────
      {
        date: '9/15',
        dayNum: 'Day 16',
        title: '富士山包車一日遊',
        summary: '大石公園 · 富士山餺餂麵 · 忍野八海',
        illustration: './images/fuji.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '08:30',
            name: '🚗 包車酒店出發',
            desc: '08:30 包車直接在 Courtyard Ginza 樓下接駁，推車折疊放入後備箱。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:30',
            name: '🗻 大石公園 (Oishi Park)',
            desc: '遊覽大石公園，遠眺富士山全景与河口湖畔花海。',
            address: '山梨県南都留郡富士河口湖町大石 2585',
            mapLink: 'https://maps.google.com/?q=Oishi+Park+Lake+Kawaguchiko',
            notes: '',
          },
          {
            time: '11:15',
            name: '🍜 景區錯峰午餐：名物餺餂麵 (Hoto)',
            desc: '提早在 11:15 享用軟爛的名物「餺餂 (Hoto) 麵」。',
            address: '山梨県南都留郡富士河口湖町船津 6677（ほうとう不動 河口湖南店）',
            mapLink: 'https://maps.google.com/?q=Hoto+Fudou+Kawaguchiko',
            notes: '',
          },
          {
            time: '14:30',
            name: '🌊 忍野八海散步与返程',
            desc: '游覽忍野八海清澈湧泉池。隨後乘車返回東京。',
            address: '山梨県南都留郡忍野村忍草',
            mapLink: 'https://maps.google.com/?q=Oshino+Hakkai',
            notes: '',
          },
        ],
      },
      // ── Day 17 ─────────────────────────────────────────────
      {
        date: '9/16',
        dayNum: 'Day 17',
        title: '東京迪士尼樂園',
        summary: '迪士尼樂園 · 錯峰午餐 · 嬰兒中心',
        illustration: './images/disney.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '08:30',
            name: '🏰 避堵出行前往迪士尼',
            desc: '08:30 從銀座打車前往迪士尼（車程極短，約 20–25 分鐘，避開早高峰）或搭乘臨近地鐵前往。',
            address: '千葉県浦安市舞浜 1-1（東京迪士尼樂園）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Disneyland',
            notes: '',
          },
          {
            time: '09:30',
            name: '🎠 樂園遊玩与 Parent Swap 輪流看管機制',
            desc: '執行輪流看管策略：兩人陪同嬰兒遊玩溫和項目，另外兩人排隊成人項目，隨後交換。',
            address: '',
            mapLink: '',
            notes: '🎢 Parent Swap 提示：可向工作人員申請輪流看管服務，大人輪流體驗熱門項目免排兩次隊。',
          },
          {
            time: '11:15',
            name: '🍱 提前錯峰午餐',
            desc: '提前於 11:15 前往園內主題餐廳排隊，錯開迪士尼正午就餐高峰。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '12:30',
            name: '🍼 嬰兒中心 (Baby Center) 休息補給',
            desc: '利用明日世界或卡通城的嬰兒中心 (Baby Center) 餵輔食、換尿布、沖泡奶粉。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '14:30',
            name: '🎭 樹蔭休整 / 室內劇場表演',
            desc: '安排在樹蔭下休息或在室內劇場觀看精采表演。視成人體力与嬰兒狀態決定離園時間，隨後返回銀座休息。',
            address: '',
            mapLink: '',
            notes: '',
          },
        ],
      },
      // ── Day 18 ─────────────────────────────────────────────
      {
        date: '9/17',
        dayNum: 'Day 18',
        title: '皇居外苑與自由休整',
        summary: '皇居外苑漫步 · 查漏補缺 · 打包封箱',
        illustration: './images/ginza_night.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '10:00',
            name: '🌿 皇居外苑与日比谷公園漫步',
            desc: '全天在皇居外苑或日比谷公園區域輕鬆漫步放鬆。',
            address: '東京都千代田区皇居外苑 1-1',
            mapLink: 'https://maps.google.com/?q=Kokyo+Gaien+National+Garden+Tokyo',
            notes: '',
          },
          {
            time: '14:00',
            name: '🛒 查漏補缺最後採購',
            desc: '在銀座/日比谷商圈進行最後一次查漏補缺的採購。',
            address: '東京都千代田区有楽町 1-1-2（東京寶塚/Midtown Hibiya）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Midtown+Hibiya',
            notes: '',
          },
          {
            time: '18:00',
            name: '🧳 行李打包与封箱休整',
            desc: '晚餐後返回酒店，完成 4 件 24 寸行李箱与推車的整理打包封箱。',
            address: '',
            mapLink: '',
            notes: '',
          },
        ],
      },
      // ── Day 19 ─────────────────────────────────────────────
      {
        date: '9/18',
        dayNum: 'Day 19',
        title: '圓滿完結與啟程回國',
        summary: '退房準備 · 機場大巴直達羽田 · 啟程',
        illustration: './images/haneda.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '10:00',
            name: '🔍 最終清點与退房準備',
            desc: '最終清點 4 件 24 寸行李箱与推車，辦理退房。',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
          {
            time: '14:00',
            name: '🚌 酒店直登機場大巴前往羽田',
            desc: '由前台代訂好 14:15 或 14:45 的機場大巴，由酒店正門直接登車前往羽田機場 (HND)。',
            address: '東京都中央区銀座 6-14-10（Courtyard Ginza 正門）',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
          {
            time: '15:00',
            name: '✈️ 抵達羽田機場 · 托運与值機',
            desc: '15:00 順暢抵達羽田機場，前往 JAL / 全日空櫃台辦理行李托運及值機手續。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '17:40',
            name: '🛫 搭 NH 7544 返回紐約 · 圓滿完結',
            desc: '17:40 搭乘 NH 7544 航班返回紐約，為 19 天精彩的日本之旅劃上圓滿句號！🎉',
            address: '',
            mapLink: '',
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

      // 插圖放在展開內容頂部（點擊可原地順滑放大 / 收合）
      if (day.illustration) {
        const img = document.createElement('img');
        img.src = day.illustration;
        img.alt = day.title;
        img.className = 'card-illus';
        img.loading = 'lazy';
        img.title = '點擊放大 / 收合插圖';
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          const isExpanded = img.classList.contains('expanded');
          if (!isExpanded) {
            // 按圖片真實比例展開（避免不同比例圖片額外放大）
            const ratio = img.naturalHeight && img.naturalWidth
              ? img.naturalHeight / img.naturalWidth
              : 9 / 16;
            const fullHeight = Math.round(img.clientWidth * ratio);
            img.style.height = `${fullHeight}px`;
            img.classList.add('expanded');
          } else {
            img.style.height = '160px';
            img.classList.remove('expanded');
          }
        });
        body.appendChild(img);
      }

      // 自駕資訊條（僅自駕日顯示）
      if (day.driving) {
        const driveBar = document.createElement('div');
        driveBar.className = 'driving-bar';

        const d = day.driving;
        let html = `<div class="driving-header"><span class="driving-icon">🚗</span><span class="driving-dist">${d.distance}</span>`;
        if (d.route) html += `<span class="driving-route">${d.route}</span>`;
        html += `</div>`;

        if (d.rest) {
          if (typeof d.rest === 'object' && d.rest.name) {
            const restLink = d.rest.mapLink
              ? `<a class="driving-rest-link" href="${d.rest.mapLink}" target="_blank" rel="noopener">🅿️ ${d.rest.name}</a>`
              : `<span>🅿️ ${d.rest.name}</span>`;
            html += `<div class="driving-rest">${restLink}${d.rest.desc ? `：${d.rest.desc}` : ''}</div>`;
          } else {
            html += `<div class="driving-rest">🅿️ ${d.rest}</div>`;
          }
        }

        if (d.tips && d.tips.length) {
          html += `<div class="driving-tips">`;
          d.tips.forEach(t => { html += `<div class="driving-tip">⚠️ ${t}</div>`; });
          html += `</div>`;
        }

        driveBar.innerHTML = html;
        body.appendChild(driveBar);
      }

      const list = document.createElement('ul');
      list.className = 'activity-list';

      day.activities.forEach((act, actIdx) => {
        if (!act.name && !act.desc) return;

        const li = document.createElement('li');
        li.className = 'activity-item';

        // 若有 highlight，儲存在元素上以供彈窗使用
        if (act.highlight) {
          li.dataset.highlight = JSON.stringify(act.highlight);
        }

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

        const infoBtn = act.highlight
          ? `<span class="spot-info-badge">ⓘ</span>`
          : '';

        li.innerHTML = `
          <div class="activity-name-row">
            <div class="activity-name${act.highlight ? ' has-highlight' : ''}">${act.name}${infoBtn}</div>
            ${act.time ? `<span class="activity-time">${act.time}</span>` : ''}
          </div>
          ${descHtml}
          ${addressHtml}
          ${mapBtn}
          ${notesHtml}
        `;

        // 渲染 備選方案 左右滑動卡片（若有）
        if (act.options && act.options.length) {
          const optionsWrapper = document.createElement('div');
          optionsWrapper.className = 'options-carousel-wrapper';

          let cardsHtml = '';
          act.options.forEach(opt => {
            const isPri = opt.isPrimary ? ' primary' : ' secondary';
            const linkHtml = opt.mapLink
              ? `<a href="${opt.mapLink}" target="_blank" rel="noopener" class="option-link">📍 導航/地圖 ➔</a>`
              : '';
            cardsHtml += `
              <div class="option-card${isPri}">
                <div>
                  <span class="option-badge">${opt.badge}</span>
                  <div class="option-title">${opt.title}</div>
                  <div class="option-desc">${opt.desc}</div>
                </div>
                ${linkHtml}
              </div>
            `;
          });

          optionsWrapper.innerHTML = `
            <div class="options-carousel">${cardsHtml}</div>
          `;
          li.appendChild(optionsWrapper);
        }

        // 整個 activity-name 都可點擊（mobile 友善，不需精準點小圓圈）
        if (act.highlight) {
          const nameEl = li.querySelector('.activity-name.has-highlight');
          if (nameEl) {
            nameEl.addEventListener('click', (e) => {
              e.stopPropagation();
              openSpotPopup(act.highlight);
            });
          }
        }

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

let cachedRate = null; // 全局儲存 JPY 匯率

document.addEventListener('DOMContentLoaded', () => {
  renderItinerary();
  renderMemoSection();
  autoExpandToday();
  fetchRate();
  setupHotelFab();
  setupRainFab();
  setupRatePopup();
  setupSpotPopup();
});

function setupRainFab() {
  const rainFab = document.getElementById('rain-fab');
  if (!rainFab) return;

  rainFab.classList.add('hidden');

  rainFab.addEventListener('click', (e) => {
    e.stopPropagation();
    let targetBackup = null;
    const openCard = document.querySelector('.day-card.open');
    const dateStr = openCard ? openCard.getAttribute('data-date') : null;

    ITINERARY.forEach(phase => {
      phase.days.forEach(day => {
        if (dateStr && day.date === dateStr && day.rainBackup) {
          targetBackup = day.rainBackup;
        } else if (!targetBackup && day.dayNum === 'Day 2' && day.rainBackup) {
          targetBackup = day.rainBackup;
        }
      });
    });

    if (targetBackup) {
      openSpotPopup(targetBackup);
    }
  });
}

// ============================================================
// 景點簡介彈窗
// ============================================================
function openSpotPopup(h) {
  const overlay = document.getElementById('spot-overlay');
  const popup = document.getElementById('spot-popup');
  if (!overlay || !popup) return;

  const tagsHtml = (h.tags || []).map(t => `<span class="spot-tag">${t}</span>`).join('');
  const mustHtml = (h.must || []).map(m => `<li>${m}</li>`).join('');
  const tipHtml = h.tip ? `<div class="spot-tip">💡 ${h.tip.replace(/^💡\s*/, '')}</div>` : '';
  const addressHtml = h.address && h.mapLink
    ? `<div class="spot-address-box"><a href="${h.mapLink}" target="_blank" rel="noopener" class="spot-address-link">📍 導航/地圖：${h.address} ➔</a></div>`
    : '';

  popup.innerHTML = `
    <div class="spot-popup-header">
      <span class="spot-popup-emoji">${h.emoji || '📍'}</span>
      <div class="spot-popup-title">${h.title}</div>
      <div class="spot-popup-tags">${tagsHtml}</div>
    </div>
    <div class="spot-popup-body">
      <div class="spot-intro">${h.intro}</div>
      ${mustHtml ? `
      <div>
        <div class="spot-must-title">★ 必看重點</div>
        <ul class="spot-must-list">${mustHtml}</ul>
      </div>` : ''}
      ${addressHtml}
      ${tipHtml}
    </div>
  `;

  overlay.classList.add('open');
}

function setupSpotPopup() {
  const overlay = document.getElementById('spot-overlay');
  if (!overlay) return;

  // 點擊遮罩關閉
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // Esc 鍵關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
}

// ============================================================
// 核心物流與預訂備忘 (彈窗模式)
// ============================================================
function renderMemoSection() {
  const overlay = document.getElementById('memo-overlay');
  const popup = document.getElementById('memo-popup');
  const fab = document.getElementById('memo-fab');
  if (!overlay || !popup || !fab) return;

  popup.innerHTML = `
    <div class="memo-popup-header">
      <div class="memo-popup-title">📋 核心物流、預訂備忘與出行細節</div>
      <div class="memo-popup-subtitle">飯店停車、大巴代訂、零錢母嬰與行李策略</div>
    </div>
    <div class="memo-popup-body">

        <!-- 1. 自駕各飯店停車政策 -->
        <div class="memo-block highlight">
          <div class="memo-block-title">🅿️ 北海道自駕各飯店停車政策</div>
          <div class="memo-item">
            <strong>FAV LUX 札幌：</strong>無自營車場。停正後方合作地面車場（Paraca），前台掃碼優惠價 1,500 日元 / 24h（無現金支付）。<br/>
            <em>⚠️ 注意：折扣券為單次出庫券，中途開出即失效。在札幌期間建議停妥後全家步行与地鐵出行。</em>
          </div>
          <div class="memo-item"><strong>富良野 Fenix West：</strong>免費，戶外平地車位。</div>
          <div class="memo-item"><strong>登別 瀧乃家：</strong>免費，提供免費泊車服務。</div>
          <div class="memo-item"><strong>平成館 潮騷亭：</strong>免費，地面私人車場，車位充足（60+台）。</div>
          <div class="memo-item"><strong>洞爺湖萬世閣：</strong>免費。入場時主動說明 Alphard 1.95 米車高以分配高頂地面車位。</div>
          <div class="memo-item warning">
            <strong>⚠️ Alphard 停車高度紅線：</strong>車高約 1.95 米，<strong>絕對禁止駛入限高 1.55 米的機械立體車庫</strong>。
          </div>
        </div>

        <!-- 2. 關鍵機場大巴代訂時間點 -->
        <div class="memo-block">
          <div class="memo-block-title">⏰ 關鍵機場大巴代訂時間點</div>
          <div class="memo-item"><strong>Day 5 (9/4) 大巴代訂：</strong>入住涉谷 Hyatt House 期間，請前台在出發前 1-2 天代訂前往羽田大巴。</div>
          <div class="memo-item"><strong>Day 19 (9/18) 大巴代訂：</strong>入住銀座萬怡期間，請前台在出發前 1-2 天代訂前往羽田大巴（14:00 出發完美避開晚高峰）。</div>
        </div>

        <!-- 3. 零錢與母嬰細節 -->
        <div class="memo-block">
          <div class="memo-block-title">💴 零錢備用与 👶 母嬰出行細節</div>
          <div class="memo-item"><strong>現金準備：</strong>10,000 日元大鈔（高速人工通道/大餐廳/溫泉旅館）；1,000 日元零錢（投幣車場/自助繳費機）；100/500 日元硬幣（販賣機/儲物櫃）；5 日元硬幣（Day 2 淺草寺許願，日文諧音“有緣”）。</div>
          <div class="memo-item"><strong>換尿布与垃圾：</strong>多用途廁所 (Multipurpose Toilet) 均有摺疊換尿布台。無尿布垃圾桶時請隨身攜帶 BOS 防臭密封袋。</div>
          <div class="memo-item"><strong>熱水与哺乳：</strong>沿途道之站 (Michi-no-Eki) 休整 15-30 分鐘；商場及休息區嬰兒室均有 70-80 度恆溫淨水直飲機。</div>
        </div>

        <!-- 4. 行李與宅急便策略 -->
        <div class="memo-block">
          <div class="memo-block-title">🛄 行李寄存与宅急便備用預案</div>
          <div class="memo-item"><strong>Day 14 新千歲寄存：</strong>首選 JAL 頭等艙櫃台提前托運；備選 1F/2F 大格儲物櫃（600-800 日元/件）。</div>
          <div class="memo-item"><strong>宅急便備用預案：</strong>涉谷至銀座 20寸約 1,850 日元、24寸約 2,190 日元。時間差破局策略：指定收件日填 9/11，提前電郵銀座萬怡保管。</div>
        </div>

    </div>
  `;

  // 點擊 📋 FAB → 開啟備忘彈窗
  fab.addEventListener('click', () => {
    overlay.classList.add('open');
  });

  // 點擊遮罩（彈窗外面）→ 關閉
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // 按 Esc 關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
}

// 從 open.er-api.com 取得最新 USD → JPY 匯率（免費、無需 key、自動抓最新）
async function fetchRate() {
  const display = document.getElementById('rate-display');
  if (!display) return;

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.result !== 'success') throw new Error('API error');
    cachedRate = data.rates.JPY;
    display.textContent = `最新匯率：${cachedRate.toFixed(2)}`;
  } catch (err) {
    display.textContent = '最新匯率：暫無數據';
    console.warn('fetchRate error:', err);
  }
}

// 匯率換算彈窗邏輯
function setupRatePopup() {
  const badge = document.getElementById('rate-badge');
  const overlay = document.getElementById('rate-overlay');
  const jpyInput = document.getElementById('rate-jpy-input');
  const usdResult = document.getElementById('rate-usd-result');
  const note = document.getElementById('rate-popup-note');
  if (!badge || !overlay || !jpyInput || !usdResult) return;

  function calcAndShow() {
    if (!cachedRate) { usdResult.textContent = '…'; return; }
    const jpy = parseFloat(jpyInput.value) || 0;
    const usd = jpy / cachedRate;
    usdResult.textContent = usd.toFixed(2);
    if (note) note.textContent = `1 USD ≈ ${cachedRate.toFixed(2)} JPY（每日自動更新）`;
  }

  // 點擊匯率標籤 → 開啟彈窗
  badge.addEventListener('click', () => {
    overlay.classList.add('open');
    calcAndShow();
    setTimeout(() => jpyInput.select(), 100);
  });

  // 點擊遮罩（彈窗外面）→ 關閉
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // 按 Esc 關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });

  // 即時輸入計算
  jpyInput.addEventListener('input', calcAndShow);

  // 快捷金額按鈕
  document.querySelectorAll('.rate-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      jpyInput.value = btn.dataset.jpy;
      calcAndShow();
    });
  });
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
  const memoFab = document.getElementById('memo-fab');
  if (!fab || !fabName) return;

  const rainFab = document.getElementById('rain-fab');
  if (rainFab) rainFab.classList.add('hidden');

  // 建立 date → hotel 及 date → rainBackup 對照表（從 ITINERARY 資料中提取）
  const hotelMap = {};
  const rainBackupMap = {};
  ITINERARY.forEach(phase => {
    phase.days.forEach(day => {
      if (day.hotel) hotelMap[day.date] = day.hotel;
      if (day.rainBackup) rainBackupMap[day.date] = day.rainBackup;
    });
  });

  let currentHotel = null;

  // 更新 FAB 與日落標籤
  function updateFab(hotel, hasAnyOpenCard, dateStr) {
    if (memoFab) {
      memoFab.classList.toggle('hidden', !hasAnyOpenCard);
    }
    if (rainFab) {
      const hasRain = dateStr && rainBackupMap[dateStr];
      rainFab.classList.toggle('hidden', !hasRain || !hasAnyOpenCard);
    }

    // 更新日落標籤（先顯示回退值，再按需 fetch API 精確值）
    if (sunsetBadge && sunsetDisplay) {
      const sunsetInfo = dateStr ? SUNSET_TABLE[dateStr] : null;
      if (sunsetInfo && hasAnyOpenCard) {
        sunsetBadge.style.display = '';
        sunsetDisplay.textContent = `🌅 ${sunsetInfo.time} 日落 · ${sunsetInfo.city}`;
        // 若尚未從 API 取得，觸發懶加載（僅 1 次請求，緩存後不重複）
        if (!sunsetInfo.fromApi && dateStr) {
          fetchSunsetForDate(dateStr).then(updated => {
            if (updated && updated.fromApi) {
              // 確認當前仍在顯示同一天
              const stillOpen = document.querySelector('.day-card.open');
              if (stillOpen?.getAttribute('data-date') === dateStr) {
                sunsetDisplay.textContent = `🌅 ${updated.time} 日落 · ${updated.city}`;
              }
            }
          });
        }
      } else {
        sunsetBadge.style.display = 'none';
      }
    }

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

  function checkAndUpdateActiveCard() {
    const openCards = Array.from(document.querySelectorAll('.day-card.open'));
    if (!openCards.length) {
      updateFab(null, false, null);
      return;
    }

    let bestCard = openCards[0];
    let bestRatio = -1;
    visibilityMap.forEach((ratio, card) => {
      if (ratio > bestRatio && card.classList.contains('open')) {
        bestRatio = ratio;
        bestCard = card;
      }
    });

    const dateStr = bestCard.getAttribute('data-date');
    updateFab(dateStr ? hotelMap[dateStr] ?? null : null, true, dateStr);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      visibilityMap.set(entry.target, entry.intersectionRatio);
    });
    checkAndUpdateActiveCard();
  }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });

  // 觀察所有 day-card
  document.querySelectorAll('.day-card').forEach(card => observer.observe(card));

  // 頁面初始化時，立即檢查一次（處理 autoExpandToday 自動展開的情況）
  checkAndUpdateActiveCard();

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

  // 點擊 FAB：跳轉 Google Maps（用 <a> 模擬，避免 iOS Safari 空白頁問題）
  fab.addEventListener('click', () => {
    if (!currentHotel) return;
    const a = document.createElement('a');
    a.href = currentHotel.mapLink;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
