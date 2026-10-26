import { useEffect, useMemo, useRef, useState } from 'react'

const normalize = (value) =>
  String(value).toLowerCase().normalize('NFC').replace(/\s+/g, ' ').trim()

const CITIES = [
  // ---------- බස්නාහිර පළාත · කොළඹ දිස්ත්‍රික්කය ----------
  { label: 'කොළඹ / Colombo', lat: 6.9271, lon: 79.8612 },
  { label: 'දෙහිවල / Dehiwala', lat: 6.8511, lon: 79.8653 },
  { label: 'මවුන්ට් ලැවිනියා / Mount Lavinia', lat: 6.8389, lon: 79.8659 },
  { label: 'මොරටුව / Moratuwa', lat: 6.773, lon: 79.8816 },
  { label: 'ශ්‍රී ජයවර්ධනපුර කෝට්ටේ / Kotte', lat: 6.889, lon: 79.901 },
  { label: 'කොලොන්නාව / Kolonnawa', lat: 6.933, lon: 79.889 },
  { label: 'හෝමාගම / Homagama', lat: 6.841, lon: 80.002 },
  { label: 'මහරගම / Maharagama', lat: 6.848, lon: 79.926 },
  { label: 'කැස්බෑව / Kesbewa', lat: 6.795, lon: 79.939 },
  { label: 'පිළියන්දල / Piliyandala', lat: 6.801, lon: 79.923 },
  { label: 'බොරලැස්ගමුව / Boralesgamuwa', lat: 6.839, lon: 79.9 },
  { label: 'නුගේගොඩ / Nugegoda', lat: 6.873, lon: 79.888 },
  { label: 'රත්මලාන / Ratmalana', lat: 6.819, lon: 79.886 },
  { label: 'පාදුක්ක / Padukka', lat: 6.84, lon: 80.09 },
  { label: 'හංවැල්ල / Hanwella', lat: 6.901, lon: 80.085 },
  { label: 'අවිස්සාවේල්ල / Avissawella', lat: 6.9543, lon: 80.2046 },

  // ---------- බස්නාහිර පළාත · ගම්පහ දිස්ත්‍රික්කය ----------
  { label: 'ගම්පහ / Gampaha', lat: 7.084, lon: 79.9997 },
  { label: 'මීගමුව / Negombo', lat: 7.2083, lon: 79.8358 },
  { label: 'ජා-ඇල / Ja-Ela', lat: 7.074, lon: 79.894 },
  { label: 'කටුනායක / Katunayake', lat: 7.169, lon: 79.884 },
  { label: 'වත්තල / Wattala', lat: 6.989, lon: 79.891 },
  { label: 'කැලණිය / Kelaniya', lat: 6.955, lon: 79.922 },
  { label: 'කඩවත / Kadawatha', lat: 7.0, lon: 79.95 },
  { label: 'රාගම / Ragama', lat: 7.03, lon: 79.92 },
  { label: 'මිනුවන්ගොඩ / Minuwangoda', lat: 7.166, lon: 79.953 },
  { label: 'දිවුලපිටිය / Divulapitiya', lat: 7.221, lon: 80.012 },
  { label: 'මීරිගම / Mirigama', lat: 7.13, lon: 80.13 },
  { label: 'වේයන්ගොඩ / Veyangoda', lat: 7.154, lon: 80.056 },
  { label: 'නිට්ටඹුව / Nittambuwa', lat: 7.14, lon: 80.096 },
  { label: 'බියගම / Biyagama', lat: 6.94, lon: 79.99 },
  { label: 'කිරිබත්ගොඩ / Kiribathgoda', lat: 6.978, lon: 79.929 },
  { label: 'සීදුව / Seeduwa', lat: 7.13, lon: 79.877 },

  // ---------- බස්නාහිර පළාත · කළුතර දිස්ත්‍රික්කය ----------
  { label: 'කළුතර / Kalutara', lat: 6.5854, lon: 79.9607 },
  { label: 'පානදුර / Panadura', lat: 6.7132, lon: 79.9044 },
  { label: 'හොරණ / Horana', lat: 6.7167, lon: 80.0625 },
  { label: 'බණ්ඩාරගම / Bandaragama', lat: 6.715, lon: 79.99 },
  { label: 'බේරුවල / Beruwala', lat: 6.479, lon: 79.983 },
  { label: 'අලුත්ගම / Aluthgama', lat: 6.432, lon: 79.995 },
  { label: 'මතුගම / Matugama', lat: 6.52, lon: 80.11 },
  { label: 'වාද්දුව / Wadduwa', lat: 6.66, lon: 79.93 },
  { label: 'ඉංගිරිය / Ingiriya', lat: 6.74, lon: 80.16 },
  { label: 'බුලත්සිංහල / Bulathsinhala', lat: 6.65, lon: 80.15 },
  { label: 'කොස්ගොඩ / Kosgoda', lat: 6.3379, lon: 80.0362 },
  { label: 'දොඩංගොඩ / Dodangoda', lat: 6.55, lon: 80.02 },

  // ---------- මධ්‍යම පළාත · මහනුවර දිස්ත්‍රික්කය ----------
  { label: 'මහනුවර / Kandy', lat: 7.2906, lon: 80.6337 },
  { label: 'ගම්පොල / Gampola', lat: 7.164, lon: 80.573 },
  { label: 'නාවලපිටිය / Nawalapitiya', lat: 7.05, lon: 80.53 },
  { label: 'දිගන / Digana', lat: 7.28, lon: 80.75 },
  { label: 'කටුගස්තොට / Katugastota', lat: 7.32, lon: 80.62 },
  { label: 'පේරාදෙණිය / Peradeniya', lat: 7.26, lon: 80.6 },
  { label: 'කුණ්ඩසාලේ / Kundasale', lat: 7.29, lon: 80.7 },
  { label: 'අකුරණ / Akurana', lat: 7.36, lon: 80.62 },
  { label: 'තෙල්දෙණිය / Teldeniya', lat: 7.3, lon: 80.77 },
  { label: 'පූජාපිටිය / Poojapitiya', lat: 7.34, lon: 80.6 },
  { label: 'උඩුනුවර / Udunuwara', lat: 7.23, lon: 80.55 },
  { label: 'මිනිපේ / Minipe', lat: 7.38, lon: 80.85 },
  { label: 'මැදදුම්බර / Medadumbara', lat: 7.3, lon: 80.8 },

  // ---------- මධ්‍යම පළාත · මාතලේ දිස්ත්‍රික්කය ----------
  { label: 'මාතලේ / Matale', lat: 7.4675, lon: 80.6234 },
  { label: 'දඹුල්ල / Dambulla', lat: 7.86, lon: 80.651 },
  { label: 'සීගිරිය / Sigiriya', lat: 7.957, lon: 80.7603 },
  { label: 'ගලේවෙල / Galewela', lat: 7.75, lon: 80.57 },
  { label: 'රත්තොට / Rattota', lat: 7.48, lon: 80.62 },
  { label: 'උකුවෙල / Ukuwela', lat: 7.42, lon: 80.62 },
  { label: 'පල්ලේපොල / Pallepola', lat: 7.62, lon: 80.62 },
  { label: 'විල්ගමුව / Wilgamuwa', lat: 7.6, lon: 80.85 },
  { label: 'නාඋල / Naula', lat: 7.7, lon: 80.7 },
  { label: 'ලග්ගල / Laggala', lat: 7.6, lon: 80.83 },
  { label: 'යටවත්ත / Yatawatta', lat: 7.53, lon: 80.6 },

  // ---------- මධ්‍යම පළාත · නුවරඑළිය දිස්ත්‍රික්කය ----------
  { label: 'නුවරඑළිය / Nuwara Eliya', lat: 6.9497, lon: 80.7891 },
  { label: 'හැටන් / Hatton', lat: 6.8916, lon: 80.5955 },
  { label: 'තලවකැලේ / Talawakele', lat: 6.93, lon: 80.66 },
  { label: 'රාගල / Ragala', lat: 6.98, lon: 80.75 },
  { label: 'බොගවන්තලාව / Bogawantalawa', lat: 6.83, lon: 80.68 },
  { label: 'අඹේවෙල / Ambewela', lat: 6.87, lon: 80.85 },
  { label: 'වලපනේ / Walapane', lat: 7.05, lon: 80.85 },
  { label: 'හඟුරන්කෙත / Hanguranketha', lat: 7.1, lon: 80.75 },
  { label: 'රම්බෝඩ / Ramboda', lat: 7.05, lon: 80.7 },
  { label: 'කොත්මලේ / Kotmale', lat: 7.02, lon: 80.6 },

  // ---------- දකුණු පළාත · ගාල්ල දිස්ත්‍රික්කය ----------
  { label: 'ගාල්ල / Galle', lat: 6.0535, lon: 80.221 },
  { label: 'අම්බලන්ගොඩ / Ambalangoda', lat: 6.2359, lon: 80.0538 },
  { label: 'හික්කඩුව / Hikkaduwa', lat: 6.1395, lon: 80.1063 },
  { label: 'බද්දේගම / Baddegama', lat: 6.17, lon: 80.19 },
  { label: 'එල්පිටිය / Elpitiya', lat: 6.29, lon: 80.16 },
  { label: 'කරාපිටිය / Karapitiya', lat: 6.06, lon: 80.23 },
  { label: 'උණවටුන / Unawatuna', lat: 6.01, lon: 80.25 },
  { label: 'නාගොඩ / Nagoda', lat: 6.19, lon: 80.16 },
  { label: 'යක්කලමුල්ල / Yakkalamulla', lat: 6.15, lon: 80.2 },
  { label: 'තවලම / Thawalama', lat: 6.32, lon: 80.35 },
  { label: 'නියාගම / Niyagama', lat: 6.28, lon: 80.26 },
  { label: 'අක්මීමන / Akmeemana', lat: 6.05, lon: 80.28 },
  { label: 'දෙවිනුවර / Devinuwara', lat: 5.93, lon: 80.59 },

  // ---------- දකුණු පළාත · මාතර දිස්ත්‍රික්කය ----------
  { label: 'මාතර / Matara', lat: 5.9549, lon: 80.555 },
  { label: 'වැලිගම / Weligama', lat: 5.973, lon: 80.429 },
  { label: 'දෙනියාය / Deniyaya', lat: 6.3425, lon: 80.5597 },
  { label: 'අකුරැස්ස / Akuressa', lat: 6.1, lon: 80.48 },
  { label: 'හක්මන / Hakmana', lat: 6.08, lon: 80.55 },
  { label: 'කඹුරුපිටිය / Kamburupitiya', lat: 6.08, lon: 80.52 },
  { label: 'මාකඳුර / Makandura', lat: 6.12, lon: 80.48 },
  { label: 'දික්වැල්ල / Dickwella', lat: 5.96, lon: 80.68 },
  { label: 'තිහගොඩ / Thihagoda', lat: 6.0, lon: 80.55 },
  { label: 'මුලටියන / Mulatiyana', lat: 6.2, lon: 80.45 },
  { label: 'අතුරලිය / Athuraliya', lat: 6.05, lon: 80.5 },
  { label: 'මාලිම්බඩ / Malimbada', lat: 6.0, lon: 80.51 },

  // ---------- දකුණු පළාත · හම්බන්තොට දිස්ත්‍රික්කය ----------
  { label: 'හම්බන්තොට / Hambantota', lat: 6.1429, lon: 81.1212 },
  { label: 'තංගල්ල / Tangalle', lat: 6.024, lon: 80.791 },
  { label: 'බෙලිඅත්ත / Beliatta', lat: 6.05, lon: 80.73 },
  { label: 'අගුණුකොළපැලැස්ස / Agunukolapelessa', lat: 6.15, lon: 80.95 },
  { label: 'මිද්දෙනිය / Middeniya', lat: 6.22, lon: 80.87 },
  { label: 'වීරකැටිය / Weeraketiya', lat: 6.13, lon: 80.79 },
  { label: 'ලුණුගම්වෙහෙර / Lunugamvehera', lat: 6.34, lon: 81.02 },
  { label: 'සූරියවැව / Sooriyawewa', lat: 6.3, lon: 80.98 },

  // ---------- සබරගමුව පළාත · රත්නපුර දිස්ත්‍රික්කය ----------
  { label: 'රත්නපුර / Ratnapura', lat: 6.6828, lon: 80.3992 },
  { label: 'බලංගොඩ / Balangoda', lat: 6.65, lon: 80.6875 },
  { label: 'පැල්මඩුල්ල / Pelmadulla', lat: 6.62, lon: 80.53 },
  { label: 'ඇහැලියගොඩ / Eheliyagoda', lat: 6.85, lon: 80.26 },
  { label: 'කුරුවිට / Kuruwita', lat: 6.99, lon: 80.36 },
  { label: 'නිවිතිගල / Nivithigala', lat: 6.62, lon: 80.44 },
  { label: 'කලවාන / Kalawana', lat: 6.53, lon: 80.4 },
  { label: 'ඕපනායක / Opanayaka', lat: 6.6, lon: 80.5 },
  { label: 'ගොඩකවෙල / Godakawela', lat: 6.5, lon: 80.55 },
  { label: 'කහවත්ත / Kahawatta', lat: 6.58, lon: 80.5 },
  { label: 'ඇම්බිලිපිටිය / Embilipitiya', lat: 6.34, lon: 80.85 },

  // ---------- සබරගමුව පළාත · කෑගල්ල දිස්ත්‍රික්කය ----------
  { label: 'කෑගල්ල / Kegalle', lat: 7.2513, lon: 80.3464 },
  { label: 'මාවනැල්ල / Mawanella', lat: 7.25, lon: 80.44 },
  { label: 'වරකාපොල / Warakapola', lat: 7.22, lon: 80.19 },
  { label: 'රඹුක්කන / Rambukkana', lat: 7.32, lon: 80.39 },
  { label: 'කිතුල්ගල / Kithulgala', lat: 6.99, lon: 80.41 },
  { label: 'දෙහිඕවිට / Dehiowita', lat: 6.95, lon: 80.26 },
  { label: 'දැරණියගල / Deraniyagala', lat: 6.92, lon: 80.33 },
  { label: 'ගලිගමුව / Galigamuwa', lat: 7.23, lon: 80.28 },
  { label: 'යටියන්තොට / Yatiyanthota', lat: 7.03, lon: 80.3 },
  { label: 'අරණායක / Aranayaka', lat: 7.16, lon: 80.37 },
  { label: 'රුවන්වැල්ල / Ruwanwella', lat: 7.04, lon: 80.25 },
  { label: 'ගිනිගත්හේන / Ginigathhena', lat: 6.9833, lon: 80.4868 },

  // ---------- වයඹ පළාත · කුරුණෑගල දිස්ත්‍රික්කය ----------
  { label: 'කුරුණෑගල / Kurunegala', lat: 7.4863, lon: 80.3623 },
  { label: 'කුලියාපිටිය / Kuliyapitiya', lat: 7.47, lon: 80.04 },
  { label: 'නාරම්මල / Narammala', lat: 7.431, lon: 80.2136 },
  { label: 'පොල්ගහවෙල / Polgahawela', lat: 7.33, lon: 80.3 },
  { label: 'මහව / Maho', lat: 7.82, lon: 80.28 },
  { label: 'ගිරිඋල්ල / Giriulla', lat: 7.33, lon: 80.1 },
  { label: 'අලව්ව / Alawwa', lat: 7.3, lon: 80.24 },
  { label: 'දඹදෙණිය / Dambadeniya', lat: 7.36, lon: 80.15 },
  { label: 'පන්නල / Pannala', lat: 7.35, lon: 80.05 },
  { label: 'වාරියපොල / Wariyapola', lat: 7.623, lon: 80.2429 },
  { label: 'මාස්පොත / Maspotha', lat: 7.45, lon: 80.25 },
  { label: 'පොල්පිතිගම / Polpitigama', lat: 7.6, lon: 80.2 },
  { label: 'රිදීගම / Ridigama', lat: 7.42, lon: 80.32 },

  // ---------- වයඹ පළාත · පුත්තලම දිස්ත්‍රික්කය ----------
  { label: 'පුත්තලම / Puttalam', lat: 8.0362, lon: 79.8283 },
  { label: 'හලාවත / Chilaw', lat: 7.5759, lon: 79.7953 },
  { label: 'මාදම්පේ / Madampe', lat: 7.5, lon: 79.83 },
  { label: 'මුන්දලම / Mundel', lat: 8.13, lon: 79.82 },
  { label: 'ආනමඩුව / Anamaduwa', lat: 7.9, lon: 80.02 },
  { label: 'නොරොච්චෝලේ / Norochcholai', lat: 8.0, lon: 79.75 },
  { label: 'කල්පිටිය / Kalpitiya', lat: 8.23, lon: 79.77 },
  { label: 'පල්ලම / Pallama', lat: 7.68, lon: 79.83 },
  { label: 'වෙන්නප්පුව / Wennappuwa', lat: 7.35, lon: 79.85 },
  { label: 'මාරවිල / Marawila', lat: 7.42, lon: 79.82 },
  { label: 'දංකොටුව / Dankotuwa', lat: 7.3, lon: 79.9 },
  { label: 'නාත්තණ්ඩිය / Nattandiya', lat: 7.4, lon: 79.9 },
  { label: 'ආරච්චිකට්ටුව / Arachchikattuwa', lat: 7.68, lon: 79.85 },

  // ---------- උතුරු මධ්‍යම පළාත · අනුරාධපුර දිස්ත්‍රික්කය ----------
  { label: 'අනුරාධපුර / Anuradhapura', lat: 8.3114, lon: 80.4037 },
  { label: 'කැකිරාව / Kekirawa', lat: 8.03, lon: 80.6 },
  { label: 'තඹුත්තේගම / Thambuttegama', lat: 8.15, lon: 80.3 },
  { label: 'මිහින්තලේ / Mihintale', lat: 8.35, lon: 80.51 },
  { label: 'මැදවච්චිය / Medawachchiya', lat: 8.54, lon: 80.5 },
  { label: 'ගලෙන්බිඳුණුවැව / Galenbindunuwewa', lat: 8.35, lon: 80.65 },
  { label: 'හොරොව්පතාන / Horowpothana', lat: 8.5, lon: 80.7 },
  { label: 'නොච්චියාගම / Nochchiyagama', lat: 8.28, lon: 80.35 },
  { label: 'පළුගස්වැව / Palugaswewa', lat: 8.05, lon: 80.71 },
  { label: 'රඹෑව / Rambewa', lat: 8.4, lon: 80.5 },
  { label: 'තලාව / Thalawa', lat: 8.23, lon: 80.36 },
  { label: 'එප්පාවල / Eppawala', lat: 8.15, lon: 80.41 },

  // ---------- උතුරු මධ්‍යම පළාත · පොළොන්නරුව දිස්ත්‍රික්කය ----------
  { label: 'පොළොන්නරුව / Polonnaruwa', lat: 7.9403, lon: 81.0188 },
  { label: 'හිඟුරක්ගොඩ / Hingurakgoda', lat: 8.05, lon: 80.95 },
  { label: 'මැදිරිගිරිය / Medirigiriya', lat: 8.15, lon: 80.98 },
  { label: 'ගිරිතලේ / Girithale', lat: 8.001, lon: 80.925 },
  { label: 'ලංකාපුර / Lankapura', lat: 7.98, lon: 81.05 },
  { label: 'වැලිකන්ද / Welikanda', lat: 7.95, lon: 81.15 },
  { label: 'දිඹුලාගල / Dimbulagala', lat: 7.87, lon: 81.02 },
  { label: 'ඇලහැර / Elahera', lat: 7.95, lon: 80.9 },
  { label: 'හබරණ / Habarana', lat: 8.0329, lon: 80.7514 },
  { label: 'මිනිගේරිය / Minneriya', lat: 8.032, lon: 80.9045 },

  // ---------- නැගෙනහිර පළාත · ත්‍රිකුණාමලය දිස්ත්‍රික්කය ----------
  { label: 'ත්‍රිකුණාමලය / Trincomalee', lat: 8.5874, lon: 81.2152 },
  { label: 'කන්තලේ / Kantale', lat: 8.358, lon: 81.006 },
  { label: 'මුතූර් / Muthur', lat: 8.45, lon: 81.27 },
  { label: 'කින්නියා / Kinniya', lat: 8.48, lon: 81.19 },
  { label: 'නිලාවේලි / Nilaveli', lat: 8.67, lon: 81.19 },
  { label: 'උප්පුවේලි / Uppuveli', lat: 8.6, lon: 81.22 },
  { label: 'සේරුවිල / Seruwila', lat: 8.37, lon: 81.32 },

  // ---------- නැගෙනහිර පළාත · මඩකලපුව දිස්ත්‍රික්කය ----------
  { label: 'මඩකලපුව / Batticaloa', lat: 7.731, lon: 81.6747 },
  { label: 'කාත්තාන්කුඩි / Kattankudy', lat: 7.68, lon: 81.72 },
  { label: 'ඒරාවූර් / Eravur', lat: 7.75, lon: 81.6 },
  { label: 'වාලච්චේනෛ / Valaichchenai', lat: 7.92, lon: 81.53 },
  { label: 'චෙන්කලඩි / Chenkalady', lat: 7.79, lon: 81.6 },
  { label: 'පාසිකුඩා / Pasikuda', lat: 7.93, lon: 81.56 },
  { label: 'වකරේ / Vakarai', lat: 8.14, lon: 81.43 },
  { label: 'කිරාන් / Kiran', lat: 7.86, lon: 81.54 },

  // ---------- නැගෙනහිර පළාත · අම්පාර දිස්ත්‍රික්කය ----------
  { label: 'අම්පාර / Ampara', lat: 7.2975, lon: 81.682 },
  { label: 'කල්මුණේ / Kalmunai', lat: 7.4167, lon: 81.8167 },
  { label: 'සමන්තුරේ / Sammanthurai', lat: 7.3667, lon: 81.8 },
  { label: 'කාරතිව් / Karaitivu', lat: 7.4, lon: 81.83 },
  { label: 'නින්දවූර් / Nintavur', lat: 7.35, lon: 81.83 },
  { label: 'අක්කරෙයිපත්තුව / Akkaraipattu', lat: 7.2, lon: 81.85 },
  { label: 'පොට්ටුවිල් / Pottuvil', lat: 6.87, lon: 81.83 },
  { label: 'අරුගම්බේ / Arugam Bay', lat: 6.84, lon: 81.83 },
  { label: 'දෙහිඅත්තකණ්ඩිය / Dehiattakandiya', lat: 7.65, lon: 81.0 },
  { label: 'මහඔය / Maha Oya', lat: 7.55, lon: 81.35 },
  { label: 'උහන / Uhana', lat: 7.37, lon: 81.63 },
  { label: 'දමන / Damana', lat: 7.3, lon: 81.7 },
  { label: 'ලාහුගල / Lahugala', lat: 6.88, lon: 81.72 },

  // ---------- උතුරු පළාත · යාපනය දිස්ත්‍රික්කය ----------
  { label: 'යාපනය / Jaffna', lat: 9.6615, lon: 80.0255 },
  { label: 'චාවකච්චේරි / Chavakachcheri', lat: 9.6667, lon: 80.15 },
  { label: 'පේදුරු තුඩුව / Point Pedro', lat: 9.8167, lon: 80.2333 },
  { label: 'කරෙයිනගර් / Karainagar', lat: 9.72, lon: 79.9 },
  { label: 'කයිට්ස් / Kayts', lat: 9.68, lon: 79.87 },
  { label: 'වේලනෛ / Velanai', lat: 9.66, lon: 79.9 },
  { label: 'ඩෙල්ෆ්ට් / Delft', lat: 9.5, lon: 79.7 },
  { label: 'කොපායි / Kopay', lat: 9.75, lon: 80.0 },
  { label: 'අච්චුවේලි / Achuveli', lat: 9.78, lon: 80.15 },
  { label: 'නෙල්ලියඩි / Nelliady', lat: 9.79, lon: 80.2 },
  { label: 'උඩුවිල් / Uduvil', lat: 9.73, lon: 80.0 },

  // ---------- උතුරු පළාත · කිලිනොච්චි දිස්ත්‍රික්කය ----------
  { label: 'කිලිනොච්චි / Kilinochchi', lat: 9.3803, lon: 80.377 },
  { label: 'පරන්තන් / Paranthan', lat: 9.45, lon: 80.4 },
  { label: 'පූනරින් / Pooneryn', lat: 9.5, lon: 80.2 },

  // ---------- උතුරු පළාත · මුලතිව් දිස්ත්‍රික්කය ----------
  { label: 'මුලතිව් / Mullaitivu', lat: 9.2671, lon: 80.8142 },
  { label: 'ඔඩ්ඩුසුඩාන් / Oddusuddan', lat: 9.15, lon: 80.65 },
  { label: 'පුදුකුඩිඉරිප්පු / Pudukudiyirippu', lat: 9.3, lon: 80.75 },
  { label: 'තුනුක්කායි / Thunukkai', lat: 9.2, lon: 80.55 },
  { label: 'මන්කුලම් / Mankulam', lat: 9.13, lon: 80.42 },

  // ---------- උතුරු පළාත · වව්නියාව දිස්ත්‍රික්කය ----------
  { label: 'වව්නියාව / Vavuniya', lat: 8.7514, lon: 80.4971 },
  { label: 'චෙට්ටිකුලම් / Chettikulam', lat: 8.6, lon: 80.45 },
  { label: 'නෙදුන්කේනි / Nedunkeni', lat: 8.9, lon: 80.6 },
  { label: 'ඕමන්තයි / Omanthai', lat: 8.8, lon: 80.5 },

  // ---------- උතුරු පළාත · මන්නාරම දිස්ත්‍රික්කය ----------
  { label: 'මන්නාරම / Mannar', lat: 8.977, lon: 79.913 },
  { label: 'නානාට්ටාන් / Nanattan', lat: 8.9, lon: 79.95 },
  { label: 'මඩු / Madhu', lat: 8.8, lon: 80.05 },
  { label: 'තලෛමන්නාරම / Talaimannar', lat: 9.1, lon: 79.73 },
  { label: 'පේසාලෛ / Pesalai', lat: 8.95, lon: 79.9 },

  // ---------- උව පළාත · බදුල්ල දිස්ත්‍රික්කය ----------
  { label: 'බදුල්ල / Badulla', lat: 6.9894, lon: 81.055 },
  { label: 'බණ්ඩාරවෙල / Bandarawela', lat: 6.8259, lon: 80.9982 },
  { label: 'හපුතලේ / Haputale', lat: 6.7667, lon: 80.9667 },
  { label: 'දියතලාව / Diyatalawa', lat: 6.8, lon: 80.97 },
  { label: 'වැලිමඩ / Welimada', lat: 6.9, lon: 80.9 },
  { label: 'පස්සර / Passara', lat: 6.93, lon: 81.15 },
  { label: 'ලුණුගල / Lunugala', lat: 7.0, lon: 81.2 },
  { label: 'මහියංගණය / Mahiyanganaya', lat: 7.33, lon: 81.0 },
  { label: 'කන්දකැටිය / Kandaketiya', lat: 6.9, lon: 81.05 },
  { label: 'මීගහකිවුල / Meegahakiwula', lat: 7.0, lon: 81.1 },
  { label: 'ඌවපරණගම / Uva Paranagama', lat: 7.05, lon: 81.0 },
  { label: 'හාලිඇල / Hali Ela', lat: 6.98, lon: 81.03 },
  { label: 'ඇල්ල / Ella', lat: 6.8667, lon: 81.0466 },

  // ---------- උව පළාත · මොනරාගල දිස්ත්‍රික්කය ----------
  { label: 'මොනරාගල / Monaragala', lat: 6.8714, lon: 81.3487 },
  { label: 'වෙල්ලවාය / Wellawaya', lat: 6.7333, lon: 81.1 },
  { label: 'බිබිල / Bibile', lat: 7.1667, lon: 81.2167 },
  { label: 'බුත්තල / Buttala', lat: 6.76, lon: 81.2 },
  { label: 'තණමල්විල / Thanamalwila', lat: 6.44, lon: 81.15 },
  { label: 'කතරගම / Kataragama', lat: 6.41, lon: 81.33 },
  { label: 'සියඹලාණ්ඩුව / Siyambalanduwa', lat: 6.9, lon: 81.55 },
  { label: 'බඩල්කුඹුර / Badalkumbura', lat: 6.9, lon: 81.25 },
  { label: 'මැදගම / Medagama', lat: 6.85, lon: 81.25 },
]

