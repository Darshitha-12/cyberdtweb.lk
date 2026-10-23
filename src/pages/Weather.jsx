import { useEffect, useRef, useState } from 'react'

const CITIES = [
  // බස්නාහිර පළාත
  { label: 'කොළඹ / Colombo', lat: 6.9271, lon: 79.8612 },
  { label: 'ගම්පහ / Gampaha', lat: 7.084, lon: 79.9997 },
  { label: 'නීරෝග්‍ය / Negombo', lat: 7.2083, lon: 79.8358 },
  { label: 'මොරටුව / Moratuwa', lat: 6.773, lon: 79.8816 },
  { label: 'පානදුර / Panadura', lat: 6.7132, lon: 79.9044 },
  { label: 'කළුතර / Kalutara', lat: 6.5854, lon: 79.9607 },
  { label: 'කොස්ගොඩ / Kosgoda', lat: 6.3379, lon: 80.0362 },
  { label: 'හොරනාව / Horana', lat: 6.7167, lon: 80.0625 },

  // මධ්‍යම පළාත
  { label: 'මහනුවර / Kandy', lat: 7.2906, lon: 80.6337 },
  { label: 'මාතලේ / Matale', lat: 7.4675, lon: 80.6234 },
  { label: 'නුවරඑළිය / Nuwara Eliya', lat: 6.9497, lon: 80.7891 },
  { label: 'හැටන් / Hatton', lat: 6.8916, lon: 80.5955 },
  { label: 'ගිනිගත්හේන / Ginigathhena', lat: 6.9833, lon: 80.4868 },
  { label: 'දුම්බර / Dambulla', lat: 7.86, lon: 80.651 },
  { label: 'සීගිරිය / Sigiriya', lat: 7.957, lon: 80.7603 },

  // දකුණු පළාත
  { label: 'ගාල්ල / Galle', lat: 6.0535, lon: 80.221 },
  { label: 'මාතර / Matara', lat: 5.9549, lon: 80.555 },
  { label: 'හම්බන්තොට / Hambantota', lat: 6.1429, lon: 81.1212 },
  { label: 'තංගල්ල / Tangalle', lat: 6.024, lon: 80.791 },
  { label: 'අම්බලන්ගොඩ / Ambalangoda', lat: 6.2359, lon: 80.0538 },
  { label: 'හික්කඩුව / Hikkaduwa', lat: 6.1395, lon: 80.1063 },
  { label: 'වලස්මුල්ල / Weligama', lat: 5.973, lon: 80.429 },
  { label: 'දෙනියාය / Deniyaya', lat: 6.3425, lon: 80.5597 },

  // සබරගමුව පළාත
  { label: 'රත්නපුර / Ratnapura', lat: 6.6828, lon: 80.3992 },
  { label: 'කෑගල්ල / Kegalle', lat: 7.2513, lon: 80.3464 },
  { label: 'අවිස්සාවේල්ල / Avissawella', lat: 6.9543, lon: 80.2046 },
  { label: 'ඇල්ල / Ella', lat: 6.8667, lon: 81.0466 },
  { label: 'බලංගොඩ / Balangoda', lat: 6.65, lon: 80.6875 },

  // වයඹ පළාත
  { label: 'කුරුණෑගල / Kurunegala', lat: 7.4863, lon: 80.3623 },
  { label: 'පුත්තලම / Puttalam', lat: 8.0362, lon: 79.8283 },
  { label: 'චිලාව / Chilaw', lat: 7.5759, lon: 79.7953 },
  { label: 'නාරම්මල / Narammala', lat: 7.431, lon: 80.2136 },
  { label: 'මහනුවර වයඹ / Wariyapola', lat: 7.623, lon: 80.2429 },

  // උතුරු මධ්‍යම පළාත
  { label: 'අනුරාධපුර / Anuradhapura', lat: 8.3114, lon: 80.4037 },
  { label: 'පොළොන්නරුව / Polonnaruwa', lat: 7.9403, lon: 81.0188 },
  { label: 'දඹුල්ල / Dambulla', lat: 7.86, lon: 80.651 },
  { label: 'හැබරණ / Habarana', lat: 8.0329, lon: 80.7514 },
  { label: 'ගිරිතලේ / Girithale', lat: 8.001, lon: 80.925 },
  { label: 'මිනිගේරිය / Minneriya', lat: 8.032, lon: 80.9045 },

  // නැගෙනහිර පළාත
  { label: 'ත්‍රිකුණාමලය / Trincomalee', lat: 8.5874, lon: 81.2152 },
  { label: 'මඩකලපුව / Batticaloa', lat: 7.731, lon: 81.6747 },
  { label: 'කල್ಮුණේ / Kalmunai', lat: 7.4167, lon: 81.8167 },
  { label: 'අම්පාර / Ampara', lat: 7.2975, lon: 81.682 },
  { label: 'සමන්තුරේ / Sammanthurai', lat: 7.3667, lon: 81.8 },
  { label: 'කන්තලේ / Kantale', lat: 8.358, lon: 81.006 },

  // උතුරු පළාත
  { label: 'යාපනය / Jaffna', lat: 9.6615, lon: 80.0255 },
  { label: 'කිලිනොච්චි / Kilinochchi', lat: 9.3803, lon: 80.377 },
  { label: 'මුලතිව් / Mullaitivu', lat: 9.2671, lon: 80.8142 },
  { label: 'වව්නියාව / Vavuniya', lat: 8.7514, lon: 80.4971 },
  { label: 'මාන්නාරම / Mannar', lat: 8.977, lon: 79.913 },
  { label: 'පොන්තිපෙට්ට / Point Pedro', lat: 9.8167, lon: 80.2333 },
  { label: 'චාවකච්චේරි / Chavakachcheri', lat: 9.6667, lon: 80.15 },

  // උව පළාත
  { label: 'බදුල්ල / Badulla', lat: 6.9894, lon: 81.055 },
  { label: 'බණ්ඩාරවෙල / Bandarawela', lat: 6.8259, lon: 80.9982 },
  { label: 'මොනරාගල / Monaragala', lat: 6.8714, lon: 81.3487 },
  { label: 'හපුතලේ / Haputale', lat: 6.7667, lon: 80.9667 },
  { label: 'වෙල්ලවාය / Wellawaya', lat: 6.7333, lon: 81.1 },
  { label: 'බිඟුරූ / Bibile', lat: 7.1667, lon: 81.2167 },
]

