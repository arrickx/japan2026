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
            highlight: {
              emoji: '🌿',
              title: '明治神宮',
              tags: ['都心森林浴', '明治天皇御祀', '免費入場', '推車友善'],
              intro: '供奉明治天皇與昭憲皇太后的神道聖地，建於 1920 年。神宮周圍被 70 公頃的人工森林環繞，約有 365 種不同樹木，在喧囂的東京城中形成一片難得的靜謐綠洲。',
              must: [
                '南參道大鳥居 — 日本最大的木製鳥居之一，高 12 公尺，進入神域的象徵',
                '酒樽與葡萄酒桶陳列廊 — 信奉者奉納的清酒桶＆法國葡萄酒桶，東西合璧獨一無二',
                '本殿參拜 — 抽籤 (みくじ) 並系在指定繩架上，祈求家庭平安',
                '御苑菖蒲園（需另購票）— 6 月菖蒲盛開，9 月仍可欣賞御苑庭園',
              ],
              tip: '💡 傍晚 16:00 後遊人最少，光線柔和拍照最美。從原宿南口進入全程無台階，推車全程順暢。',
            },
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
      // ── Day 5 ──────────────────────────────────────────────
      {
        date: '9/4',
        dayNum: 'Day 5',
        title: '飛往札幌 · 取車與入住',
        summary: '羽田飛往新千歲，取車辦理 HEP，入住 FAV LUX 札幌',
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
            notes: '天橋設有無障礙電梯，推大行李及推車請放心使用。',
          },
          {
            time: '11:45',
            name: '🚌 搭機場大巴前往羽田',
            desc: '乘坐由酒店前台代訂好的機場巴士直達羽田機場 (HND)。',
            address: '',
            mapLink: '',
            notes: '前台代訂巴士省心便捷，大件行李可直接托運於巴士行李廂。',
          },
          {
            time: '12:30',
            name: '✈️ 羽田抵達與大件行李托運',
            desc: '抵達羽田機場，前往 JAL First Class 專屬櫃台優先托運大件行李。',
            address: '東京都大田区羽田空港 3-3-2',
            mapLink: 'https://maps.google.com/?q=Haneda+Airport+Terminal+1+JAL',
            notes: '優先櫃台可快速辦理托運，減少排隊等待時間。',
          },
          {
            time: '13:00',
            name: '🍱 JAL Diamond Premier Lounge 休息',
            desc: '在休息室享用咖哩包和輕食，全員充能休息。',
            address: '羽田機場 Terminal 1 JAL Diamond Premier Lounge',
            mapLink: '',
            notes: '在休息室吃飽，新千歲抵達後無需再走機場堂食流程。',
          },
          {
            time: '16:40',
            name: '🛫 飛往新千歲 (CTS)',
            desc: '搭乘 JAL 523 航班飛往新千歲機場。',
            address: '',
            mapLink: '',
            notes: '預計飛行時間約 1.5 小時。',
          },
          {
            time: '18:20',
            name: '🛬 抵達新千歲 · 提取行李',
            desc: '抵達新千歲機場，完成行李提取流程。',
            address: '北海道千歳市美々（新千歲機場）',
            mapLink: 'https://maps.google.com/?q=New+Chitose+Airport',
            notes: '不走機場堂食流程，直接準備前往取車。',
          },
          {
            time: '19:15',
            name: '🚌 前往豐田租車營業所',
            desc: '全員直接前往 1F 豐田租車櫃台，搭乘免費接駁車前往營業所。',
            address: '新千歲機場 1F 豐田租車櫃台',
            mapLink: '',
            notes: '接駁車車程約 5–10 分鐘，班次頻繁。',
          },
          {
            time: '20:00',
            name: '🚗 辦理取車手續 (Toyota Rent-a-Car)',
            desc: '核對 W3 級 Alphard、確認 1 個安全座椅、現場辦理 ETC 卡租借與 HEP 通行證。',
            address: '北海道千歳市美々 758-134（Toyota Rent a Car Poplar）',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+Poplar+New+Chitose+Airport',
            notes: '⚠️ 取車必看：確認 HEP (Hokkaido Expressway Pass) 已成功綁定 ETC 卡，自駕高速通行更划算。',
          },
          {
            time: '21:00',
            name: '🏨 驅車抵達札幌 · 入住 FAV LUX 札幌',
            desc: '驅車前往札幌市區，辦理入住。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '🅿️ 停車提醒：請將車停放於酒店正後方的合作停車場（Paraca），前台掃碼可享受折扣優惠。今日起 🏨 按鈕將自動導航回 FAV LUX 札幌！',
          },
        ],
      },
      // ── Day 6 ──────────────────────────────────────────────
      {
        date: '9/5',
        dayNum: 'Day 6',
        title: '札幌文化體驗與烤肉',
        summary: 'Ario 採購、札幌啤酒博物館烤肉、湯咖哩晚餐、罐裝蛋糕宵夜',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        driving: { distance: '市區短途約 15 公里', route: null, rest: null, tips: ['Paraca 折扣券為一次性出庫券，停回後全家步行'] },
        activities: [
          {
            time: '10:00',
            name: '🛒 Ario 札幌母嬰補給',
            desc: '驅車前往 Ario 札幌（與啤酒博物館共用停車場）。在商場內逛阿卡醬本鋪 (Akachan Honpo) 集中採購輔食與紙尿褲，採購完畢直接放回車內。',
            address: '北海道札幌市東区北7条東9丁目 2-20',
            mapLink: 'https://maps.google.com/?q=Ario+Sapporo',
            notes: '🅿️ 停車優惠：與啤酒博物館共用停車場，出示烤肉消費憑證可享最高 6 小時免費停車。',
          },
          {
            time: '13:00',
            name: '🥩 札幌啤酒博物館成吉思汗烤肉',
            desc: '步行 2 分鐘進入 Sapporo Beer Museum (札幌啤酒博物館) 享用已預訂的成吉思汗烤肉午餐。',
            address: '北海道札幌市東区北7条東9丁目 2-10',
            mapLink: 'https://maps.google.com/?q=Sapporo+Beer+Museum',
            notes: '預訂餐點方便省心，紅磚園區環境舒適。',
          },
          {
            time: '15:00',
            name: '🚗 園區散步與回酒店休整',
            desc: '園區內輕鬆散步消食後，驅車返回 FAV LUX 札幌酒店停車。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '前台掃碼享單次 24 小時優惠。',
          },
          {
            time: '15:30',
            name: '😴 回房休息与下午觉',
            desc: '15:30–17:30 回房間休整，讓寶寶睡一個高質量的下午覺，全員恢復體力。',
            address: '',
            mapLink: '',
            notes: '充足休息保障晚間行程舒適度。',
          },
          {
            time: '17:45',
            name: '🍲 Asian Bar RAMAI 湯咖哩晚餐',
            desc: '全員步行 6 分鐘前往 Asian Bar RAMAI (札幌中央店) 享用湯咖哩晚餐。',
            address: '北海道札幌市中央区南4条西10丁目 1005-4',
            mapLink: 'https://maps.google.com/?q=Asian+Bar+RAMAI+Sapporo+Chuo',
            notes: '1F 平地無障礙、寬敞卡座半包廂，對推車和 1 歲寶寶極度友好。',
          },
          {
            time: '19:30',
            name: '🍰 薄野罐裝蛋糕宵夜与漫步',
            desc: '飯後散步 10 分鐘前往薄野 Pâtisserie OKASHI GAKU 自動販賣機購買罐裝蛋糕作宵夜，隨後漫步回酒店。',
            address: '北海道札幌市中央区南4条西2丁目 10-17',
            mapLink: 'https://maps.google.com/?q=Patisserie+OKASHI+GAKU+Sapporo',
            notes: '網紅罐裝蛋糕自販機，打卡方便，口味美味。',
          },
        ],
      },
      // ── Day 7 ──────────────────────────────────────────────
      {
        date: '9/6',
        dayNum: 'Day 7',
        title: '分頭行動與小樽漫步',
        summary: '余市酒廠品鑒 / 白色戀人工廠分頭，小樽運河匯合，LeTAO 下午茶',
        illustration: './images/otaru.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        driving: { distance: '單程約 40 公里 / 45 分鐘', route: '札樽自動車道', rest: null, tips: ['札樽高速沿海路段側風較大，雙手穩住方向盤', '小樽運河周邊 Times 露天停車場車位充足'] },
        activities: [
          {
            time: '10:00',
            name: '🔀 分頭行動開始',
            desc: 'Team A 與 Team B 按興趣及帶娃需求分頭出發。',
            address: '',
            mapLink: '',
            notes: '🥃 Team A (品酒組)：搭乘 JR 函館本線前往 Nikka Whisky 余市蒸餾所進行品鑒。\n👶 Team B (親子組)：駕駛 Alphard 前往白色戀人工廠。遊玩後經「札幌西 IC」上高速直達小樽。',
          },
          {
            time: '10:15',
            name: '🏰 Team B: 白色戀人工廠',
            desc: '親子組遊覽白色戀人工廠夢幻園區（歐式庭園、城堡鐘樓与童趣展覽）。',
            address: '北海道札幌市西区宮の沢2条2丁目 11-36',
            mapLink: 'https://maps.google.com/?q=Shiroi+Koibito+Park',
            notes: '園區推車無障礙設施完善，適合 1 歲寶寶散步打卡。',
          },
          {
            time: '10:30',
            name: '🥃 Team A: 余市威士忌酒廠 (Nikka Whisky)',
            desc: '品酒組搭 JR 前往余市蒸餾所，體驗日本威士忌發源地風采與試飲。',
            address: '北海道余市郡余市町黒川町 7-6',
            mapLink: 'https://maps.google.com/?q=Nikka+Whisky+Yoichi+Distillery',
            notes: '品酒行程請注意公共交通時刻表。',
          },
          {
            time: '13:30',
            name: '🤝 小樽站匯合与停車',
            desc: 'Team A 乘 JR 返回小樽站，與駕車抵達的 Team B 匯合。Alphard 停放於運河周邊大型露天 Times 停車場。',
            address: '北海道小樽市港町 5（Times 小樽運河前停車場）',
            mapLink: 'https://maps.google.com/?q=Otaru+Canal+Times+Parking',
            notes: '🅿️ 停車提示：露天 Times 停車場位子寬敞，停放 Alphard 極為方便。',
          },
          {
            time: '14:00',
            name: '🚣‍♂️ 小樽運河漫步与堺町通閑逛',
            desc: '沿浪漫的小樽運河漫步，遊覽玻璃工藝品与歷史街區。',
            address: '北海道小樽市港町（小樽運河）',
            mapLink: 'https://maps.google.com/?q=Otaru+Canal',
            notes: '⚠️ 推車提示：堺町通部分路段為復古石板路，推車行走請慢行注意避震。',
          },
          {
            time: '15:30',
            name: '🍰 LeTAO 本店享用下午茶',
            desc: '前往 LeTAO 本店品嚐經典雙層芝士蛋糕与限量甜品。',
            address: '北海道小樽市堺町 7-16',
            mapLink: 'https://maps.google.com/?q=LeTAO+Main+Store+Otaru',
            notes: '1F 為伴手禮區，2F 為咖啡廳。甜品口感極佳。',
          },
          {
            time: '17:00',
            name: '🚗 避開晚高峰驅車返回札幌',
            desc: '避開傍晚返程通勤高峰，全員驅車返回札幌 FAV LUX 酒店。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '17:00 出發高速路況良好，約 45 分鐘順暢返抵札幌。',
          },
        ],
      },
      // ── Day 8 ──────────────────────────────────────────────
      {
        date: '9/7',
        dayNum: 'Day 8',
        title: '北海道神宮與札幌場外市場海鮮大餐',
        summary: '神宮晨間禪意与現烤茶點輕早餐、場外市場 UME堂/おもひで食堂 海鮮大餐（含 9 折券）、狸小路漫步与特調拿鐵',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        driving: { distance: '市區短途約 15 公里', route: null, rest: null, tips: ['北海道神宮參拜可享 2 小時免費停車，進場拿好停車券並蓋章'] },
        activities: [
          {
            time: '09:15',
            name: '⛩️ 神宮晨間禪意與現烤茶點輕早餐',
            desc: '09:15 全家稍作整理出發避開高峰。驅車前往円山公園与北海道神宮，在參道樹蔭下慢逛散步，直接在神宮內的六花亭茶屋享用現烤名物「判官さま」配熱茶（表面金黃微焦的軟糯紅豆餅）作為輕早餐。',
            address: '北海道札幌市中央区宮ケ丘 474',
            mapLink: 'https://maps.google.com/?q=Hokkaido+Shrine',
            notes: '🅿️ 停車提示：神宮大型露天停車場參拜享 2 小時免費停車。參道平坦樹蔭豐富，推車散步極為舒適。',
          },
          {
            time: '11:00',
            name: '🚗 驅車前往場外市場停車場',
            desc: '11:00 驅車 8 分鐘直達 札幌場外市場 (Sapporo Outer Market) 大型免費露天停車場。',
            address: '北海道札幌市中央区北11条西21丁目 2-1（場外市場バス駐車場）',
            mapLink: 'https://maps.google.com/?q=Sapporo+Outer+Market+Bus+Parking',
            notes: '🅿️ 停車極度便利：場外市場配備多個大型免費露天地面停車場（共計 200+ 車位），無高度限制，Alphard 隨到隨停。',
          },
          {
            time: '11:15',
            name: '🦀 頂級海鮮與帝王蟹大餐 (首選 UME堂 / 備選 おもひで食堂)',
            desc: '📍 位置說明：札幌場外市場店舖均集中在同一區塊，停好車後步行 1 分鐘均可到達。<br/><br/>' +
                  '🌟 <strong>首選名店：<a href="https://maps.google.com/?q=Nemuro+Sugiyama+Suisan+Umedo+Sapporo" target="_blank" rel="noopener">根室杉山水産 UME堂 (うめぇ堂)</a></strong><br/>' +
                  '根室 50 年水產老廠直營，現場挑選活帝王蟹/毛蟹，公開稱重當面蒸烤拆解，透明無宰客；店內平地無障礙、桌椅寬敞，推車輕鬆推入，蟹腳提前剖開大人吃得極省心。<br/>' +
                  '🎫 <strong>結帳出示 <a href="https://hokkaido.letsgojp.com/coupon/409826/" target="_blank" rel="noopener">樂吃購 9 折優惠券</a> 享專屬折扣！</strong><br/><br/>' +
                  '🍣 <strong>備選名店 (Plan B)：<a href="https://maps.google.com/?q=Omohide+Shokudo+Sapporo" target="_blank" rel="noopener">おもひで食堂 (北海道特産品銷售)</a></strong><br/>' +
                  '同商圈緊鄰店舖，由活蟹直營工廠運營，內設 8 個大型活水槽。除活帝王蟹/毛蟹蒸煮与 BBQ 炭烤外，還提供水槽活生蠔/帆立貝刺身、鐵盒蒸海鮮（ガンガン焼き），且所有海鮮丼/定食均免費附贈特色螃蟹湯 (カニ汁)。1F 平地無障礙推車友好，若 UME 堂排隊可無縫切換。',
            address: '',
            mapLink: '',
            notes: '兩家均為活蟹工廠直營、透明無宰客、1F 平地無障礙，推車与寶寶極友善。',
          },
          {
            time: '13:00',
            name: '🚗 返回酒店停放車輛',
            desc: '驅車返回 FAV LUX 札幌酒店停車（前台掃碼享單次 24 小時優惠）。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '車輛停妥後下午可全程步行，避開重複計費。',
          },
          {
            time: '13:30',
            name: '🛍️ 狸小路漫步与特色拿鐵外帶',
            desc: '全員從酒店步行 3–5 分鐘無縫接入狸小路商店街与地下街 (Pole Town / Aurora Town) 慢逛採購。順路前往附近的 Baristart Coffee 外帶自選北海道牧場鮮奶（如美瑛/澤田農場 Jersey 純奶）特調拿鐵，推著推車邊走邊喝。',
            address: '北海道札幌市中央区南4条西4丁目 1-2（Baristart Coffee）',
            mapLink: 'https://maps.google.com/?q=Baristart+Coffee+Sapporo',
            notes: '🥤 推車隨時可回酒店存放戰利品或讓寶寶休息。',
          },
        ],
      },
      // ── Day 9 ──────────────────────────────────────────────
      {
        date: '9/8',
        dayNum: 'Day 9',
        title: '美瑛絕景與富良野',
        summary: '砂川綠洲休整、青池白須瀑布、美瑛放牧農場、四季彩之丘、入住 Fenix West',
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
            notes: '行李放妥後直奔高速，开启北海道自然绝景之旅。',
          },
          {
            time: '09:30',
            name: '☕ 砂川高速綠洲短休 (Sunagawa Highway Oasis)',
            desc: '行駛約 1 小時後，停靠砂川高速綠洲休息區，全員伸展休整、補給水份。',
            address: '北海道砂川市北光 102',
            mapLink: 'https://maps.google.com/?q=Sunagawa+Highway+Oasis',
            notes: '綠洲休息區設施完善，設有母嬰室及北海道特產小吃。',
          },
          {
            time: '11:00',
            name: '🌊 白金青池与白須瀑布',
            desc: '遊覽夢幻「白金青池」与磅礴「白須瀑布」。',
            address: '北海道上川郡美瑛町白金（白金青池）',
            mapLink: 'https://maps.google.com/?q=Shirogane+Blue+Pond+Biei',
            notes: '⚠️ 路況提示：青池沿湖步道多為泥土与裸露樹根，強烈建議此段使用嬰兒背帶代替推車。',
          },
          {
            time: '13:30',
            name: '🍱 美瑛町內錯峰午餐',
            desc: '13:30 之後在美瑛町內享用午餐，避開中午排隊高峰。',
            address: '北海道上川郡美瑛町',
            mapLink: 'https://maps.google.com/?q=Biei+Town',
            notes: '美瑛小鎮多特色手作咖哩或日式定食，錯峰用餐體驗更佳。',
          },
          {
            time: '14:30',
            name: '🐄 美瑛放牧酪農場 (Biei Farm)',
            desc: '驅車 10 分鐘前往美瑛放牧酪農場。在起伏的綠丘中觀賞牛群，享用鮮牛奶和軟冰淇淋。',
            address: '北海道上川郡美瑛町新田 第1',
            mapLink: 'https://maps.google.com/?q=Biei+Farm',
            notes: '🍦 官方確認：2026 年最新營業狀態為年中無休，週二照常營業。牛奶與冰淇淋極致新鮮！',
          },
          {
            time: '15:30',
            name: '🌸 四季彩之丘花海巡游',
            desc: '順路前往四季彩之丘，租用拖拉機巴士巡游彩虹花海（預留 1.5 小時，時間充裕）。',
            address: '北海道上川郡美瑛町新星 第三',
            mapLink: 'https://maps.google.com/?q=Shikisai+no+Oka+Biei',
            notes: '🚜 拖拉機巴士非常適合帶老人与寶寶輕鬆周遊廣闊花田。',
          },
          {
            time: '16:45',
            name: '🚗 離開美瑛南下富良野',
            desc: '驅車半小時南下前往富良野。',
            address: '',
            mapLink: '',
            notes: '沿途美景宜人，路況良好。',
          },
          {
            time: '17:15',
            name: '🏨 入住 Fenix West 卸行李',
            desc: '抵達富良野，至 Fenix West 辦理 Check-in 卸下行李。',
            address: '北海道富良野市北の峰町 14-38（Fenix West）',
            mapLink: 'https://maps.google.com/?q=Fenix+West+Furano',
            notes: '今日起 🏨 按鈕將自動導航回 Fenix West！',
          },
          {
            time: '17:45',
            name: '🍲 Kumagera (くまげら) 經典晚餐',
            desc: '驅車 10 分鐘前往富良野市中心的 Kumagera 享用特色晚餐。',
            address: '北海道富良野市日の出町 3-22',
            mapLink: 'https://maps.google.com/?q=Kumagera+Furano',
            notes: '⚠️ 提醒：富良野餐館普遍打烊極早，17:45 黃金時間就餐極其穩妥省心！',
          },
          {
            time: '19:00',
            name: '🍈 Co-op Sapporo 富良野店水果補給',
            desc: '順路在隔壁的 Co-op Sapporo 富良野店採購鮮奶、哈密瓜和水果補給。',
            address: '北海道富良野市若葉町 2-1',
            mapLink: 'https://maps.google.com/?q=Co-op+Sapporo+Furano',
            notes: '富良野哈密瓜及本地鮮奶必買！',
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
        title: '富良野雙農場與登別溫泉',
        summary: '富田農場&哈密瓜農場、南下登別、瀧乃家入住、D Type 部屋食',
        illustration: './images/noboribetsu.jpg',
        hotel: { name: '登別 瀧乃家 (Takinoya)', mapLink: 'https://maps.google.com/?q=Takinoya+Noboribetsu' },
        driving: { 
          distance: '約 180 公里 / 2.5–3 小時', 
          route: '道東自動車道', 
          rest: { name: '夕張 PA / 占冠 PA', desc: '開出富良野約 1h 處，可補充水分与換尿布', mapLink: 'https://maps.google.com/?q=Yubari+PA+Hokkaido' }, 
          tips: ['占冠至夕張段有單向單車道隧道，保持安全車距', '駛入登別溫泉街前有連續下坡彎道，注意減速'] 
        },
        activities: [
          {
            time: '08:30',
            name: '🏨 退房与驅車前往雙農場',
            desc: '退房，驅車 10 分鐘前往富田農場與相鄰的哈密瓜農場 (Tomita Melon House)。',
            address: '北海道空知郡中富良野町宮町 1-41（富田農場）',
            mapLink: 'https://maps.google.com/?q=Farm+Tomita+Furano',
            notes: '兩農場緊鄰，停一次車即可遊覽雙農場。',
          },
          {
            time: '08:40',
            name: '🌸 薰衣草溫室与現切哈密瓜享用',
            desc: '08:40–09:40 欣賞溫室薰衣草和秋季花田，在哈密瓜農場享用現切哈密瓜。',
            address: '北海道空知郡中富良野町宮町 3-57（Tomita Melon House）',
            mapLink: 'https://maps.google.com/?q=Tomita+Melon+House+Furano',
            notes: '現切哈密瓜甜度高、水分足，非常適合早晨品嚐。',
          },
          {
            time: '11:00',
            name: '🚗 準時出發南下登別 · 車上簡餐',
            desc: '11:00 準時出發南下（車程約 2.5 小時）。不在中途安排拉麵堂食，午餐在農場戶外熟食區打包哈密瓜披薩和男爵土豆在車上解決。',
            address: '',
            mapLink: '',
            notes: '🍱 提示：打包熟食在車上吃，可讓寶寶在 2.5 小時車程中完成高質量午睡，順暢抵達登別。',
          },
          {
            time: '13:45',
            name: '♨️ 抵達登別瀧乃家 · 無縫入住',
            desc: '13:45 抵達登別瀧乃家，無縫銜接 14:00 起的溫泉旅館入住服務。',
            address: '北海道登別市登別温泉町 162',
            mapLink: 'https://maps.google.com/?q=Takinoya+Noboribetsu',
            notes: '🏨 今日起 🏨 按鈕將自動導航回登別瀧乃家！無縫辦理 Check-in，享受高規格溫泉接待。',
          },
          {
            time: '18:00',
            name: '🍱 一泊兩食 · D Type 部屋食尊享',
            desc: '在 D Type 房型內享受「部屋食（房間內用餐）」，品嚐頂級會席料理。',
            address: '登別瀧乃家 D Type 客房內',
            mapLink: '',
            notes: '私密客房內用餐，對帶寶寶和家庭极為放鬆舒適，無需在餐廳奔波。',
          },
        ],
      },
      // ── Day 11 ─────────────────────────────────────────────
      {
        date: '9/10',
        dayNum: 'Day 11',
        title: '登別地獄谷與函館經典入城',
        summary: '登別地獄谷、八雲 PA 休整、潮騷亭 Check-in、金森紅磚倉庫、函館山夜景',
        illustration: './images/noboribetsu.jpg',
        hotel: { name: '平成館 潮騷亭 (Hakodate)', mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitai+Hakodate' },
        driving: { 
          distance: '約 200 公里 / 2.5–3 小時', 
          route: '道央自動車道', 
          rest: { name: '八雲 PA / 噴火灣 Panorama Park', desc: '行駛約 1.5h 處，🌟 极度推荐！海景公園＋母嬰休息室', mapLink: 'https://maps.google.com/?q=Yakumo+PA+Hokkaido' }, 
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
            notes: '沿高速南下，路況良好。',
          },
          {
            time: '13:00',
            name: '☕ 八雲休息站休整 (Yakumo PA)',
            desc: '行駛約 1.5 小時後，停靠 Yakumo PA (八雲休息站) 舒展休整、補給水份。',
            address: '北海道二海郡八雲町浜松 368-8',
            mapLink: 'https://maps.google.com/?q=Yakumo+PA+Hokkaido',
            notes: '八雲 PA 景色開闊，可遠眺噴火灣，設有母嬰設施与特產賣店。',
          },
          {
            time: '14:30',
            name: '🏨 潮騷亭 Check-in · 湯之川溫泉',
            desc: '14:30–15:15 直達湯之川「平成館 潮騷亭」辦理 Check-in 卸行李。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitai+Hakodate',
            notes: '🏨 今日起 🏨 按鈕將自動導航回平成館 潮騷亭！先拿到房間鑰匙卸行李，傍晚玩完直接回房休息。',
          },
          {
            time: '15:30',
            name: '🧱 金森紅磚倉庫群漫步',
            desc: '驅車 15–20 分鐘前往金森紅磚倉庫群 (Kanemori Red Brick Warehouse) 漫步購物。',
            address: '北海道函館市末広町 14-12',
            mapLink: 'https://maps.google.com/?q=Kanemori+Red+Brick+Warehouse+Hakodate',
            notes: '海濱倉庫園區，推車行走方便，設有多家精緻手作店与伴手禮店。',
          },
          {
            time: '16:30',
            name: '🚡 函館山纜車觀夜景 (Mount Hakodate Ropeway)',
            desc: '車輛停放於山麓站停車場，全員換乘纜車 (Ropeway) 登函館山觀賞日落與百萬夜景。',
            address: '北海道函館市元町 19-7（山麓站）',
            mapLink: 'https://maps.google.com/?q=Mount+Hakodate+Ropeway',
            notes: '⚠️ 交通禁行提示：每日 17:00–22:00 登山道對私家車全面禁行，切勿自駕上山！请停在山麓站露天停車場乘纜車登頂。纜車無障礙設施完善，推車可上。',
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
            notes: '百年名店壽喜燒或港灣海鮮餐廳均非常推薦。',
          },
          {
            time: '20:30',
            name: '♨️ 返回潮騷亭泡湯休息',
            desc: '輕鬆驅車 15 分鐘返回潮騷亭，憑已拿到的鑰匙直接回房泡湯休息，零趕路壓力。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitai+Hakodate',
            notes: '',
          },
        ],
      },
      // ── Day 12 ─────────────────────────────────────────────
      {
        date: '9/11',
        dayNum: 'Day 12',
        title: '舒緩自然醒、五稜郭與湯之川海景晚宴',
        summary: '睡到自然醒、悠閒早餐、五稜郭登塔、味彩拉麵/幸運小丑、潮騷亭泡湯、三套晚餐預案',
        illustration: './images/noboribetsu.jpg',
        hotel: { name: '平成館 潮騷亭 (Hakodate)', mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitai+Hakodate' },
        driving: { distance: '市區零星移動約 20 公里', route: null, rest: null, tips: ['16:30 登函館山須停車於山麓纜車站，17:00–22:00 私家車禁行登山道'] },
        activities: [
          {
            time: '08:30',
            name: '☕ 舒緩起床與悠閒早餐',
            desc: '08:30–10:00 不急不趕，全家睡到自然醒，在潮騷亭或周邊享用早餐與愜意休整，徹底避免趕早市排隊的勞頓與被宰風險。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitai+Hakodate',
            notes: '不急赶时间，全家补足睡眠与体力。',
          },
          {
            time: '10:30',
            name: '⭐ 五稜郭公園与五稜郭塔登頂',
            desc: '前往 Goryokaku (五稜郭) 參觀星形要塞公園並登五稜郭塔俯瞰星形全景。',
            address: '北海道函館市五稜郭町 43-9',
            mapLink: 'https://maps.google.com/?q=Goryokaku+Tower+Hakodate',
            notes: '五稜郭塔設有無障礙電梯，推車可輕鬆登頂遠眺。',
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
            mapLink: 'https://maps.google.com/?q=Ajisai+Ramen+Goryokaku+Hakodate',
            notes: '🍔 提示：11:15 錯峰入座可完全避開 12:00 正午長隊。幸運小丑漢堡的中華油淋雞漢堡必點！',
          },
          {
            time: '13:30',
            name: '♨️ 返回潮騷亭泡湯休整',
            desc: '返回平成館 潮騷亭，下午在酒店內徹底休息泡湯，讓寶寶在榻榻米房間內補覺。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitai+Hakodate',
            notes: '榻榻米客房非常適合寶寶安全爬行与舒適午睡。',
          },
          {
            time: '17:30',
            name: '🍽️ 晚間餐飲三套靈活預案',
            desc: '湯之川溫泉街周邊極少適合全家晚餐的餐廳，提供三套靈活方案：',
            address: '北海道函館市宇賀浦町 14-4（函太郎 宇賀浦本店）',
            mapLink: 'https://maps.google.com/?q=Kantaro+Sushi+Ugaura+Hakodate',
            notes: '🍣 方案 A (海景迴轉壽司)：17:30 驅車 8 分鐘前往「函太郎 壽司 宇賀浦本店」（海景極美，卡座寬敞推車友好）。\n🥩 方案 B (私密壽喜燒)：若前台已協助代訂「阿佐利 本店」，18:00 驅車前往享用。\n🏪 方案 C (便利店外帶)：傍晚驅車前往湯之川 Lawson / 7-Eleven 採購。',
          },
        ],
      },
      // ── Day 13 ─────────────────────────────────────────────
      {
        date: '9/12',
        dayNum: 'Day 13',
        title: '洞爺湖火山絕景與煙火',
        summary: '七飯町道之站、有珠山纜車、Sairo 展望台、萬世閣入住、湖畔煙火',
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
            notes: '沿途道央自動車道景色優美。',
          },
          {
            time: '10:30',
            name: '☕ 七飯町道之站短休 (Nanae Rest Area)',
            desc: '行駛 1 小時後，在七飯町道之站 (道の駅 なないろ・ななえ) 稍作 15 分鐘休整、補給水份。',
            address: '北海道亀田郡七飯町峠下 380-2',
            mapLink: 'https://maps.google.com/?q=Nanae+Roadside+Station+Hokkaido',
            notes: '休息站設有特產小吃与母嬰設施。',
          },
          {
            time: '11:15',
            name: '🌋 有珠山纜車与錯峰午餐 (Mount Usu Ropeway)',
            desc: '提早在 11:15 抵達有珠山周邊享用簡易定食，隨後登上有珠山纜車俯瞰洞爺湖与昭和新山。',
            address: '北海道有珠郡壮瞥町昭和新山 184-5',
            mapLink: 'https://maps.google.com/?q=Mount+Usu+Ropeway+Hokkaido',
            notes: '🌤️ 氣象提示：提前至中午抵達，可大幅降低下午山頂起霧的風險。纜車無障礙設施完善。',
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
            notes: '展望台設有大型免費停車場及特產店。',
          },
          {
            time: '15:30',
            name: '🏨 入住洞爺湖萬世閣 (Toya Manseikaku)',
            desc: '辦理 Check-in 入住洞爺湖萬世閣。',
            address: '北海道虻田郡洞爺湖町洞爺湖温泉 21',
            mapLink: 'https://maps.google.com/?q=Toya+Manseikaku+Hotel',
            notes: '🅿️ 停車提醒：入場時請主動向工作人員說明車輛高度（Alphard 均為高頂），以分配高頂地面車位。今日起 🏨 按鈕將自動導航回洞爺湖萬世閣！',
          },
          {
            time: '18:00',
            name: '🍲 洞爺湖晚餐與預案提示',
            desc: '洞爺湖溫泉街晚間餐廳絕大多數在 19:30–20:00 即停止營業。',
            address: '北海道虻田郡洞爺湖町洞爺湖温泉 21',
            mapLink: 'https://maps.google.com/?q=Toya+Manseikaku+Hotel',
            notes: '🍽️ 晚餐建議：最遲於 18:30 前前往望羊蹄（LO 20:00）或仙堂庵（LO 18:00）用餐；或者提前聯繫萬世閣加購酒店的自助晚餐（最穩妥）。',
          },
          {
            time: '20:45',
            name: '🎆 洞爺湖花火大會 (Lake Toya Fireworks)',
            desc: '20:45 湖畔漫步道或客房內觀賞洞爺湖長期花火大會。',
            address: '洞爺湖畔漫步道 / 萬世閣客房內',
            mapLink: '',
            notes: '花火船巡遊施放，在湖畔散步或客房內即可清晰觀賞，浪漫震撼。',
          },
        ],
      },
      // ── Day 14 ─────────────────────────────────────────────
      {
        date: '9/13',
        dayNum: 'Day 14',
        title: '湖畔休整與機場體驗',
        summary: '支笏湖散步、還車結算 HEP、新千歲航站樓體驗、飛羽田、入住 Courtyard Ginza',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'Courtyard Marriage Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        driving: { 
          distance: '約 100 公里 / 1 小時 20 分鐘', 
          route: null, 
          rest: { name: '樽前 SA (Tarumae SA)', desc: '行駛約 45min 處，設有 7-Eleven 及授乳室', mapLink: 'https://maps.google.com/?q=Tarumae+SA+Hokkaido' }, 
          tips: ['還車前需在周邊加油站加滿油並保留加油小票'] 
        },
        activities: [
          {
            time: '10:00',
            name: '🌊 洞爺湖退房与支笏湖散步',
            desc: '10:00 洞爺湖退房，驅車前往支笏湖 (Lake Shikotsu) 湖畔散步放電。',
            address: '北海道千歳市支笏湖温泉',
            mapLink: 'https://maps.google.com/?q=Lake+Shikotsu+Hokkaido',
            notes: '支笏湖水質清澈，湖畔公園適合寶寶散步休整。',
          },
          {
            time: '16:15',
            name: '⛽ 新千歲加油站加滿油',
            desc: '16:15 抵達新千歲機場周邊加油站加滿油。',
            address: '北海道千歳市美々（新千歲機場周邊加油站）',
            mapLink: '',
            notes: '還車前請務必保留加油發票供營業所查驗。',
          },
          {
            time: '17:00',
            name: '🚗 辦理還車与 HEP 結算',
            desc: '17:00 準時還車：前往 Toyota Rent a Car (新千歲空港 Suzuran 店) 辦理還車，並根據 ETC 記錄結算 HEP 通行證。',
            address: '北海道千歳市美々 758-134',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+Suzuran+New+Chitose+Airport',
            notes: '工作人員核對車況及 ETC 高速紀錄，快速完成結算。',
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
            notes: '寄存行李後可輕鬆逛街，無需推大行李奔波。',
          },
          {
            time: '18:15',
            name: '🛍️ 航站樓深度體驗与 Royce\' 巧克力工廠',
            desc: '18:15–20:30 國內線航站樓 2–3F 免稅購物、遊覽 Royce\' 巧克力工廠。',
            address: '新千歲機場國內線 3F Royce Chocolate World',
            mapLink: 'https://maps.google.com/?q=Royce+Chocolate+World+New+Chitose+Airport',
            notes: '新千歲機場購物食肆豐富，Royce 巧克力工廠設有透明生產線与展示。',
          },
          {
            time: '19:30',
            name: '🍼 換裝哄睡防線（深夜大轉運）',
            desc: '在機場母嬰室內，提前為一歲寶寶完成餵奶、更換拉拉褲並換上純棉睡衣。',
            address: '新千歲機場國內線母嬰室',
            mapLink: '',
            notes: '👶 提示：提前在機場完成哄睡準備，確保 21:10 登機後寶寶機能直接進入夜間深睡眠狀態。',
          },
          {
            time: '21:10',
            name: '🛫 搭 JAL 528 飛回羽田 (HND)',
            desc: '搭乘 JAL 528 航班飛往羽田機場。',
            address: '',
            mapLink: '',
            notes: '飛行時間約 1.5 小時，寶寶可在機上平穩安睡。',
          },
          {
            time: '22:55',
            name: '🚕 抵羽田 · 打車直達 Courtyard Ginza',
            desc: '22:55 抵達羽田機場。分乘 2 輛標準出租車直達 Courtyard Ginza（銀座萬怡），車程約 20 分鐘。',
            address: '東京都中央区銀座 6-14-10（Courtyard Ginza）',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '深夜打車快捷省心，大件行李分兩車放妥。',
          },
          {
            time: '00:15',
            name: '🏨 00:15 抵達銀座萬怡 · Late Check-in 入住',
            desc: '抵達酒店，辦理 Late Check-in。今日起 🏨 按鈕將自動導航回 Courtyard Ginza！',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '⚠️ 延時入住重要備註：抵達時間已過半夜，請務必在 Day 1 前通過電郵向銀座萬怡備註 Late Check-in，防止系統自動判定為 No Show 導致丟單！',
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
        title: '銀座零距離休整與集中掃貨',
        summary: '睡到自然醒、三越/松屋開門殺午餐、銀座集中購物、戰利品隨時放回酒店',
        illustration: './images/ginza.jpg',
        hotel: { name: 'Courtyard Marriage Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '09:30',
            name: '😴 自然醒与休整 (接檔深夜航班)',
            desc: '昨夜抵達較晚，今日全家不設鬧鐘，睡到自然醒，恢復體力。',
            address: '',
            mapLink: '',
            notes: '利用 Courtyard Ginza 箭步可達的地利優勢，完全免除電車勞頓。',
          },
          {
            time: '11:15',
            name: '🍱 錯峰開門殺：銀座三越 / 松屋午餐',
            desc: '11:15 步行前往銀座三越的 とんかつ あんず (Anzu 豬排) 或松屋銀座的天婦羅 綱八 享用高性價比午市定食。',
            address: '東京都中央区銀座 4-6-16（銀座三越 11F）',
            mapLink: 'https://maps.google.com/?q=Ginza+Mitsukoshi',
            notes: '11:15 剛開門入座無須排隊，推車可輕鬆進入，定食品質極高。',
          },
          {
            time: '13:30',
            name: '🛍️ 銀座核心區集中購物',
            desc: '集中採購名品、伴手禮、藥妝与母嬰用品。',
            address: '東京都中央区銀座 6-10-1（GINZA SIX）',
            mapLink: 'https://maps.google.com/?q=GINZA+SIX+Tokyo',
            notes: '🛍️ 零負擔提示：由於住在銀座核心區，買好的戰利品可以隨時讓家人提回酒店房間放妥，徹底解放雙手和推車空間！',
          },
          {
            time: '18:00',
            name: '🍽️ 銀座漫步与優雅晚餐',
            desc: '在銀座周邊輕鬆漫步，找一家環境優雅的餐廳享用晚餐。',
            address: '東京都中央区銀座',
            mapLink: 'https://maps.google.com/?q=Ginza+Tokyo',
            notes: '銀座步行街傍晚燈光璀璨，餐廳選擇豐富，適合悠閒散步。',
          },
        ],
      },
      // ── Day 16 ─────────────────────────────────────────────
      {
        date: '9/15',
        dayNum: 'Day 16',
        title: '富士山包車一日遊',
        summary: '包車出發、大石公園花海、錯峰享用餺餂麵、忍野八海散步',
        illustration: './images/fuji.jpg',
        hotel: { name: 'Courtyard Marriage Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '08:30',
            name: '🚗 包車酒店出發',
            desc: '08:30 包車直接在 Courtyard Ginza 樓下接駁，推車折疊放入後備箱。',
            address: '',
            mapLink: '',
            notes: '包車出行，完全避開公共交通通勤壓力与換乘繁瑣。',
          },
          {
            time: '10:30',
            name: '🗻 大石公園 (Oishi Park)',
            desc: '遊覽大石公園，遠眺富士山全景与河口湖畔花海。',
            address: '山梨県南都留郡富士河口湖町大石 2585',
            mapLink: 'https://maps.google.com/?q=Oishi+Park+Lake+Kawaguchiko',
            notes: '公園沿湖步道平坦，推車行走極為方便，設有特色軟冰淇淋店。',
          },
          {
            time: '11:15',
            name: '🍜 景區錯峰午餐：名物餺餂麵 (Hoto)',
            desc: '提早在 11:15 享用軟爛的名物「餺餂 (Hoto) 麵」。',
            address: '山梨県南都留郡富士河口湖町船津 6677（ほうとう不動 河口湖南店）',
            mapLink: 'https://maps.google.com/?q=Hoto+Fudou+Kawaguchiko',
            notes: '🍲 嬰兒友善：餺餂麵麵條軟爛、湯頭濃郁蔬菜豐富，非常便於嬰兒進食。11:15 入座可完全避開正午就餐高峰。',
          },
          {
            time: '14:30',
            name: '🌊 忍野八海散步与返程',
            desc: '游覽忍野八海清澈湧泉池。隨後乘車返回東京。',
            address: '山梨県南都留郡忍野村忍草',
            mapLink: 'https://maps.google.com/?q=Oshino+Hakkai',
            notes: '湧泉水質極清澈，村落風情濃郁。傍晚包車平穩返抵銀座 Courtyard 酒店。',
          },
        ],
      },
      // ── Day 17 ─────────────────────────────────────────────
      {
        date: '9/16',
        dayNum: 'Day 17',
        title: '東京迪士尼樂園',
        summary: '避堵打車前往、Parent Swap輪流玩、11:15錯峰午餐、嬰兒中心補給、樹蔭劇場休息',
        illustration: './images/disney.jpg',
        hotel: { name: 'Courtyard Marriage Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '08:30',
            name: '🏰 避堵出行前往迪士尼',
            desc: '08:30 從銀座打車前往迪士尼（車程極短，約 20–25 分鐘，避開早高峰）或搭乘臨近地鐵前往。',
            address: '千葉県浦安市舞浜 1-1（東京迪士尼樂園）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Disneyland',
            notes: '📅 避人流提示：此時全家已徹底適應時差。今天是週三，樂園人流通常為一週低谷！',
          },
          {
            time: '09:30',
            name: '🎠 樂園遊玩与 Parent Swap 輪流看管機制',
            desc: '執行輪流看管策略：兩人陪同嬰兒遊玩溫和項目，另外兩人排隊成人項目，隨後交換。',
            address: '東京迪士尼樂園園內',
            mapLink: '',
            notes: '🎢 Parent Swap 提示：工作人員會提供服務，讓大人轮流體驗熱門項目而無需重複排長隊。',
          },
          {
            time: '11:15',
            name: '🍱 提前錯峰午餐',
            desc: '提前於 11:15 前往園內主題餐廳排隊，錯開迪士尼正午就餐高峰。',
            address: '東京迪士尼樂園主題餐廳',
            mapLink: '',
            notes: '11:15 前入座可輕鬆獲得餐位与推車停放空間。',
          },
          {
            time: '12:30',
            name: '🍼 嬰兒中心 (Baby Center) 休息補給',
            desc: '利用明日世界或卡通城的嬰兒中心 (Baby Center) 餵輔食、換尿布、沖泡奶粉。',
            address: '東京迪士尼樂園 Baby Center',
            mapLink: '',
            notes: '👶 設施完善：設有熱水、換尿布台、獨立哺乳室及輔食加熱微波爐。',
          },
          {
            time: '14:30',
            name: '🎭 樹蔭休整 / 室內劇場表演',
            desc: '安排在樹蔭下休息或在室內劇場觀看精采表演。視成人體力与嬰兒狀態決定離園時間，隨後返回銀座休息。',
            address: '東京迪士尼樂園園內',
            mapLink: '',
            notes: '下午可彈性離園，不強求待到閉園，以寶寶与家人舒適度為第一優先。',
          },
        ],
      },
      // ── Day 18 ─────────────────────────────────────────────
      {
        date: '9/17',
        dayNum: 'Day 18',
        title: '皇居漫步與自由休整',
        summary: '皇居/日比谷漫步、查漏補缺最後採購、行李打包封箱',
        illustration: './images/shibuya.jpg',
        hotel: { name: 'Courtyard Marriage Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '10:00',
            name: '🌿 皇居外苑与日比谷公園漫步',
            desc: '全天在皇居外苑或日比谷公園區域輕鬆漫步放鬆。',
            address: '東京都千代田区皇居外苑 1-1',
            mapLink: 'https://maps.google.com/?q=Kokyo+Gaien+National+Garden+Tokyo',
            notes: '皇居外苑綠地廣闊、步道平坦，對推車与老人極為友好。',
          },
          {
            time: '14:00',
            name: '🛒 查漏補缺最後採購',
            desc: '在銀座/日比谷商圈進行最後一次查漏補缺的採購。',
            address: '東京都千代田区有楽町 1-1-2（東京寶塚/Midtown Hibiya）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Midtown+Hibiya',
            notes: '把剩餘未買齊的伴手禮与補給品一次性補齊。',
          },
          {
            time: '18:00',
            name: '🧳 行李打包与封箱休整',
            desc: '晚餐後返回酒店，完成 4 件 24 寸行李箱与推車的整理打包封箱。',
            address: 'Courtyard Ginza 客房內',
            mapLink: '',
            notes: '提前將大件行李及免稅品分類整理完畢，確保明日返程輕鬆無憂。',
          },
        ],
      },
      // ── Day 19 ─────────────────────────────────────────────
      {
        date: '9/18',
        dayNum: 'Day 19',
        title: '圓滿完結 · 啟程回國',
        summary: '行李清點、代訂機場大巴直達羽田、JAL值機、NH 7544 飛紐約',
        illustration: './images/shibuya.jpg',
        hotel: { name: 'Courtyard Marriage Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '10:00',
            name: '🔍 最終清點与退房準備',
            desc: '最終清點 4 件 24 寸行李箱与推車，辦理退房。',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '檢查護照、隨身物品、IC 卡及隨身貴重物品。',
          },
          {
            time: '14:00',
            name: '🚌 酒店直登機場大巴前往羽田',
            desc: '由前台代訂好 14:15 或 14:45 的機場大巴，由酒店正門直接登車前往羽田機場 (HND)。',
            address: 'Courtyard Ginza 正門大巴站',
            mapLink: '',
            notes: '🚌 完美錯峰提示：14:00 出發完美避開 17:30 開始的機場大巴与地鐵晚高峰！大件行李由司機統一放入大巴行李廂，全程免手提。',
          },
          {
            time: '15:00',
            name: '✈️ 抵達羽田機場 · 托運与值機',
            desc: '15:00 順暢抵達羽田機場，前往 JAL / 全日空櫃台辦理行李托運及值機手續。',
            address: '東京都大田区羽田空港 3-4-2（羽田機場第 3 航廈）',
            mapLink: 'https://maps.google.com/?q=Haneda+Airport+Terminal+3',
            notes: '過關後可進行最後的免稅伴手禮採購与休息。',
          },
          {
            time: '17:40',
            name: '🛫 搭 NH 7544 返回紐約 · 圓滿完結',
            desc: '17:40 搭乘 NH 7544 航班返回紐約，為 19 天精彩的日本之旅劃上圓滿句號！🎉',
            address: '',
            mapLink: '',
            notes: '✈️ 祝全家返程一路平安，旅途愉快！',
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
            // 計算 4:3 比例下满宽的高度
            const fullHeight = Math.round(img.clientWidth * (3 / 4));
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
          ? `<button class="spot-info-btn" aria-label="景點簡介">ⓘ</button>`
          : '';

        li.innerHTML = `
          <div class="activity-name-row">
            <div class="activity-name">${act.name}${infoBtn}</div>
            ${act.time ? `<span class="activity-time">${act.time}</span>` : ''}
          </div>
          ${descHtml}
          ${addressHtml}
          ${mapBtn}
          ${notesHtml}
        `;

        // 綁定 ⓘ 按鈕點擊事件
        if (act.highlight) {
          const btn = li.querySelector('.spot-info-btn');
          if (btn) {
            btn.addEventListener('click', (e) => {
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
  setupRatePopup();
  setupSpotPopup();
});

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
      ${tipHtml}
    </div>
    <button class="spot-close-btn" id="spot-close-btn">關閉</button>
  `;

  overlay.classList.add('open');

  popup.querySelector('#spot-close-btn')?.addEventListener('click', () => {
    overlay.classList.remove('open');
  });
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

  // 預設隱藏 memoFab，只有展開某天行程時才顯示
  if (memoFab) memoFab.classList.add('hidden');

  // 建立 date → hotel 對照表（從 ITINERARY 資料中提取）
  const hotelMap = {};
  ITINERARY.forEach(phase => {
    phase.days.forEach(day => {
      if (day.hotel) hotelMap[day.date] = day.hotel;
    });
  });

  let currentHotel = null;

  // 更新 FAB 顯示
  function updateFab(hotel, hasAnyOpenCard) {
    if (memoFab) {
      memoFab.classList.toggle('hidden', !hasAnyOpenCard);
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
    const hasAnyOpenCard = Array.from(document.querySelectorAll('.day-card')).some(c => c.classList.contains('open'));
    updateFab(dateStr ? hotelMap[dateStr] ?? null : null, hasAnyOpenCard);
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