const WEATHER_MAP = [
  { codes: [0], title: 'පැහැදිලි අහස', icon: '☀️' },
  { codes: [1, 2], title: 'අර්ධ වළාකුළු සහිත', icon: '⛅' },
  { codes: [3], title: 'බොහෝ වළාකුළු සහිත', icon: '☁️' },
  { codes: [45, 48], title: 'මීදුම සහිත', icon: '🌫️' },
  { codes: [51, 53, 55], title: 'සැහැල්ලු තෙත් බිඳු සහිත', icon: '🌦️' },
  { codes: [56, 57], title: 'සැහැල්ලු හිම මිශ්‍ර වැසි', icon: '🌧️' },
  { codes: [61, 63], title: 'මධ්‍යම තරමේ වැසි', icon: '🌧️' },
  { codes: [65], title: 'දැඩි වැසි', icon: '🌧️' },
  { codes: [66, 67], title: 'ශීත වැසි', icon: '🌧️' },
  { codes: [71, 73], title: 'මධ්‍යම තරමේ හිම වැසි', icon: '🌨️' },
  { codes: [75], title: 'දැඩි හිම වැසි', icon: '❄️' },
  { codes: [77], title: 'හිම ඇට', icon: '🌨️' },
  { codes: [80, 81], title: 'තදබල වැසි', icon: '🌧️' },
  { codes: [82], title: 'ඉතා දැඩි වැසි', icon: '🌧️' },
  { codes: [85, 86], title: 'තදබල හිම වැසි', icon: '🌨️' },
  { codes: [95], title: 'අකුණු සහිත කුණාටු', icon: '⛈️' },
  { codes: [96, 99], title: 'අකුණු සහිත දැඩි වැසි', icon: '⛈️' },
]