const WEATHER_MAP = [
  { codes: [0], title: 'නිසි අහස', icon: '☀️' },
  { codes: [1, 2], title: 'අර්ධ වලාකුළු සහිත', icon: '⛅' },
  { codes: [3], title: 'බොහෝ වලාකුළු සහිත', icon: '☁️' },
  { codes: [45, 48], title: 'මීදුම සහිත', icon: '🌫️' },
  { codes: [51, 53, 55], title: 'සැහැල්ලු තෙත් බිඳු සහිත', icon: '🌦️' },
  { codes: [56, 57], title: 'සැහැල්ලු ශීත ස්නීහනය සහිත', icon: '🌧️' },
  { codes: [61, 63], title: 'මධ්‍යම තරමේ වැසි', icon: '🌧️' },
  { codes: [65], title: 'දැඩි වැසි', icon: '🌧️' },
  { codes: [66, 67], title: 'ශීත වැසි', icon: '🌧️' },
  { codes: [71, 73], title: 'මධ්‍යම තරමේ හිම වැසි', icon: '🌨️' },
  { codes: [75], title: 'දැඩි හිම වැසි', icon: '❄️' },
  { codes: [77], title: 'හිම කැටිකුරු', icon: '🌨️' },
  { codes: [80, 81], title: 'තහබු වැසි වර්ෂාව', icon: '⛈️' },
  { codes: [82], title: 'ඉතා දැඩි තහබු වැසි', icon: '⛈️' },
  { codes: [85, 86], title: 'තහබු හිම වැසි', icon: '🌨️' },
  { codes: [95], title: 'අකුණු සහිත කුණාටු', icon: '⛈️' },
  { codes: [96, 99], title: 'අකුණු සහිත දැඩි ගොරෝසු වැසි', icon: '⛈️' },
]

