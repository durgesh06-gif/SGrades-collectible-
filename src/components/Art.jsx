import { useState } from "react"; // NEW

// Shows the lot's photo if item.image is set, otherwise an SVG drawing.
const gradeOf = (t) => (t.match(/(PSA|BGS|CGC) [\d.]+/) || ["AUTHENTIC"])[0];

const Slab = ({ grade, children, fill }) => (
  <g>
    <rect x="52" y="18" width="96" height="164" rx="6" fill="#e9eaee" />
    <rect x="58" y="24" width="84" height="22" rx="3" fill="#fff" />
    <text x="100" y="39" fontSize="10" fontWeight="700" textAnchor="middle" fill="#111318">{grade}</text>
    <rect x="60" y="52" width="80" height="122" rx="3" fill={fill} />
    {children}
    <rect x="60" y="158" width="80" height="16" fill="rgba(0,0,0,.45)" />
  </g>
);



const Ball = ({ t }) =>
  /LeBron|Jordan|Doncic/.test(t) ? (
    <g><circle cx="72" cy="72" r="12" fill="#e8742a" />
      <path d="M60 72H84M72 60V84M63 63Q72 72 63 81M81 63Q72 72 81 81" stroke="#3b1a08" strokeWidth="1.2" fill="none" /></g>
  ) : /Mantle|Maris/.test(t) ? (
    <g><circle cx="72" cy="72" r="12" fill="#fff" />
      <path d="M64 63Q69 72 64 81M80 63Q75 72 80 81" stroke="#d8352f" strokeWidth="1.5" fill="none" /></g>
  ) : null;

export default function Art({ item }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (item.image && !imageFailed) {
    return (
      <img
        src={item.image}
        alt={item.title}
        onError={() => setImageFailed(true)}
        style={{ objectFit: "contain" }}
      />
    );
  }

  // ---- everything below is your original drawing code, unchanged ----
  const { title: t, hue: h } = item;
  const g = gradeOf(t);
  let body;
  if (/Dollar/.test(t))
    body = (<g><circle cx="100" cy="100" r="74" fill="#d9d9de" stroke="#9a9ea8" strokeWidth="4" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="#9a9ea8" strokeWidth="2" strokeDasharray="3 4" />
      <circle cx="100" cy="92" r="16" fill="#9a9ea8" /><path d="M70 130Q100 96 130 130Z" fill="#9a9ea8" />
      <text x="100" y="150" fontSize="12" fontWeight="700" textAnchor="middle" fill="#6b6f78">1893-S</text></g>);
  else if (/Hot Wheels/.test(t))
    body = (<g><path d="M24 118L40 96Q54 76 80 74H118Q146 76 160 98L178 108V128H24Z" fill={`hsl(${h} 75% 48%)`} />
      <path d="M62 96L76 82H116L136 96Z" fill="#cfe9ff" />
      {[62, 142].map((x) => <g key={x}><circle cx={x} cy="130" r="16" fill="#111318" /><circle cx={x} cy="130" r="7" fill="#c9cbd2" /></g>)}</g>);
  else if (/Pok/.test(t))
    body = (<Slab grade={g} fill="#f2c94c">
      <path d="M100 66Q132 104 120 134Q114 152 100 154Q84 152 80 134Q76 108 100 66Z" fill="#e8472a" />
      <path d="M100 104Q114 124 108 140Q104 148 100 148Q94 146 92 138Q90 122 100 104Z" fill="#ffd23f" /></Slab>);
  else if (/Comic|Action Comics|Fantasy/.test(t))
    body = (<g><rect x="50" y="20" width="100" height="160" rx="3" fill="#f4ead0" />
      <rect x="56" y="26" width="88" height="148" fill={`hsl(${h} 70% 48%)`} />
      <rect x="56" y="26" width="88" height="26" fill="#d8352f" />
      <text x="100" y="45" fontSize="14" fontWeight="800" textAnchor="middle" fill="#fff">COMICS</text>
      <polygon points="100,70 112,92 138,88 124,110 142,130 116,128 100,152 84,128 58,130 76,110 62,88 88,92" fill="#ffd23f" />
      <text x="100" y="168" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">{g}</text></g>);
  else if (/Jersey/.test(t))
    body = (<g><path d="M70 30L90 22Q100 40 110 22L130 30L158 56L140 76L128 66V170H72V66L60 76L42 56Z" fill={`hsl(${h} 70% 46%)`} stroke="#fff" strokeWidth="2" />
      <text x="100" y="125" fontSize="44" fontWeight="800" textAnchor="middle" fill="#fff">23</text></g>);
  else
    body = (<Slab grade={g} fill={`hsl(${h} 60% 52%)`}>
      <circle cx="100" cy="96" r="14" fill="rgba(255,255,255,.85)" />
      <path d="M72 150Q100 108 128 150Z" fill="rgba(255,255,255,.85)" />
      <Ball t={t} /></Slab>);

  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label={t}>{body}</svg>
  );
}