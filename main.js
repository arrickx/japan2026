// ============================================================
// 日落與天氣座標系統（sunrisesunset.io + Open-Meteo JMA 氣象 API）
// ============================================================

// 每天對應的精準城市坐標（包含自駕跨城日之「上午/下午」分段獨立座標）
const SUNSET_COORDS = {
  '8/31': { lat: 35.6580, lng: 139.7016, city: '涉谷',       apiDate: '2026-08-31' },
  '9/1':  { lat: 35.6762, lng: 139.6503, city: '東京',       apiDate: '2026-09-01' },
  '9/2':  { lat: 35.3192, lng: 139.5467, city: '鎌倉',       apiDate: '2026-09-02' },
  '9/3':  { lat: 35.4437, lng: 139.6380, city: '橫濱',       apiDate: '2026-09-03' },
  '9/4':  { lat: 43.0618, lng: 141.3545, city: '札幌',       apiDate: '2026-09-04' },
  '9/5':  { lat: 43.0618, lng: 141.3545, city: '札幌',       apiDate: '2026-09-05' },
  '9/6':  { 
    lat: 43.1907, lng: 140.9947, city: '小樽',       apiDate: '2026-09-06',
    segments: [
      { label: '上午', city: '札幌', lat: 43.0618, lng: 141.3545, startHour: 6, endHour: 12 },
      { label: '下午', city: '小樽', lat: 43.1907, lng: 140.9947, startHour: 12, endHour: 24 }
    ]
  },
  '9/7':  { lat: 43.0618, lng: 141.3545, city: '札幌',       apiDate: '2026-09-07' },
  '9/8':  { 
    lat: 43.5900, lng: 142.4700, city: '美瑛',       apiDate: '2026-09-08',
    segments: [
      { label: '上午', city: '札幌', lat: 43.0618, lng: 141.3545, startHour: 6, endHour: 11 },
      { label: '下午', city: '美瑛', lat: 43.5900, lng: 142.4700, startHour: 11, endHour: 24 }
    ]
  },
  '9/9':  { 
    lat: 43.3400, lng: 142.3800, city: '富良野',     apiDate: '2026-09-09',
    segments: [
      { label: '上午', city: '富良野', lat: 43.3400, lng: 142.3800, startHour: 6, endHour: 12 },
      { label: '下午', city: '登別',   lat: 42.4172, lng: 141.1070, startHour: 12, endHour: 24 }
    ]
  },
  '9/10': { 
    lat: 42.4172, lng: 141.1070, city: '登別',       apiDate: '2026-09-10',
    segments: [
      { label: '上午', city: '登別',   lat: 42.4172, lng: 141.1070, startHour: 6, endHour: 12 },
      { label: '下午', city: '函館',   lat: 41.7687, lng: 140.7288, startHour: 12, endHour: 24 }
    ]
  },
  '9/11': { lat: 41.7687, lng: 140.7288, city: '函館',       apiDate: '2026-09-11' },
  '9/12': { 
    lat: 42.5700, lng: 140.8300, city: '洞爺湖',     apiDate: '2026-09-12',
    segments: [
      { label: '上午', city: '函館',   lat: 41.7687, lng: 140.7288, startHour: 6, endHour: 11 },
      { label: '下午', city: '洞爺湖', lat: 42.5700, lng: 140.8300, startHour: 11, endHour: 24 }
    ]
  },
  '9/13': { 
    lat: 35.6329, lng: 139.8804, city: '迪士尼',     apiDate: '2026-09-13',
    segments: [
      { label: '上午', city: '洞爺湖', lat: 42.5700, lng: 140.8300, startHour: 6, endHour: 12 },
      { label: '下午', city: '支笏湖', lat: 42.7500, lng: 141.3300, startHour: 12, endHour: 24 }
    ]
  },
  '9/14': { lat: 35.6712, lng: 139.7650, city: '銀座',       apiDate: '2026-09-14' },
  '9/15': { 
    lat: 35.5165, lng: 138.7527, city: '富士山',     apiDate: '2026-09-15',
    segments: [
      { label: '上午', city: '富士山', lat: 35.5165, lng: 138.7527, startHour: 6, endHour: 15 },
      { label: '下午', city: '銀座',   lat: 35.6712, lng: 139.7650, startHour: 15, endHour: 24 }
    ]
  },
  '9/16': { lat: 35.6712, lng: 139.7650, city: '銀座',       apiDate: '2026-09-17' },
  '9/17': { lat: 35.6712, lng: 139.7650, city: '銀座',       apiDate: '2026-09-17' },
  '9/18': { lat: 35.5494, lng: 139.7798, city: '羽田',       apiDate: '2026-09-18' },
};

// 精準天文日落時間表（基於各城市經緯度預先精算，0ms 秒開即顯，無延遲刷新）
const SUNSET_TABLE = {
  '8/31': { time: '6:11 PM', city: '涉谷' },
  '9/1':  { time: '6:09 PM', city: '東京' },
  '9/2':  { time: '6:09 PM', city: '鎌倉' },
  '9/3':  { time: '6:07 PM', city: '橫濱' },
  '9/4':  { time: '6:07 PM', city: '札幌' },
  '9/5':  { time: '6:05 PM', city: '札幌' },
  '9/6':  { time: '6:04 PM', city: '小樽' },
  '9/7':  { time: '6:01 PM', city: '札幌' },
  '9/8':  { time: '5:58 PM', city: '美瑛' },
  '9/9':  { time: '5:57 PM', city: '富良野' },
  '9/10': { time: '5:57 PM', city: '登別' },
  '9/11': { time: '5:56 PM', city: '函館' },
  '9/12': { time: '5:53 PM', city: '洞爺湖' },
  '9/13': { time: '5:48 PM', city: '迪士尼' },
  '9/14': { time: '5:47 PM', city: '迪士尼' },
  '9/15': { time: '5:48 PM', city: '富士山' },
  '9/16': { time: '5:44 PM', city: '銀座' },
  '9/17': { time: '5:43 PM', city: '銀座' },
  '9/18': { time: '5:41 PM', city: '羽田' },
};

// ============================================================
// Open-Meteo 天氣與降雨預報系統（支援日本 JMA 氣象模型，單次 Batch 高速請求）
// ============================================================

const WEATHER_CACHE = {};
let batchWeatherPromise = null;

// 嘗試從 sessionStorage 瞬時恢復緩存（0ms 秒開即顯）
try {
  const cachedJson = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('JP2026_WEATHER_CACHE') : null;
  if (cachedJson) {
    const parsed = JSON.parse(cachedJson);
    if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < 10 * 60 * 1000) && parsed.data) {
      Object.assign(WEATHER_CACHE, parsed.data);
    }
  }
} catch (e) {
  // Ignore storage read error
}

/** 獲取當前日本標準時間（JST） */
function getNowJST() {
  const now = new Date();
  const jstFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  });
  const parts = jstFormatter.formatToParts(now);
  const map = {};
  parts.forEach(p => map[p.type] = p.value);
  return {
    year: parseInt(map.year, 10),
    month: parseInt(map.month, 10),
    day: parseInt(map.day, 10),
    hour: parseInt(map.hour, 10),
    minute: parseInt(map.minute, 10),
    dateStr: `${map.month}/${map.day}`,
    isoDate: `${map.year}-${String(map.month).padStart(2, '0')}-${String(map.day).padStart(2, '0')}`
  };
}

/** WMO 天氣代碼轉換為 Emoji 圖示 */
function getWeatherEmoji(code, prob = 0) {
  if (prob >= 50) return '🌧️';
  if (code === 0) return '☀️';
  if (code === 1 || code === 2) return '🌤️';
  if (code === 3) return '⛅';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '🌨️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '⛅';
}

/**
 * 根據逐時降雨數據與氣象代碼，精準分級雨勢與時段（基於日本氣象廳 JMA 體系）
 * 分級：微雨（毛毛雨） / 小雨 / 陣雨 / 中雨 / 大雨 / 雷雨
 */
function describeRainSummary(hourlyRainList, totalRain, weatherCode = 0) {
  if (!hourlyRainList || hourlyRainList.length === 0 || totalRain < 0.2) {
    return null;
  }

  const hours = hourlyRainList.map(item => parseInt(item.hour.split(':')[0], 10));
  const rainAmounts = hourlyRainList.map(item => item.rain);
  const maxHourlyRain = Math.max(...rainAmounts);
  const minHour = Math.min(...hours);
  const maxHour = Math.max(...hours);

  // 雨勢層級判定（嚴格依據日本氣象廳 JMA 降水量標準與 WMO 代碼）
  let intensity = '微雨';
  if (weatherCode >= 95 && weatherCode <= 99) {
    intensity = '雷雨';
  } else if (maxHourlyRain >= 10 || totalRain >= 20) {
    intensity = '大雨';
  } else if (maxHourlyRain >= 3.5 || totalRain >= 8) {
    intensity = '中雨';
  } else if ((weatherCode >= 80 && weatherCode <= 82) || (maxHourlyRain >= 1.8 && hours.length <= 4)) {
    intensity = '陣雨';
  } else if (totalRain >= 1.5 || maxHourlyRain >= 0.8) {
    intensity = '小雨';
  } else {
    intensity = '微雨';
  }

  const timeStr = minHour === maxHour ? `${minHour}點` : `${minHour}-${maxHour}點`;
  return `${intensity}(${timeStr})`;
}

/**
 * 一次性 Batch 請求所有天數的城市天氣（只需 1 個 HTTP GET 請求，耗時約 0.3~0.5s）
 */
async function fetchAllCitiesWeatherBatch() {
  if (batchWeatherPromise) return batchWeatherPromise;

  batchWeatherPromise = (async () => {
    try {
      const coordMap = new Map();
      Object.values(SUNSET_COORDS).forEach(c => {
        const key = `${c.lat.toFixed(4)},${c.lng.toFixed(4)}`;
        if (!coordMap.has(key)) {
          coordMap.set(key, { lat: c.lat, lng: c.lng });
        }
        if (c.segments) {
          c.segments.forEach(s => {
            const sKey = `${s.lat.toFixed(4)},${s.lng.toFixed(4)}`;
            if (!coordMap.has(sKey)) {
              coordMap.set(sKey, { lat: s.lat, lng: s.lng });
            }
          });
        }
      });

      const uniqueCoords = Array.from(coordMap.values());
      const lats = uniqueCoords.map(c => c.lat.toFixed(4)).join(',');
      const lngs = uniqueCoords.map(c => c.lng.toFixed(4)).join(',');

      // 支援長達 16 天日預報與逐時降雨預報
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&daily=weather_code,precipitation_probability_max,precipitation_sum,temperature_2m_max,temperature_2m_min&hourly=weather_code,precipitation,precipitation_probability,temperature_2m&timezone=Asia%2FTokyo&forecast_days=16`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Weather API HTTP ${res.status}`);
      const dataList = await res.json();
      const items = Array.isArray(dataList) ? dataList : [dataList];

      uniqueCoords.forEach((coord, idx) => {
        const data = items[idx];
        if (data && data.daily && data.daily.time) {
          const key = `${coord.lat.toFixed(4)},${coord.lng.toFixed(4)}`;
          
          const hourlyEntries = [];
          if (data.hourly && data.hourly.time) {
            data.hourly.time.forEach((hTime, hIdx) => {
              hourlyEntries.push({
                time: hTime,
                hourNum: parseInt(hTime.slice(11, 13), 10),
                code: data.hourly.weather_code?.[hIdx] ?? 0,
                rain: data.hourly.precipitation?.[hIdx] ?? 0,
                prob: data.hourly.precipitation_probability?.[hIdx] ?? 0,
                temp: data.hourly.temperature_2m?.[hIdx] ?? null
              });
            });
          }

          const dailyEntries = data.daily.time.map((time, dIdx) => {
            // 提取當天的逐時降雨小時
            const dayHours = hourlyEntries.filter(h => h.time.startsWith(time) && h.rain > 0);
            const code = data.daily.weather_code ? data.daily.weather_code[dIdx] ?? 0 : 0;
            const totalRain = data.daily.precipitation_sum ? data.daily.precipitation_sum[dIdx] ?? 0 : 0;
            const rainSummary = describeRainSummary(
              dayHours.map(h => ({ hour: h.time.slice(11, 16), rain: h.rain })),
              totalRain,
              code
            );

            return {
              date: time,
              code: code,
              prob: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[dIdx] ?? 0 : 0,
              rain: totalRain,
              rainSummary: rainSummary,
              tempMax: data.daily.temperature_2m_max ? Math.round(data.daily.temperature_2m_max[dIdx]) : null,
              tempMin: data.daily.temperature_2m_min ? Math.round(data.daily.temperature_2m_min[dIdx]) : null,
            };
          });

WEATHER_CACHE[key] = {
            daily: dailyEntries,
            hourly: hourlyEntries
          };
        }
      });

      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('JP2026_WEATHER_CACHE', JSON.stringify({
            timestamp: Date.now(),
            data: WEATHER_CACHE
          }));
        }
      } catch (e) {}

      return true;
    } catch (err) {
      console.warn('Batch weather fetch fallback:', err.message);
      return false;
    }
  })();

  return batchWeatherPromise;
}

/** 獲取特定城市座標的天氣預報（優先從 Batch 緩存讀取） */
async function fetchCityWeather(lat, lng) {
  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  if (WEATHER_CACHE[cacheKey]) {
    return WEATHER_CACHE[cacheKey];
  }

  // 若 Batch 請求尚未完成，等待 Batch 請求
  if (batchWeatherPromise) {
    await batchWeatherPromise;
    if (WEATHER_CACHE[cacheKey]) return WEATHER_CACHE[cacheKey];
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,precipitation_probability_max,precipitation_sum,temperature_2m_max,temperature_2m_min&hourly=weather_code,precipitation,precipitation_probability,temperature_2m&timezone=Asia%2FTokyo&forecast_days=16`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API HTTP ${res.status}`);
    const data = await res.json();
    if (!data.daily || !data.daily.time) throw new Error('Invalid weather data');

    const hourlyEntries = [];
    if (data.hourly && data.hourly.time) {
      data.hourly.time.forEach((hTime, hIdx) => {
        hourlyEntries.push({
          time: hTime,
          hourNum: parseInt(hTime.slice(11, 13), 10),
          code: data.hourly.weather_code?.[hIdx] ?? 0,
          rain: data.hourly.precipitation?.[hIdx] ?? 0,
          prob: data.hourly.precipitation_probability?.[hIdx] ?? 0,
          temp: data.hourly.temperature_2m?.[hIdx] ?? null
        });
      });
    }

    const dailyEntries = data.daily.time.map((time, idx) => {
      const dayHours = hourlyEntries.filter(h => h.time.startsWith(time) && h.rain > 0);
      const code = data.daily.weather_code ? data.daily.weather_code[idx] ?? 0 : 0;
      const totalRain = data.daily.precipitation_sum ? data.daily.precipitation_sum[idx] ?? 0 : 0;
      const rainSummary = describeRainSummary(
        dayHours.map(h => ({ hour: h.time.slice(11, 16), rain: h.rain })),
        totalRain,
        code
      );

      return {
        date: time,
        code: code,
        prob: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[idx] ?? 0 : 0,
        rain: totalRain,
        rainSummary: rainSummary,
        tempMax: data.daily.temperature_2m_max ? Math.round(data.daily.temperature_2m_max[idx]) : null,
        tempMin: data.daily.temperature_2m_min ? Math.round(data.daily.temperature_2m_min[idx]) : null,
      };
    });

    const result = { daily: dailyEntries, hourly: hourlyEntries };
    WEATHER_CACHE[cacheKey] = result;
    return result;
  } catch (err) {
    console.warn(`Weather fetch fallback for ${lat},${lng}:`, err.message);
    return null;
  }
}