/**
 * WMO weather code -> Sinhala description + icon.
 * Any code that is not in the table (including `undefined`) falls back to a
 * neutral reading so the widget always has something to render.
 */
function getWeatherInfo(code) {
  const match = WEATHER_MAP.find((entry) => entry.codes.includes(code))
  return match ?? { title: 'කාලගුණ තත්ත්වය නොදනී', icon: '🌡️' }
}

/**
 * Open-Meteo occasionally drops the very first request issued during page
 * load, so retry a short backoff before giving up. `res.ok` is checked too:
 * an HTTP error body would otherwise be parsed as JSON and silently produce an
 * empty screen.
 */
async function fetchJsonWithRetry(url, attempts = 3) {
  let lastError
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) throw new Error(`Open-Meteo request failed with ${res.status}`)
      return await res.json()
    } catch (err) {
      lastError = err
      if (attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)))
      }
    }
  }
  throw lastError
}

const BULLETINS = [
  {
    id: 1,
    type: 'morning',
    issuedBy: 'ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුව',
    time: 'පාන්දර 06:00',
    title: 'උදෑසන කාලගුණ විස්තරය',
    content:
      'අද දිනයේ බස්නාහිර, දකුණු සහ සබරගමුව පළාත්වල සමහර ප්‍රදේශවල තදබල වැසි ලැබිය හැකිය. අනෙක් ප්‍රදේශවල ප්‍රධාන වශයෙන් වළාකුළු සහිත කාලගුණයක් පවතිනු ඇත. සවස් කාලය වන විට වැසි තීව්‍රතාවය වැඩි විය හැකිය.',
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
      'ගිනිගත්හේන, හපුතලේ, නුවරඑළිය වැනි කඳුකර ප්‍රදේශවල පමණක් නොව පහතරට ප්‍රදේශවලද තදබල වැසි සහ අකුණු සහිත කුණාටු සිදුවීමට ඉඩ ඇත. මාර්ග භාවිතා කරන රියදුරන් වඩාත් පරෙස්සමින් කටයුතු කරන ලෙස දැනුම් දෙනු ලැබේ.',
  },
]