const BULLETINS = [
  {
    id: 1,
    type: 'morning',
    issuedBy: 'ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුව',
    time: 'පාන්දර 06:00',
    title: 'ප්‍රභාත් කාලගුණ විස්තරය',
    content:
      'අද දිනයේ බස්නාහිර, දකුණු සහ සබරගමුව පළාත්වල සමහර ප්‍රදේශවල තහබු වැසි ලැබිය හැකිය. අනෙක් ප්‍රදේශවල ප්‍රධාන වශයෙන් වලාකුළු සහිත කාලගුණයක් පවතිනු ඇත. සවස් කාලය වන විට තහබු වැසි තීව්‍රත්වය වැඩි විය හැකිය.',
  },
  {
    id: 2,
    type: 'general',
    issuedBy: 'ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුව',
    time: 'පාන්දර 09:30',
    title: 'අන්තර්-මෝසම් තත්ත්වය පිළිබඳ යාවත්කාලීනය',
    content:
      'අද සහ හෙට දිනවල දී දකුණ, නිරිත හා බස්නාහිර දිශාවලින් තරමක් තෙත් වායු ස්‍රෝතයක් බලපෑමට ලක්වීම හේතුවෙන් බස්නාහිර, දකුණු, සබරගමුව හා මධ්‍යම කඳුකරයේ සමහර ප්‍රදේශවලට තරමක් සිට දැඩි තරමේ වැසි සහ ප්‍රබල සුළං අපේක්ෂා කෙරේ.',
  },
  {
    id: 3,
    type: 'evening',
    issuedBy: 'ක්‍රියාකාරී කාලගුණ කාර්යාලය',
    time: 'සවස 03:00',
    title: 'සන්ධ්‍යා කාලගුණ යාවත්කාලීනය',
    content:
      'ගිනිගත්හේන, හපුතලේ, නුවරඑළිය වැනි කඳුකර ප්‍රදේශවල පමණක් නොව පහළ දී ඇති ප්‍රදේශවලද තහබු වැසි සහ අකුණු සහිත කුණාටු සිදුවීමට ඉඩ ඇත. මාර්ග භාවිතා කරන නායකයින් පමණින් හා පරිස්සමින් කටයුතු කරන ලෙස දැනුම් දෙනු ලැබේ.',
  },
]