/** 依據時段計算單一時段的精確氣象與雨勢 */
function getSegmentForecast(cacheKey, apiDate, seg) {
  const cache = WEATHER_CACHE[cacheKey];
  if (!cache || !cache.hourly) return null;
  const hours = cache.hourly.filter(h => h.time.startsWith(apiDate) && h.hourNum >= seg.startHour && h.hourNum < seg.endHour);
  if (!hours.length) return null;

  const maxProb = Math.max(...hours.map(h => h.prob));
  const totalRain = Math.round(hours.reduce((acc, h) => acc + h.rain, 0) * 10) / 10;
  const maxTemp = Math.round(Math.max(...hours.map(h => h.temp)));
  const minTemp = Math.round(Math.min(...hours.map(h => h.temp)));
  const rainHours = hours.filter(h => h.rain > 0).map(h => ({ hour: `${String(h.hourNum).padStart(2, '0')}:00`, rain: h.rain }));
  let code = 0;
  hours.forEach(h => { if (h.code > code) code = h.code; });
  const rainSummary = describeRainSummary(rainHours, totalRain, code);
  const isAlert = maxProb >= 50;
  const emoji = getWeatherEmoji(code, maxProb);

  return {
    segmentLabel: seg.label,
    city: seg.city,
    prob: maxProb,
    rain: totalRain,
    code: code,
    emoji: emoji,
    tempMin: minTemp,
    tempMax: maxTemp,
    isAlert: isAlert,
    rainSummary: rainSummary,
    startHour: seg.startHour,
    endHour: seg.endHour
  };
}

/**
 * 依目標日期獲取該日及後續 2 天（共 3 天）的真實日曆日期天氣預報
 * 跨城市時（如 Day 9 美瑛、Day 10 富良野、Day 11 登別）各自精準查詢所屬城市座標！
 * 若當日包含上午/下午跨城市自駕，分別生成統一規格的時段膠囊！
 */