// Each entry carries the representative coordinates used to pull that
// province's real daily forecast from Open-Meteo, so every card shows its
// own condition instead of reusing the selected city's weather.
const PROVINCE_SUMMARIES = [
  {
    key: 'western',
    lat: 6.9271,
    lon: 79.8612,
    province: 'බස්නාහිර පළාත (Western)',
    areas: 'කොළඹ, ගම්පහ, කළුතර',
    icon: '🌧️',
    forecast: 'කොළඹ, ගම්පහ, කළුතර ප්‍රදේශවල සවස් වරුවේ තදබල වැසි සහ අකුණු අපේක්ෂා කෙරේ.',
    tempRange: '25 °C - 31 °C',
  },
  {
    key: 'central',
    lat: 7.2906,
    lon: 80.6337,
    province: 'මධ්‍යම පළාත (Central)',
    areas: 'මහනුවර, නුවරඑළිය, මාතලේ',
    icon: '⛈️',
    forecast: 'මහනුවර, නුවරඑළිය, මාතලේ ප්‍රදේශවල දහවල් වරුවේ තදබල වැසි සහ අකුණු අපේක්ෂා කෙරේ.',
    tempRange: '16 °C - 26 °C',
  },
  {
    key: 'southern',
    lat: 6.0535,
    lon: 80.221,
    province: 'දකුණු පළාත (Southern)',
    areas: 'ගාල්ල, මාතර, හම්බන්තොට',
    icon: '🌧️',
    forecast: 'ගාල්ල, මාතර, හම්බන්තොට ප්‍රදේශවල තරමක් සිට දැඩි තරමේ වැසි අපේක්ෂා කෙරේ.',
    tempRange: '25 °C - 30 °C',
  },
  {
    key: 'sabaragamuwa',
    lat: 6.6828,
    lon: 80.3992,
    province: 'සබරගමුව පළාත (Sabaragamuwa)',
    areas: 'රත්නපුර, කෑගල්ල',
    icon: '⛈️',
    forecast: 'රත්නපුර, කෑගල්ල ප්‍රදේශවල තදබල වැසි සහ අකුණු සහිත කුණාටු අපේක්ෂා කෙරේ.',
    tempRange: '22 °C - 29 °C',
  },
  {
    key: 'north-western',
    lat: 7.4863,
    lon: 80.3623,
    province: 'වයඹ පළාත (North Western)',
    areas: 'කුරුණෑගල, පුත්තලම, ගම්පහ',
    icon: '⛅',
    forecast: 'කුරුණෑගල, පුත්තලම ප්‍රදේශවල අර්ධ වළාකුළු සහිත කාලගුණයක් අපේක්ෂා කෙරේ.',
    tempRange: '25 °C - 31 °C',
  },
  {
    key: 'eastern',
    lat: 7.7102,
    lon: 81.6924,
    province: 'නැගෙනහිර පළාත (Eastern)',
    areas: 'ත්‍රිකුණාමලය, මඩකලපුව, අම්පාර',
    icon: '🌤️',
    forecast: 'ත්‍රිකුණාමලය, මඩකලපුව, අම්පාර ප්‍රදේශවල බොහෝ දුරට පැහැදිලි හෝ අර්ධ වළාකුළු සහිත කාලගුණයක් අපේක්ෂා කෙරේ.',
    tempRange: '26 °C - 32 °C',
  },
  {
    key: 'northern',
    lat: 9.6615,
    lon: 80.0255,
    province: 'උතුරු පළාත (Northern)',
    areas: 'යාපනය, මන්නාරම, වවුනියාව',
    icon: '🌤️',
    forecast: 'යාපනය, මන්නාරම, වවුනියාව ප්‍රදේශවල සාමාන්‍යයෙන් වියළි හෝ අර්ධ වළාකුළු සහිත කාලගුණයක් අපේක්ෂා කෙරේ.',
    tempRange: '27 °C - 33 °C',
  },
  {
    key: 'ncp-uva',
    lat: 8.3114,
    lon: 80.4037,
    province: 'උතුරු මධ්‍යම හා උව පළාත (NCP & Uva)',
    areas: 'අනුරාධපුර, පොළොන්නරුව, බදුල්ල, මොනරාගල',
    icon: '🌧️',
    forecast: 'අනුරාධපුර, පොළොන්නරුව, බදුල්ල, මොනරාගල ප්‍රදේශවල සවස් කාලයේ තරමක් වැසි අපේක්ෂා කෙරේ.',
    tempRange: '20 °C - 30 °C',
  },
]

