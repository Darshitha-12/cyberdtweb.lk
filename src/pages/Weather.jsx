import { useEffect, useRef, useState } from 'react'

const CITIES = [
  { label: 'කොළඹ', lat: 6.9271, lon: 79.8612 },
  { label: 'මහනුවර / Kandy', lat: 7.2906, lon: 80.6337 },
  { label: 'ගාල්ල / Galle', lat: 6.0535, lon: 80.2210 },
  { label: 'යාපනය / Jaffna', lat: 9.6615, lon: 80.0255 },
  { label: 'බදුල්ල / Badulla', lat: 6.9894, lon: 81.0550 },
  { label: 'ත්‍රිකුණාමලය / Trincomalee', lat: 8.5874, lon: 81.2152 },
  { label: 'හම්බන්තොට / Hambantota', lat: 6.1429, lon: 81.1212 },
  { label: 'අනුරාධපුර / Anuradhapura', lat: 7.8731, lon: 80.7718 },
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

  return (
    <div className="pt-32 md:pt-40">
      <section className="relative mx-auto max-w-6xl px-5 lg:px-6">
        <p className="eyebrow">ශ්‍රී ලංකාව සඳහා සජීවී කාලගුණය</p>
        <h1 className="page-title mt-4">ශ්‍රී ලංකා සජීවී කාලගුණ වාර්තාව</h1>
        <p className="page-lede mt-5">
          Open-Meteo API මඟින් ලබාගන්නා සත්‍ය කාලීන කාලගුණ දත්ත. නගරය තෝරා සෑම තත්පර 60කට වරක් ස්වයංක්‍රීයව යාවත්කාලීන වේ.
        </p>
      </section>

      {showAlert && (
        <section className="relative mx-auto mt-8 max-w-6xl px-5 lg:px-6">
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
                      className="appearance-none rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2 pr-10 text-sm text-slate-200 outline-none transition-colors focus:border-cyan-400/60"
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
                  <p className="text-slate-400">සජීවී වායුගෝලීය දත්ත | Open-Meteo API</p>
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

        <p className="mt-6 text-center text-sm text-slate-500">
          ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුවේ නිල නිවේදන මත පදනම්ව නිර්මාණය කර ඇති අනුකරණ පද්ධතියකි. නිශ්චිත තොරතුරු සඳහා නිල ප්‍රකාශයන් සැමවිටම පරීක්ෂා කරන්න. | දත්ත මූලාශ්‍රය: Open-Meteo.com
        </p>
      </section>
    </div>
  )
}