async function get3DayForecastForDate(startDateStr) {
  const allDays = [];
  forEachDay(day => allDays.push(day));

  const startIdx = allDays.findIndex(d => d.date === startDateStr);
  if (startIdx === -1) return null;

  const targetDays = allDays.slice(startIdx, Math.min(startIdx + 3, allDays.length));

  const nowJst = getNowJST();
  const todayStr = nowJst.isoDate;
  
  const nowMs = Date.now();
  const tomorrow = new Date(nowMs + 86400000);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
  
  const dayAfter = new Date(nowMs + 86400000 * 2);
  const dayAfterStr = `${dayAfter.getFullYear()}-${String(dayAfter.getMonth() + 1).padStart(2, '0')}-${String(dayAfter.getDate()).padStart(2, '0')}`;

  const forecastResults = [];

  for (let offset = 0; offset < targetDays.length; offset++) {
    const day = targetDays[offset];
    const coords = SUNSET_COORDS[day.date];
    if (!coords) continue;

    const weatherData = await fetchCityWeather(coords.lat, coords.lng);
    const matchedDay = weatherData?.daily?.find(d => d.date === coords.apiDate);

    let relLabel = '';
    if (coords.apiDate === todayStr) {
      relLabel = '今天';
    } else if (coords.apiDate === tomorrowStr) {
      relLabel = '明天';
    } else if (coords.apiDate === dayAfterStr) {
      relLabel = '後天';
    }

    if (!matchedDay) {
      forecastResults.push({
        date: day.date,
        segmentLabel: '',
        apiDate: coords.apiDate,
        dayNum: day.dayNum,
        city: coords.city,
        emoji: '⛅',
        prob: 15,
        rain: 0,
        rainSummary: null,
        tempMax: null,
        tempMin: null,
        isAlert: false,
        isFuture: true,
        relLabel: ''
      });
      continue;
    }

    // 若該天有劃分多個自駕時段（如上午/下午跨城）
    if (coords.segments && coords.segments.length > 0) {
      for (const seg of coords.segments) {
        const segCacheKey = `${seg.lat.toFixed(4)},${seg.lng.toFixed(4)}`;
        await fetchCityWeather(seg.lat, seg.lng); // 確保已緩存
        const segForecast = getSegmentForecast(segCacheKey, coords.apiDate, seg);

        const isCurrentSegment = (coords.apiDate === todayStr && nowJst.hour >= seg.startHour && nowJst.hour < seg.endHour);

        if (segForecast) {
          forecastResults.push({
            date: day.date,
            segmentLabel: seg.label,
            apiDate: coords.apiDate,
            dayNum: day.dayNum,
            city: seg.city,
            emoji: segForecast.emoji,
            prob: segForecast.prob,
            rain: segForecast.rain,
            rainSummary: segForecast.rainSummary,
            tempMax: segForecast.tempMax,
            tempMin: segForecast.tempMin,
            isAlert: segForecast.isAlert,
            isFuture: false,
            relLabel: relLabel,
            isCurrentSegment: isCurrentSegment
          });
        }
      }
    } else {
      const prob = matchedDay.prob ?? 0;
      const isAlert = prob >= 50;
      const emoji = getWeatherEmoji(matchedDay.code, prob);

      forecastResults.push({
        date: day.date,
        segmentLabel: '',
        apiDate: coords.apiDate,
        relLabel: relLabel,
        dayNum: day.dayNum,
        city: coords.city,
        emoji: emoji,
        prob: prob,
        rain: matchedDay.rain ?? 0,
        rainSummary: matchedDay.rainSummary || null,
        tempMax: matchedDay.tempMax,
        tempMin: matchedDay.tempMin,
        isAlert: isAlert,
        isFuture: false
      });
    }
  }

  return forecastResults;
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
            time: '1:35 PM',
            name: '✈️ 抵達羽田機場 (HND)',
            desc: '搭乘 NH 7545 抵達。完成入關與行李提取（預計需 1.5 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '3:00 PM',
            name: '🚌 搭機場大巴前往涉谷',
            desc: '購買 3:15 PM 或 3:45 PM 班次的機場巴士，目的地：涉谷 (Shibuya)。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '4:00 PM',
            name: '🏨 抵達涉谷站 · 步行至酒店',
            desc: '在涉谷 Fukuras 下車，通過無障礙人行天橋直達 Sakura Stage 的 Hyatt House 酒店，推行李約 5 分鐘可達。',
            address: '渋谷区桜丘町 1-4（Hyatt House Tokyo Shibuya）',
            mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya',
            notes: '',
          },
          {
            time: '4:30 PM',
            name: '🛎️ 辦理入住，安頓行李',
            desc: '',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '5:15 PM',
            name: '🍽️ 錯峰晚餐：つるとんたん 烏冬麵 (Scramble Square 13F)',
            desc: '5:15 PM 避開晚高峰，前往涉谷站 Scramble Square 13F 享用知名名店「つるとんたん (TsuruTonTan)」創意大碗烏冬麵。電梯直達 13F 全程平路，麵質軟爛適合寶寶，兼具高空景色。',
            address: '東京都渋谷区渋谷 2-24-12（渋谷スクランブルスクエア 13F）',
            mapLink: 'https://maps.google.com/?q=Tsurutontan+UDON+NOODLE+Brasserie+Shibuya',
            notes: '',
          },
          {
            time: '6:00 PM',
            name: '🌆 Fukuras 17F 屋頂花園（SHIBU NIWA）',
            desc: '坐直梯至酒店天橋對面的 Fukuras 17F 屋頂花園。免費入場、無需預約、嬰兒車可直達，可俯瞰涉谷十字路口夜景。',
            address: '東京都渋谷区道玄坂 1-2-3 渋谷フクラス 17F',
            mapLink: 'https://maps.google.com/?q=Shibu+Niwa+Rooftop+Fukuras+Shibuya',
            notes: '',
          },
          {
            time: '7:00 PM',
            name: '🛒 MEGA Don Quijote 涉谷本店',
            desc: '前往採購首日嬰兒用品與生活補給（尿布、零食、飲料等）。',
            address: '東京都渋谷区宇田川町 28-6',
            mapLink: 'https://maps.google.com/?q=MEGA+Don+Quijote+Shibuya',
            notes: '',
          },
          {
            time: '8:30 PM',
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
            time: '9:15 AM',
            name: '🚇 避開早高峰：搭乘銀座線前往淺草站',
            desc: '9:15 AM 之後搭乘地鐵銀座線前往淺草站，徹底避開地鐵通勤人潮。<br/>🎫 <strong>提示：本日有預訂傳統服飾拍照及化妝 (Klook 預訂)。</strong>',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:00 AM',
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
              tip: '💡 10:00 AM 前到達人最少。推車建議走仲見世通側邊的平行小街，寬敞舒適。',
            },
          },
          {
            time: '11:15 AM',
            name: '🍱 錯峰午餐：Tokyo Mizumachi 沿河餐廳',
            desc: '準時於 11:15 AM 入座 Tokyo Mizumachi 沿河餐廳（錯開正午就餐高峰），推車可直接推入桌旁。',
            address: '東京都墨田区向島 1 丁目（Tokyo Mizumachi）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Mizumachi+Asakusa',
            notes: '',
          },
          {
            time: '12:30 PM',
            name: '☕ 河畔慢逛與寶寶推車小憩',
            desc: '12:30 PM–1:45 PM 沿隅田公園及 Mizumachi 散步至晴空塔下。路面極為平整，非常適合寶寶在推車內睡下午覺，大人可在沿岸咖啡館休整。',
            address: '東京都墨田区向島 1 丁目（隅田公園）',
            mapLink: 'https://maps.google.com/?q=Sumida+Park+Tokyo',
            notes: '',
          },
          {
            time: '1:45 PM',
            name: '🚃 錯峰移動：前往原宿/明治神宮',
            desc: '1:45 PM–2:30 PM 乘地鐵（銀座線至表參道，約 20 分鐘一車直達）或 GO App 打車前往原宿/明治神宮，避開晚高峰。',
            address: '東京都渋谷区神宮前 1 丁目（JR 原宿站 表參道口）',
            mapLink: 'https://maps.google.com/?q=Harajuku+Station+Omotesando+Exit',
            notes: '',
          },
          {
            time: '2:30 PM',
            name: '🌿 明治神宮 (南參道入口 · 原宿口)',
            desc: '2:30 PM–4:30 PM 由原宿南參道入口進入（路面最平坦無台階），漫步參拜，時間充裕且採光極佳。',
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
            time: '4:30 PM',
            name: '🛍️ 表參道/原宿區域輕鬆慢逛',
            desc: '4:30 PM–5:30 PM 在表參道/原宿區域輕鬆慢逛。5:30 PM 晚高峰前 GO App 打車返回酒店或就近晚餐。',
            address: '東京都渋谷区神宮前',
            mapLink: 'https://maps.google.com/?q=Omotesando+Harajuku+Tokyo',
            notes: '',
          },
          {
            time: '5:30 PM',
            name: '🍽️ 原宿/涉谷 Tabelog 嚴選晚宴 (包廂/推車/多人家宴)',
            desc: '5:30 PM–7:30 PM 避開地鐵晚高峰，精選 3 家高分 (Tabelog 3.5+)、空間寬敞、對推車與寶寶極友善的餐廳：',
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
                badge: '🍱 標誌性老店炸豬排 (Tabelog 3.59)',
                title: '舞泉豬排 表參道本店 (Maisen Omotesando)',
                desc: '位於表參道巷內，由舊錢湯改建的歷史名店。空間寬敞且設有包廂/和室，提供軟爛蒸蛋與嬰兒餐具，推車出入方便。<br/>⚠️ <strong>預約需求：建議提前預訂二樓包廂或 5:30 PM 錯峰用餐。</strong>',
                mapLink: 'https://maps.google.com/?q=Tonkatsu+Maisen+Aoyama'
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
        summary: 'teamLab · 豐洲 · 購物',
        illustration: './images/teamlab_toyosu.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "室內古都文化",
            "鎌倉文華館",
            "江之電景觀茶屋",
            "避開泥濘石階"
          ],
          "intro": "若遇暴雨強降雨，取消戶外七里之濱沙灘漫步與高德院露天大佛參拜。改為前往全室內的【鎌倉文華館 鶴岡博物館 (Tsurugaoka Museum)】欣賞坂倉準三現代建築與古都文獻，隨後在小町通頂棚茶屋或由比之濱室內海景咖啡廳品茶。",
          "address": "神奈川県鎌倉市雪ノ下 2-1-53（鶴岡八幡宮境內 文華館）",
          "mapLink": "https://maps.google.com/?q=Kamakura+Bunkakan+Tsurugaoka+Museum",
          "must": [
            "鎌倉文華館鶴岡博物館 — 建築大師坂倉準三設計之現代名作，全室內空調展廳，平地推車無障礙",
            "鶴岡八幡宮室內迴廊與御守處 — 經由鋪石平道直達，不淋雨參拜",
            "由比之濱海景室內咖啡 / 小町通頂棚茶屋 — 舒適落座，推車可推入，雨中遠眺相模灣白浪"
          ],
          "tip": "💡 鶴岡八幡宮境內自文華館至參拜道均有無障礙斜坡，推車避開泥濘土路。"
        },
        activities: [
          {
            time: '8:30 AM',
            name: '🌅 舒緩起床與悠閒早餐',
            desc: '全家不設過早鬧鐘，於酒店內或附近咖啡廳悠閒早餐、喂奶及處理寶寶護理。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:15 AM',
            name: '🚕 打車直達新豐洲',
            desc: '從涉谷 Hyatt House 叫車前往 Shin-Toyosu（新豐洲），車程約 20–25 分鐘，費用約 ¥4,000。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '11:00 AM',
            name: '🌊 teamLab Planets TOKYO（豐洲・涉水版）',
            desc: '參觀水上沉浸式光影展，建議預約 11:00 AM 場次。',
            address: '東京都江東区豊洲 6-1-16',
            mapLink: 'https://maps.google.com/?q=teamLab+Planets+Tokyo+Toyosu',
            notes: '水區提示：館內有水深至小腿處展區（人造溪流）需赤腳行走。請備好小毛巾，大人可將褲管捲起。',
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
            time: '1:15 PM',
            name: '🍱 豐洲千客萬來・江戶美食街',
            desc: '打車 3 分鐘或步行前往「豐洲千客萬來」，享用錯峰午餐（海鮮丼、鰻魚飯或日式定食）。餐後乘直梯上 8F 免費足湯庭園遠眺海景。',
            address: '東京都江東区豊洲 6-5-1',
            mapLink: 'https://maps.google.com/?q=Toyosu+Senkyakubanrai+Tokyo',
            notes: '',
          },
          {
            time: '2:45 PM',
            name: '🏬 LaLaport 豐洲海濱公園',
            desc: '移步至相鄰的 Urban Dock LaLaport 豐洲，利用頂配母嬰室洗漱休整，大人在沿海咖啡廳小憩，寶寶可在推車內做下午覺。',
            address: '東京都江東区豊洲 2-4-9',
            mapLink: 'https://maps.google.com/?q=LaLaport+Toyosu+Tokyo',
            notes: '',
          },
          {
            time: '4:30 PM',
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
        summary: '小町通 · 鎌倉大佛 · 湘南海岸',
        illustration: './images/kamakura.jpg',
        hotel: { name: 'Hyatt House Tokyo Shibuya', mapLink: 'https://maps.google.com/?q=Hyatt+House+Tokyo+Shibuya' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "室內DIY體驗",
            "日清泡麵博物館",
            "港未來連廊",
            "親子共創"
          ],
          "intro": "若遇暴雨強降雨，取消戶外山下公園與紅磚碼頭步道。改為前往全室內的【合清/日清泡麵博物館 (Cup Noodles Museum Yokohama)】，大人小孩親手彩繪並配製專屬世界唯一泡麵杯，全程通過港未來空中室內連廊移動。",
          "address": "神奈川県横浜市中区新港 2-3-4",
          "mapLink": "https://maps.google.com/?q=Cup+Noodles+Museum+Yokohama",
          "must": [
            "My CUPNOODLES Factory — 親手設計杯身、自選湯頭與 4 種經典配料，真空密封帶回家",
            "百代發明紀念館與全室內麵條街 — 沉浸式展示安藤百福創新歷程，重現世界各地麵條風情",
            "MARK IS 港未來室內空橋連鎖生活圈 — 下午直接經由室內步道進入大型商場輕鬆用餐與母嬰休整"
          ],
          "tip": "💡 泡麵博物館設有大型升降電梯與寬敞母嬰哺乳室，推車全程通行無阻。"
        },
        activities: [
          {
            time: '9:15 AM',
            name: '🚃 避開早高峰・一車直達 (JR 湘南新宿線)',
            desc: '從「涉谷站」搭乘 JR 湘南新宿線 (往逗子方向)，一車直達「鎌倉站」（約 52 分鐘，無需換乘）。',
            address: 'JR 涉谷站',
            mapLink: 'https://maps.google.com/?q=Shibuya+Station',
            notes: '',
          },
          {
            time: '10:15 AM',
            name: '⛩️ 抵達鎌倉站 · 小町通與鶴岡八幡宮漫步',
            desc: '10:15 AM 抵達鎌倉站。步行漫步小町通 (Komachi-dori) 嚐古風小吃，順路遊覽鶴岡八幡宮。',
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
              tip: '💡 小町通上午 10:00 AM 後店家陸續開門，此時遊人相對較少最舒適。',
            },
          },
          {
            time: '11:30 AM',
            name: '🍱 錯峰午餐 (榻榻米庭園和食)',
            desc: '在鎌倉站 / 小町通周邊享用榻榻米 (Tatami) 庭園和食，方便將寶寶抱下地休息。',
            address: '神奈川県鎌倉市小町周邊',
            mapLink: 'https://maps.google.com/?q=Kamakura+Station',
            notes: '',
          },
          {
            time: '1:00 PM',
            name: '🚕 🚊 極效移動：打車避暑 或 體驗江之電',
            desc: '【選項 A（打車避暑）】：於鎌倉站叫計程車 (Taxi，約 10 分鐘 / 1,500 日元直達高德院門前)。\n【選項 B（江之電）】：搭乘「江之電」至「長谷站」（3 站約 6 分鐘）後步行 7 分鐘直達高德院 (鎌倉大佛)。',
            address: '神奈川県鎌倉市長谷 4-2-28 (高德院)',
            mapLink: 'https://maps.google.com/?q=Kotoku-in+Kamakura+Daibutsu',
            notes: '',
          },
          {
            time: '1:15 PM',
            name: '🗿 鎌倉大佛 (高德院) 與 長谷寺海景',
            desc: '1:15 PM–2:30 PM 參拜觀賞露天青銅大佛，隨後步行 5 分鐘前往長谷寺 (Hasedera)（推車停門口，換背帶登階梯俯瞰相模灣海景）。',
            address: '神奈川県鎌倉市長谷 3-11-2 (長谷寺)',
            mapLink: 'https://maps.google.com/?q=Hasedera+Temple+Kamakura',
            notes: '推車提示：高德院平坦可推車；長谷寺登高俯瞰海景需推車停門口，換背帶登階梯。',
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
            time: '2:45 PM',
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
              tip: '💡 請勿站在車道上拍照，注意避讓交通。下午 3:00 PM–4:00 PM 順光海景拍照最藍！',
            },
          },
          {
            time: '4:10 PM',
            name: '🍮 極效順路：江之島布丁 (Enoshima Pudding)',
            desc: '繼續搭乘江之電（2 站約 5 分鐘）至 江之島站 (Enoshima Station)，出站步行 4 分鐘至 江之島布丁 (Enoshima Pudding / 江の島プリン) 享用獨家大麥布丁與軟冰淇淋。',
            address: '神奈川県藤沢市片瀬海岸 1-11-27',
            mapLink: 'https://maps.google.com/?q=Enoshima+Pudding',
            notes: '',
          },
          {
            time: '4:45 PM',
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
            time: '5:15 PM',
            name: '🚆 一車直達回涉谷 (JR 湘南新宿線)',
            desc: '於大船站無縫換乘 JR 湘南新宿線（約 40 分鐘，一車直達）返回涉谷站。',
            address: 'JR 大船站',
            mapLink: 'https://maps.google.com/?q=Ofuna+Station+JR',
            notes: '',
          },
          {
            time: '6:15 PM',
            name: '🏨 返抵涉谷 Hyatt House 徹底休息蓄能',
            desc: '6:15 PM 返抵涉谷 Hyatt House 徹底休息蓄能，準備明天 (Day 5) 全家行李大轉運飛往北海道。',
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
        summary: '飛往札幌 · 取車自駕 · 狸小路',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "全天候頂棚",
            "狸小路商店街",
            "札幌工廠中庭",
            "地下街全連通"
          ],
          "intro": "若抵達札幌當日遇雨，Alphard 租車直達飯店後，啟用全天候室內動線：經由札幌巨型地下街與【狸小路全頂棚商店街 (Tanukikoji)】漫步，或前往【札幌工廠 (Sapporo Factory)】巨型紅磚玻璃採光穹頂室內商場。",
          "address": "北海道札幌市中央区北 2 条東 4 丁目（Sapporo Factory）",
          "mapLink": "https://maps.google.com/?q=Sapporo+Factory",
          "must": [
            "札幌工廠紅磚巨型玻璃中庭 (Atrium) — 歷史啤酒廠改建之全室內綠植採光挑高中庭，完全無懼風雨",
            "狸小路 1–7 丁目全天候頂棚 — 橫跨近 1 公里的全封閉式步行街，藥妝、伴手禮與北海道名產一站搞定",
            "札幌地下步行空間 (Chi-Ka-Ho) — 從薄野一路連通至札幌車站，推車全程電梯避雨"
          ],
          "tip": "💡 FAV LUX 札幌步行至狸小路僅 3 分鐘，地下街各出入口皆設有箱型電梯。"
        },
        driving: { distance: '約 45 公里 / 50 分鐘', route: '道央自動車道', rest: null, tips: ['夜間取車注意控制車速，機場周邊道路較暗', '停 Paraca 時注意不要誤入機械立體車位（Alphard 車高 1.95m）'] },
        activities: [
          {
            time: '11:15 AM',
            name: '🏨 涉谷退房與移動',
            desc: '辦理退房，推大行李經由人行天橋步行至涉谷站 (Shibuya Fukuras) 乘車點。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '11:45 AM',
            name: '🚌 搭機場大巴前往羽田',
            desc: '乘坐由酒店前台代訂好的機場巴士直達羽田機場 (HND)。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '12:30 PM',
            name: '✈️ 羽田抵達與大件行李托運',
            desc: '抵達羽田機場，前往 JAL First Class 專屬櫃台優先托運大件行李。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '1:00 PM',
            name: '🍱 JAL Diamond Premier Lounge 休息',
            desc: '在休息室享用咖哩包和輕食，全員充能休息。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '4:40 PM',
            name: '🛫 飛往新千歲 (CTS)',
            desc: '搭乘 JAL 523 航班飛往新千歲機場。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '6:20 PM',
            name: '🛬 抵達新千歲 · 提取行李',
            desc: '抵達新千歲機場，完成行李提取流程。',
            address: '北海道千歳市美々（新千歲機場）',
            mapLink: 'https://maps.google.com/?q=New+Chitose+Airport',
            notes: '',
          },
          {
            time: '7:15 PM',
            name: '🚌 前往豐田租車營業所',
            desc: '全員直接前往 1F 豐田租車櫃台，搭乘免費接駁車前往營業所。',
            address: '北海道千歳市美々（新千歲機場 1F 豐田租車櫃台）',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+New+Chitose+Airport+Counter',
            mapLink: '',
            notes: '',
          },
          {
            time: '8:00 PM',
            name: '🚗 辦理取車手續 (Toyota Rent-a-Car)',
            desc: '核對 W3 級 Alphard、確認 1 個安全座椅、現場辦理 ETC 卡租借與 HEP 通行證。',
            address: '北海道千歳市美々 758-134（Toyota Rent a Car Poplar）',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+Poplar+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '9:00 PM',
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
        title: '札幌文化體驗與烤肉',
        summary: '生活採購 · 啤酒館烤肉 · 湯咖哩',
        illustration: './images/sapporo_bbq.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "童話城堡工廠",
            "白色戀人公園",
            "室內甜點產線",
            "自駕直達車位"
          ],
          "intro": "若遇強降雨取消圓山動物園與戶外夜景，改為自駕前往【白色戀人公園 (Shiroi Koibito Park)】全室內童話城堡觀光工廠，參觀經典貓舌餅乾全自動產線、巧克力歷史展廳，並在室內英式茶沙龍品嚐限定甜點。",
          "address": "北海道札幌市西区宮の沢 2 条 2 丁目 11-36",
          "mapLink": "https://maps.google.com/?q=Shiroi+Koibito+Park+Sapporo",
          "must": [
            "Chocotopia House & 工廠產線走廊 — 隔著玻璃觀摩白色戀人烘烤、夾心與包裝全過程",
            "室內復古巧克力博物館 — 珍藏 18 世紀歐洲精緻巧克力杯與古典包裝盒收藏",
            "貴賓茶沙龍 Lounge — 享用現烤白色戀人熔岩芭菲與特調熱可可，推車可直接推入桌旁"
          ],
          "tip": "💡 園區設有大型室內地下平地停車場，停妥後直搭電梯進入展館，完全不淋雨。"
        },
        driving: { distance: '市區短途約 15 公里', route: null, rest: null, tips: ['Paraca 折扣券為一次性出庫券，停回後全家步行'] },
        activities: [
          {
            time: '10:00 AM',
            name: '🛒 Ario 札幌母嬰補給',
            desc: '驅車前往 Ario 札幌（出示烤肉消費憑證享免費停車）。在商場內阿卡醬本鋪 (Akachan Honpo) 集中採購輔食與紙尿褲，採購完畢直接放回車內。',
            address: '北海道札幌市東区北7条東9丁目 2-20',
            mapLink: 'https://maps.google.com/?q=Ario+Sapporo',
            notes: '',
          },
          {
            time: '11:15 AM',
            name: '🥩 成吉思汗錯峰開門殺：札幌啤酒博物館',
            desc: '准時進入 Sapporo Beer Museum (札幌啤酒博物館) 享用已預訂的烤肉午餐。',
            address: '北海道札幌市東区北7条東9丁目 2-10',
            mapLink: 'https://maps.google.com/?q=Sapporo+Beer+Museum',
            notes: '',
          },
          {
            time: '3:00 PM',
            name: '🚗 回酒店休整与寶寶睡眠',
            desc: '返回 FAV LUX 札幌酒店停車，回房間休整，讓寶寶睡高品質下午覺。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '',
          },
          {
            time: '5:45 PM',
            name: '🍲 湯咖哩晚餐 (Sho-rin 首選 / RAMAI 備選)',
            desc: '5:45 PM 步行前往薄野核心區享用經典湯咖哩：',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🌟 首選名店 (老牌經典)',
                title: '湯咖哩 Sho-rin (すすきの本店)',
                desc: '步行前往薄野核心區。享用札幌經典湯咖哩（招牌嫩雞腿與香酥炸西蘭花，湯底濃郁且分店歷史悠久）。',
                mapLink: 'https://maps.google.com/?q=Soup+Curry+Sho-rin+Susukino',
                isPrimary: true
              },
              {
                badge: '🍲 備選方案 (Plan B / 推車極友好)',
                title: 'Asian Bar RAMAI (札幌中央店)',
                desc: '步行 6 分鐘，平地無障礙、寬敞卡座半包廂，對推車極友好。',
                mapLink: 'https://maps.google.com/?q=Asian+Bar+RAMAI+Sapporo+Chuo'
              }
            ]
          },
          {
            time: '7:30 PM',
            name: '🍰 薄野罐裝蛋糕宵夜',
            desc: '飯後散步前往薄野 Pâtisserie OKASHI GAKU 自動販賣機購買罐裝蛋糕作宵夜。',
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
        title: '小樽運河遊船與晚宴',
        summary: '分頭行動 · 運河遊船 · 小樽晚宴',
        illustration: './images/otaru.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "古典音樂盒館",
            "北一硝子玻璃館",
            "小樽藝術村",
            "室內彩繪玻璃"
          ],
          "intro": "若遇雨天，將小樽戶外漫步轉為沉浸式室內工藝之旅：從小樽歷史地標【小樽音樂盒堂本館 (Otaru Music Box Museum)】到【北一硝子三號館 (煤油燈茶房)】與【小樽藝術村 (彩色玻璃美術館)】，在清脆八音盒音色與璀璨彩繪玻璃中度過。",
          "address": "北海道小樽市住吉町 4-1（小樽音樂盒堂本館）",
          "mapLink": "https://maps.google.com/?q=Otaru+Music+Box+Museum+Main+Building",
          "must": [
            "音樂盒堂本館三層挑高木造展廳 — 萬種古典音樂盒齊鳴，蒸氣鐘每 15 分鐘噴煙報時",
            "北一硝子三號館 167 盞煤油燈咖啡廳 — 感受歷史木構建築與昏黃煤油燈搖曳的極致浪漫",
            "小樽藝術村 彩繪玻璃美術館 — 近百年歷史的英國教堂彩繪玻璃真品室內展"
          ],
          "tip": "💡 音樂盒堂與北一硝子各館門口皆有鋪磚平地，館內有升降機可供推車通行。"
        },
        driving: { distance: '單程約 40 公里 / 45 分鐘', route: '札樽自動車道', rest: null, tips: ['札樽高速沿海路段側風較大，雙手穩住方向盤', '若鶏時代なると本店自帶 21 車位免費車場，小樽運河 Times 車位充足'] },
        activities: [
          {
            time: '10:00 AM',
            name: '🔀 分頭行動開始',
            desc: 'Team A 與 Team B 按興趣及帶娃需求分頭出發：',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🏰 Team B 帶娃親仔組',
                title: '白色戀人工廠 (Shiroi Koibito Park)',
                desc: '駕駛 Alphard 前往白色戀人工廠。遊玩後，經「札幌西 IC」上高速前往小樽。',
                mapLink: 'https://maps.google.com/?q=Shiroi+Koibito+Park',
                isPrimary: true
              },
              {
                badge: '🥃 Team A 品酒組',
                title: '余市威士忌酒廠 (Nikka Whisky Distillery)',
                desc: '搭乘 JR 函館本線前往 Nikka Whisky Yoichi Distillery (余市威士忌酒廠) 進行品鑑。<br/>⚠️ <strong>預約提醒：需提前預約品鑑。</strong>',
                mapLink: 'https://maps.google.com/?q=Nikka+Whisky+Yoichi+Distillery'
              }
            ]
          },
          {
            time: '1:30 PM',
            name: '🤝 小樽匯合與停車方案',
            desc: '1:30 PM Team A 乘 JR 返回小樽站，與 Team B 匯合。Alphard 停放於運河周邊大型露天 Times 停車場。',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🅿️ 首選觀光車場 (碼頭對面)',
                title: '小樽市觀光停車場 (小樽市観光駐車場)',
                desc: '大型露天平面車場，緊鄰小樽運河遊覽船碼頭（步行僅 1 分鐘），車位極多。',
                mapLink: 'https://maps.google.com/?q=Otaru+City+Tourism+Parking',
                isPrimary: true
              },
              {
                badge: '🅿️ 備選 Times 車場',
                title: 'Times 小樽色內 1 丁目',
                desc: '位於色內銀行街幾何中心點，往北 3 分鐘到運河，往西 8 分鐘到若鶏時代なると本店。',
                mapLink: 'https://maps.google.com/?q=Times+Otaru+Ironai+1-chome'
              }
            ]
          },
          {
            time: '2:00 PM',
            name: '🚣‍♂️ 特色體驗：小樽運河遊覽船 (Otaru Canal Cruise)',
            desc: '2:00 PM–2:40 PM 體驗 40 分鐘環河巡航，水面視角極佳，推車可存放在售票處專用通道，提供中文語音講解。',
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
              tip: '💡 推車可免費寄存在售票處專用通道。建議提前預約 2:00 PM 班次，光線最柔和！',
            },
          },
          {
            time: '2:45 PM',
            name: '🍰 堺町通漫步與午後休整/打卡 (LeTAO 首選 / Cafe Baal 備選)',
            desc: '2:45 PM–4:15 PM 沿堺町通商業街及小樽街區漫步休整：',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🍰 經典首選 (3F 展望台)',
                title: 'LeTAO 本店 (雙層芝士蛋糕下午茶)',
                desc: '前往 LeTAO 本店 3F 展望台看街景並享用雙層芝士蛋糕下午茶。',
                mapLink: 'https://maps.google.com/?q=LeTAO+Main+Store+Otaru',
                isPrimary: true
              },
              {
                badge: '☕ 特色打卡 (高分咖啡館)',
                title: 'Cafe Baal (小樽站/三角市場附近)',
                desc: '位於小樽站/三角市場附近，招牌牛排丼、生義大利麵及咖啡甜點口碑極佳，氛圍舒適。',
                mapLink: 'https://maps.google.com/?q=Cafe+Baal+Otaru'
              }
            ]
          },
          {
            time: '5:00 PM',
            name: '🍗 小樽晚宴方案 (首選なると本店 / 備選預案)',
            desc: '5:00 PM–6:30 PM 小樽晚宴多重精選方案：',
            address: '',
            mapLink: '',
            options: [
              {
                badge: '👑 首選戰術 (4:45 PM-5:00 PM 取號)',
                title: '若鶏時代 なると 本店 (炸半雞定食與壽司)',
                desc: '4:45 PM–5:00 PM 現場取號，享用炸半雞定食與壽司，避開 5:30 PM 高峰。自帶 21 車位免費停車場。',
                mapLink: 'https://maps.google.com/?q=Naruto+Main+Store+Otaru',
                isPrimary: true
              },
              {
                badge: '🍣 備選 1 (海景榻榻米包廂)',
                title: '政寿司 ぜん庵 (Masazushi Zenan)',
                desc: '小樽頂級海景壽司，位於運河邊，榻榻米包廂極佳（建議提前官網預訂）。',
                mapLink: 'https://maps.google.com/?q=Otaru+Masazushi+Zenan'
              },
              {
                badge: '🍺 備選 2 (寬暢紅磚倉庫)',
                title: '小樽倉庫 No.1 (Otaru Soko No.1)',
                desc: '寬暢紅磚倉庫德式餐廳，空間極大推車暢行無阻，提供烤肉、海鮮與披薩。',
                mapLink: 'https://maps.google.com/?q=Otaru+Soko+No.1'
              }
            ]
          },
          {
            time: '6:45 PM',
            name: '🚗 高速返程：札樽自動車道返回札幌',
            desc: '6:45 PM 驅車經札樽自動車道（高速約 40 分鐘）返回札幌入住。',
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
        title: '北海道神宮與場外市場',
        summary: '北海道神宮 · 海鮮 · 壽司',
        illustration: './images/sapporo_crab.jpg',
        hotel: { name: 'FAV LUX 札幌', mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "日歸私湯包廂",
            "定山溪溫泉",
            "景觀室內大浴場",
            "全家療癒"
          ],
          "intro": "若遇降雨，取消戶外大通公園與定山溪戶外吊橋漫步，改為自駕前往定山溪名宿【定山溪 鶴雅 休閒度假飯店 森之謌 (Mori no Uta)】或【鹿之湯】享用「日歸私人包廂溫泉 (貸切風呂)」，聽雨聲泡天然礦物泉，中午品嚐精緻和風午餐。",
          "address": "北海道札幌市南区定山溪温泉東 3 丁目 105",
          "mapLink": "https://maps.google.com/?q=Jozankei+Tsuruga+Resort+Spa+Mori+no+Uta",
          "must": [
            "獨立景觀私湯包廂 — 全家專屬私密空間，寶寶泡湯或休息完全無拘無束",
            "森之謌森林森呼吸室內大堂 — 巨型挑高暖爐與落地窗雨景，室內享用現烤洋菓子與咖啡",
            "札幌場外市場室內海鮮街 — 回程順道至全室內遮棚市場品嚐炭烤帝王蟹與海膽丼"
          ],
          "tip": "💡 私湯包廂建議提前 2-3 天官網預約日歸 Day-use 套餐（含午餐+私湯）。"
        },
        driving: { distance: '市區短途約 15 公里', route: null, rest: null, tips: ['北海道神宮參拜可享 2 小時免費停車，進場拿好停車券並蓋章'] },
        activities: [
          {
            time: '9:15 AM',
            name: '⛩️ 神宮森林朝聖与判官さま茶點',
            desc: '9:15 AM–10:45 AM 駕車前往円山公園與北海道神宮。在神宮境內茶屋小坐，享用現烘名物「判官さま」糯米餅配熱茶，開啟輕盈晨間模式。',
            address: '北海道札幌市中央区宮ケ丘 474',
            mapLink: 'https://maps.google.com/?q=Hokkaido+Shrine',
            notes: '',
          },
          {
            time: '11:00 AM',
            name: '🚗 直達札幌場外市場',
            desc: '11:00 AM 驅車 8 分鐘極效直達札幌場外市場（免費地面停車位充足）。',
            address: '北海道札幌市中央区北11条西21丁目 2-1（場外市場バス駐車場）',
            mapLink: 'https://maps.google.com/?q=Sapporo+Outer+Market+Bus+Parking',
            notes: '',
          },
          {
            time: '11:15 AM',
            name: '🦀 頂級海鮮與帝王蟹主戰場 (UME堂首選 / おもひで食堂備選)',
            desc: '🎫 <strong>專屬優惠：</strong>前往 UME堂 結帳可出示 <a href="https://hokkaido.letsgojp.com/coupon/409826/" target="_blank" rel="noopener" style="color:#c0534a;font-weight:700;text-decoration:underline;">樂吃購 9 折優惠券</a> 享即時折扣！',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🌟 首選戰術 (9折券)',
                title: '根室杉山水産 UME堂 (うめぇ堂)',
                desc: '主打活蟹即選即烤，全平地空間極度推車友好，點選活帝王蟹享現場稱重料理。',
                mapLink: 'https://maps.google.com/?q=Nemuro+Sugiyama+Suisan+Umedo+Sapporo',
                isPrimary: true
              },
              {
                badge: '🍣 備選預案 (Plan B)',
                title: 'おもひで食堂 (活蟹直營)',
                desc: '活蟹商直營，鮮甜程度極高，點蟹免費贈送螃蟹味噌湯。',
                mapLink: 'https://maps.google.com/?q=Omohide+Shokudo+Sapporo'
              }
            ]
          },
          {
            time: '1:00 PM',
            name: '🚗 返回酒店停放車輛',
            desc: '1:00 PM 驅車返回 FAV LUX 札幌酒店停車（掃碼享單次 24 小時優惠）。',
            address: '北海道札幌市中央区南3条西7丁目 13-1',
            mapLink: 'https://maps.google.com/?q=FAV+LUX+Sapporo',
            notes: '',
          },
          {
            time: '1:30 PM',
            name: '🛍️ 狸小路漫步与特色拿鐵外帶',
            desc: '1:30 PM–4:00 PM 全員從酒店步行 3–5 分鐘無縫接入狸小路商店街與地下街 (Pole Town / Aurora Town) 慢逛採購。順路前往附近的 Baristart Coffee 外帶自選北海道牧場鮮奶（如美瑛/澤田農場 Jersey 純奶）特調拿鐵，推著推車邊走邊喝。推車隨時可回酒店存放戰利品或讓寶寶休息。',
            address: '北海道札幌市中央区南4条西4丁目 1-2（Baristart Coffee）',
            mapLink: 'https://maps.google.com/?q=Baristart+Coffee+Sapporo',
            notes: '',
          },
          {
            time: '4:30 PM',
            name: '🍣 Toriton 旋轉壽司 錯峰王者戰術',
            desc: '4:30 PM–5:30 PM 駕駛 Alphard 或打車前往 Toriton 旋轉壽司 (伏見店或豐平店)。<br/>💡 <strong>策略核心：</strong>此店作為北海道人氣首選，晚高峰排隊通常 1.5 小時起步。必須在 4:30 PM - 5:00 PM 提前卡位，利用中午海鮮大餐後的餘熱進行輕量級晚晚餐，幾乎無需等位即可全家入座寬敞卡座，享受最高效率的舌尖洗禮！',
            address: '北海道札幌市中央区南11条西19丁目 1-1（伏見店）',
            mapLink: 'https://maps.google.com/?q=Toriton+Fushimi+Sapporo',
            notes: '',
          },
        ],
      },
      // ── Day 9 ──────────────────────────────────────────────
      {
        date: '9/8',
        dayNum: 'Day 9',
        title: '美瑛花海與青池絕景',
        summary: '青池絕景 · 四季彩之丘 · 富良野',
        illustration: './images/biei_furano.jpg',
        hotel: { name: 'Fenix West (富良野)', mapLink: 'https://maps.google.com/?q=Fenix+West+Furano' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "起司工坊手作",
            "美瑛選果室內館",
            "後藤純男美術館",
            "北海道乳酪"
          ],
          "intro": "若美瑛山區遇大雨導致田園泥濘與青池視線不佳，改為前往【富良野起司工坊 (Furano Cheese Factory)】與【美瑛選果 (Biei Senka 室內特產館)】，參觀起司製作過程、品嚐現做黑芝士冰淇淋與純濃美瑛牛奶。",
          "address": "北海道富良野市中五区（富良野起司工坊）",
          "mapLink": "https://maps.google.com/?q=Furano+Cheese+Factory",
          "must": [
            "富良野起司工坊玻璃體驗廊 — 觀看紅酒起司成熟室與牛奶發酵槽，試吃多款北海道冠軍起司",
            "手工窯烤 Pizza 工坊 — 現點現烤拿坡里雙拼起司披薩，濃郁牽絲大人小孩皆愛",
            "後藤純男美術館 (室內景觀畫廊) — 坐在全室內二樓景觀餐廳，品嚐富良野和牛與俯瞰十勝岳雨霧景緻"
          ],
          "tip": "💡 起司工坊園區全平地鋪設，設有大型停車場與無障礙洗手間，雨天上下車極便利。"
        },
        driving: { 
          distance: '總計約 210 公里 / 3.5 小時', 
          route: '札幌→美瑛 150km/2.5h、美瑛→富良野 30km/35min', 
          rest: { name: '砂川高速綠洲 (Sunagawa Highway Oasis)', desc: '行駛約 1h 處，北海道最大高速服務區，設有母嬰室', mapLink: 'https://maps.google.com/?q=Sunagawa+Highway+Oasis' }, 
          tips: ['美瑛/富良野轉為普通國道，限速 50-60 km/h', '傍晚 17:00 後鄉村道路無路燈，偶有蝦夷鹿穿出'] 
        },
        activities: [
          {
            time: '8:30 AM',
            name: '🏨 札幌退房与驅車出發',
            desc: '札幌退房，滿載行李驅車前往美瑛（總車程約 2.5 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '9:30 AM',
            name: '☕ 砂川高速綠洲短休 (Sunagawa Highway Oasis)',
            desc: '行駛約 1 小時後，停靠砂川高速綠洲休息區，全員伸展休整、補給水份。',
            address: '北海道砂川市北光 102',
            mapLink: 'https://maps.google.com/?q=Sunagawa+Highway+Oasis',
            notes: '',
          },
          {
            time: '11:00 AM',
            name: '🌊 白金青池与白須瀑布',
            desc: '遊覽夢幻「白金青池」与磅礴「白須瀑布」。',
            address: '北海道上川郡美瑛町白金（白金青池）',
            mapLink: 'https://maps.google.com/?q=Shirogane+Blue+Pond+Biei',
            notes: '路況提示：青池沿湖步道多為泥土與樹根，強烈建議使用嬰兒背帶代替推車。',
          },
          {
            time: '1:30 PM',
            name: '🍱 美瑛町內錯峰午餐',
            desc: '1:30 PM 之後在美瑛町內享用午餐，避開中午排隊高峰。',
            address: '北海道上川郡美瑛町',
            mapLink: 'https://maps.google.com/?q=Biei+Town',
            notes: '',
          },
          {
            time: '2:30 PM',
            name: '🐄 美瑛放牧酪農場 (Biei Farm)',
            desc: '驅車 10 分鐘前往美瑛放牧酪農場。在起伏的綠丘中觀賞牛群，享用鮮牛奶和軟冰淇淋。',
            address: '北海道上川郡美瑛町新田 第1',
            mapLink: 'https://maps.google.com/?q=Biei+Farm',
            notes: '',
          },
          {
            time: '3:30 PM',
            name: '🌸 四季彩之丘花海巡游',
            desc: '順路前往四季彩之丘，租用拖拉機巴士巡游彩虹花海（預留 1.5 小時，時間充裕）。',
            address: '北海道上川郡美瑛町新星 第三',
            mapLink: 'https://maps.google.com/?q=Shikisai+no+Oka+Biei',
            notes: '',
          },
          {
            time: '4:45 PM',
            name: '🚗 離開美瑛南下富良野',
            desc: '驅車半小時南下前往富良野。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '5:15 PM',
            name: '🏨 入住 Fenix West 卸行李',
            desc: '抵達富良野，至 Fenix West 辦理 Check-in 卸下行李。',
            address: '北海道富良野市北の峰町 14-38（Fenix West）',
            mapLink: 'https://maps.google.com/?q=Fenix+West+Furano',
            notes: '',
          },
          {
            time: '5:45 PM',
            name: '🍲 Kumagera (くまげら) 經典晚餐',
            desc: '驅車 10 分鐘前往富良野市中心的 Kumagera 享用特色晚餐。',
            address: '北海道富良野市日の出町 3-22',
            mapLink: 'https://maps.google.com/?q=Kumagera+Furano',
            notes: '營業提醒：富良野餐館普遍打烊極早，5:45 PM 就餐極其穩妥省心！',
          },
          {
            time: '7:00 PM',
            name: '🍈 Co-op Sapporo 富良野店水果補給',
            desc: '順路在隔壁的 Co-op Sapporo 富良野店採購鮮奶、哈密瓜和水果補給。',
            address: '北海道富良野市若葉町 2-1',
            mapLink: 'https://maps.google.com/?q=Co-op+Sapporo+Furano',
            notes: '',
          },
          {
            time: '7:45 PM',
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
        summary: '富田農場 · 登別溫泉 · 部屋食',
        illustration: './images/noboribetsu.jpg',
        hotel: { name: '登別 瀧乃家 (Takinoya)', mapLink: 'https://maps.google.com/?q=Takinoya+Noboribetsu' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "果汁葡萄酒工廠",
            "登別溫泉街",
            "瀧乃家室內水療",
            "全天候自駕"
          ],
          "intro": "若富良野花田雨勢過大，參觀富田農場室內乾燥花舍後，自駕前往【富良野葡萄酒果汁工廠 (Furano Winery & Juice Factory)】室內品嚐香甜白葡萄汁，下午提早抵達登別溫泉【瀧乃家】，享受頂級和風客房與室內庭園名湯。",
          "address": "北海道富良野市清水山（富良野葡萄酒廠）",
          "mapLink": "https://maps.google.com/?q=Furano+Winery",
          "must": [
            "富良野葡萄酒廠地下酒窖 — 參觀橡木桶熟成庫，免費試飲無酒精鮮榨純葡萄汁",
            "富田農場 花人之舍 (室內精油館) — 全日本最大乾燥花展示室，購買天然薰衣草精油與皂品",
            "登別瀧乃家 提早 Check-in — 享受客房私人風呂與館內「玉乃湯」地熱名泉"
          ],
          "tip": "💡 自駕路段經道央自動車道直達登別，雨天高速行車穩定平順，飯店提供專人代客泊車。"
        },
        driving: { 
          distance: '約 180 公里 / 2.5–3 小時', 
          route: '道東自動車道', 
          rest: { name: '占冠 PA (首選) / 夕張 PA (備選)', desc: '開出富良野約 45 分鐘先抵達占冠 PA（設有 7-Eleven 與授乳室）；若錯過可再行駛 30 分鐘至夕張 PA。', mapLink: 'https://maps.google.com/?q=Shimukappu+PA+Doto+Expressway' }, 
          tips: ['占冠至夕張段有單向單車道隧道，保持安全車距', '駛入登別溫泉街前有連續下坡彎道，注意減速'] 
        },
        activities: [
          {
            time: '8:30 AM',
            name: '🏨 退房与驅車前往雙農場',
            desc: '退房，驅車 10 分鐘前往富田農場與相鄰的哈密瓜農場 (Tomita Melon House)。',
            address: '北海道空知郡中富良野町宮町 1-41（富田農場）',
            mapLink: 'https://maps.google.com/?q=Farm+Tomita+Furano',
            notes: '',
          },
          {
            time: '8:40 AM',
            name: '🌸 薰衣草溫室与現切哈密瓜享用',
            desc: '8:40 AM–9:40 AM 欣賞溫室薰衣草和秋季花田，在哈密瓜農場享用現切哈密瓜。',
            address: '北海道空知郡中富良野町宮町 3-57（Tomita Melon House）',
            mapLink: 'https://maps.google.com/?q=Tomita+Melon+House+Furano',
            notes: '',
          },
          {
            time: '11:00 AM',
            name: '🚗 準時出發南下登別 · 車上簡餐',
            desc: '11:00 AM 準時出發南下（車程約 2.5 小時）。不在中途安排拉麵堂食，午餐在農場戶外熟食區打包哈密瓜披薩和男爵土豆在車上解決。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '1:45 PM',
            name: '♨️ 抵達登別瀧乃家 · 無縫入住',
            desc: '1:45 PM 抵達登別瀧乃家，無縫銜接 2:00 PM 起的溫泉旅館入住服務。',
            address: '北海道登別市登別温泉町 162',
            mapLink: 'https://maps.google.com/?q=Takinoya+Noboribetsu',
            notes: '',
          },
          {
            time: '6:00 PM',
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
        summary: '地獄谷 · 紅磚倉庫 · 函館夜景',
        illustration: './images/hakodate_night.jpg',
        hotel: { name: '平成館 潮騷亭 (Hakodate)', mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "五稜郭室內展望",
            "金森紅磚倉庫群",
            "星形要塞",
            "海港文創連廊"
          ],
          "intro": "若函館山夜景受雨霧影響，改為登上全封閉玻璃觀景的【五稜郭塔 (Goryokaku Tower 展望台)】360 度俯瞰巨大星形要塞全景，隨後前往【金森紅磚倉庫群 (Kanemori Red Brick Warehouses)】全室內連廊慢逛洋菓子名店與文創手作。",
          "address": "北海道函館市五稜郭町 43-9（五稜郭塔）",
          "mapLink": "https://maps.google.com/?q=Goryokaku+Tower+Hakodate",
          "must": [
            "五稜郭塔 90 米室內全景展望台 — 設有強化玻璃透明地板與歷史模型展，完全無懼風雨",
            "金森紅磚倉庫群 (BAY 函館 / 金森洋物館) — 百年紅磚老庫改造之全室內步道，推車極舒適",
            "Pastry Snaffle's 輕乳酪蛋糕與 Petite Merveille 南瓜布丁 — 倉庫內舒適落座現吃現買"
          ],
          "tip": "💡 五稜郭塔與金森倉庫均有大型收費/合作平面停車場，推車進出皆有無障礙電梯。"
        },
        driving: { 
          distance: '約 200 公里 / 2.5–3 小時', 
          route: '道央自動車道', 
          rest: { name: '八雲 PA / 噴火灣 Panorama Park', desc: '行駛約 1.5h 處，🌟 极度推荐！海景公園＋母嬰休息室', mapLink: 'https://maps.google.com/?q=Yakumo+PA+Panorama+Park+Hokkaido' }, 
          tips: ['大沼公園 IC 後轉為 5 號國道（約 30km），紅綠燈增多，預留充裕時間'] 
        },
        activities: [
          {
            time: '9:30 AM',
            name: '🌋 登別地獄谷漫步',
            desc: '遊覽登別地獄谷壯麗火山地貌与蒸汽噴泉。',
            address: '北海道登別市登別温泉町 60',
            mapLink: 'https://maps.google.com/?q=Noboribetsu+Jigokudani',
            notes: '路況提示：木棧道設有台階，強烈建議使用嬰兒背帶代替推車。',
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
            time: '11:30 AM',
            name: '🚗 驅車前往函館',
            desc: '11:30 AM 驅車前往函館（總車程約 2.5–3 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '1:00 PM',
            name: '☕ 八雲休息站休整 (Yakumo PA)',
            desc: '行駛約 1.5 小時後，停靠 Yakumo PA (八雲休息站) 舒展休整、補給水份。',
            address: '北海道二海郡八雲町浜松 368-8',
            mapLink: 'https://maps.google.com/?q=Yakumo+PA+Panorama+Park+Hokkaido',
            notes: '',
          },
          {
            time: '2:30 PM',
            name: '🏨 潮騷亭 Check-in · 湯之川溫泉',
            desc: '2:30 PM–3:15 PM 直達湯之川「平成館 潮騷亭」辦理 Check-in 卸行李。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate',
            notes: '',
          },
          {
            time: '3:30 PM',
            name: '🧱 金森紅磚倉庫群漫步',
            desc: '驅車 15–20 分鐘前往金森紅磚倉庫群 (Kanemori Red Brick Warehouse) 漫步購物。',
            address: '北海道函館市末広町 14-12',
            mapLink: 'https://maps.google.com/?q=Kanemori+Red+Brick+Warehouse+Hakodate',
            notes: '',
          },
          {
            time: '4:30 PM',
            name: '🚡 函館山纜車觀夜景 (Mount Hakodate Ropeway)',
            desc: '車輛停放於山麓站停車場，全員換乘纜車 (Ropeway) 登函館山觀賞日落與百萬夜景。',
            address: '北海道函館市元町 19-7（山麓站）',
            mapLink: 'https://maps.google.com/?q=Mount+Hakodate+Ropeway',
            notes: '禁行提示：每日 5:00 PM–10:00 PM 登山道對私家車禁行！請停山麓站露天停車場乘纜車登頂（推車可上）。',
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
              tip: '💡 5:00 PM–10:00 PM 私家車禁行登山道，必須停山麓站乘纜車。建議 5:30 PM 前到山麓站排隊，避開日落後的人潮高峰。',
            },
          },
          {
            time: '6:30 PM',
            name: '🍲 函館市區晚餐',
            desc: '6:30 PM–8:00 PM 下山後直接在函館市區/金森倉庫周邊享用晚餐（如 阿佐利壽喜燒 或市區高分海鮮餐廳）。',
            address: '北海道函館市宝来町 10-11（阿佐利本店）',
            mapLink: 'https://maps.google.com/?q=Asari+Sukiyaki+Hakodate',
            notes: '',
          },
          {
            time: '8:30 PM',
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
        summary: '五稜郭塔 · 潮騷亭泡湯 · 休整',
        illustration: './images/goryokaku.jpg',
        hotel: { name: '平成館 潮騷亭 (Hakodate)', mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "火山地質科學館",
            "洞爺湖萬世閣",
            "室內溫泉水療",
            "湖景室內泳池"
          ],
          "intro": "若洞爺湖戶外遊船因雨停航，自駕前往【有珠山噴火紀念公園 · 火山科學館 (Mt. Usu Volcano Science Museum)】體驗震撼室內聲光火山劇場，下午提早入住【洞爺湖萬世閣】，暢享頂樓全室內「月的湯」溫泉與室內溫水水療池。",
          "address": "北海道虻田郡洞爺湖町洞爺湖温泉 142-5（火山科學館）",
          "mapLink": "https://maps.google.com/?q=Usuzan+Volcano+Science+Museum",
          "must": [
            "有珠山火山科學館 4D 沉浸式劇場 — 體驗地殼變動與火山地質科普，室內寓教於樂",
            "洞爺湖萬世閣 8F 星之湯 & 地下月的湯 — 全落地玻璃室內溫泉，一邊泡湯一邊遠眺雨中湖面煙雨",
            "飯店室內溫水活水池 (B1) — 備有兒童淺水區與泳圈租借，下雨天寶寶也能盡情玩水"
          ],
          "tip": "💡 萬世閣提供 Alphard 1.95 米專用平地停車位，飯店直通溫泉大浴場。"
        },
        driving: { distance: '市區零星移動約 20 公里', route: null, rest: null, tips: ['16:30 登函館山須停車於山麓纜車站，17:00–22:00 私家車禁行登山道'] },
        activities: [
          {
            time: '8:30 AM',
            name: '☕ 舒緩起床與悠閒早餐',
            desc: '8:30 AM–10:00 AM 不急不趕，全家睡到自然醒，在潮騷亭或周邊享用早餐與愜意休整，徹底避免趕早市排隊的勞頓與被宰風險。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate',
            notes: '',
          },
          {
            time: '10:30 AM',
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
              tip: '💡 塔內無障礙電梯完善，推車可直接推上展望台。早上 10:30 AM 前人最少，下午人潮逐漸增多。',
            },
          },
          {
            time: '11:15 AM',
            name: '🍜 錯峰午餐：味彩拉麵 / 幸運小丑漢堡',
            desc: '準時在 11:15 AM 入座五稜郭塔旁的 麺厨房あじさい (味彩拉麵 本店) 或旁邊的 幸運小丑漢堡 (五稜郭公園前店)。',
            address: '北海道函館市五稜郭町 29-22（味彩拉麵本店）',
            notes: '',
          },
          {
            time: '1:30 PM',
            name: '♨️ 返回潮騷亭泡湯休整',
            desc: '返回平成館 潮騷亭，下午在酒店內徹底休息泡湯，讓寶寶在榻榻米房間內補覺。',
            address: '北海道函館市湯川町 1 丁目 2-30',
            mapLink: 'https://maps.google.com/?q=Heiseikan+Shiosaitei+Hakodate',
            notes: '',
          },
          {
            time: '5:30 PM',
            name: '🍽️ 晚間餐飲三套靈活預案',
            desc: '湯之川溫泉街周邊極少適合全家晚餐的餐廳，提供三套靈活方案：',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🍣 方案 A (海景迴轉壽司/首選)',
                title: '函太郎 壽司 (宇賀浦本店)',
                desc: '5:30 PM 驅車 8 分鐘前往，緊鄰津輕海峽海景極美，卡座寬敞對推車極度友好。',
                mapLink: 'https://maps.google.com/?q=Kantaro+Sushi+Ugaura+Hakodate',
                isPrimary: true
              },
              {
                badge: '🥩 方案 B (百年老店壽喜燒)',
                title: '阿佐利 本店 (Asari Head Store)',
                desc: '若飯店前台已協助代訂成功，6:00 PM 驅車前往享用百年老字號黑毛和牛壽喜燒（獨立包廂）。',
                mapLink: 'https://maps.google.com/?q=Asari+Sukiyaki+Hakodate'
              },
              {
                badge: '🏪 方案 C (輕鬆外帶熟食)',
                title: '湯之川 Convenience Store 外帶晚餐',
                desc: '若不想出行，傍晚驅車前往湯之川 Lawson / Seicomart 採購北海道特色便當、炸雞與牛奶，在海景房內放鬆享用。',
                mapLink: 'https://maps.google.com/?q=Lawson+Hakodate+Yunokawa'
              }
            ]
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
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "機場全室內主題樂園",
            "哆啦A夢空中文創",
            "Royce巧克力世界",
            "免淋雨還車"
          ],
          "intro": "抵達新千歲機場還車後，提早進入日本最受歡迎的全室內航廈娛樂中心【新千歲機場 國內線 3F 娛樂王國】，暢玩【哆啦A夢空中樂園 (Wakuwaku Sky Park)】、【Royce' 巧克力世界產線】與【Hello Kitty Happy Flight】。",
          "address": "北海道千歳市美々（新千歲機場 國內線航廈 3F）",
          "mapLink": "https://maps.google.com/?q=Doraemon+Wakuwaku+Sky+Park+New+Chitose+Airport",
          "must": [
            "哆啦A夢空中樂園 (Wakuwaku Sky Park) — 銅鑼燒滑梯、任意門拍照區與專屬兒童室內遊樂區",
            "Royce' Chocolate World — 玻璃走廊全自動巧克力工廠產線展示，購買限定生巧克力",
            "北海道拉麵道場 (10 家名店室內街) — 一之倉、吉山商店、白樺山莊免排隊室內品嚐"
          ],
          "tip": "💡 新千歲機場航廈全程無障礙電梯與豪華母嬰室配備，推車可一路推到登機口。"
        },
        driving: { 
          distance: '約 160 公里 / 2–2.5 小時', 
          route: null, 
          rest: { name: '七飯町道之站 (Michi-no-Eki Nanae)', desc: '開出函館約 30min 處，男爵土豆主題食品與精品咖啡', mapLink: 'https://maps.google.com/?q=Michi-no-Eki+Nanae+Danshaku+Lounge' }, 
          tips: ['從虻田洞爺湖 IC 下高速有陡峭連續下坡，使用低檔 (B/S檔) 發動機制動'] 
        },
        activities: [
          {
            time: '9:30 AM',
            name: '🚗 函館出發北上洞爺湖',
            desc: '9:30 AM 函館退房，驅車向北前往洞爺湖（總車程約 2.5 小時）。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:30 AM',
            name: '☕ 七飯町道之站短休 (Nanae Rest Area)',
            desc: '行駛 1 小時後，在七飯町道之站 (道の駅 なないろ・ななえ) 稍作 15 分鐘休整、補給水份。',
            address: '北海道亀田郡七飯町峠下 380-2',
            mapLink: 'https://maps.google.com/?q=Nanae+Roadside+Station+Hokkaido',
            notes: '',
          },
          {
            time: '11:15 AM',
            name: '🌋 有珠山纜車与錯峰午餐 (Mount Usu Ropeway)',
            desc: '提早在 11:15 AM 抵達有珠山周邊享用簡易定食，隨後登上有珠山纜車俯瞰洞爺湖与昭和新山。',
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
              tip: '💡 上午 11:00 AM–1:00 PM 是山頂能見度最佳時段，下午容易起霧。纜車設施完善，推車可上展望台。',
            },
          },
          {
            time: '2:30 PM',
            name: '📸 洞爺湖 Sairo 展望台 (Sairo Observatory)',
            desc: '驅車至 Sairo 展望台停留拍照，全景遠眺洞爺湖、中島及羊蹄山。',
            address: '北海道虻田郡洞爺湖町成香 3-5',
            mapLink: 'https://maps.google.com/?q=Sairo+Observatory+Lake+Toya',
            notes: '',
          },
          {
            time: '3:30 PM',
            name: '🏨 入住洞爺湖萬世閣 (Toya Manseikaku)',
            desc: '辦理 Check-in 入住洞爺湖萬世閣。',
            address: '北海道虻田郡洞爺湖町洞爺湖温泉 21',
            mapLink: 'https://maps.google.com/?q=Toya+Manseikaku+Hotel',
            notes: '停車提醒：入場時請向工作人員說明 Alphard 為高頂車，以分配高頂車位。',
          },
          {
            time: '6:00 PM',
            name: '🍲 洞爺湖晚餐與預案提示',
            desc: '洞爺湖溫泉街晚間餐廳絕大多數在 7:30 PM–8:00 PM 即停止營業。',
            address: '北海道虻田郡洞爺湖町洞爺湖温泉 21',
            mapLink: 'https://maps.google.com/?q=Toya+Manseikaku+Hotel',
            notes: '晚餐提醒：最遲 6:30 PM 前前往望羊蹄/仙堂庵用餐，或提前向萬世閣加購自助晚餐。',
          },
          {
            time: '8:45 PM',
            name: '🎆 洞爺湖花火大會 (Lake Toya Fireworks)',
            desc: '8:45 PM 湖畔漫步道或客房內觀賞洞爺湖長期花火大會。',
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
        summary: '支笏湖 · 機場還車 · 飛回東京',
        illustration: './images/sapporo.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "世界市集巨型頂棚",
            "美女與野獸室內線",
            "小熊維尼室內乘車",
            "雨天限定遊行"
          ],
          "intro": "迪士尼樂園遇雨時啟用全室內明星設施路線：穿過擁有巨型維多利亞全玻璃頂棚的【世界市集 (World Bazaar)】，主攻全室內恆溫設施【美女與野獸「城堡奇緣」】、【小熊維尼獵蜜記】與【怪獸電力公司】，傍晚觀賞雨天限定版夜間迷你遊行【Nightfall Glow】。",
          "address": "千葉県浦安市舞浜 1-1（Tokyo Disneyland）",
          "mapLink": "https://maps.google.com/?q=Tokyo+Disneyland+Main+Entrance",
          "must": [
            "世界市集 (World Bazaar) 全天候巨型頂棚大街 — 購物、拍照與遮雨大本營，完全不受風雨影響",
            "全室內熱門乘車設施 — 美女與野獸、小熊維尼、巴斯光年星際歷險、幽靈公館全程室內排隊與乘坐",
            "雨天限定版遊行「夜幕微光 (Nightfall Glow)」— 僅在下雨天登場的發光夢幻水滴花車遊行"
          ],
          "tip": "💡 園區嬰兒推車出租處提供原廠專用透明推車雨罩（約 1,000 日元），防風防雨效果極佳。"
        },
        driving: { 
          distance: '約 100 公里 / 1 小時 20 分鐘', 
          route: null, 
          rest: { name: '樽前 SA (Tarumae SA)', desc: '行駛約 45min 處，設有 7-Eleven 及授乳室', mapLink: 'https://maps.google.com/?q=Tarumae+Service+Area+Hokkaido' }, 
          tips: ['還車前需在周邊加油站加滿油並保留加油小票'] 
        },
        activities: [
          {
            time: '10:00 AM',
            name: '🌊 洞爺湖退房与支笏湖散步',
            desc: '10:00 AM 洞爺湖退房，驅車前往支笏湖 (Lake Shikotsu) 湖畔散步放電。',
            address: '北海道千歳市支笏湖温泉',
            mapLink: 'https://maps.google.com/?q=Lake+Shikotsu+Hokkaido',
            notes: '',
          },
          {
            time: '4:15 PM',
            name: '⛽ 新千歲加油站加滿油',
            desc: '4:15 PM 抵達新千歲機場周邊 ENEOS 加油站加滿油。',
            address: '北海道千歳市美々 758-134（ENEOS 新千歲空港店）',
            mapLink: 'https://maps.google.com/?q=Eneos+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '5:00 PM',
            name: '🚗 辦理還車与 HEP 結算',
            desc: '5:00 PM 準時還車：前往 Toyota Rent a Car (新千歲空港 Suzuran 店) 辦理還車，並根據 ETC 記錄結算 HEP 通行證。',
            address: '北海道千歳市美々 758-134',
            mapLink: 'https://maps.google.com/?q=Toyota+Rent+a+Car+Suzuran+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '5:30 PM',
            name: '🚌 接駁車抵達新千歲機場',
            desc: '搭乘營業所免費接駁車抵達新千歲機場航站樓。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '5:45 PM',
            name: '🧳 托運与大件行李寄存',
            desc: '前往 JAL First Class 櫃台嘗試提前托運。若櫃台拒絕提前托運，果斷前往 1F/2F 寄存大件行李。',
            address: '新千歲機場國內線航站樓 1F/2F',
            mapLink: 'https://maps.google.com/?q=New+Chitose+Airport+Terminal',
            notes: '',
          },
          {
            time: '6:15 PM',
            name: '🛍️ 航站樓深度體驗与 Royce\' 巧克力工廠',
            desc: '6:15 PM–8:30 PM 國內線航站樓 2–3F 免稅購物、遊覽 Royce\' 巧克力工廠。',
            address: '新千歲機場國內線 3F Royce Chocolate World',
            mapLink: 'https://maps.google.com/?q=Royce+Chocolate+World+New+Chitose+Airport',
            notes: '',
          },
          {
            time: '7:30 PM',
            name: '🍼 換裝哄睡防線（深夜大轉運）',
            desc: '在機場母嬰室內，提前為一歲寶寶完成餵奶、更換拉拉褲並換上純棉睡衣。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '9:10 PM',
            name: '🛫 搭 JAL 528 飛回羽田 (HND)',
            desc: '搭乘 JAL 528 航班飛往羽田機場。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:55 PM',
            name: '🚕 抵羽田 · 打車直達 Courtyard Ginza',
            desc: '10:55 PM 抵達羽田機場。分乘 2 輛標準出租車直達 Courtyard Ginza（銀座萬怡），車程約 20 分鐘。',
            address: '東京都中央区銀座 6-14-10（Courtyard Ginza）',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
          {
            time: '12:15 AM',
            name: '🏨 12:15 AM 抵達銀座萬怡 · Late Check-in 入住',
            desc: '抵達酒店，辦理 Late Check-in。今日起 🏨 按鈕將自動導航回 Courtyard Ginza！',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '延時入住提示：抵達已過半夜，請務必提前電郵備註 Late Check-in，防止判定為 No Show！',
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
        summary: '自然醒 · 銀座漫步 · 集中購物',
        illustration: './images/ginza.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "美人魚礁湖全室內王國",
            "海底兩萬哩",
            "辛巴達傳奇",
            "全天候母嬰殿堂"
          ],
          "intro": "迪士尼海洋遇雨時直奔【美人魚礁湖 (Mermaid Lagoon Under the Sea)】——這是一座藏於巨型貝殼城堡下的 100% 全室內海底王國，配有專屬旋轉海龜、跳躍水母、室內造景餐廳與高端母嬰室；隨後順道乘坐全室內的【辛巴達傳奇之旅】與【海底兩萬哩】。",
          "address": "千葉県浦安市舞浜 1-13（Tokyo DisneySea）",
          "mapLink": "https://maps.google.com/?q=Tokyo+DisneySea+Main+Entrance",
          "must": [
            "美人魚礁湖 (Mermaid Lagoon) 全室內海底世界 — 恆溫無風雨，擁有 5 項溫和親子設施與珊瑚礁遊樂場",
            "辛巴達傳奇之旅 (Sinbad's Storybook Voyage) — 全室內乘船遊歷，搭配亞倫·孟肯震撼原創交響樂",
            "塞巴斯丁加力騷廚房 (室內海底餐廳) — 坐在巨大貝殼下方享用海鮮披薩與海龜漢堡，推車直接入座"
          ],
          "tip": "💡 美人魚礁湖是全東京迪士尼園區內最完整的室內避雨親子聖地，推車可在室內暢行。"
        },
        activities: [
          {
            time: '9:30 AM',
            name: '😴 上午：自然醒與休整 (接檔深夜航班)',
            desc: '昨夜抵達較晚，今日全家不設鬧鐘，睡到自然醒，恢復體力。利用 Courtyard Ginza 箭步可達的極致地利優勢，完全免除電車勞頓。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '11:15 AM',
            name: '🍱 11:15 AM 步行享用 Lunch Special',
            desc: '中午 11:15 AM 步行前往附近享用高性價比 Lunch Special（如銀座三越/松屋百貨高層定食或周邊名店）。',
            address: '東京都中央区銀座 4-6-16（銀座三越周邊）',
            mapLink: 'https://maps.google.com/?q=Ginza+Mitsukoshi',
            notes: '',
          },
          {
            time: '1:30 PM',
            name: '🛍️ 下午：集中購物日',
            desc: '集中採購名品、伴手禮、藥妝。由於住在銀座核心區，買好的戰利品可以隨時讓家人提回酒店房間放妥，徹底解放雙手和推車空間。',
            address: '東京都中央区銀座 6-10-1（GINZA SIX / 百貨商圈）',
            mapLink: 'https://maps.google.com/?q=GINZA+SIX+Tokyo',
            notes: '',
          },
          {
            time: '6:00 PM',
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
        summary: '大石公園 · 餺餂麵 · 忍野八海',
        illustration: './images/fuji.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "富士世界遺產中心",
            "坂茂木格建築",
            "御殿場室內連廊",
            "名品名產一站式"
          ],
          "intro": "若富士山區遇雨霧導致山體能見度為零，改為前往由建築巨匠坂茂設計的【靜岡縣富士山世界遺產中心 (Mt. Fuji World Heritage Centre)】，沿著室內螺旋坡道欣賞 193 米倒立富士木格與沉浸式登山投影；隨後自駕前往【御殿場 Premium Outlets】頂棚連廊輕鬆逛街。",
          "address": "静岡県富士宮市宮町 5-12（富士山世界遺產中心）",
          "mapLink": "https://maps.google.com/?q=Mt.+Fuji+World+Heritage+Centre+Shizuoka",
          "must": [
            "坂茂倒立富士木格建築 — 富士檜木編織之倒錐形建築，水池倒影如明鏡",
            "193 米室內螺旋攀登步道 — 伴隨光影與音效體驗從海平面到富士山頂的虛擬日出",
            "御殿場 Outlets 全連廊街區 — 擁有大型立體平地停車場與有蓋步道，推車遮雨逛名品"
          ],
          "tip": "💡 遺產中心館內全程平緩無障礙坡道，推車可一路推上頂樓觀景台。"
        },
        activities: [
          {
            time: '8:30 AM',
            name: '🚗 包車酒店出發',
            desc: '8:30 AM 包車直接在 Courtyard Ginza 樓下接駁，推車折疊放入後備箱。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '10:30 AM',
            name: '🗻 大石公園 (Oishi Park)',
            desc: '遊覽大石公園，遠眺富士山全景与河口湖畔花海。',
            address: '山梨県南都留郡富士河口湖町大石 2585',
            mapLink: 'https://maps.google.com/?q=Oishi+Park+Lake+Kawaguchiko',
            notes: '',
          },
          {
            time: '11:15 AM',
            name: '🍜 景區錯峰午餐：名物餺餂麵 (Hoto)',
            desc: '提早在 11:15 AM 享用軟爛的名物「餺餂 (Hoto) 麵」。',
            address: '山梨県南都留郡富士河口湖町船津 6677（ほうとう不動 河口湖南店）',
            mapLink: 'https://maps.google.com/?q=Hoto+Fudou+Kawaguchiko',
            notes: '',
          },
          {
            time: '2:30 PM',
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
        title: '銀座購物與伴手禮',
        summary: '銀座購物 · 木村家 · 輕鬆休整',
        illustration: './images/ginza_shopping.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "GINZA SIX室內垂直殿堂",
            "伊東屋12層文具樓",
            "地下連通街",
            "銀座三越"
          ],
          "intro": "銀座本身即為全天候奢華室內生活圈。遇雨時利用地下直通系統穿梭於【GINZA SIX】（蔦屋書店與挑高中庭草間彌生藝術）、【銀座伊東屋 (Itoya)】12 層文具生活大樓與【銀座三越】，全程走地下街連通道與商場天橋，完全不落地淋雨。",
          "address": "東京都中央区銀座 6 丁目 10-1（GINZA SIX）",
          "mapLink": "https://maps.google.com/?q=GINZA+SIX+Tokyo",
          "must": [
            "GINZA SIX 6F 蔦屋書店與中庭裝置藝術 — 世界最美書店之一，室內挑高設計極致奢華",
            "銀座伊東屋 (G.Itoya) 12 層生活美學大樓 — 每層獨立主題，頂樓設有室內水耕蔬菜咖啡廳",
            "銀座站地下連通步道 (Ginza Underground Walkway) — 直通各大百貨 B1 美食街，推車免出地面"
          ],
          "tip": "💡 GINZA SIX 6F 與三越 B1/9F 皆設有頂級豪華母嬰哺乳室與尿布更換台。"
        },
        activities: [
          {
            time: '10:00 AM',
            name: '🛍️ 銀座全日暢購與伴手禮採購',
            desc: '全天集中購物日。利用 Courtyard Ginza 萬怡酒店的地利優勢，隨時將採購好的戰利品提回房間存放，推車輕鬆暢逛商圈。',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
          {
            time: '11:15 AM',
            name: '🍱 錯峰午餐 / 開門殺多重精選方案',
            desc: '11:15 AM 錯峰享用午餐，避開正午排隊高峰：',
            address: '',
            mapLink: '',
            notes: '',
            options: [
              {
                badge: '🍞 首選 (現烤麵包/寶寶友好)',
                title: '銀座木村家 (Ginza Kimuraya 3F Grill)',
                desc: '點主菜即享 1 樓直達的現烤紅豆包與各類軟麵包免費無限續（極適合 1 歲寶寶吃軟麵包當主食）。',
                mapLink: 'https://maps.google.com/?q=Ginza+Kimuraya+Main+Store',
                isPrimary: true
              },
              {
                badge: '🥩 備選 A (高性價比炸物)',
                title: '銀座三越 とんかつ あんず (Anzu)',
                desc: '前往銀座三越百貨 11F 享用特選炸豬排定食，肉質鮮嫩無障礙推車友好。',
                mapLink: 'https://maps.google.com/?q=Tonkatsu+Anzu+Ginza+Mitsukoshi'
              },
              {
                badge: '🍤 備選 B (名店天婦羅)',
                title: '松屋銀座 天婦羅 綱八 (Tsunahachi)',
                desc: '前往松屋銀座 8F 享用午市限定現炸天婦羅套餐。',
                mapLink: 'https://maps.google.com/?q=Tempura+Tsunahachi+Matsuya+Ginza'
              }
            ]
          },
          {
            time: '2:30 PM',
            name: '☕ 逛街休整與回酒店存放戰利品',
            desc: '午後隨時將採購的重物與伴手禮提回 Courtyard Ginza 酒店存放，讓寶寶休整補充水分。',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
        ],
      },
      // ── Day 18 ─────────────────────────────────────────────
      {
        date: '9/17',
        dayNum: 'Day 18',
        title: '皇居外苑與自由休整',
        summary: '皇居外苑 · 查漏補缺 · 打包封箱',
        illustration: './images/ginza_night.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        rainBackup: {
          "emoji": "☔",
          "title": "暴雨備選預案（僅強降雨時啟用）",
          "tags": [
            "日本科學未來館",
            "巨型LED地球劇場",
            "台場DiverCity",
            "機器人互動"
          ],
          "intro": "除已預訂的【TeamLab Planets】（全室內赤足光影）外，若遇雨天將戶外台場海濱公園改為前往全室內的【日本科學未來館 (Miraikan)】，參觀漂浮於空中的 Geo-Cosmos 巨型 LED 地球與 ASIMO/人型機器人互動，隨後在【DiverCity Tokyo】室內商城享用晚餐。",
          "address": "東京都江東区青海 2 丁目 3-6（日本科學未來館）",
          "mapLink": "https://maps.google.com/?q=Miraikan+National+Museum+of+Emerging+Science+and+Innovation",
          "must": [
            "Geo-Cosmos 巨型高解析度 LED 懸空地球 — 躺在 1F 室內圓形沙發仰望即時地球雲圖",
            "機器人與未來世界互動體驗區 — 適合大小朋友親手操作與人型機器人對話",
            "DiverCity Tokyo Plaza 全室內購物中心 — 逛鋼彈基地室內旗艦店與頂級美食街"
          ],
          "tip": "💡 未來館全館無障礙平坦坡道，電梯寬敞，極適合推車家庭度過舒適雨天時光。"
        },
        activities: [
          {
            time: '10:00 AM',
            name: '🌿 皇居外苑与日比谷公園漫步',
            desc: '全天在皇居外苑或日比谷公園區域輕鬆漫步放鬆。',
            address: '東京都千代田区皇居外苑 1-1',
            mapLink: 'https://maps.google.com/?q=Kokyo+Gaien+National+Garden+Tokyo',
            notes: '',
          },
          {
            time: '2:00 PM',
            name: '🛒 查漏補缺最後採購',
            desc: '在銀座/日比谷商圈進行最後一次查漏補缺的採購。',
            address: '東京都千代田区有楽町 1-1-2（東京寶塚/Midtown Hibiya）',
            mapLink: 'https://maps.google.com/?q=Tokyo+Midtown+Hibiya',
            notes: '',
          },
          {
            time: '6:00 PM',
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
        summary: '退房清點 · 機場大巴 · 圓滿啟程',
        illustration: './images/haneda.jpg',
        hotel: { name: 'Courtyard by Marriott Tokyo Ginza (銀座萬怡)', mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel' },
        activities: [
          {
            time: '10:00 AM',
            name: '🔍 最終清點与退房準備',
            desc: '最終清點 4 件 24 寸行李箱与推車，辦理退房。',
            address: '東京都中央区銀座 6-14-10',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
          {
            time: '2:00 PM',
            name: '🚌 酒店直登機場大巴前往羽田',
            desc: '由前台代訂好 2:15 PM 或 2:45 PM 的機場大巴，由酒店正門直接登車前往羽田機場 (HND)。',
            address: '東京都中央区銀座 6-14-10（Courtyard Ginza 正門）',
            mapLink: 'https://maps.google.com/?q=Courtyard+by+Marriott+Tokyo+Ginza+Hotel',
            notes: '',
          },
          {
            time: '3:00 PM',
            name: '✈️ 抵達羽田機場 · 托運与值機',
            desc: '3:00 PM 順暢抵達羽田機場，前往 JAL / 全日空櫃台辦理行李托運及值機手續。',
            address: '',
            mapLink: '',
            notes: '',
          },
          {
            time: '5:40 PM',
            name: '🛫 搭 NH 7544 返回紐約 · 圓滿完結',
            desc: '5:40 PM 搭乘 NH 7544 航班返回紐約，為 19 天精彩的日本之旅劃上圓滿句號！🎉',
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
// 通用工具函數

/** 將 24 小時制時間字串轉為 12 小時制 (例如 "17:30" -> "5:30 PM", "08:30" -> "8:30 AM") */
function formatTime12h(str) {
  if (!str) return '';
  return str.replace(/\b([01]?\d|2[0-3]):([0-5]\d)\b(?!\s*(?:AM|PM))/gi, (match, hStr, mStr) => {
    let h = parseInt(hStr, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${mStr} ${ampm}`;
  });
}
// ============================================================

/** 遍歷所有行程天數 */
function forEachDay(callback) {
  ITINERARY.forEach(phase => phase.days.forEach(day => callback(day, phase)));
}

/**
 * 為任何彈窗設定標準的 open/close 行為
 * @param {string} overlayId  - overlay 元素的 id
 * @param {string} [triggerId] - 觸發開啟的按鈕 id（可選）
 * @param {object} [opts]      - { onOpen }
 * @returns {HTMLElement|null} overlay 元素
 */
function setupModalOverlay(overlayId, triggerId, opts = {}) {
  const overlay = document.getElementById(overlayId);
  const trigger = triggerId ? document.getElementById(triggerId) : null;
  if (!overlay) return null;

  const openModal = () => {
    overlay.classList.add('open');
    document.body.classList.add('modal-open');
    opts.onOpen?.();
  };

  const closeModal = () => {
    overlay.classList.remove('open');
    if (!document.querySelector('.modal-overlay.open')) {
      document.body.classList.remove('modal-open');
    }
  };

  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal();
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // 徹底阻斷在虛化背景（blur out）滑動時對底層主頁的滾動穿透
  overlay.addEventListener('touchmove', (e) => {
    if (e.target === overlay) {
      if (e.cancelable) e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });

  return overlay;
}

// ============================================================
// 渲染邏輯
// ============================================================
// 天氣預報卡片載入器
// ============================================================

/**
 * 判斷指定天數是否在當前的 3 天天氣有效展示窗口內
 * - 出發前（today < 2026-08-31）：前 3 天（8/31 涉谷、9/1 東京、9/2 鎌倉）亮起各自獨立當日天氣！
 * - 出發後（today >= 2026-08-31）：動態滾動展示 今天 / 明天 / 後天（0, 1, 2 天）
 */
function isDateInActive3DayWindow(dateStr) {
  const targetApiDate = SUNSET_COORDS[dateStr]?.apiDate;
  if (!targetApiDate) return false;

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const todayTime = new Date(todayStr + 'T00:00:00').getTime();
  const targetTime = new Date(targetApiDate + 'T00:00:00').getTime();
  const tripStartTime = new Date('2026-08-31T00:00:00').getTime();

  // 若尚未抵達行程首日（出發前）：前 3 天（8/31, 9/1, 9/2）各自亮起自己的獨立氣象！
  if (todayTime < tripStartTime) {
    return ['8/31', '9/1', '9/2'].includes(dateStr);
  }

  // 出發後：按真實日曆日期滾動展示 今天 / 明天 / 後天（0, 1, 2 天）
  const diffDays = Math.round((targetTime - todayTime) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 2;
}

/**
 * 按需為展開的卡片加載未來 3 天天氣預報
 * 標題旁 Weather Badge 僅反映「該天當天自身」的真實天氣（非受未來幾天影響）；
 * 
 * @param {string} dateStr - e.g. "8/31"
 * @param {boolean} [autoOpen=false] - 是否在加載後直接展開 3 天天氣欄（僅在使用者點擊 Weather Badge 時為 true）
 */
async function load3DayWeatherForCard(dateStr, autoOpen = false) {
  const safeId = dateStr.replace('/', '-');
  const container = document.getElementById(`weather-3day-${safeId}`);
  const badge = document.getElementById(`weather-badge-${safeId}`);
  if (!container) return;

  const isNear3Days = isDateInActive3DayWindow(dateStr);

  if (container.getAttribute('data-loaded') === 'true') {
    if (autoOpen) {
      container.classList.add('open');
      badge?.classList.add('active');
    }
    return;
  }

  const forecasts = await get3DayForecastForDate(dateStr);
  if (!forecasts || !forecasts.length) return;

  container.setAttribute('data-loaded', 'true');

  const activeForecast = forecasts.find(f => f.isCurrentSegment) || forecasts[0];
  const hasRealData = !activeForecast.isFuture;

  // 1. 更新卡片頭部的小標籤（動態反映當前時段真實天氣）
  if (badge) {
    if (isNear3Days && hasRealData) {
      const isDayAlert = activeForecast.isAlert;
      const dayProb = activeForecast.prob;
      badge.style.display = '';

      if (isDayAlert) {
        badge.className = 'day-weather-badge is-alert';
        badge.innerHTML = `<span class="badge-emoji">☔</span><span class="badge-detail">${dayProb}%</span>`;
        badge.title = `點擊展開/收合詳細天氣（當前：${activeForecast.city}${activeForecast.segmentLabel ? ' ' + activeForecast.segmentLabel : ''}）`;
      } else {
        badge.className = 'day-weather-badge';
        badge.innerHTML = `<span class="badge-emoji">${activeForecast.emoji}</span><span class="badge-detail">${dayProb}%</span>`;
        badge.title = `點擊展開/收合詳細天氣（當前：${activeForecast.city}${activeForecast.segmentLabel ? ' ' + activeForecast.segmentLabel : ''}）`;
      }
    } else {
      badge.innerHTML = '';
      badge.style.display = 'none';
    }
  }

  // 2. 生成卡片展開後的膠囊（直接輸出膠囊列表，去除多餘外框與重複標題）
  if (hasRealData) {
    let capsulesHtml = '';
    forecasts.forEach(f => {
      const alertClass = f.isAlert ? ' is-alert' : '';
      const activeClass = f.isCurrentSegment ? ' is-active-seg' : '';
      const tempInfo = f.tempMax !== null && f.tempMin !== null
        ? `<div class="capsule-temp">${f.tempMin}° ~ ${f.tempMax}°</div>`
        : '';
      const relTag = (f.relLabel && ['今天', '明天', '後天'].includes(f.relLabel) && !f.segmentLabel)
        ? `<span class="capsule-rel">(${f.relLabel})</span>`
        : '';
      const segTag = f.segmentLabel
        ? `<span class="capsule-seg">${f.segmentLabel}</span>`
        : '';
      const rainTag = (f.isAlert || (f.rain > 0.1 && f.rainSummary))
        ? `<span class="capsule-rain-tag"> · ${f.rainSummary || '微雨'}</span>`
        : '';

      capsulesHtml += `
        <div class="weather-capsule${alertClass}${activeClass}">
          <div class="capsule-header">
            <span class="capsule-date">${f.date}</span>${segTag}${relTag}
            <span class="capsule-city">${f.city}</span>
          </div>
          <div class="capsule-main">
            <div class="capsule-track">
              <span class="capsule-emoji">${f.emoji}</span>
              <span class="capsule-prob">${f.prob}%</span>${rainTag}
            </div>
          </div>
          ${tempInfo}
        </div>
      `;
    });

    container.innerHTML = `<div class="weather-capsule-row">${capsulesHtml}</div>`;

    if (autoOpen) {
      container.classList.add('open');
      badge?.classList.add('active');
      setupCapsuleMarquees(container);
    }
  } else {
    container.innerHTML = `
      <div class="weather-capsule-row">
        <div style="font-size: 0.8rem; color: #8a6a5c; padding: 4px 6px;">
          🌤️ 本日（${dateStr}）實時高精度氣象預報將於出發前 3 天自動聯動日本氣象廳 JMA 即時生成
        </div>
      </div>
    `;
  }
}

/** 檢測超長雨勢文字並精準啟用橫向平滑循環滾動（Marquee） */
function setupCapsuleMarquees(container) {
  if (!container) return;
  requestAnimationFrame(() => {
    const mains = container.querySelectorAll('.capsule-main');
    mains.forEach(main => {
      const track = main.querySelector('.capsule-track');
      if (!track) return;
      const overflow = track.scrollWidth - main.clientWidth;
      if (overflow > 2) {
        main.style.setProperty('--marquee-dist', `-${overflow + 4}px`);
        main.classList.add('has-marquee');
      } else {
        main.classList.remove('has-marquee');
      }
    });
  });
}

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
          <div class="day-title">
            ${day.title}
            <span class="day-weather-badge" id="weather-badge-${day.date.replace('/', '-')}"></span>
          </div>
          <div class="day-summary">${day.summary}</div>
        </div>
        <span class="day-arrow">▼</span>
      `;

      // 內容
      const body = document.createElement('div');
      body.className = 'day-body';

      // 3 日天氣預報容器（預設隱藏，點擊天氣標籤才展開）
      const weatherBox = document.createElement('div');
      weatherBox.className = 'weather-3day-container';
      weatherBox.id = `weather-3day-${day.date.replace('/', '-')}`;
      body.appendChild(weatherBox);

      // 點擊天氣標籤時切換展開/收合 3 天天氣預報
      const badge = header.querySelector('.day-weather-badge');
      if (badge) {
        badge.addEventListener('click', async (e) => {
          e.stopPropagation();
          const isCardOpen = card.classList.contains('open');
          if (!isCardOpen) {
            document.querySelectorAll('.day-card').forEach(c => {
              c.classList.remove('open');
              c.querySelector('.day-header')?.setAttribute('aria-expanded', 'false');
            });
            card.classList.add('open');
            header.setAttribute('aria-expanded', 'true');
          }

          const isWeatherOpen = weatherBox.classList.contains('open');
          if (weatherBox.getAttribute('data-loaded') !== 'true') {
            await load3DayWeatherForCard(day.date, true);
          } else {
            const nextState = !isWeatherOpen;
            weatherBox.classList.toggle('open', nextState);
            badge.classList.toggle('active', nextState);
            if (nextState) {
              setupCapsuleMarquees(weatherBox);
            }
          }
        });
      }

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
          li.setAttribute('data-highlight', JSON.stringify(act.highlight));
        }

        const addressHtml = act.address
          ? act.mapLink
            ? `<a class="activity-address" href="${act.mapLink}" target="_blank" rel="noopener">${act.address}</a>`
            : `<div class="activity-address">${act.address}</div>`
          : '';

        const descHtml = act.desc
          ? `<div class="activity-desc">${act.desc}</div>`
          : '';

        const cleanNotes = act.notes ? act.notes.replace(/^([\u26A0\uFE0F\u1F17F\u1F37D⚠️🅿️🍽️]\s*)+/u, '').trim() : '';
        const notesHtml = cleanNotes
          ? `<div class="activity-notes"><span class="notes-label">⚠️ 注意事項</span>${cleanNotes}</div>`
          : '';

        const infoBtn = act.highlight
          ? `<span class="spot-info-badge">✨ 詳情</span>`
          : '';

        li.innerHTML = `
          <div class="activity-name-row">
            <div class="activity-name${act.highlight ? ' has-highlight' : ''}">${act.name}${infoBtn}</div>
            ${act.time ? `<span class="activity-time">${formatTime12h(act.time)}</span>` : ''}
          </div>
          ${descHtml}
          ${addressHtml}
          ${notesHtml}
        `;

        // 渲染 備選方案 左右滑動卡片（點擊卡片直接導航）
        if (act.options && act.options.length) {
          const optionsWrapper = document.createElement('div');
          optionsWrapper.className = 'options-carousel-wrapper';

          let cardsHtml = '';
          act.options.forEach(opt => {
            const isPri = opt.isPrimary ? ' primary' : ' secondary';
            if (opt.mapLink) {
              cardsHtml += `
                <a class="option-card${isPri} has-link" href="${opt.mapLink}" target="_blank" rel="noopener">
                  <span class="option-badge">${opt.badge}</span>
                  <div class="option-title">${opt.title}</div>
                  <div class="option-desc">${opt.desc}</div>
                </a>
              `;
            } else {
              cardsHtml += `
                <div class="option-card${isPri}">
                  <span class="option-badge">${opt.badge}</span>
                  <div class="option-title">${opt.title}</div>
                  <div class="option-desc">${opt.desc}</div>
                </div>
              `;
            }
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

        // 先關閉所有卡片及其天氣欄
        document.querySelectorAll('.day-card').forEach(c => {
          c.classList.remove('open');
          c.querySelector('.day-header')?.setAttribute('aria-expanded', 'false');
          c.querySelector('.weather-3day-container')?.classList.remove('open');
          c.querySelector('.day-weather-badge')?.classList.remove('active');
        });

        // 若原本是關閉的，則展開並滾動到頂部（天氣欄預設保持收起狀態，僅點擊天氣圖示才展開）
        if (!isOpen) {
          card.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
          load3DayWeatherForCard(day.date, false);
          setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 50);
        }

        // 立即同步更新 FAB 狀態（無須等待滾動觸發）
        if (typeof window.triggerFabUpdate === 'function') {
          window.triggerFabUpdate();
        }
      });
    });
  });
}

/**
 * 頁面載入時：單次 Batch 請求拉取全行程天氣，並一鍵填入所有卡片！
 */
async function initWeatherSystem() {
  await fetchAllCitiesWeatherBatch();

  const allDays = [];
  forEachDay(day => allDays.push(day));
  for (const day of allDays) {
    load3DayWeatherForCard(day.date, false);
  }

  // 天氣資料載入完成後，立即刷新頂部日落與降雨跑馬燈
  if (typeof window.triggerFabUpdate === 'function') {
    window.triggerFabUpdate();
  }
}

// 每 60 秒定期心跳檢測，時段切換時自動無縫刷新
setInterval(() => {
  const allDays = [];
  forEachDay(day => allDays.push(day));
  for (const day of allDays) {
    const safeId = day.date.replace('/', '-');
    const container = document.getElementById(`weather-3day-${safeId}`);
    if (container) {
      container.removeAttribute('data-loaded');
      load3DayWeatherForCard(day.date, container.classList.contains('open'));
    }
  }
}, 60000);

// 切回前台或解鎖螢幕時即刻精準校準
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    const allDays = [];
    forEachDay(day => allDays.push(day));
    for (const day of allDays) {
      const safeId = day.date.replace('/', '-');
      const container = document.getElementById(`weather-3day-${safeId}`);
      if (container) {
        container.removeAttribute('data-loaded');
        load3DayWeatherForCard(day.date, container.classList.contains('open'));
      }
    }
  }
});
let cachedRate = null; // 全局儲存 JPY 匯率

document.addEventListener('DOMContentLoaded', () => {
  renderItinerary();
  renderRainSection();
  renderMemoSection();
  setupHotelFab();
  autoExpandToday();
  initWeatherSystem();
  fetchRate();
  setupRatePopup();
  setupModalOverlay('spot-overlay');
});

// ============================================================
// 暴雨備選預案 (複用 buildSpotPopupHtml 模板渲染)
// ============================================================
function renderRainSection() {
  const popup = document.getElementById('rain-popup');
  if (!popup) return;

  setupModalOverlay('rain-overlay', 'rain-fab', {
    onOpen: () => {
      const openCard = document.querySelector('.day-card.open');
      const dateStr = openCard ? openCard.getAttribute('data-date') : null;
      let rainData = null;
      if (dateStr) {
        forEachDay(day => {
          if (day.date === dateStr && day.rainBackup) rainData = day.rainBackup;
        });
      }
      if (!rainData) {
        forEachDay(day => {
          if (day.rainBackup && !rainData) rainData = day.rainBackup;
        });
      }
      if (rainData) {
        popup.innerHTML = buildSpotPopupHtml(rainData);
      }
    }
  });
}

// ============================================================
// 景點簡介彈窗
// ============================================================

/** 生成景點/備選彈窗的 HTML（供 openSpotPopup 和 renderRainSection 共用） */
function buildSpotPopupHtml(h) {
  const tagsHtml = (h.tags || []).map(t => `<span class="spot-tag">${t}</span>`).join('');
  const mustHtml = (h.must || []).map(m => `<li>${m}</li>`).join('');
  const mustTitle = h.mustTitle || '★ 必看重點';
  const tipHtml = h.tip ? `<div class="spot-tip">💡 ${h.tip.replace(/^💡\\s*/, '')}</div>` : '';
  const addressHtml = h.address && h.mapLink
    ? `<div class="spot-address-box"><a href="${h.mapLink}" target="_blank" rel="noopener" class="spot-address-link">📍 導航/地圖：${h.address} ➔</a></div>`
    : '';

  return `
    <div class="spot-popup-header">
      <span class="spot-popup-emoji">${h.emoji || '📍'}</span>
      <div class="spot-popup-title">${h.title}</div>
      <div class="spot-popup-tags">${tagsHtml}</div>
    </div>
    <div class="spot-popup-body">
      <div class="spot-intro">${h.intro}</div>
      ${mustHtml ? `
      <div>
        <div class="spot-must-title">${mustTitle}</div>
        <ul class="spot-must-list">${mustHtml}</ul>
      </div>` : ''}
      ${addressHtml}
      ${tipHtml}
    </div>
  `;
}

function openSpotPopup(h) {
  const overlay = document.getElementById('spot-overlay');
  const popup = document.getElementById('spot-popup');
  if (!overlay || !popup) return;

  popup.innerHTML = buildSpotPopupHtml(h);
  overlay.classList.add('open');
  document.body.classList.add('modal-open');
}

// ============================================================
function renderMemoSection() {
  const popup = document.getElementById('memo-popup');
  if (!popup) return;

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
          <div class="memo-item"><strong>現金準備：</strong>10,000 日元大鈔（高速人工通道/大餐廳/溫泉旅館）；1,000 日元零錢（投幣車場/自助繳費機）；100/500 日元硬幣（販賣機/儲物櫃）；5 日元硬幣（Day 2 淺草寺許願，日文諧音"有緣"）。</div>
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

  // 統一事件綁定
  setupModalOverlay('memo-overlay', 'memo-fab');
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
  const jpyInput = document.getElementById('rate-jpy-input');
  const usdResult = document.getElementById('rate-usd-result');
  const note = document.getElementById('rate-popup-note');
  const inputGroup = document.getElementById('rate-input-group') || jpyInput?.parentElement;
  if (!jpyInput || !usdResult) return;

  function calcAndShow() {
    if (!cachedRate) { usdResult.textContent = '…'; return; }
    const jpy = parseFloat(jpyInput.value) || 0;
    const usd = jpy / cachedRate;
    usdResult.textContent = usd.toFixed(2);
    if (note) note.textContent = `1 USD ≈ ${cachedRate.toFixed(2)} JPY（每日自動更新）`;
  }

  // 統一事件綁定（點擊背景關閉並阻止背景滾動穿透）
  setupModalOverlay('rate-overlay', 'rate-badge', {
    onOpen: () => { calcAndShow(); setTimeout(() => jpyInput.select(), 100); }
  });

  // 即時輸入計算
  jpyInput.addEventListener('input', calcAndShow);

  // 快捷金額按鈕
  document.querySelectorAll('.rate-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      jpyInput.value = btn.getAttribute('data-jpy');
      calcAndShow();
    });
  });

  // 🌟 手勢滑動改金額：在虛化背景或彈窗上任意滑動快速微調 JPY，同時 100% 鎖定背景主頁不滾動
  const overlay = document.getElementById('rate-overlay');
  if (overlay) {
    let touchStartX = 0;
    let touchStartY = 0;
    let startVal = 0;
    let isDragging = false;
    let lastDragTime = 0;

    overlay.addEventListener('touchstart', (e) => {
      if (e.target.closest('.rate-preset') || e.target.closest('#rate-close-btn')) return;
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        startVal = parseFloat(jpyInput.value) || 0;
        isDragging = false;
      }
    }, { passive: true });

    overlay.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 1) return;
      if (e.target.closest('.rate-preset') || e.target.closest('#rate-close-btn')) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - touchStartX;
      const deltaY = touchStartY - currentY; // 向上滑或向右滑為增加
      const delta = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : deltaY;

      // 嚴格攔截所有 touchmove 預設行為，保證底層主頁 100% 靜止！
      if (e.cancelable) e.preventDefault();

      if (Math.abs(delta) > 5) {
        isDragging = true;
        lastDragTime = Date.now();
        inputGroup?.classList.add('is-sliding');

        // 每滑動約 12px 調整 100 JPY
        const stepCount = Math.trunc(delta / 12);
        const newVal = Math.max(0, startVal + stepCount * 100);
        if (parseFloat(jpyInput.value) !== newVal) {
          jpyInput.value = newVal;
          calcAndShow();
        }
      }
    }, { passive: false });

    const endTouch = () => {
      inputGroup?.classList.remove('is-sliding');
      if (isDragging) {
        jpyInput.blur();
      }
    };

    overlay.addEventListener('touchend', endTouch);
    overlay.addEventListener('touchcancel', endTouch);

    // 點擊虛化背景時：若是剛滑動過則攔截關閉；若是純單擊點擊則關閉彈窗
    overlay.addEventListener('click', (e) => {
      if (Date.now() - lastDragTime < 350 || isDragging) {
        e.stopPropagation();
        e.preventDefault();
      }
    }, true);
  }
}

