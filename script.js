const locationButton = document.querySelector("#locationButton");
const dateTime = document.querySelector("#dateTime");
const regionSelect = document.querySelector("#regionSelect");
const qiblaOpenButton = document.querySelector("#qiblaOpenButton");
const qiblaModal = document.querySelector("#qiblaModal");
const closeQiblaModal = document.querySelector("#closeQiblaModal");
const startQiblaButton = document.querySelector("#startQiblaButton");
const compassWrap = document.querySelector("#compassWrap");
const compassDial = document.querySelector("#compassDial");
const qiblaNeedle = document.querySelector("#qiblaNeedle");
const qiblaStatus = document.querySelector("#qiblaStatus");
const qiblaDegrees = document.querySelector("#qiblaDegrees");
const prayerOpenButton = document.querySelector("#prayerOpenButton");
const masjidOpenButton = document.querySelector("#masjidOpenButton");
const masjidHint = document.querySelector("#masjidHint");
const calendarOpenButton = document.querySelector("#calendarOpenButton");
const calendarModal = document.querySelector("#calendarModal");
const closeCalendarModal = document.querySelector("#closeCalendarModal");
const prevCalendarMonth = document.querySelector("#prevCalendarMonth");
const nextCalendarMonth = document.querySelector("#nextCalendarMonth");
const calendarMonthLabel = document.querySelector("#calendarMonthLabel");
const calendarGrid = document.querySelector("#calendarGrid");
const calendarSummary = document.querySelector("#calendarSummary");
const prayerModal = document.querySelector("#prayerModal");
const closePrayerModal = document.querySelector("#closePrayerModal");
const prayerResults = document.querySelector("#prayerResults");
const sourceLink = document.querySelector("#sourceLink");

const prayerFields = {
  bomdod: document.querySelector("#timeBomdod"),
  quyosh: document.querySelector("#timeQuyosh"),
  peshin: document.querySelector("#timePeshin"),
  asr: document.querySelector("#timeAsr"),
  shom: document.querySelector("#timeShom"),
  xufton: document.querySelector("#timeXufton"),
};

const nextPrayerName = document.querySelector("#nextPrayerName");
const nextPrayerTime = document.querySelector("#nextPrayerTime");
const currentPrayer = document.querySelector("#currentPrayer");

const sourceUrl = (region) =>
  `https://namoz-vaqti.uz/?format=json&region=${region}&lang=lotin&period=today`;

const pageUrl = (region) =>
  `https://namoz-vaqti.uz/?region=${region}&lang=lotin&period=today`;

