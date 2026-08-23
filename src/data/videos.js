// Real uploads from youtube.com/@dtcybersl1 (channel: UCUPQZyBU8eZvppE1212hwuA)
export const VIDEOS = [
  {
    id: 'OEiwyITC5Kg',
    title: 'DT A/L Time Management App — Manage Your Study Time Like a Pro!',
    duration: '22:27',
    views: '61 views',
    age: '10 months ago',
    tag: 'latest',
  },
  {
    id: 'KOLFGAK1XPA',
    title: 'Telegram Hack Trick Sinhala',
    duration: '2:56',
    views: '12K views',
    age: '5 years ago',
    tag: 'popular',
  },
  {
    id: 'OgSA_lg0bjg',
    title: 'How To WhatsApp Deleted Message Show — Without App',
    duration: '4:05',
    views: '123 views',
    age: '1 year ago',
    tag: 'whatsapp',
  },
  {
    id: 'pEJZhtnPXkM',
    title: 'WhatsApp Profile Picture Download to Gallery Sinhala',
    duration: '1:59',
    views: '1.1K views',
    age: '5 years ago',
    tag: 'whatsapp',
  },
  {
    id: 'UohykaELNg8',
    title: 'Phone Lock Screen Add My Name Sinhala',
    duration: '1:56',
    views: '1.1K views',
    age: '5 years ago',
    tag: 'android',
  },
  {
    id: 'dGqr9uh-Xq0',
    title: 'Phone Call No Busy Sinhala',
    duration: '1:52',
    views: '758 views',
    age: '5 years ago',
    tag: 'android',
  },
  {
    id: 'rMQjvO2290k',
    title: 'APP NOT INSTALLED FIX FOR 2024 (2025)',
    duration: '5:05',
    views: '66 views',
    age: '1 year ago',
    tag: 'fixes',
  },
  {
    id: 'sVKnEvCmKiY',
    title: 'Save WhatsApp Status to Gallery in 2024!',
    duration: '4:15',
    views: '58 views',
    age: '2 years ago',
    tag: 'whatsapp',
  },
  {
    id: 'M2Vmyzyt4sU',
    title: 'Your Friends / Son / Daughter Phone History Show Trick Sinhala',
    duration: '0:41',
    views: '102 views',
    age: '5 years ago',
    tag: 'security',
  },
  {
    id: 'I6KmQ8D31Yk',
    title: 'Zoom Video Add Full Screen Sinhala',
    duration: '3:17',
    views: '90 views',
    age: '5 years ago',
    tag: 'fixes',
  },
  {
    id: 'NPrz6Nh3dZg',
    title: 'Google Voice Assistant Sinhala',
    duration: '2:02',
    views: '77 views',
    age: '5 years ago',
    tag: 'android',
  },
  {
    id: 'gSavrQcQU8M',
    title: 'Find Unknown Name & Details With Just a Picture | Sinhala Trick',
    duration: '3:14',
    views: '58 views',
    age: '5 years ago',
    tag: 'osint',
  },
  {
    id: 'I5TFY-mX-gI',
    title: 'Phone Flash Light Trick Sinhala',
    duration: '7:43',
    views: '60 views',
    age: '5 years ago',
    tag: 'android',
  },
]

export const FEATURED_VIDEO_ID = VIDEOS[0].id

export const thumbUrl = (id, quality = 'hqdefault') =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`

export const embedUrl = (id) => `https://www.youtube-nocookie.com/embed/${id}?rel=0`

export const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`
