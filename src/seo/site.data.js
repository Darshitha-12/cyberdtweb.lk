/**
 * Single source of truth for every SEO-facing value on the site.
 *
 * Used by:
 *  - vite-plugin-seo-pages.mjs  -> generates the static, crawlable HTML for each route
 *  - src/App.jsx                 -> per-route document titles + pushState routing
 *  - src/components/Navbar.jsx   -> crawlable <a href> links between routes
 *
 * When the custom domain goes live, change SITE_URL here only and rebuild.
 */

export const SITE_URL = 'https://cyberdt.pages.dev'

export const BRAND = 'CYBER DT'
export const PERSON = 'Darshitha Theekshana'
export const PERSON_ALIASES = ['CYBER DT', 'Cyber DT', 'CyberDT', 'DT Cyber']
export const ROLE = 'White Hat Ethical Hacker & Cyber Security Specialist'
export const LOCATION = 'Sri Lanka'

export const YOUTUBE_URL = 'https://www.youtube.com/@dtcybersl1'
export const YOUTUBE_SUBSCRIBE_URL = 'https://www.youtube.com/@dtcybersl1?sub_confirmation=1'
export const GITHUB_URL = 'https://github.com/Darshitha-12'
export const FACEBOOK_URL = 'https://www.facebook.com/darshitha.thikshana/'
export const LINKEDIN_URL =
  'https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact_info%3BgZE%2BTcd%2BSwympeStWUjluQ%3D%3D'

/** Every public profile that should point back to this site. */
export const SOCIAL_LINKS = [
  { label: 'YouTube', href: YOUTUBE_URL },
  { label: 'Facebook', href: FACEBOOK_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'GitHub', href: GITHUB_URL },
]

export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const SERVICE_ID = `${SITE_URL}/#service`