const PROVINCE_SUMMARY = [
  {
    province: 'බස්නාහිර පළාත (Western)',
    icon: '🌧️',
    forecast: 'සමහර ප්‍රදේශවල තහබු වැසි. කොළඹ, ගම්පහ, කළුතර යනාදී ප්‍රදේශවල සවස් වරුවේ වැසි තීව්‍ර විය හැකිය.',
    tempRange: '25 °C - 31 °C',
  },
  {
    province: 'මධ්‍යම පළාත (Central)',
    icon: '🌦️',
    forecast: 'කඳුකර ප්‍රදේශවල දහවල් වරුවේ තහබු වැසි සහ අකුණු. නුවරඑළිය වැනි උස් ප්‍රදේශවල වායු පීඩනය පහත වැටිය හැකිය.',
    tempRange: '16 °C - 26 °C',
  },
  {
    province: 'දකුණු පළාත (Southern)',
    icon: '🌊',
    forecast: 'ගාල්ල, මාතර, හම්බන්තොට ප්‍රදේශවලට තරමක් සිට දැඩි තරමේ වැසි. මුහුදු භාවිතයෙදී තරඟකාරී රළ සහ ප්‍රබල සුළං ගැන අවධානයෙන් සිටින්න.',
    tempRange: '25 °C - 30 °C',
  },
  {
    province: 'සබරගමුව පළාත (Sabaragamuwa)',
    icon: '⛈️',
    forecast: 'රත්නපුර, කෑගල්ල දිස්ත්‍රික්කවල තහබු වැසි සහ අකුණු සහිත කුණාටු. නායයෑම් ඇති ප්‍රදේශවල වැඩි අවධානයක් දැක්විය යුතුය.',
    tempRange: '22 °C - 29 °C',
  },
  {
    province: 'වයඹ පළාත (North Western)',
    icon: '⛅',
    forecast: 'ප්‍රධාන වශයෙන් අර්ධ වලාකුළු සහිත කාලගුණයක්. දිවා කාලයේදී තනි තනි තහබු වැසි ලැබීමට ඉඩ ඇත.',
    tempRange: '25 °C - 31 °C',
  },
  {
    province: 'නැගෙනහිර පළාත (Eastern)',
    icon: '🌤️',
    forecast: 'බොහෝ දුරට නිසි හෝ අර්ධ වලාකුළු සහිත කාලගුණයක්. සවස් යාමයේදී ත්‍රිකුණාමලය, මඩකලපුව ප්‍රදේශවල ස්වල්ප තහබු වැසි විය හැකිය.',
    tempRange: '26 °C - 32 °C',
  },
  {
    province: 'උතුරු පළාත (Northern)',
    icon: '🌤️',
    forecast: 'සාමාන්‍යයෙන් ශුෂ්ක හෝ අර්ධ වලාකුළු සහිත කාලගුණයක්. මධ්‍යාහ්න කාලයේදී ව්‍යවහාරික උෂ්ණත්වය මඳක් ඉහළ යා හැකිය.',
    tempRange: '27 °C - 33 °C',
  },
  {
    province: 'උතුරු මධ්‍යම හා උව පළාත (NCP & Uva)',
    icon: '🌦️',
    forecast: 'අනුරාධපුර, පොළොන්නරුව, බදුල්ල, මොනරාගල ප්‍රදේශවල සවස් කාලයේ තහබු වැසි සහ අකුණු සහිත කුණාටු සිදුවිය හැකිය.',
    tempRange: '20 °C - 30 °C',
  },
]

function getWeatherInfo(code) {
  const match = WEATHER_MAP.find((item) => item.codes.includes(code))
  return match || { title: 'කාලගුණ තත්ත්වය', icon: '🌤️' }
}