const PROVINCE_LEVEL_ICONS = {
  thunder: '⛈️',
  heavy: '🌧️',
  rainy: '🌧️',
  showers: '🌦️',
  cloudy: '☁️',
  clear: '☀️',
}

const PROVINCE_LEVEL_TEXT = {
  thunder: 'තදබල වැසි සහ අකුණු සහිත කුණාටු',
  heavy: 'තදබල වැසි',
  rainy: 'තරමක් සිට මධ්‍යම තරමේ වැසි',
  showers: 'තැනින් තැන ස්වල්ප වැසි',
  cloudy: 'බොහෝ දුරට අර්ධ වළාකුළු සහිත කාලගුණයක්',
  clear: 'බොහෝ දුරට පැහැදිලි හෝ අර්ධ වළාකුළු සහිත කාලගුණයක්',
}

function generateBulletinsDynamic(data, cityName) {
  if (!data) return BULLETINS

  const now = new Date()
  const timeStr = now.toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit' })
  const isRainy = data.precipProb >= 40 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(data.code)
  const isThunder = [95, 96, 99].includes(data.code)
  const isWindy = data.wind >= 30
  const isHeavy = [65, 82, 95, 96, 99].includes(data.code) || data.precipProb >= 70

  const location = cityName || 'ශ්‍රී ලංකාව'

  return [
    {
      id: Date.now(),
      type: 'morning',
      issuedBy: 'ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුව',
      time: timeStr,
      title: 'දිනපතා කාලගුණ තොරතුරු',
      content: isHeavy
        ? `${location} ප්‍රදේශය සඳහා තදබල වැසි සහ අකුණු අපේක්ෂා කෙරේ. වර්ෂා සම්භාවිතාව ${data.precipProb}%ක් වන අතර සුළඟ වේගය ${data.wind} km/h දක්වා විය හැකිය. අවධානයෙන් සිටින්න.`
        : isThunder
        ? `${location} ප්‍රදේශය සඳහා අකුණු සහිත කුණාටු තත්ත්වයක් අපේක්ෂා කෙරේ. පිටත ගමන් කිරීමේදී පරිස්සම් වන්න.`
        : isRainy
        ? `${location} ප්‍රදේශය සඳහා තරමක් වැසි සහ වළාකුළු සහිත කාලගුණයක් අපේක්ෂා කෙරේ. වර්ෂා සම්භාවිතාව ${data.precipProb}%ක් වන අතර උෂ්ණත්වය ${data.temp}°C පමණ කිව හැකිය.`
        : `${location} ප්‍රදේශය සඳහා ප්‍රධාන වශයෙන් වළාකුළු සහිත හෝ පැහැදිලි අහසක් සහිත කාලගුණයක් අපේක්ෂා කෙරේ. උෂ්ණත්වය ${data.temp}°C පමණ වන අතර ආර්ද්‍රතාවය ${data.humidity}%ක් පමණ වේ.`,
    },
    {
      id: Date.now() + 1,
      type: 'general',
      issuedBy: 'ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුව',
      time: timeStr,
      title: 'යාවත්කාලීන නිවේදනය',
      content: isWindy
        ? `සමහර ප්‍රදේශවල ප්‍රබල සුළං (${data.wind} km/h) ඇතිවිය හැකිය. වියළි ගස් අතු සහ පිටත තැබූ වස්තු සුරක්ෂිතව තබා ගැනීමට අවධානය යොමු කරන්න.`
        : isHeavy
        ? 'තදබල වැසි හේතුවෙන් ගංවතුර හා ජල ගැලීම් ඇතිවිය හැකිය. පහත් ප්‍රදේශවල වාසය කරන්නන් සැලකිලිමත් විය යුතුය.'
        : 'කාලගුණ තත්ත්වය නිරීක්ෂණය වෙමින් පවතින අතර අවශ්‍ය වන විට යාවත්කාලීන කරනු ලැබේ.',
    },
  ]
}

