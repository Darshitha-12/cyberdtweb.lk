const ENC_EMAIL = 'ZGFyc2hpdGhpa3NoYW5hMUBnbWFpbC5jb20='
const ENC_WA = 'OTQ3NzY5NTQ1Mjk='

export const EMAIL = atob(ENC_EMAIL)
export const WHATSAPP_URL = `https://wa.me/${atob(ENC_WA)}`
export const YOUTUBE_URL = 'https://www.youtube.com/@dtcybersl1'
export const YOUTUBE_SUBSCRIBE_URL = 'https://www.youtube.com/@dtcybersl1?sub_confirmation=1'
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

export const MASKED_EMAIL = 'da•••••••••1@gmail.com'
export const MASKED_PHONE = '+94 •• ••• ••29'

export const mailtoHref = (subject = '', body = '') =>
  `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}` : ''}`
