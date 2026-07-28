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
      // ── Day 5 ──────────────────────────────────────────────
      {
        date: '9/4',
        dayNum: 'Day 5',
        title: '飛往札幌 · 取車與入住',
        summary: '羽田飛往新千歲，取車辦理 HEP，入住 FAV LUX 札幌',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
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
        title: '北海道神宮禪意與狸小路漫步',
        summary: 'Komeda卡座早餐、北海道神宮散步与判官さま、狸小路&Baristart特調拿鐵',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        activities: [
          {
            time: '08:30',
            name: '☕ 早餐与早間休整 (Komeda\'s Coffee)',
            desc: '酒店內充分休息，或步行 4 分鐘至 Komeda\'s Coffee 狸小路店享用寬敞卡座早餐。',
            address: '北海道札幌市中央区南3条西5丁目 1-1',
            mapLink: 'https://maps.google.com/?q=Komeda+Coffee+Tanukikoji+Sapporo',
            notes: '11:00 前點飲料贈送現烤吐司，座位寬敞，對推車和嬰兒極友善。',
          },
          {
            time: '10:00',
            name: '⛩️ 円山公園与北海道神宮散步',
            desc: '驅車前往円山公園与北海道神宮，在參道樹蔭下慢逛散步，並在神宮內的六花亭茶屋享用現烤名物「判官さま」配熱茶。',
            address: '北海道札幌市中央区宮ケ丘 474',
            mapLink: 'https://maps.google.com/?q=Hokkaido+Shrine',
            notes: '🅿️ 停車提示：停神宮大型露天停車場，參拜可享 2 小時免費停車。參道平坦樹蔭豐富，推車散步極為舒適。',
          },
          {
            time: '11:15',
            name: '🍱 神宮錯峰午餐',
            desc: '在神宮周邊的參道茶屋或円山公園附近的家庭友好餐廳享用午餐。',
            address: '北海道札幌市中央区宮ケ丘',
            mapLink: 'https://maps.google.com/?q=Maruyama+Park+Sapporo',
            notes: '提前用餐避開正午人潮，環境安靜宜人。',
          },
          {
            time: '13:00',
            name: '🚗 返回酒店停放車輛',
            desc: '驅車返回 FAV LUX 札幌酒店停車。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '前台掃碼享單次 24 小時優惠。車輛停妥後下午可全程步行。',
          },
          {
            time: '13:30',
            name: '🛍️ 狸小路漫步与 Baristart 牧場鮮奶拿鐵',
            desc: '全員從酒店步行 3–5 分鐘無縫接入狸小路商店街与地下街 (Pole Town / Aurora Town) 慢逛採購。順路前往 Baristart Coffee 外帶自選北海道牧場鮮奶特調拿鐵。',
            address: '北海道札幌市中央区南4条西4丁目 1-2（Baristart Coffee）',
            mapLink: 'https://maps.google.com/?q=Baristart+Coffee+Sapporo',
            notes: '🥤 拿鐵推薦：可自選美瑛或澤田農場 Jersey 純奶。推車隨時可回酒店存放戰利品或讓寶寶休息。',
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

      // 插圖放在展開內容頂部（點擊可原地放大 / 收合）
      if (day.illustration) {
        const img = document.createElement('img');
        img.src = day.illustration;
        img.alt = day.title;
        img.className = 'card-illus';
        img.loading = 'lazy';
        img.title = '點擊放大 / 收合插圖';
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          img.classList.toggle('expanded');
        });
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
    const dateStr = data.time_last_update_utc.slice(5, 11); // e.g. "25 Jul"
    display.textContent = `JPY ${rate.toFixed(2)}`;
    btn.title = `數據日期：${dateStr}（每日更新），點擊刷新`;

    // 短暫閃爍提示已更新
    btn.classList.add('rate-updated');
    setTimeout(() => btn.classList.remove('rate-updated'), 800);
  } catch (err) {
    display.textContent = '暫時無法載入';
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