/** Route order must match the SPA page order. */
export const ROUTES = [
  {
    key: 'home',
    slug: '',
    navLabel: 'Home',
    title: `${BRAND} | ${PERSON} — Ethical Hacker Sri Lanka`,
    description:
      'CYBER DT — official website of Darshitha Theekshana, White Hat Ethical Hacker and Cyber Security Specialist in Sri Lanka. Ethical hacking, penetration testing, mobile diagnostics, malware removal and PC system hardening.',
    keywords:
      'CYBER DT, cyber dt, CyberDT, Darshitha Theekshana, cyber dt sri lanka, ethical hacker Sri Lanka, white hat hacker Sri Lanka, cyber security specialist Sri Lanka, penetration testing Sri Lanka, mobile diagnostics, malware removal, PC system hardening',
    h1: 'CYBER DT — Ethical Hacker & Cyber Security Specialist in Sri Lanka',
    lede:
      'CYBER DT is the personal brand of Darshitha Theekshana, a white hat ethical hacker and cyber security specialist based in Sri Lanka. The mission is simple: find every weakness in a system before somebody malicious does.',
    sections: [
      {
        h2: 'What CYBER DT does',
        paragraphs: [
          'CYBER DT provides authorized offensive security and defensive hardening work for individuals, small businesses and engineering teams. Every engagement is scoped in writing, performed only against systems the client owns or has explicit permission to test, and delivered with a clear remediation report.',
        ],
        list: [
          'Penetration testing and vulnerability assessment on web apps, networks and endpoints',
          'Malware analysis, removal and post-infection forensic cleanup',
          'Windows and Linux system hardening to CIS-style baseline standards',
          'Mobile OS security for Android and iOS — diagnostics, privacy lockdown and malware removal',
          'One-on-one security consultation for individuals and small businesses',
        ],
      },
      {
        h2: 'Why the name CYBER DT',
        paragraphs: [
          'CYBER DT is the short, searchable identity used across the website, the YouTube channel and the GitHub profile. Searching for "cyber dt" should always land on the official source — this page — so every profile points back here with the same spelling, the same role and the same services.',
        ],
      },
    ],
  },
  {
    key: 'about',
    slug: 'about',
    navLabel: 'About Me',
    title: `About ${BRAND} — ${PERSON}, White Hat Ethical Hacker | ${LOCATION}`,
    description:
      'Meet CYBER DT (Darshitha Theekshana) — a white hat ethical hacker and cyber security specialist in Sri Lanka. Skills in penetration testing, mobile OS security, Windows and Linux hardening, malware analysis and digital forensics.',
    keywords:
      'About CYBER DT, about cyber dt, Darshitha Theekshana bio, ethical hacker profile Sri Lanka, white hat hacker Sri Lanka, cyber security specialist Sri Lanka, malware analysis digital forensics, system hardening expert',
    h1: 'About CYBER DT — Darshitha Theekshana, White Hat Ethical Hacker in Sri Lanka',
    lede:
      'I am Darshitha Theekshana, operating as CYBER DT. I am a white hat ethical hacker and cyber security specialist based in Sri Lanka, working across penetration testing, malware analysis, mobile device recovery and system hardening.',
    sections: [
      {
        h2: 'Operator profile',
        paragraphs: [
          'Over the years I have worked across the full tech ecosystem — running authorized penetration tests, dissecting malware, rescuing infected smartphones, and hardening desktops and servers so they stay secure under real-world pressure. I do not just fix symptoms; I trace root causes and rebuild defences that last.',
          'Beyond client work I share what I know on my YouTube channel @dtcybersl1 — tutorials, tool breakdowns and practical security tips for everyday users. Every system I touch follows one rule: stay legal, stay ethical, stay protected.',
        ],
      },
      {
        h2: 'Core expertise',
        paragraphs: ['Three pillars make up the CYBER DT practice.'],
        list: [
          'White hat penetration testing — authorized attack simulations, vulnerability assessment and remediation reporting',
          'Mobile OS security (Android / iOS) — diagnostics, spyware and stalkerware removal, OS hardening and app auditing',
          'Desktop and server management — Windows and Linux hardening, firewall and intrusion prevention setup, backup and recovery planning',
        ],
      },
      {
        h2: 'Capability matrix',
        paragraphs: [
          'Ethical hacking and penetration testing sit at the core of the work, supported by strong mobile OS security, deep desktop and server hardening experience and hands-on malware analysis and digital forensics.',
        ],
        list: [
          'Ethical hacking and penetration testing',
          'Mobile OS security — Android and iOS',
          'Desktop and server hardening',
          'Malware analysis and digital forensics',
        ],
      },
    ],
  },
  {
    key: 'services',
    slug: 'services',
    navLabel: 'Services',
    title: `Cyber Security Services ${LOCATION} | ${BRAND} — Penetration Testing & Malware Removal`,
    description:
      'CYBER DT cyber security services in Sri Lanka: penetration testing and vulnerability assessment, malware analysis and removal, Windows and Linux system hardening, and one-on-one security consultation. Authorized, documented, NDA-friendly.',
    keywords:
      'cyber security services Sri Lanka, CYBER DT services, penetration testing services, vulnerability assessment, malware removal service, virus removal Sri Lanka, system hardening service, security consultation Sri Lanka, ethical hacking services',
    h1: 'Cyber Security Services in Sri Lanka — CYBER DT',
    lede:
      'Every engagement is scoped, authorized and documented. Pick a single module or combine them into a full-stack security package for your digital ecosystem.',
    sections: [
      {
        h2: 'Service modules',
        paragraphs: ['Four deployable modules cover the most common security needs.'],
        list: [
          'Penetration testing and vulnerability assessment — simulated real-world attacks on your apps, networks and devices, executed legally and ethically, with vulnerability scanning, CVSS scoring and a detailed remediation report.',
          'Malware analysis and removal — viruses, trojans, spyware, rootkits and stalkerware dissected and removed, followed by post-infection forensics and cleanup so the same strain never comes back.',
          'System hardening — desktops, laptops and servers locked down to professional baseline standards: minimal attack surface, hardened Windows and Linux configuration, firewall and intrusion prevention setup, secure backup and recovery.',
          'Custom security consultation — one-on-one guidance for individuals and small businesses: security audits, staff awareness coaching and a tailored defence roadmap.',
        ],
      },
      {
        h2: 'Engagement protocol',
        paragraphs: ['How a CYBER DT engagement runs from the first message to the final re-test.'],
        list: [
          'Recon and scope — define targets, rules of engagement and success criteria.',
          'Analyze — deep scanning, enumeration and manual testing of the environment.',
          'Report and fix — clear findings, prioritized fixes and hands-on remediation.',
          'Verify and monitor — re-testing to confirm closure, plus optional ongoing monitoring.',
        ],
      },
    ],
  },
  {
    key: 'youtube',
    slug: 'youtube',
    navLabel: 'YouTube Channel',
    title: `${BRAND} YouTube Channel (@dtcybersl1) — Ethical Hacking Tutorials & Security Guides`,
    description:
      'Watch the CYBER DT YouTube channel @dtcybersl1 — ethical hacking tutorials, cybersecurity breakdowns, Android and iOS device fixes, malware removal and system hardening guides from Sri Lanka.',
    keywords:
      'CYBER DT youtube, @dtcybersl1, dt cyber sri lanka, cyber dt channel, ethical hacking tutorials, cybersecurity videos sinhala, malware removal tutorial, mobile device fix tutorial, system hardening video, hacking tutorials sri lanka',
    h1: 'CYBER DT YouTube Channel — @dtcybersl1',
    lede:
      'Real uploads from the CYBER DT channel — ethical hacking labs, WhatsApp and Android tricks, security breakdowns and device rescue sessions, published weekly from Sri Lanka.',
    sections: [
      {
        h2: 'What the channel publishes',
        paragraphs: ['Three content pillars run through the CYBER DT channel.'],
        list: [
          'Hacking tutorials — step-by-step ethical hacking walkthroughs, from recon to reporting, always legal and authorized.',
          'Security tips — practical defenses for everyday users: passwords, two-factor authentication, phishing awareness and privacy lockdowns.',
          'Device fixes — Android and iOS rescue missions: malware cleanup, speed recovery and operating system optimization on real devices.',
        ],
      },
      {
        h2: 'Why watch CYBER DT',
        paragraphs: [
          'The channel is the practical companion to the website. Everything demonstrated in a video is the same work that is done for clients: legal, authorized, explained in a way anyone can follow. The channel name and the website use the same CYBER DT brand so the two reinforce each other.',
        ],
      },
    ],
  },
  {
    key: 'contact',
    slug: 'contact',
    navLabel: 'Contact',
    title: `Contact ${BRAND} — Ethical Hacker ${LOCATION} | Secure Consultation`,
    description:
      'Contact CYBER DT (Darshitha Theekshana) for ethical hacking, penetration testing, malware removal and system hardening in Sri Lanka. Secure, confidential and NDA-friendly consultations with an average response under 24 hours.',
    keywords:
      'contact CYBER DT, contact cyber dt, hire ethical hacker Sri Lanka, cyber security consultation contact, penetration testing enquiry Sri Lanka, malware removal help Sri Lanka, Darshitha Theekshana contact',
    h1: 'Contact CYBER DT — Secure Cyber Security Consultation in Sri Lanka',
    lede:
      'System compromised? Device acting strange? Need a security audit? Open a secure channel below — every message is treated as confidential. Direct email and phone identifiers are privacy-shielded on this site; reveal them on request or use the encrypted form.',
    sections: [
      {
        h2: 'How the secure channel works',
        paragraphs: [
          'The contact form is the fastest and safest route. Messages are delivered directly to the CYBER DT inbox with a mailto fallback if the network blocks the form. Average response time is under 24 hours and a free first assessment is included with every enquiry.',
        ],
        list: [
          'Confidential — no details are shared with third parties.',
          'NDA-friendly — a non-disclosure agreement can be signed before any work starts.',
          'Remote and onsite — remote worldwide, on-site visits across Sri Lanka.',
        ],
      },
      {
        h2: 'Working together',
        paragraphs: [
          'If you are not sure which module you need, simply describe the symptoms. CYBER DT maps the vulnerability, explains the risk and recommends the right fix before any engagement is scoped.',
        ],
      },
    ],
  },
]