const proxyUrl = (region) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(pageUrl(region))}`;

const fallbackPrayerTimesByRegion = {
  "toshkent-shahri": {
    times: {
      bomdod: "03:09",
      quyosh: "04:52",
      peshin: "12:21",
      asr: "17:33",
      shom: "19:54",
      xufton: "21:32",
    },
    sourceLabel: "namoz-vaqti.uz, Toshkent shahri",
  },
  "andijon-shahri": {
    times: {
      bomdod: "02:57",
      quyosh: "04:40",
      peshin: "12:09",
      asr: "17:21",
      shom: "19:42",
      xufton: "21:20",
    },
    sourceLabel: "namoz-vaqti.uz, Andijon shahri",
  },
  "namangan-shahri": {
    times: {
      bomdod: "02:59",
      quyosh: "04:42",
      peshin: "12:11",
      asr: "17:23",
      shom: "19:44",
      xufton: "21:22",
    },
    sourceLabel: "namoz-vaqti.uz, Namangan shahri",
  },
  "fargona-shahri": {
    times: {
      bomdod: "03:00",
      quyosh: "04:42",
      peshin: "12:11",
      asr: "17:23",
      shom: "19:43",
      xufton: "21:21",
    },
    sourceLabel: "namoz-vaqti.uz, Farg'ona shahri",
  },
  "qoqon-shahri": {
    times: {
      bomdod: "03:02",
      quyosh: "04:45",
      peshin: "12:14",
      asr: "17:26",
      shom: "19:47",
      xufton: "21:25",
    },
    sourceLabel: "namoz-vaqti.uz, Qo'qon shahri",
  },
  "quvasoy-shahri": {
    times: {
      bomdod: "03:00",
      quyosh: "04:42",
      peshin: "12:10",
      asr: "17:21",
      shom: "19:41",
      xufton: "21:19",
    },
    sourceLabel: "namoz-vaqti.uz, Quvasoy shahri",
  },
  "samarqand-shahri": {
    times: {
      bomdod: "03:18",
      quyosh: "05:01",
      peshin: "12:30",
      asr: "17:42",
      shom: "20:03",
      xufton: "21:41",
    },
    sourceLabel: "namoz-vaqti.uz, Samarqand shahri",
  },
  "buxoro-shahri": {
    times: {
      bomdod: "03:28",
      quyosh: "05:11",
      peshin: "12:40",
      asr: "17:52",
      shom: "20:13",
      xufton: "21:51",
    },
    sourceLabel: "namoz-vaqti.uz, Buxoro shahri",
  },
  "navoiy-shahri": {
    times: {
      bomdod: "03:24",
      quyosh: "05:07",
      peshin: "12:36",
      asr: "17:48",
      shom: "20:09",
      xufton: "21:47",
    },
    sourceLabel: "namoz-vaqti.uz, Navoiy shahri",
  },
  "qarshi-shahri": {
    times: {
      bomdod: "03:24",
      quyosh: "05:06",
      peshin: "12:35",
      asr: "17:47",
      shom: "20:08",
      xufton: "21:46",
    },
    sourceLabel: "namoz-vaqti.uz, Qarshi shahri",
  },
  "termiz-shahri": {
    times: {
      bomdod: "03:17",
      quyosh: "05:00",
      peshin: "12:29",
      asr: "17:41",
      shom: "20:02",
      xufton: "21:40",
    },
    sourceLabel: "namoz-vaqti.uz, Termiz shahri",
  },
  "jizzax-shahri": {
    times: {
      bomdod: "03:15",
      quyosh: "04:58",
      peshin: "12:27",
      asr: "17:39",
      shom: "20:00",
      xufton: "21:38",
    },
    sourceLabel: "namoz-vaqti.uz, Jizzax shahri",
  },
  "guliston-shahri": {
    times: {
      bomdod: "03:12",
      quyosh: "04:54",
      peshin: "12:23",
      asr: "17:35",
      shom: "19:56",
      xufton: "21:34",
    },
    sourceLabel: "namoz-vaqti.uz, Guliston shahri",
  },
  "urganch-shahri": {
    times: {
      bomdod: "03:44",
      quyosh: "05:26",
      peshin: "12:55",
      asr: "18:07",
      shom: "20:28",
      xufton: "22:06",
    },
    sourceLabel: "namoz-vaqti.uz, Urganch shahri",
  },
  "xiva-shahri": {
    times: {
      bomdod: "03:45",
      quyosh: "05:28",
      peshin: "12:56",
      asr: "18:08",
      shom: "20:28",
      xufton: "22:06",
    },
    sourceLabel: "namoz-vaqti.uz, Xiva shahri",
  },
  "nukus-shahri": {
    times: {
      bomdod: "03:49",
      quyosh: "05:31",
      peshin: "13:00",
      asr: "18:12",
      shom: "20:33",
      xufton: "22:11",
    },
    sourceLabel: "namoz-vaqti.uz, Nukus shahri",
  },
};

const fallbackRegionAliases = {
  "margilon-shahri": "fargona-shahri",
  "beshariq-tumani": "qoqon-shahri",
  "bogdod-tumani": "qoqon-shahri",
  "buvayda-tumani": "qoqon-shahri",
  "dangara-tumani": "qoqon-shahri",
  "fargona-tumani": "fargona-shahri",
  "furqat-tumani": "qoqon-shahri",
  "ozbekiston-tumani": "qoqon-shahri",
  "oltiariq-tumani": "fargona-shahri",
  "qoshtepa-tumani": "fargona-shahri",
  "quva-tumani": "quvasoy-shahri",
  "rishton-tumani": "qoqon-shahri",
  "sox-tumani": "fargona-shahri",
  "toshloq-tumani": "fargona-shahri",
  "uchkoprik-tumani": "qoqon-shahri",
  "yozyovon-tumani": "fargona-shahri",
};

const monthNames = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

const hijriMonthNames = [
  "Muharram",
  "Safar",
  "Rabiul avval",
  "Rabiul oxir",
  "Jumodul avval",
  "Jumodul oxir",
  "Rajab",
  "Sha'bon",
  "Ramazon",
  "Shavvol",
  "Zulqa'da",
  "Zulhijja",
];

const specialHijriDays = [
  {
    month: 9,
    day: 1,
    title: "Ramazon boshlanishi",
    type: "ramadan",
    description: "Ro'za oyining birinchi kuni",
  },
  {
    month: 10,
    day: 1,
    title: "Ramazon Hayiti",
    type: "eid",
    description: "Iyd al-Fitr",
  },
  {
    month: 12,
    day: 9,
    title: "Arafah kuni",
    type: "arafah",
    description: "Zulhijjaning 9-kuni",
  },
  {
    month: 12,
    day: 10,
    title: "Qurbon Hayiti",
    type: "eid",
    description: "Iyd al-Adha",
  },
];

const weekdayNames = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];

const weekdayIndexByShortName = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

let displayTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let qiblaBearing = null;
let qiblaWasAligned = false;
let qiblaAudioContext = null;
let prayerRequestId = 0;
let visibleCalendarDate = new Date();

const kaaba = {
  latitude: 21.4224779,
  longitude: 39.8251832,
};

function isInUzbekistan(latitude, longitude) {
  return latitude >= 37 && latitude <= 46 && longitude >= 55 && longitude <= 74;
}

function updateDateTime() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: displayTimeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const value = (type) => parts.find((part) => part.type === type)?.value;
  const monthIndex = Number(value("month")) - 1;
  const weekdayIndex = weekdayIndexByShortName[value("weekday")];

  dateTime.textContent = `${weekdayNames[weekdayIndex]}, ${value("day")} ${monthNames[monthIndex]} ${value(
    "year",
  )}, ${value("hour")}:${value("minute")} (${displayTimeZone})`;
}

function getHijriDate(date) {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const value = (type) => Number(parts.find((part) => part.type === type)?.value);

  return {
    day: value("day"),
    month: value("month"),
    year: value("year"),
  };
}

function formatGregorianDate(date) {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function formatHijriDate(hijri) {
  return `${hijri.day} ${hijriMonthNames[hijri.month - 1]} ${hijri.year}`;
}

function getSpecialDay(hijri) {
  const exactDay = specialHijriDays.find(
    (event) => event.month === hijri.month && event.day === hijri.day,
  );

  if (exactDay) {
    return exactDay;
  }

  if (hijri.month === 9) {
    return {
      title: "Ramazon",
      type: "ramadan",
      description: "Ro'za oyi",
    };
  }

  return null;
}

function getMonthStartOffset(date) {
  const jsDay = date.getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function renderCalendar() {
  const year = visibleCalendarDate.getFullYear();
  const month = visibleCalendarDate.getMonth();
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = getMonthStartOffset(firstDay);

  calendarMonthLabel.textContent = `${monthNames[month]} ${year}`;
  calendarGrid.innerHTML = "";

  for (let index = 0; index < blanks; index += 1) {
    const blank = document.createElement("span");
    blank.className = "calendar-day blank";
    calendarGrid.append(blank);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const hijri = getHijriDate(date);
    const special = getSpecialDay(hijri);
    const dayCell = document.createElement("article");
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    dayCell.className = ["calendar-day", isToday ? "today" : "", special?.type || ""]
      .filter(Boolean)
      .join(" ");
    dayCell.innerHTML = `
      <strong class="gregorian-day">${day}</strong>
      <span class="hijri-day">${hijri.day} ${hijriMonthNames[hijri.month - 1]}</span>
      ${special ? `<span class="calendar-badge">${special.title}</span>` : ""}
    `;
    calendarGrid.append(dayCell);
  }

  renderCalendarSummary();
}

function renderCalendarSummary() {
  const upcomingEvents = getUpcomingSpecialDays();

  calendarSummary.innerHTML = upcomingEvents
    .map(
      (event) => `
        <article class="calendar-event-card ${event.type}">
          <strong>${event.title}</strong>
          <span>${formatGregorianDate(event.date)}</span>
          <span>${formatHijriDate(event.hijri)}</span>
        </article>
      `,
    )
    .join("");
}

function getUpcomingSpecialDays() {
  const today = new Date();
  const found = [];
  const seen = new Set();

  for (let offset = 0; offset < 430 && found.length < 4; offset += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    const hijri = getHijriDate(date);
    const event = specialHijriDays.find(
      (special) => special.month === hijri.month && special.day === hijri.day,
    );

    if (!event) {
      continue;
    }

    const key = `${event.title}-${hijri.year}`;

    if (!seen.has(key)) {
      seen.add(key);
      found.push({ ...event, date, hijri });
    }
  }

  return found;
}

const uzbekistanRegions = [
  { region: "toshkent-shahri", latitude: 41.3111, longitude: 69.2797 },
  { region: "andijon-shahri", latitude: 40.7821, longitude: 72.3442 },
  { region: "namangan-shahri", latitude: 40.9983, longitude: 71.6726 },
  { region: "fargona-shahri", latitude: 40.3842, longitude: 71.7843 },
  { region: "samarqand-shahri", latitude: 39.6542, longitude: 66.9597 },
  { region: "buxoro-shahri", latitude: 39.7681, longitude: 64.4556 },
  { region: "navoiy-shahri", latitude: 40.0844, longitude: 65.3792 },
  { region: "qarshi-shahri", latitude: 38.861, longitude: 65.7847 },
  { region: "termiz-shahri", latitude: 37.2242, longitude: 67.2783 },
  { region: "jizzax-shahri", latitude: 40.1158, longitude: 67.8422 },
  { region: "guliston-shahri", latitude: 40.4897, longitude: 68.7842 },
  { region: "urganch-shahri", latitude: 41.55, longitude: 60.6333 },
  { region: "xiva-shahri", latitude: 41.3783, longitude: 60.3639 },
  { region: "nukus-shahri", latitude: 42.4619, longitude: 59.6166 },
];

function distanceSquared(point, city) {
  return (point.latitude - city.latitude) ** 2 + (point.longitude - city.longitude) ** 2;
}

function nearestRegion(latitude, longitude) {
  return uzbekistanRegions.reduce((nearest, city) =>
    distanceSquared({ latitude, longitude }, city) < distanceSquared({ latitude, longitude }, nearest)
      ? city
      : nearest,
  ).region;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

function normalizeDegrees(degrees) {
  return (degrees + 360) % 360;
}

function angleDifference(first, second) {
  const difference = Math.abs(normalizeDegrees(first) - normalizeDegrees(second));
  return Math.min(difference, 360 - difference);
}

function getQiblaBearing(latitude, longitude) {
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(kaaba.latitude);
  const deltaLongitude = toRadians(kaaba.longitude - longitude);
  const y = Math.sin(deltaLongitude);
  const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLongitude);

  return normalizeDegrees(toDegrees(Math.atan2(y, x)));
}

function playAlignedChime() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  if (!qiblaAudioContext) {
    qiblaAudioContext = new AudioContextConstructor();
  }

  const now = qiblaAudioContext.currentTime;
  [660, 880].forEach((frequency, index) => {
    const oscillator = qiblaAudioContext.createOscillator();
    const gain = qiblaAudioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(qiblaAudioContext.destination);
    gain.gain.setValueAtTime(0.0001, now + index * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.13, now + index * 0.09 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.09 + 0.18);
    oscillator.start(now + index * 0.09);
    oscillator.stop(now + index * 0.09 + 0.2);
  });
}

function prepareQiblaFeedback() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  if (!qiblaAudioContext) {
    qiblaAudioContext = new AudioContextConstructor();
  }

  if (qiblaAudioContext.state === "suspended") {
    qiblaAudioContext.resume();
  }
}

function markQiblaAligned(isAligned) {
  compassWrap.classList.toggle("aligned", isAligned);

  if (isAligned && !qiblaWasAligned) {
    qiblaStatus.textContent = "Qibla yo'nalishi topildi";
    playAlignedChime();

    if (navigator.vibrate) {
      navigator.vibrate([35, 35, 55]);
    }
  }

  qiblaWasAligned = isAligned;
}

function updateCompass(heading) {
  if (qiblaBearing === null) {
    return;
  }

  const qiblaRelativeToDevice = normalizeDegrees(qiblaBearing - heading);
  const difference = angleDifference(qiblaRelativeToDevice, 0);

  compassDial.style.transform = `rotate(${-heading}deg)`;
  qiblaNeedle.style.transform = `rotate(${qiblaRelativeToDevice}deg)`;
  qiblaDegrees.textContent = `${Math.round(qiblaBearing)}°`;

  if (difference <= 5) {
    markQiblaAligned(true);
  } else {
    markQiblaAligned(false);
    qiblaStatus.textContent = `${Math.round(difference)}° qoldi`;
  }
}

function readDeviceHeading(event) {
  if (typeof event.webkitCompassHeading === "number") {
    return event.webkitCompassHeading;
  }

  if (typeof event.alpha === "number") {
    return normalizeDegrees(360 - event.alpha);
  }

  return null;
}

function handleDeviceOrientation(event) {
  const heading = readDeviceHeading(event);

  if (heading !== null) {
    updateCompass(heading);
  }
}

async function requestCompassPermission() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    const permission = await DeviceOrientationEvent.requestPermission();
    return permission === "granted";
  }

  return true;
}

async function startQiblaCompass() {
  prepareQiblaFeedback();
  qiblaStatus.textContent = "Joylashuv aniqlanmoqda...";
  startQiblaButton.textContent = "Aniqlanmoqda...";

  if (!navigator.geolocation) {
    qiblaStatus.textContent = "Bu brauzer joylashuvni qo'llamaydi";
    startQiblaButton.textContent = "Kompasni boshlash";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      qiblaBearing = getQiblaBearing(coords.latitude, coords.longitude);
      qiblaDegrees.textContent = `${Math.round(qiblaBearing)}°`;
      qiblaStatus.textContent = "Kompas ruxsati so'ralmoqda...";

      try {
        const compassAllowed = await requestCompassPermission();

        if (!compassAllowed) {
          qiblaStatus.textContent = "Kompasga ruxsat berilmadi";
          startQiblaButton.textContent = "Qayta urinish";
          return;
        }

        window.removeEventListener("deviceorientation", handleDeviceOrientation);
        window.addEventListener("deviceorientation", handleDeviceOrientation, true);
        qiblaStatus.textContent = "Telefonni sekin aylantiring";
        startQiblaButton.textContent = "Kompas ishlayapti";
      } catch {
        qiblaStatus.textContent = "Kompas ruxsati olinmadi";
        startQiblaButton.textContent = "Qayta urinish";
      }
    },
    () => {
      qiblaStatus.textContent = "Joylashuvga ruxsat kerak";
      startQiblaButton.textContent = "Qayta urinish";
    },
    { enableHighAccuracy: true, timeout: 12000 },
  );
}

async function loadPrayerTimes(region) {
  const requestId = ++prayerRequestId;
  const fallback = getFallbackPrayerTimes(region);

  sourceLink.href = pageUrl(region);

  if (fallback) {
    renderPrayerTimes(fallback);
    currentPrayer.textContent = `Manba: ${fallback.sourceLabel}`;
  } else {
    nextPrayerName.textContent = "Yuklanmoqda";
    nextPrayerTime.textContent = "--:--";
    currentPrayer.textContent = "namoz-vaqti.uz";
  }

  try {
    const data = await getPrayerTimes(region);
    const hasLiveTimes = Object.values(data.times || {}).some(Boolean);

    if (requestId === prayerRequestId && hasLiveTimes) {
      renderPrayerTimes(data);
    }
  } catch {
    if (!fallback && requestId === prayerRequestId) {
      nextPrayerName.textContent = "Manbani oching";
      nextPrayerTime.textContent = "Ochish";
      currentPrayer.textContent = "Bu hudud uchun hozircha ichki zaxira yo'q";
    }
  }
}

function getFallbackPrayerTimes(region) {
  const fallbackRegion = fallbackPrayerTimesByRegion[region]
    ? region
    : fallbackRegionAliases[region];
  const fallback = fallbackPrayerTimesByRegion[fallbackRegion];

  if (!fallback) {
    return null;
  }

  return {
    ...fallback,
    ...getCurrentAndNextPrayer(fallback.times),
  };
}

function getCurrentAndNextPrayer(times) {
  const prayerOrder = [
    ["Bomdod", times.bomdod],
    ["Peshin", times.peshin],
    ["Asr", times.asr],
    ["Shom", times.shom],
    ["Xufton", times.xufton],
  ].filter((prayer) => prayer[1]);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const prayerMinutes = prayerOrder.map(([label, time]) => {
    const [hours, minutes] = time.split(":").map(Number);
    return { label, time, minutes: hours * 60 + minutes };
  });
  const next = prayerMinutes.find((prayer) => prayer.minutes > currentMinutes) || prayerMinutes[0];
  const current =
    [...prayerMinutes].reverse().find((prayer) => prayer.minutes <= currentMinutes) ||
    prayerMinutes[prayerMinutes.length - 1];

  return {
    current,
    next,
  };
}

async function getPrayerTimes(region) {
  try {
    return parsePrayerJson(await fetchJson(sourceUrl(region)));
  } catch {
    const html = await fetchText(proxyUrl(region));
    return parsePrayerHtml(html);
  }
}

async function fetchJson(url) {
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error("Prayer JSON source failed");
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error("Prayer HTML source failed");
  }

  return response.text();
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    return await fetch(url, { cache: "no-store", signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function parsePrayerJson(data) {
  const times = data?.today?.times || data?.times || {};

  return {
    times,
    current: data?.today?.current || data?.current,
    next: data?.today?.next || data?.next,
    sourceLabel: data?.meta?.region?.name || "namoz-vaqti.uz",
  };
}

function parsePrayerHtml(html) {
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent.replace(/\s+/g, " ");
  const readTime = (label) => text.match(new RegExp(`${label}\\s+(\\d{2}:\\d{2})`))?.[1];
  const current = text.match(/Hozirgi namoz:\s*([^|]+)\|\s*Vaqti:\s*(\d{2}:\d{2})/);
  const next = text.match(/Keyingi namoz:\s*([^|]+)\|\s*Vaqti:\s*(\d{2}:\d{2})/);

  return {
    times: {
      bomdod: readTime("Bomdod"),
      quyosh: readTime("Quyosh"),
      peshin: readTime("Peshin"),
      asr: readTime("Asr"),
      shom: readTime("Shom"),
      xufton: readTime("Xufton"),
    },
    current: current ? { label: current[1].trim(), time: current[2] } : null,
    next: next ? { label: next[1].trim(), time: next[2] } : null,
    sourceLabel: "namoz-vaqti.uz",
  };
}

function renderPrayerTimes(data) {
  const times = data.times || {};
  const next = data.next;
  const current = data.current;

  prayerFields.bomdod.textContent = times.bomdod || "--:--";
  prayerFields.quyosh.textContent = times.quyosh || "--:--";
  prayerFields.peshin.textContent = times.peshin || "--:--";
  prayerFields.asr.textContent = times.asr || "--:--";
  prayerFields.shom.textContent = times.shom || "--:--";
  prayerFields.xufton.textContent = times.xufton || "--:--";

  nextPrayerName.textContent = next?.label || "Keyingi namoz";
  nextPrayerTime.textContent = next?.time || "--:--";
  currentPrayer.textContent = current?.label
    ? `Hozirgi: ${current.label}`
    : `Manba: ${data.sourceLabel || "namoz-vaqti.uz"}`;
}

locationButton?.addEventListener("click", () => {
  if (!navigator.geolocation) {
    locationButton.textContent = "Joylashuv ishlamaydi";
    return;
  }

  locationButton.textContent = "Aniqlanmoqda...";

  navigator.geolocation.getCurrentPosition(
    () => {
      locationButton.textContent = "Joylashuv topildi";
    },
    () => {
      locationButton.textContent = "Ruxsat kerak";
    },
  );
});

regionSelect?.addEventListener("change", () => {
  sourceLink.href = pageUrl(regionSelect.value);
  if (!prayerModal.hidden) {
    loadPrayerTimes(regionSelect.value);
  }
});

prayerOpenButton?.addEventListener("click", () => {
  prayerModal.hidden = false;
  loadPrayerTimes(regionSelect?.value || "fargona-shahri");
});

qiblaOpenButton?.addEventListener("click", () => {
  qiblaModal.hidden = false;
});

closeQiblaModal?.addEventListener("click", () => {
  qiblaModal.hidden = true;
  window.removeEventListener("deviceorientation", handleDeviceOrientation);
});

qiblaModal?.addEventListener("click", (event) => {
  if (event.target === qiblaModal) {
    qiblaModal.hidden = true;
    window.removeEventListener("deviceorientation", handleDeviceOrientation);
  }
});

startQiblaButton?.addEventListener("click", startQiblaCompass);

masjidOpenButton?.addEventListener("click", () => {
  masjidHint.textContent = "Joylashuv aniqlanmoqda...";

  if (!navigator.geolocation) {
    masjidHint.textContent = "Google Maps ochilmoqda";
    window.open("https://www.google.com/maps/search/masjid+near+me", "_blank", "noopener,noreferrer");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const { latitude, longitude } = coords;
      const mapsUrl = `https://www.google.com/maps/search/masjid/@${latitude},${longitude},14z`;

      masjidHint.textContent = "Google Maps ochilmoqda";
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    },
    () => {
      masjidHint.textContent = "Ruxsat kerak";
      window.open("https://www.google.com/maps/search/masjid+near+me", "_blank", "noopener,noreferrer");
    },
    { enableHighAccuracy: true, timeout: 10000 },
  );
});

calendarOpenButton?.addEventListener("click", () => {
  calendarModal.hidden = false;
  renderCalendar();
});

closeCalendarModal?.addEventListener("click", () => {
  calendarModal.hidden = true;
});

calendarModal?.addEventListener("click", (event) => {
  if (event.target === calendarModal) {
    calendarModal.hidden = true;
  }
});

prevCalendarMonth?.addEventListener("click", () => {
  visibleCalendarDate = new Date(
    visibleCalendarDate.getFullYear(),
    visibleCalendarDate.getMonth() - 1,
    1,
  );
  renderCalendar();
});

nextCalendarMonth?.addEventListener("click", () => {
  visibleCalendarDate = new Date(
    visibleCalendarDate.getFullYear(),
    visibleCalendarDate.getMonth() + 1,
    1,
  );
  renderCalendar();
});

closePrayerModal?.addEventListener("click", () => {
  prayerModal.hidden = true;
});

prayerModal?.addEventListener("click", (event) => {
  if (event.target === prayerModal) {
    prayerModal.hidden = true;
  }
});

sourceLink.href = pageUrl(regionSelect?.value || "fargona-shahri");
updateDateTime();
setInterval(updateDateTime, 1000);