// Derive one condition level from a province's own daily forecast so the icon
// and the wording can never disagree.
function levelFromDaily(code, prob, sum) {
  if ([95, 96, 99].includes(code)) return 'thunder'
  if ([63, 65, 82].includes(code) || sum >= 15 || prob >= 80) return 'heavy'
  if ([51, 53, 55, 61, 80, 81].includes(code) || sum >= 2 || prob >= 50) return 'rainy'
  if ([45, 48, 3].includes(code) || prob >= 30) return 'cloudy'
  return 'clear'
}

function generateProvinceSummariesFromDaily(list) {
  if (!Array.isArray(list) || list.length !== PROVINCE_SUMMARIES.length) return PROVINCE_SUMMARIES

  return PROVINCE_SUMMARIES.map((p, index) => {
    const daily = list[index]?.daily
    const code = daily?.weather_code?.[0]
    if (typeof code !== 'number') return p

    const prob = Math.round(daily.precipitation_probability_max?.[0] ?? 0)
    const sum = Number(daily.precipitation_sum?.[0] ?? 0)
    const tMax = daily.temperature_2m_max?.[0]
    const tMin = daily.temperature_2m_min?.[0]
    const level = levelFromDaily(code, prob, sum)

    return {
      ...p,
      icon: PROVINCE_LEVEL_ICONS[level],
      forecast: `${p.areas} ප්‍රදේශවල ${PROVINCE_LEVEL_TEXT[level]} අපේක්ෂා කෙරේ.`,
      tempRange:
        typeof tMax === 'number' && typeof tMin === 'number'
          ? `${Math.round(tMin)} °C - ${Math.round(tMax)} °C`
          : p.tempRange,
    }
  })
}