/** 解析時間字串（如 "1:35 PM", "11:15 AM", "17:30"）為當天分鐘數 */
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return null;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ampm = match[3] ? match[3].toUpperCase() : null;
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

// 根據瀏覽器當前日期與時間自動展開對應行程卡並精準滾動至下一行程
function autoExpandToday() {
  const now = new Date();
  const todayMonth = now.getMonth() + 1; // 1–12
  const todayDay = now.getDate();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  document.querySelectorAll('.day-card').forEach(card => {
    const dateStr = card.getAttribute('data-date'); // e.g. "8/31"
    if (!dateStr) return;
    const [m, d] = dateStr.split('/').map(Number);
    if (m === todayMonth && d === todayDay) {
      card.classList.add('open');
      card.querySelector('.day-header')?.setAttribute('aria-expanded', 'true');
      load3DayWeatherForCard(dateStr);

      // 尋找當天「下一個即將到來的行程」或「最後一個行程」
      const items = Array.from(card.querySelectorAll('.activity-item'));
      let targetEl = null;

      if (items.length > 0) {
        for (const item of items) {
          const timeEl = item.querySelector('.activity-time');
          const itemMinutes = timeEl ? parseTimeToMinutes(timeEl.textContent) : null;
          if (itemMinutes !== null && itemMinutes >= currentMinutes) {
            targetEl = item;
            break;
          }
        }
        // 若當天所有行程已過，鎖定最後一個行程
        if (!targetEl) {
          targetEl = items[items.length - 1];
        }
      }

      setTimeout(() => {
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
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

  // 頂部標題與 Flag 元素
  const siteFlag = document.getElementById('site-flag');
  const siteTitle = document.getElementById('site-title');

  // 建立 date → hotel 及 date → rainBackup 對照表（從 ITINERARY 資料中提取）
  const hotelMap = {};
  const rainBackupMap = {};
  forEachDay(day => {
    if (day.hotel) hotelMap[day.date] = day.hotel;
    if (day.rainBackup) rainBackupMap[day.date] = day.rainBackup;
  });

  let currentHotel = null;

  /**
   * 取得指定日期的日落與即時天氣/降雨摘要字串（供左上角頂部標題使用）
   * 例如：6:11 PM 日落 · 涉谷 🌧️ 61% · 微雨(19-20點)
   */
  function getTopBannerText(dateStr) {
    const targetDate = dateStr || '8/31';
    const sunsetInfo = SUNSET_TABLE[targetDate];
    if (!sunsetInfo) return '日本旅行 2026';

    let sunsetText = `${sunsetInfo.time} 日落 · ${sunsetInfo.city}`;

    const coords = SUNSET_COORDS[targetDate];
    if (!coords) return sunsetText;

    const nowJst = getNowJST();
    const todayStr = nowJst.isoDate;

    let rainText = '';

    // 1. 多時段自駕日（如上午/下午跨城）
    if (coords.segments && coords.segments.length > 0) {
      const isToday = coords.apiDate === todayStr;
      const currentSeg = coords.segments.find(s => isToday && nowJst.hour >= s.startHour && nowJst.hour < s.endHour) || coords.segments[0];
      const segCacheKey = `${currentSeg.lat.toFixed(4)},${currentSeg.lng.toFixed(4)}`;
      const segForecast = getSegmentForecast(segCacheKey, coords.apiDate, currentSeg);
      if (segForecast) {
        if (segForecast.isAlert || (segForecast.rain > 0.1 && segForecast.rainSummary) || segForecast.prob >= 40) {
          const summary = segForecast.rainSummary || '降雨';
          rainText = ` ${segForecast.emoji} ${segForecast.prob}% · ${summary}`;
        }
      }
    } else {
      // 2. 一般日氣象
      const cacheKey = `${coords.lat.toFixed(4)},${coords.lng.toFixed(4)}`;
      const weatherData = WEATHER_CACHE[cacheKey];
      const matchedDay = weatherData?.daily?.find(d => d.date === coords.apiDate);
      if (matchedDay) {
        if (matchedDay.prob >= 40 || (matchedDay.rain > 0.1 && matchedDay.rainSummary)) {
          const emoji = getWeatherEmoji(matchedDay.code, matchedDay.prob);
          const summary = matchedDay.rainSummary || '微雨';
          rainText = ` ${emoji} ${matchedDay.prob}% · ${summary}`;
        }
      }
    }

    return `${sunsetText}${rainText}`;
  }

  /** 檢測頂部標題文字長度並啟用平滑往復跑馬燈（Marquee） */
  function setupTopBannerMarquee() {
    if (!siteTitle) return;
    requestAnimationFrame(() => {
      const track = siteTitle.querySelector('.site-title-track');
      if (!track) return;
      const overflow = track.scrollWidth - siteTitle.clientWidth;
      if (overflow > 3) {
        siteTitle.style.setProperty('--title-marquee-dist', `-${overflow + 8}px`);
        siteTitle.classList.add('has-marquee');
      } else {
        siteTitle.classList.remove('has-marquee');
      }
    });
  }

  let lastBannerKey = '';

  // 更新 FAB 與頂部日落/天氣跑馬燈（展開卡片時即時聯動，收起時恢復 🇯🇵 日本旅行 2026）
  function updateFab(hotel, hasAnyOpenCard, dateStr) {
    if (memoFab && memoFab.classList) {
      memoFab.classList.toggle('hidden', !hasAnyOpenCard);
    }
    if (rainFab && rainFab.classList) {
      const hasRain = dateStr && rainBackupMap[dateStr];
      rainFab.classList.toggle('hidden', !hasRain || !hasAnyOpenCard);
    }

    // 頂部標題邏輯：
    // 1. 若所有卡片皆收起：顯示「🇯🇵 日本旅行 2026」
    // 2. 若展開卡片：顯示該天的「🌅 [日落] · [城市] [降雨警報]」並啟用持續平滑跑馬燈
    if (siteFlag && siteTitle) {
      if (!hasAnyOpenCard || !dateStr) {
        if (lastBannerKey !== '__CLOSED__') {
          lastBannerKey = '__CLOSED__';
          siteFlag.textContent = '🇯🇵';
          siteTitle.classList.remove('sunset-active', 'has-marquee');
          siteTitle.textContent = '日本旅行 2026';
        }
      } else {
        const bannerText = getTopBannerText(dateStr);
        const currentKey = `${dateStr}:${bannerText}`;
        // 只有當日期或內容真正改變時才更新 DOM，避免滾動時重置動畫導致定格
        if (lastBannerKey !== currentKey) {
          lastBannerKey = currentKey;
          siteFlag.textContent = '🌅';
          siteTitle.classList.add('sunset-active');
          siteTitle.innerHTML = `<div class="site-title-track"><span class="site-title-text">${bannerText}</span></div>`;
          setupTopBannerMarquee();
        }
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

    const dateStr = bestCard && bestCard.getAttribute ? bestCard.getAttribute('data-date') : null;
    updateFab(dateStr ? hotelMap[dateStr] ?? null : null, true, dateStr);
  }

  // 供全局手動觸發更新（例如點擊卡片頭部時）
  window.triggerFabUpdate = checkAndUpdateActiveCard;

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

// 腳本加載時立即在背景發起單次 Batch 天氣請求，提前緩存數據
fetchAllCitiesWeatherBatch();