/** FAQ markup — rendered as visible content on the home page and as FAQPage JSON-LD. */
export const FAQ = [
  {
    q: 'Who is CYBER DT?',
    a: 'CYBER DT is Darshitha Theekshana, a white hat ethical hacker and cyber security specialist based in Sri Lanka. The name CYBER DT is the personal brand used on this website, the @dtcybersl1 YouTube channel and the GitHub profile.',
  },
  {
    q: 'What services does CYBER DT offer?',
    a: 'Authorized penetration testing and vulnerability assessment, malware analysis and removal, Windows and Linux system hardening, mobile OS security work for Android and iOS, and one-on-one security consultation for individuals and small businesses.',
  },
  {
    q: 'Is CYBER DT available for remote work and outside Sri Lanka?',
    a: 'Yes. CYBER DT works remotely with clients worldwide and on-site across Sri Lanka. Engagements are scoped in writing, confidentiality is guaranteed and NDA-friendly terms are available.',
  },
  {
    q: 'Where can I find the CYBER DT YouTube channel?',
    a: 'The official channel is @dtcybersl1 on YouTube. It publishes ethical hacking tutorials, cybersecurity breakdowns, Android and iOS device fixes and system hardening guides, usually weekly.',
  },
  {
    q: 'How do I contact CYBER DT?',
    a: 'Use the secure contact form on the contact page. The direct email and WhatsApp identifiers are privacy-masked on the website — the eye icon reveals them on request, and every message is answered in under 24 hours.',
  },
]

/** Internal links used by the static HTML so crawlers can walk the whole site. */
export const INTERNAL_LINKS = ROUTES.map((r) => ({
  label: r.navLabel,
  href: r.slug ? `/${r.slug}/` : '/',
}))