export default function Weather() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [countdown, setCountdown] = useState(60)
  const [lastUpdate, setLastUpdate] = useState('--:--:--')
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState({ title: '', body: '' })
  const [isBulletinOpen, setIsBulletinOpen] = useState(true)
  const [warningActive, setWarningActive] = useState(false)
  const [warningMsg, setWarningMsg] = useState('')

  const intervalRef = useRef(null)
  const countdownRef = useRef(null)

  const city = CITIES[selectedIndex]

  const fetchWeather = async () => {
    try {
      setLoading(true)
      const url = new URL('https://api.open-meteo.com/v1/forecast')
      url.searchParams.set('latitude', city.lat.toString())
      url.searchParams.set('longitude', city.lon.toString())
      url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation')
      url.searchParams.set('hourly', 'precipitation_probability,precipitation')
      url.searchParams.set('timezone', 'Asia/Colombo')

      const res = await fetch(url.toString())
      const json = await res.json()

      const current = json.current
      const hourly = json.hourly

      const info = getWeatherInfo(current.weather_code)
      const nextProb = hourly?.precipitation_probability?.[0] ?? 0
      const nextPrecip = hourly?.precipitation?.[0] ?? current.precipitation ?? 0

      setData({
        temp: Math.round(current.temperature_2m),
        humidity: current.relative_humidity_2m,
        wind: Math.round(current.wind_speed_10m),
        code: current.weather_code,
        precipProb: Math.round(nextProb),
        precipAmount: Number(nextPrecip).toFixed(1),
        info,
      })

      const now = new Date()
      setLastUpdate(now.toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))

      const heavyRainCodes = [65, 80, 81, 82, 95, 96, 99]
      const isHeavyRain = heavyRainCodes.includes(current.weather_code) || nextProb >= 70
      const isStrongWind = Math.round(current.wind_speed_10m) >= 40
      const isThunder = [95, 96, 99].includes(current.weather_code)

      if (isHeavyRain || isStrongWind || isThunder) {
        setWarningActive(true)
        if (isHeavyRain && isStrongWind && isThunder) {
          setWarningMsg('කාලගුණ විද්‍යා දෙපාර්තමේන්තු අනතුරු ඇඟවීමයි – දැඩි වැසි, අකුණු සහිත කුණාටු හා ප්‍රබල සුළං අපේක්ෂා කෙරේ.')
        } else if (isHeavyRain && isThunder) {
          setWarningMsg('කාලගුණ විද්‍යා දෙපාර්තමේන්තු අනතුරු ඇඟවීමයි – අකුණු සහිත දැඩි වැසි තත්ත්වයක් අපේක්ෂා කෙරේ.')
        } else if (isStrongWind) {
          setWarningMsg('කාලගුණ විද්‍යා දෙපාර්තමේන්තු අනතුරු ඇඟවීමයි – සමහර ප්‍රදේශවල ප්‍රබල සුළං ඇතිවිය හැකිය.')
        } else {
          setWarningMsg('කාලගුණ විද්‍යා දෙපාර්තමේන්තු අනතුරු ඇඟවීමයි – තහබු වැසි හේතුවෙන් ගංවතුර හා ජල ගැලීම් ඇතිවිය හැකිය.')
        }
      } else {
        setWarningActive(false)
        setWarningMsg('')
      }

      if (isHeavyRain || isStrongWind) {
        if (isHeavyRain && isStrongWind) {
          setAlertText({
            title: 'අවධානය අවශ්‍යයි – දැඩි වැසි සහ ප්‍රබල සුළං අපේක්ෂා කෙරේ',
            body: 'කාලගුණ විද්‍යා දෙපාර්තමේන්තුවේ නිවේදන හා සමාන තත්ත්වයක් දැකිය හැකිය. ගංවතුර හා නායයෑම් ඇති ප්‍රදේශවල වාසය කරන්නන් ඉතා සැලකිලිමත් විය යුතුය. හැකිනම් ආරක්ෂිත ස්ථානයකට යොමු වන්න.',
          })
        } else if (isHeavyRain) {
          setAlertText({
            title: 'දැඩි වැසි නිවේදනයක් අපේක්ෂා කෙරේ',
            body: 'කෙටි කාලයකදී දැඩි වර්ෂාවක් විය හැකි අතර, මාර්ගවල ජල ගැලීම් හා ගංවතුර ඇතිවිය හැකිය. වාහන පදවන විට හා ගමනාගමනයේදී පමණින් හා පරිස්සමින් කටයුතු කරන්න.',
          })
        } else {
          setAlertText({
            title: 'ප්‍රබල සුළං නිවේදනයක් අපේක්ෂා කෙරේ',
            body: 'වියළි ගස් අතු, පරිස්සම් නොවූ ව්‍යුහයන් හා පිටත තැබූ වස්තු සුළඟට ගෙනයෑමේ අවදානම වැඩියි. නිවාස ආසන්නයේ දොරවල්, ජනේල හා සැරසිලි ආරක්ෂිතව තබා ගැනීමට අවධානය යොමු කරන්න.',
          })
        }
        setShowAlert(true)
      } else {
        setShowAlert(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setCountdown(60)
    }
  }

  useEffect(() => {
    fetchWeather()
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)

    intervalRef.current = setInterval(fetchWeather, 60000)
    countdownRef.current = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 60 : c - 1))
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  const progress = (countdown / 60) * 100
  const bulletinTime = new Date().toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="pt-32 md:pt-40">
      <section className="relative mx-auto max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">ශ්‍රී ලංකාව සඳහා සජීවී කාලගුණය</p>
        <h1 className="page-title mt-4">ශ්‍රී ලංකා සජීවී කාලගුණ වාර්තාව</h1>
        <p className="page-lede mt-5">
          නිල කාලගුණ විද්‍යා දෙපාර්තමේන්තුවට සමානව නිර්මාණය කර ඇති දිනපතා කාලගුණ නිවේදන, අනතුරු ඇඟවීම් සහ ප්‍රදේශ අනුව සාරාංශයන් සහිත සජීවී කාලගුණ පද්ධතියක්.
        </p>
      </section>

      {warningActive && (
        <section className="relative mx-auto mt-6 max-w-6xl px-5 lg:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/80 bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 px-4 py-3 text-center shadow-[0_40px_90px_-70px_rgba(251,191,36,0.9)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            <div className="relative flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300"></span>
                </span>
                කාලගුණ විද්‍යා දෙපාර්තමේන්තු අනතුරු ඇඟවීමයි
              </span>
              <p className="text-amber-50/90">{warningMsg}</p>
            </div>
          </div>
        </section>
      )}

      {showAlert && (
        <section className="relative mx-auto mt-6 max-w-6xl px-5 lg:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-red-500/70 bg-gradient-to-b from-red-500/20 to-red-950/40 p-6 text-center shadow-[0_60px_120px_-80px_rgba(239,68,68,0.9)] animate-pulse">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/80 to-transparent" />
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-lg font-semibold text-white sm:text-xl">
                <span>⚠️</span>
                <span>අනතුරු ඇඟවීම් / කාලගුණ නිවේදන</span>
              </div>
              <div className="max-w-3xl space-y-2 text-sm leading-relaxed text-red-100 sm:text-base">
                <p className="font-semibold text-white">{alertText.title}</p>
                <p>{alertText.body}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative mx-auto mt-10 max-w-6xl px-5 lg:px-6">
        <div className="cyber-card relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_0%,rgba(34,211,238,0.16),transparent_70%)]" />
          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="eyebrow">
                  <span>📍 ස්ථානය තෝරන්න</span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {city.label.split(' / ')[0]}
                  </h2>
                  <div className="relative">
                    <select
                      value={selectedIndex}
                      onChange={(e) => setSelectedIndex(Number(e.target.value))}
                      className="max-w-[280px] appearance-none rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2 pr-10 text-sm text-slate-200 outline-none transition-colors focus:border-cyan-400/60 sm:max-w-[340px]"
                    >
                      {CITIES.map((c, idx) => (
                        <option key={c.label} value={idx}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">▾</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 text-sm text-slate-400 lg:items-end">
                <span>මීළඟ යාවත්කාලීනය දක්වා ඉතිරි කාලය</span>
                <div className="flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-1.5 text-white">
                  <span>🔄</span>
                  <span>{countdown.toString().padStart(2, '0')} තත්පර</span>
                </div>
                <span>අවසන් යාවත්කාලීනය: {lastUpdate}</span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="flex items-end gap-4">
                <span className="font-display text-[8rem] font-semibold leading-none tracking-[-0.08em] text-white sm:text-[10rem] lg:text-[14rem]">
                  {loading ? '--' : data?.temp ?? '--'}
                </span>
                <span className="mb-6 text-5xl text-slate-500 sm:text-6xl lg:mb-10 lg:text-8xl">°C</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative grid h-24 w-24 place-items-center rounded-full bg-cyan-400/10 sm:h-32 sm:w-32">
                  <div className="absolute inset-4 rounded-full border border-cyan-400/40" />
                  <span className="text-5xl sm:text-6xl">{loading ? '⏳' : data?.info.icon}</span>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                    {loading ? 'දත්ත ලබාගනිමින්...' : data?.info.title}
                  </p>
                  <p className="text-slate-400">සජීවී වායුගෝලීය දත්ත | Open-Meteo</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'ආර්ද්‍රතාවය', value: loading ? '--' : data?.humidity, unit: '%', icon: '💧', note: 'සාපේක්ෂ ආර්ද්‍රතාවය' },
                { label: 'සුළඟ වේගය', value: loading ? '--' : data?.wind, unit: 'km/h', icon: '💨', note: '10m උන්නතානයෙන් මිනුම්' },
                { label: 'වර්ෂා සම්භාවිතාව', value: loading ? '--' : data?.precipProb, unit: '%', icon: '🌧️', note: 'ලැබෙන පැය තුළ වර්ෂා අවස්ථාව' },
                { label: 'වර්ෂා පරිමාව (අනුමානය)', value: loading ? '--' : data?.precipAmount, unit: 'mm', icon: '💦', note: 'ඊළඟ පැය තුළ අනාවැකිගත වර්ෂා' },
              ].map((card) => (
                <article key={card.label} className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{card.label}</span>
                    <span className="text-lg">{card.icon}</span>
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-display text-4xl font-semibold text-white">{card.value}</span>
                    <span className="mb-1 text-xl text-slate-500">{card.unit}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{card.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto mt-10 max-w-6xl px-5 lg:px-6">
        <div className="cyber-card relative overflow-hidden">
          <button
            onClick={() => setIsBulletinOpen((v) => !v)}
            className="flex w-full flex-col items-start gap-3 p-6 text-left sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="relative grid h-11 w-11 place-items-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                <span className="text-lg">📰</span>
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.12)]" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white sm:text-xl">නිල කාලගුණ නිවේදන (Official Bulletins)</p>
                <p className="text-sm text-slate-400">ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුව / ක්‍රියාකාරී කාලගුණ කාර්යාලය</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span>අවසන් යාවත්කාලීනය: {bulletinTime}</span>
              <span className={`transition-transform duration-300 ${isBulletinOpen ? 'rotate-180' : ''}`}>▾</span>
            </div>
          </button>
          {isBulletinOpen && (
            <div className="grid gap-4 border-t border-slate-800/80 p-6 sm:grid-cols-2 lg:grid-cols-3 sm:p-8">
              {BULLETINS.map((bulletin) => (
                <article key={bulletin.id} className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                        {bulletin.type === 'morning' ? 'ප්‍රභාත් නිවේදනය' : bulletin.type === 'evening' ? 'සන්ධ්‍යා නිවේදනය' : 'සාමාන්‍ය යාවත්කාලීනය'}
                      </p>
                      <h3 className="mt-2 font-display text-base font-semibold text-white">{bulletin.title}</h3>
                    </div>
                    <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">{bulletin.time}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{bulletin.content}</p>
                  <p className="mt-4 text-xs text-slate-500">නිකුත් කළේ: {bulletin.issuedBy}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative mx-auto mt-10 max-w-6xl px-5 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">දිස්ත්‍රික්ක හා පළාත් අනුව සාරාංශය</p>
            <h2 className="section-title mt-4">දිනපතා කාලගුණ සාරාංශය</h2>
            <p className="mt-3 text-sm text-slate-400">ශ්‍රී ලංකාවේ ප්‍රධාන පළාත් අට අනුව අපේක්ෂිත කාලගුණ රටාව</p>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">අනුකරණය කරන ලද නිල සාරාංශය</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROVINCE_SUMMARY.map((province) => (
            <article key={province.province} className="cyber-card relative overflow-hidden p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{province.province}</p>
                  <p className="mt-1 text-xs text-slate-500">උෂ්ණත්ව පරාසය: {province.tempRange}</p>
                </div>
                <span className="text-xl">{province.icon}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{province.forecast}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-10 max-w-6xl px-5 pb-4 lg:px-6">
        <p className="mt-6 text-center text-sm text-slate-500">
          මෙම පිටුව ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුවේ (Department of Meteorology, Sri Lanka) ප්‍රසිද්ධ නිවේදන ආකෘතිය මත අනුකරණය කර නිර්මාණය කර ඇත. සැබෑ ගුරුත්‍රක අවස්ථාවලදී නිශ්චිත තොරතුරු සඳහා නිල වෙබ් අඩවිය හෝ නිල ප්‍රකාශයන් අනිවාර්යයෙන්ම සලකා බලන්න. | දත්ත මූලාශ්‍රය: Open-Meteo
        </p>
      </section>
    </div>
  )
}
