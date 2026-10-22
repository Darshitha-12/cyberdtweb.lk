const ENC_EMAIL = 'ZGFyc2hpdGhhdGhpa3NoYW5hOUBnbWFpbC5jb20='
const ENC_WA = 'OTQ3NzY5NTQ1Mjk='

export const EMAIL = atob(ENC_EMAIL)
export const PHONE = `+${atob(ENC_WA)}`
export const PHONE_DISPLAY = PHONE.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
export const WHATSAPP_URL = `https://wa.me/${atob(ENC_WA)}`
export const YOUTUBE_URL = 'https://www.youtube.com/@dtcybersl1'
export const YOUTUBE_SUBSCRIBE_URL = 'https://www.youtube.com/@dtcybersl1?sub_confirmation=1'
export const FACEBOOK_URL = 'https://www.facebook.com/darshitha.thikshana/'
export const LINKEDIN_URL =
  'https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact_info%3BgZE%2BTcd%2BSwympeStWUjluQ%3D%3D'
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

export const MASKED_EMAIL = 'da•••••••••9@gmail.com'
export const MASKED_PHONE = '+94 •• ••• ••29'

export const mailtoHref = (subject = '', body = '') =>
  `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}` : ''}`