export default function Weather() {
  const [city, setCity] = useState(CITIES[0])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const [remote, setRemote] = useState([])
  const [searching, setSearching] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [dynamicBulletins, setDynamicBulletins] = useState(null)
  const [dynamicSummaries, setDynamicSummaries] = useState(null)
  const [summariesAt, setSummariesAt] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [lastUpdate, setLastUpdate] = useState('--:--:--')
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState({ title: '', body: '' })
  const [isBulletinOpen, setIsBulletinOpen] = useState(true)
  const [warningActive, setWarningActive] = useState(false)
  const [warningMsg, setWarningMsg] = useState('')

  const intervalRef = useRef(null)
  const countdownRef = useRef(null)
  const comboRef = useRef(null)
  const inputRef = useRef(null)

  const q = normalize(query)

  const localResults = useMemo(() => {
    if (!q) return CITIES.slice(0, 40)
    return CITIES.filter((c) => normalize(c.label).includes(q)).slice(0, 60)
  }, [q])

  const results = useMemo(() => {
    const seen = new Set(localResults.map((c) => `${c.lat},${c.lon}`))
    return [...localResults, ...remote.filter((r) => !seen.has(`${r.lat},${r.lon}`))]
  }, [localResults, remote])
  // Reset the keyboard cursor whenever the typed filter changes.
  useEffect(() => {
    setHighlight(0)
  }, [q])

  // Any Sri Lankan town outside the bundled list is resolved through the
  // Open-Meteo geocoder, so the search box is never limited to a fixed list.
  useEffect(() => {
    const term = query.trim()
    if (term.length < 2 || localResults.length > 0) {
      setRemote([])
      setSearching(false)
      return undefined
    }

    const controller = new AbortController()
    setSearching(true)
    const timer = setTimeout(async () => {
      try {
        const url =
          'https://geocoding-api.open-meteo.com/v1/search?name=' +
          encodeURIComponent(term) +
          '&count=8&language=en&format=json&countryCode=LK'
        const res = await fetch(url, { signal: controller.signal })
        const json = await res.json()
        const seenNames = new Set()
        const found = (json.results || [])
          .filter((r) => r.country_code === 'LK' || r.country === 'Sri Lanka')
          .filter((r) => {
            const key = `${r.name}-${r.admin1 || ''}`
            if (seenNames.has(key)) return false
            seenNames.add(key)
            return true
          })
          .slice(0, 6)
          .map((r) => ({
            label: `${r.name} / ${r.name}`,
            sub: r.admin1 || 'ශ්‍රී ලංකාව',
            lat: r.latitude,
            lon: r.longitude,
          }))
        setRemote(found)
      } catch (err) {
        if (err.name !== 'AbortError') console.warn('geocoding failed', err)
      } finally {
        setSearching(false)
      }
    }, 350)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, localResults.length])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (comboRef.current && !comboRef.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const chooseCity = (next) => {
    setCity(next)
    setQuery('')
    setRemote([])
    setOpen(false)
    setHighlight(0)
    inputRef.current?.blur()
  }

  const onSearchKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setHighlight((h) => Math.min(h + 1, Math.max(results.length - 1, 0)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (event.key === 'Enter') {
      if (open && results[highlight]) {
        event.preventDefault()
        chooseCity(results[highlight])
      }
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // Province cards use their own daily forecast, so they stay correct
  // regardless of which city is selected in the search box.
  const fetchProvinceSummaries = async () => {
    try {
      const url = new URL('https://api.open-meteo.com/v1/forecast')
      url.searchParams.set('latitude', PROVINCE_SUMMARIES.map((p) => p.lat).join(','))
      url.searchParams.set('longitude', PROVINCE_SUMMARIES.map((p) => p.lon).join(','))
      url.searchParams.set(
        'daily',
        'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max'
      )
      url.searchParams.set('timezone', 'Asia/Colombo')
      url.searchParams.set('forecast_days', '1')

      const json = await fetchJsonWithRetry(url.toString())
      setDynamicSummaries(generateProvinceSummariesFromDaily(json))
      setSummariesAt(
        new Date().toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit', hour12: false })
      )
    } catch (err) {
      console.warn('province forecast failed', err)
    }
  }

  const fetchWeather = async () => {
    try {
      setLoading(true)
      setError('')
      const url = new URL('https://api.open-meteo.com/v1/forecast')
      url.searchParams.set('latitude', city.lat.toString())
      url.searchParams.set('longitude', city.lon.toString())
      url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation')
      url.searchParams.set('hourly', 'precipitation_probability,precipitation')
      url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum')
      url.searchParams.set('timezone', 'Asia/Colombo')
      url.searchParams.set('forecast_days', '3')

      const json = await fetchJsonWithRetry(url.toString())

      const current = json.current
      if (!current || typeof current.temperature_2m !== 'number') {
        throw new Error('Open-Meteo response is missing current weather data')
      }
      const hourly = json.hourly
      const daily = json.daily

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
        daily,
      })

      const cityName = city.label.split(' / ')[0]
      setDynamicBulletins(generateBulletinsDynamic({
        temp: Math.round(current.temperature_2m),
        humidity: current.relative_humidity_2m,
        wind: Math.round(current.wind_speed_10m),
        code: current.weather_code,
        precipProb: Math.round(nextProb),
      }, cityName))

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
          setWarningMsg('කාලගුණ විද්‍යා දෙපාර්තමේන්තු අනතුරු ඇඟවීමයි – තදබල වැසි හේතුවෙන් ගංවතුර හා ජල ගැලීම් ඇතිවිය හැකිය.')
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
            body: 'කෙටි කාලයකදී දැඩි වර්ෂාවක් විය හැකි අතර, මාර්ගවල ජල ගැලීම් හා ගංවතුර ඇතිවිය හැකිය. වාහන පදවන විට හා ගමන් කරන විට වඩාත් පරෙස්සමින් කටයුතු කරන්න.',
          })
        } else {
          setAlertText({
            title: 'ප්‍රබල සුළං නිවේදනයක් අපේක්ෂා කෙරේ',
            body: 'වියළි ගස් අතු, සුරක්ෂිත නොකළ ව්‍යුහයන් හා පිටත තැබූ වස්තු සුළඟට ගෙනයෑමේ අවදානම වැඩියි. නිවාස ආසන්නයේ දොරවල්, ජනේල හා සැරසිලි ආරක්ෂිතව තබා ගැනීමට අවධානය යොමු කරන්න.',
          })
        }
        setShowAlert(true)
      } else {
        setShowAlert(false)
      }
    } catch (err) {
      console.error(err)
      setError('සජීවී දත්ත ලබා ගැනීමට නොහැකි විය. නැවත උත්සාහ කරන්න.')
    } finally {
      setLoading(false)
      setCountdown(60)
    }
  }

  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = 'si'
    return () => {
      document.documentElement.lang = previous || 'en'
    }
  }, [])

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
  }, [city])

  // Daily province forecast changes slowly, so refresh it every 10 minutes
  // instead of on every 60 second city tick.
  useEffect(() => {
    fetchProvinceSummaries()
    const id = setInterval(fetchProvinceSummaries, 600000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const progress = (countdown / 60) * 100
  const bulletinTime = new Date().toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit' })

  return (
    <div lang="si" className="font-sinhala pt-32 md:pt-40">
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
                  <div ref={comboRef} className="relative w-full sm:w-[340px]">
                    <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 transition-colors focus-within:border-cyan-400/60">
                      <span className="text-sm text-slate-500" aria-hidden="true">🔍</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value)
                          setOpen(true)
                        }}
                        onFocus={() => setOpen(true)}
                        onKeyDown={onSearchKeyDown}
                        placeholder={`${city.label.split(' / ')[0]} — නගරය සොයන්න`}
                        aria-label="ශ්‍රී ලංකාවේ නගරයක් සොයන්න"
                        autoComplete="off"
                        spellCheck={false}
                        className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
                      />
                      <span className="pointer-events-none shrink-0 text-slate-500" aria-hidden="true">
                        {searching ? '…' : '▾'}
                      </span>
                    </div>

                    {open && (
                      <div className="absolute left-0 right-0 z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-700 bg-[#0b1324] p-1.5 shadow-2xl shadow-black/60">
                        {results.length === 0 && (
                          <p className="px-3 py-4 text-sm text-slate-400">
                            {searching
                              ? 'සොයමින්…'
                              : 'නගරයක් හමු නොවීය. ඉංග්‍රීසියෙන් නම ලියා බලන්න.'}
                          </p>
                        )}

                        {results.map((item, idx) => (
                          <button
                            key={`${item.label}-${item.lat}-${item.lon}`}
                            type="button"
                            onMouseEnter={() => setHighlight(idx)}
                            onClick={() => chooseCity(item)}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                              idx === highlight
                                ? 'bg-cyan-400/10 text-white'
                                : 'text-slate-300 hover:bg-slate-800/60'
                            }`}
                          >
                            <span className="truncate">{item.label.split(' / ')[0]}</span>
                            <span className="shrink-0 text-xs text-slate-500">
                              {item.sub || item.label.split(' / ')[1] || ''}
                            </span>
                          </button>
                        ))}

                        <p className="px-3 pb-1 pt-2 text-[11px] text-slate-600">
                          නගර 260+ · ලැයිස්තුවේ නැති නගරයක් නම් ඉංග්‍රීසියෙන් සොයන්න
                        </p>
                      </div>
                    )}
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
              <div className="flex items-end gap-3 sm:gap-4">
                <span className="font-display text-[6rem] font-semibold leading-none tracking-[-0.08em] text-white sm:text-[8rem] lg:text-[11rem] xl:text-[13rem]">
                  {loading ? '--' : data?.temp ?? '--'}
                </span>
                <span className="mb-3 text-3xl text-slate-500 sm:mb-5 sm:text-4xl lg:mb-7 lg:text-6xl xl:mb-9 xl:text-7xl">°C</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative grid h-24 w-24 place-items-center rounded-full bg-cyan-400/10 sm:h-32 sm:w-32">
                  <div className="absolute inset-4 rounded-full border border-cyan-400/40" />
                  <span className="text-5xl sm:text-6xl">{loading ? '⏳' : data?.info?.icon ?? '🌡️'}</span>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                    {loading ? 'දත්ත ලබාගනිමින්...' : data?.info?.title ?? 'දත්ත නොමැත'}
                  </p>
                  <p className="text-slate-400">සජීවී කාලගුණ දත්ත | Open-Meteo</p>
                </div>
              </div>
            </div>

            {error && !loading && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-400/50 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={fetchWeather}
                  className="rounded-full border border-amber-300/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 transition-colors hover:bg-amber-400/20"
                >
                  නැවත උත්සාහ කරන්න
                </button>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'ආර්ද්‍රතාවය', value: loading ? '--' : data?.humidity, unit: '%', icon: '💧', note: 'සාපේක්ෂ ආර්ද්‍රතාවය' },
                { label: 'සුළඟ වේගය', value: loading ? '--' : data?.wind, unit: 'km/h', icon: '💨', note: 'මීටර 10 උසින් මනින ලදී' },
                { label: 'වර්ෂා සම්භාවිතාව', value: loading ? '--' : data?.precipProb, unit: '%', icon: '🌧️', note: 'ඊළඟ පැය තුළ වැසි ඇතිවීමේ අවස්ථාව' },
                { label: 'වර්ෂා පරිමාව (අනුමානය)', value: loading ? '--' : data?.precipAmount, unit: 'mm', icon: '💦', note: 'ඊළඟ පැය තුළ අපේක්ෂිත වර්ෂාව' },
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
              {(dynamicBulletins || BULLETINS).map((bulletin) => (
                <article key={bulletin.id} className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                        {bulletin.type === 'morning' ? 'උදෑසන නිවේදනය' : bulletin.type === 'evening' ? 'සන්ධ්‍යා නිවේදනය' : 'සාමාන්‍ය යාවත්කාලීනය'}
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
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            අද දින දෛනික අනාවැකිය · Open-Meteo{summariesAt ? ` · ${summariesAt}` : ''}
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(dynamicSummaries || PROVINCE_SUMMARIES).map((province) => (
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
          මෙම පිටුව ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුවේ (Department of Meteorology, Sri Lanka) නිවේදන ආකෘතිය මත අනුකරණය කර නිර්මාණය කර ඇත. සැබෑ තත්ත්වයන් සඳහා නිශ්චිත තොරතුරු නිල වෙබ් අඩවියෙන් හෝ නිල ප්‍රකාශයන්ගෙන් අනිවාර්යයෙන්ම තහවුරු කරගන්න. | දත්ත මූලාශ්‍රය: Open-Meteo
        </p>
      </section>
    </div>
  )
}
