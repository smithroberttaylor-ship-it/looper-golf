import { useState, useEffect, useRef, useCallback } from "react"; 
// ─── Icon System (Apple-style line icons) ───
function Icon({ name, size = 20, color = "currentColor" }) {
  const s = typeof size === "number" ? size : { sm: 16, md: 20, lg: 24, xl: 32 }[size] || 20;
  const paths = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
    brain: "M9.5 2a6.5 6.5 0 00-1.3 12.87A4 4 0 006 18.5V20h5v-5m3 5h5v-1.5a4 4 0 00-2.2-3.63A6.5 6.5 0 0014.5 2M12 15v5",
    flag: "M4 21V4m0 0l8 4 8-4v13l-8-4-8 4",
    target: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-6a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z",
    bag: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zm0 4h12M10 10a2 2 0 104 0",
    map: "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zm7-4v16m8-12v16",
    person: "M12 11a4 4 0 100-8 4 4 0 000 8zm-7 10a7 7 0 0114 0",
    link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
    chart: "M18 20V10m-6 10V4M6 20v-6",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z",
    alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01",
    dumbbell: "M6.5 6.5h11M2 10h2m16 0h2M4 10v4m16-4v4M4 14H2m20 0h-2M6.5 17.5h11M7 6v12m10-12v12",
    sync: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15",
    check: "M20 6L9 17l-5-5",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z",
    "star-empty": "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z",
    plus: "M12 5v14m-7-7h14",
    close: "M18 6L6 18M6 6l12 12",
    "chevron-down": "M6 9l6 6 6-6",
    "chevron-up": "M18 15l-6-6-6 6",
    mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10a7 7 0 01-14 0m7 7v3m-4 0h8",
    video: "M23 7l-7 5 7 5V7zM14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z",
    heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
    signal: "M2 20h.01M7 20v-4m5 4v-8m5 8V8m5 12V4",
    gamepad: "M6 11h4m-2-2v4m7-1h.01M18 11h.01M7 21h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4z",
    watch: "M12 8v4l2 2m6-4a8 8 0 11-16 0 8 8 0 0116 0zM8 2.5V6m8-3.5V6M8 18v3.5m8-3.5v3.5",
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-2 1v5h5",
    location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zm-6 0a3 3 0 11-6 0 3 3 0 016 0z",
    clock: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4v6l4 2",
    sun: "M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.64-6.36l-.7.7M6.34 17.66l-.7.7m0-12.72l.7.7m11.32 11.32l.7.7M12 7a5 5 0 100 10 5 5 0 000-10z",
    moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
    golf: "M12 18V2l7 4-7 4m-5 8a5 5 0 0010 0",
  };
  const filled = name === "star" || name === "heart" || name === "moon";
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth={filled ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}>
      <path d={paths[name] || paths.flag} />
    </svg>
  );
}
// ─── Storage helpers ───
const STORAGE_KEYS = {
  rounds: "looper-rounds",
  practice: "looper-practice",
  clubs: "looper-clubs",
  health: "looper-health",
  profile: "looper-profile",
  coaching: "looper-coaching-history",
  courses: "looper-courses",
  roundNotes: "looper-round-notes",
  drills: "looper-drills",
  theme: "looper-theme",
  user: "looper-user",
};
async function loadData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
async function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error:", e);
  }
}
// ─── Default Data ───
const DEFAULT_CLUBS = [];
const DEFAULT_COURSES = [];
const DEFAULT_ROUNDS = [];
const DEFAULT_PRACTICE = [];
const DEFAULT_HEALTH = { steps: 0, restingHR: 0, hrv: 0, sleep: 0, activeCalories: 0, weeklyTrend: [] };
// ─── Utility Functions ───
function calcHandicap(rounds) {
  if (!rounds || rounds.length === 0) return "N/A";
  const diffs = rounds.map((r) => ((r.score - r.par) * 113) / (r.slope || 113));
  const sorted = [...diffs].sort((a, b) => a - b);
  const count = Math.max(1, Math.floor(sorted.length * 0.4));
  const best = sorted.slice(0, count);
  const avg = best.reduce((s, v) => s + v, 0) / best.length;
  return Math.max(0, avg * 0.96).toFixed(1);
}
function formatDate(d) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function sgColor(val) {
  if (val > 0.5) return "#22c55e";
  if (val > 0) return "#86efac";
  if (val > -0.5) return "#fbbf24";
  if (val > -1) return "#f97316";
  return "#ef4444";
}
function trendArrow(vals) {
  if (vals.length < 2) return "→";
  const recent = vals.slice(-3);
  const avg = recent.reduce((s, v) => s + v, 0) / recent.length;
  const older = vals.slice(0, -3);
  if (older.length === 0) return "→";
  const oldAvg = older.reduce((s, v) => s + v, 0) / older.length;
  if (avg < oldAvg - 0.5) return "↓";
  if (avg > oldAvg + 0.5) return "↑";
  return "→";
}
// ─── Mini Chart Component ───
function MiniBarChart({ data, color = "#6ee7b7", height = 60, label }) {
  const max = Math.max(...data.map(Math.abs), 1);
  return (
    <div style={{ marginTop: 8 }}>
      {label && <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
            <div
              style={{
                height: `${(Math.abs(v) / max) * 100}%`,
                minHeight: 3,
                backgroundColor: v >= 0 ? "#22c55e" : "#ef4444",
                borderRadius: "3px 3px 0 0",
                opacity: 0.8 + (i / data.length) * 0.2,
                transition: "height 0.5s ease",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
function SparkLine({ data, color = "#6ee7b7", width = 120, height = 40 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(data.length - 1) / (data.length - 1) * width} cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2} r="3" fill={color} />
    </svg>
  );
}
// ─── Map Component ───
// Pre-computed SVG path outlines (171-pt US, detailed continents)
const MAP_PATHS = {
  us: "M46.4,32.6L47.8,40.7L67.5,38.7L73.1,38.7L73.1,20.4L112.5,20.4L154.7,20.4L168.8,20.4L210.9,20.4L253.1,20.4L295.3,20.4L336.1,20.4L393.8,20.4L433.1,20.4L461.2,20.4L461.2,12.2L468.3,26.5L499.2,32.6L521.7,36.7L541.4,40.7L556.9,34.6L568.1,44.8L576.6,53.0L583.6,69.3L604.7,71.3L608.9,71.3L615.9,77.4L625.8,81.5L617.3,101.9L625.8,116.1L639.8,142.6L641.2,156.9L631.4,163.0L625.8,169.1L637.0,175.2L653.9,173.1L668.0,167.0L677.8,158.9L689.1,146.7L690.5,144.6L720.0,130.4L728.4,120.2L745.3,105.9L767.8,101.9L794.5,101.9L805.8,93.7L815.6,75.4L828.3,57.0L846.6,59.1L857.8,89.6L857.8,105.9L843.8,114.1L832.5,116.1L818.4,126.3L812.8,130.4L804.4,144.6L807.2,160.9L815.6,163.0L815.6,169.1L805.8,173.1L798.8,173.1L787.5,177.2L773.4,185.4L763.6,189.4L759.4,193.5L759.4,213.9L752.3,224.1L745.3,228.1L738.3,244.4L734.1,260.7L731.2,266.9L732.7,273.0L727.0,283.1L734.1,293.3L738.3,301.5L724.2,311.7L715.8,311.7L704.5,321.9L694.7,328.0L686.2,338.1L676.4,350.4L663.8,364.6L659.5,376.9L656.7,387.0L658.1,401.3L659.5,417.6L666.6,431.9L669.4,448.1L673.6,468.5L675.0,482.8L673.6,493.0L670.8,505.2L660.9,515.4L649.7,517.4L646.9,513.3L646.9,478.7L645.5,468.5L638.4,452.2L635.6,431.9L632.8,425.7L624.4,409.4L618.8,407.4L614.5,409.4L599.1,413.5L586.4,399.3L569.5,401.3L561.1,403.3L551.2,403.3L544.2,403.3L541.4,403.3L540.0,417.6L542.8,423.7L548.4,427.8L542.8,429.8L534.4,425.7L530.2,421.7L520.3,419.6L511.9,415.6L506.2,415.6L492.2,413.5L480.9,413.5L471.1,417.6L464.1,427.8L457.0,433.9L443.0,438.0L435.9,452.2L433.1,468.5L431.7,480.7L433.1,488.9L430.3,490.9L421.9,486.9L407.8,480.7L400.8,458.3L388.1,433.9L374.1,411.5L361.4,409.4L351.6,427.8L337.5,421.7L327.7,415.6L324.8,395.2L303.7,370.7L300.9,366.7L278.4,370.7L278.4,380.9L237.7,380.9L188.4,352.4L153.3,356.5L150.5,344.3L135.0,332.0L133.6,325.9L120.9,317.8L105.5,315.7L104.1,303.5L91.4,281.1L85.8,273.0L81.6,264.8L78.7,254.6L77.3,248.5L70.3,244.4L63.3,230.2L59.1,215.9L54.8,203.7L50.6,187.4L53.4,167.0L49.2,150.7L52.0,136.5L54.8,110.0L56.2,91.7L57.7,77.4L54.8,65.2L46.4,32.6Z",
  northAmerica: "M30.0,37.2L47.5,43.4L57.5,40.3L70.0,74.4L77.5,71.3L95.0,74.4L112.5,83.7L117.5,89.9L122.5,99.2L130.0,105.4L137.5,111.5L140.0,123.9L140.0,133.2L150.0,151.8L157.5,158.0L170.0,164.2L180.0,164.2L190.0,170.4L200.0,179.7L207.5,179.7L207.5,173.5L215.0,167.3L225.0,170.4L227.5,170.4L237.5,167.3L242.5,167.3L245.0,176.6L250.0,182.8L247.5,182.8L250.0,176.6L250.0,161.1L260.0,151.8L265.0,136.3L275.0,130.1L282.5,120.8L282.5,114.6L290.0,114.6L300.0,114.6L312.5,114.6L320.0,114.6L307.5,99.2L302.5,111.5L292.5,120.8L285.0,123.9L282.5,123.9L280.0,111.5L275.0,117.7L267.5,120.8L252.5,127.0L242.5,130.1L240.0,117.7L230.0,111.5L220.0,111.5L212.5,108.5L212.5,99.2L227.5,93.0L245.0,86.8L252.5,83.7L260.0,80.6L270.0,77.5L275.0,65.1L280.0,74.4L295.0,77.5L305.0,89.9L312.5,99.2L317.5,83.7L300.0,68.2L287.5,52.7L295.0,31.0L270.0,15.5L245.0,24.8L235.0,40.3L220.0,37.2L212.5,43.4L200.0,37.2L185.0,43.4L162.5,37.2L147.5,40.3L130.0,37.2L107.5,34.1L82.5,43.4L62.5,37.2L45.0,37.2L30.0,37.2Z",
  southAmerica: "M245.0,232.4L257.5,235.5L267.5,223.1L280.0,223.1L292.5,226.2L300.0,235.5L312.5,241.7L320.0,247.9L325.0,254.1L327.5,260.3L330.0,266.5L340.0,269.6L347.5,269.6L355.0,275.8L362.5,278.9L362.5,291.3L357.5,300.6L352.5,306.8L350.0,316.1L347.5,325.4L342.5,331.5L337.5,334.6L330.0,343.9L325.0,350.1L320.0,362.5L317.5,365.6L307.5,371.8L295.0,381.1L287.5,387.3L287.5,396.6L282.5,402.8L280.0,415.2L270.0,421.4L262.5,424.5L275.0,430.7L280.0,427.6L287.5,421.4L285.0,405.9L280.0,393.5L275.0,384.2L270.0,371.8L272.5,353.2L275.0,343.9L275.0,331.5L275.0,316.1L262.5,306.8L257.5,291.3L255.0,275.8L250.0,266.5L250.0,257.2L255.0,247.9L257.5,238.6L245.0,232.4Z",
  europe: "M425.0,148.7L435.0,145.6L445.0,148.7L450.0,142.5L457.5,127.0L455.0,117.7L450.0,114.6L445.0,111.5L437.5,111.5L425.0,123.9L425.0,111.5L430.0,99.2L437.5,99.2L442.5,93.0L435.0,86.8L442.5,80.6L450.0,80.6L457.5,86.8L465.0,93.0L470.0,93.0L472.5,89.9L475.0,83.7L480.0,86.8L480.0,80.6L485.0,86.8L490.0,89.9L495.0,89.9L500.0,93.0L505.0,89.9L510.0,74.4L515.0,74.4L520.0,74.4L525.0,68.2L520.0,55.8L512.5,46.5L500.0,43.4L490.0,46.5L480.0,55.8L475.0,68.2L470.0,80.6L462.5,80.6L450.0,74.4L445.0,74.4L437.5,80.6L430.0,93.0L425.0,99.2L425.0,123.9L425.0,148.7Z",
  africa: "M407.5,213.8L407.5,198.3L410.0,185.9L417.5,173.5L425.0,161.1L435.0,151.8L445.0,148.7L450.0,148.7L462.5,145.6L475.0,145.6L480.0,154.9L475.0,161.1L480.0,167.3L487.5,161.1L500.0,161.1L512.5,161.1L525.0,164.2L530.0,164.2L535.0,167.3L540.0,167.3L545.0,173.5L555.0,204.5L557.5,223.1L565.0,235.5L570.0,244.8L575.0,254.1L575.0,266.5L570.0,278.9L560.0,297.5L555.0,309.9L550.0,316.1L545.0,322.3L540.0,334.6L537.5,347.0L532.5,353.2L525.0,365.6L520.0,365.6L515.0,362.5L505.0,365.6L495.0,353.2L490.0,347.0L485.0,334.6L480.0,316.1L480.0,291.3L475.0,272.7L475.0,260.3L470.0,247.9L460.0,244.8L450.0,241.7L440.0,244.8L430.0,244.8L425.0,235.5L415.0,229.3L410.0,223.1L407.5,213.8Z",
  asia: "M525.0,151.8L530.0,145.6L537.5,145.6L545.0,142.5L550.0,136.3L555.0,130.1L562.5,130.1L570.0,136.3L575.0,142.5L580.0,148.7L587.5,173.5L595.0,185.9L605.0,182.8L612.5,182.8L620.0,185.9L630.0,198.3L640.0,213.8L645.0,235.5L650.0,229.3L660.0,210.7L670.0,192.1L675.0,192.1L680.0,198.3L690.0,210.7L695.0,216.9L700.0,223.1L705.0,235.5L710.0,254.1L712.5,260.3L720.0,272.7L725.0,285.1L735.0,285.1L745.0,278.9L750.0,266.5L755.0,254.1L760.0,241.7L765.0,235.5L770.0,223.1L775.0,198.3L770.0,179.7L775.0,167.3L780.0,154.9L787.5,148.7L800.0,142.5L805.0,123.9L812.5,111.5L807.5,99.2L800.0,99.2L787.5,111.5L775.0,123.9L770.0,130.1L762.5,136.3L750.0,130.1L737.5,123.9L730.0,111.5L720.0,99.2L710.0,89.9L700.0,86.8L687.5,80.6L670.0,74.4L650.0,58.9L630.0,43.4L612.5,37.2L595.0,37.2L580.0,49.6L570.0,74.4L555.0,93.0L550.0,111.5L540.0,130.1L530.0,142.5L525.0,151.8Z",
  australia: "M735.0,328.5L740.0,322.3L745.0,313.0L752.5,303.7L765.0,300.6L775.0,297.5L782.5,297.5L790.0,297.5L795.0,303.7L800.0,309.9L805.0,297.5L810.0,303.7L815.0,309.9L820.0,322.3L825.0,334.6L830.0,347.0L832.5,353.2L827.5,365.6L820.0,378.0L815.0,381.1L805.0,378.0L800.0,371.8L795.0,368.7L790.0,371.8L785.0,368.7L780.0,362.5L770.0,359.4L760.0,365.6L745.0,368.7L737.5,365.6L735.0,353.2L735.0,340.8L732.5,334.6L735.0,328.5Z",
  greenland: "M312.5,74.4L325.0,71.3L337.5,68.2L345.0,62.0L355.0,55.8L375.0,43.4L390.0,31.0L405.0,24.8L400.0,18.6L390.0,12.4L370.0,6.2L345.0,3.1L325.0,6.2L310.0,12.4L295.0,18.6L280.0,24.8L270.0,31.0L280.0,43.4L300.0,55.8L312.5,74.4Z",
};
const WORLD_KEYS = ["northAmerica","southAmerica","europe","africa","asia","australia","greenland"];
function GolfMap({ courses, mapView }) {
  const isUS = mapView === "us";
  const w = 900, h = isUS ? 550 : 440;
  // Projection functions calibrated to match pre-computed SVG paths
  const toX = isUS
    ? (lng) => 14.063 * lng + 1799.8
    : (lng) => 2.5 * lng + 450;
  const toY = isUS
    ? (lat) => -20.9 * lat + 1044.2
    : (lat) => -3.098 * lat + 260.3;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", maxHeight: 440 }}>
      <rect width={w} height={h} fill="#080818" rx="14" />
      {/* Subtle grid */}
      {isUS ? (
        <>
          {[-120,-110,-100,-90,-80,-70].map((lng) => <line key={lng} x1={toX(lng)} y1={10} x2={toX(lng)} y2={h-10} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />)}
          {[25,30,35,40,45,50].map((lat) => <line key={lat} x1={10} y1={toY(lat)} x2={w-10} y2={toY(lat)} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />)}
        </>
      ) : (
        <>
          {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map((lng) => <line key={lng} x1={toX(lng)} y1={10} x2={toX(lng)} y2={h-10} stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />)}
          {[-40,-20,0,20,40,60].map((lat) => <line key={lat} x1={10} y1={toY(lat)} x2={w-10} y2={toY(lat)} stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />)}
        </>
      )}
      <defs>
        <radialGradient id="glow-green"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.5"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0"/></radialGradient>
        <radialGradient id="glow-gold"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5"/><stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/></radialGradient>
      </defs>
      {/* Land outlines */}
      {isUS ? (
        <path d={MAP_PATHS.us} fill="rgba(34,197,94,0.06)" stroke="rgba(110,231,183,0.18)" strokeWidth="1.5" strokeLinejoin="round" />
      ) : (
        WORLD_KEYS.map((k) => <path key={k} d={MAP_PATHS[k]} fill="rgba(34,197,94,0.05)" stroke="rgba(110,231,183,0.15)" strokeWidth="1" strokeLinejoin="round" />)
      )}
      {/* Course dots */}
      {courses.filter((c) => mapView === "world" || c.country === "US").map((c) => {
        const cx = toX(c.lng), cy = toY(c.lat);
        const isPlayed = c.played;
        const r = isPlayed ? 4 + (c.rating || 0) * 1.2 : 5;
        return (
          <g key={c.id}>
            <circle cx={cx} cy={cy} r={r * 3} fill={isPlayed ? "url(#glow-green)" : "url(#glow-gold)"} />
            <circle cx={cx} cy={cy} r={r} fill={isPlayed ? "#22c55e" : "#fbbf24"} stroke={isPlayed ? "#15803d" : "#a16207"} strokeWidth="1.5" opacity="0.9">
              <animate attributeName="r" values={`${r};${r*1.15};${r}`} dur="3s" repeatCount="indefinite" />
            </circle>
            <text x={cx} y={cy - r - 8} textAnchor="middle" fill="#d1d5db" fontSize={isUS ? "10" : "8"} fontFamily="DM Sans, sans-serif" fontWeight="500" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>{c.name}</text>
          </g>
        );
      })}
      {/* Legend */}
      <g transform={`translate(${w - 120},${h - 50})`}>
        <rect x="-8" y="-8" width="110" height="44" rx="8" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <circle cx={6} cy={8} r={4} fill="#22c55e" /><text x={16} y={12} fill="#9ca3af" fontSize="10" fontFamily="DM Sans, sans-serif">Played</text>
        <circle cx={6} cy={26} r={4} fill="#fbbf24" /><text x={16} y={30} fill="#9ca3af" fontSize="10" fontFamily="DM Sans, sans-serif">Wishlist</text>
      </g>
    </svg>
  );
}
// ─── Add Course Modal ───
function AddCourseModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", city: "", state: "", country: "US", lat: 40, lng: -90, played: false, rating: 0, wishlist: true, notes: "", rank: 0 });
  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }}>
      <div style={{ backgroundColor: "#1a1a2e", borderRadius: 16, padding: 32, width: "90%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff", marginBottom: 24, fontSize: 22 }}>Add Course</h3>
        {[{ label: "Course Name", key: "name", ph: "e.g., Augusta National" }, { label: "City", key: "city", ph: "e.g., Augusta" }, { label: "State/Region", key: "state", ph: "e.g., GA" }].map(({ label, key, ph }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
            <input value={form[key]} placeholder={ph} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Country</label>
            <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} style={inputStyle}>
              {["US", "UK", "CA", "IE", "AU", "JP", "ES", "PT", "MX", "Other"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Status</label>
            <select value={form.played ? "played" : "wishlist"} onChange={(e) => setForm({ ...form, played: e.target.value === "played", wishlist: e.target.value !== "played" })} style={inputStyle}>
              <option value="played">Played</option>
              <option value="wishlist">Want to Play</option>
            </select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Latitude</label>
            <input type="number" step="0.01" value={form.lat} onChange={(e) => setForm({ ...form, lat: +e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Longitude</label>
            <input type="number" step="0.01" value={form.lng} onChange={(e) => setForm({ ...form, lng: +e.target.value })} style={inputStyle} />
          </div>
        </div>
        {form.played && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Rating ({form.rating}/5)</label>
            <div style={{ display: "flex", gap: 6 }}>{[1,2,3,4,5].map((s) => (
              <button key={s} onClick={() => setForm({ ...form, rating: s })} style={{ width: 36, height: 36, borderRadius: 8, border: "none", backgroundColor: s <= form.rating ? "#fbbf24" : "rgba(255,255,255,0.06)", color: s <= form.rating ? "#000" : "#6b7280", fontSize: 16, cursor: "pointer" }}>{s}</button>
            ))}</div>
          </div>
        )}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "transparent", color: "#9ca3af", fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { onAdd({ ...form, id: `cs${Date.now()}`, lastPlayed: form.played ? new Date().toISOString().split("T")[0] : null }); onClose(); }}
            style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Add Course</button>
        </div>
      </div>
    </div>
  );
}
// ─── Coach AI Component ───
function CoachChat({ practice, rounds, clubs, health, roundNotes, onAddRoundNote }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm your Looper coach. I have access to all your practice data, round history, strokes gained stats, club setup, and health metrics. You can also dictate post-round notes or upload a swing video for analysis. What would you like to work on?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoInputRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const startDictation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setMessages((m) => [...m, { role: "assistant", content: "Speech recognition is not supported in this browser. Try Chrome or Edge." }]); return; }
    const recognition = new SpeechRecognition();
    recognition.continuous = true; recognition.interimResults = true; recognition.lang = "en-US";
    let finalText = "";
    recognition.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript + " ";
        else interim += e.results[i][0].transcript;
      }
      setTranscript(finalText + interim);
    };
    recognition.onerror = () => { setIsRecording(false); };
    recognition.onend = () => { setIsRecording(false); };
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setTranscript("");
  };
  const stopDictation = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
    if (transcript.trim()) {
      const closestRound = rounds.reduce((best, r) => {
        const diff = Math.abs(new Date(r.date) - new Date());
        return diff < Math.abs(new Date(best.date) - new Date()) ? r : best;
      }, rounds[0]);
      const note = { id: `rn${Date.now()}`, roundId: closestRound?.id, date: new Date().toISOString().split("T")[0], transcript: transcript.trim(), matched: !!closestRound };
      if (onAddRoundNote) onAddRoundNote(note);
      setMessages((m) => [...m,
        { role: "user", content: `Post-round notes (matched to ${closestRound?.course || "most recent round"} on ${closestRound ? formatDate(closestRound.date) : "N/A"}):\n\n"${transcript.trim()}"` },
        { role: "assistant", content: `Got it! I've saved your post-round notes and matched them to your round at ${closestRound?.course || "your most recent round"} (${closestRound ? formatDate(closestRound.date) : ""}). I'll factor these observations into my analysis. Want me to break down that round with your notes in mind?` },
      ]);
      setTranscript("");
    }
  };
  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    const sgApproachAvg = rounds.length > 0 ? (rounds.reduce((s, r) => s + r.sgApproach, 0) / rounds.length) : 0;
    const sgOffTeeAvg = rounds.length > 0 ? (rounds.reduce((s, r) => s + r.sgOffTee, 0) / rounds.length) : 0;
    let focusArea = "overall swing mechanics";
    if (sgApproachAvg < sgOffTeeAvg) focusArea = "iron contact and approach accuracy";
    else if (sgOffTeeAvg < sgApproachAvg) focusArea = "driver path and face angle at impact";
    setMessages((m) => [...m,
      { role: "user", content: `Uploaded swing video: ${file.name}` },
      { role: "assistant", content: `I can see your swing video! Based on your strokes gained data, I'm particularly looking at your ${focusArea}.\n\nHere's what I'd focus on:\n\n1. **Setup & Alignment** — Check your stance width and ball position relative to your target line\n2. **Takeaway** — Watch for early wrist hinge or inside path in the first 18 inches\n3. **Top of Backswing** — Look for proper shoulder turn (90°+) and wrist position\n4. **Transition** — This is where most amateur strokes are lost. Watch for lower body leading the downswing\n5. **Impact** — Hands ahead of the clubhead, shaft leaning forward\n6. **Follow Through** — Full extension toward the target\n\nFor a detailed computer vision analysis, consider uploading to a platform like V1 Sports or Sportsbox AI. Want me to suggest specific drills based on what you're feeling in your swing?` },
    ]);
  };
  const buildContext = () => {
    const handicap = calcHandicap(rounds);
    const recentRounds = rounds.slice(0, 5);
    const recentPractice = practice.slice(0, 5);
    const inBag = clubs.filter((c) => c.inBag);
    return `You are Looper, an expert golf coach and analyst. You have the following data about the player:
HANDICAP: ${handicap}
RECENT ROUNDS (most recent first):
${recentRounds.map((r) => `- ${r.date} | ${r.course} | Score: ${r.score} (par ${r.par}) | Putts: ${r.putts} | FW: ${r.fairways} | GIR: ${r.gir} | SG Total: ${r.sgTotal} | SG Putting: ${r.sgPutting} | SG Approach: ${r.sgApproach} | SG Off Tee: ${r.sgOffTee} | SG Around Green: ${r.sgAround}`).join("\n")}
RECENT PRACTICE (most recent first):
${recentPractice.map((p) => `- ${p.date} | ${p.type} | ${p.duration}min | Focus: ${p.focus} | Notes: ${p.notes} | Self-rating: ${p.rating}/10`).join("\n")}
CLUBS IN BAG: ${inBag.map((c) => `${c.name} (${c.brand} ${c.model}, ${c.loft})`).join(", ")}
HEALTH DATA:
- Today's Steps: ${health.steps} | Resting HR: ${health.restingHR}bpm | HRV: ${health.hrv}ms | Sleep: ${health.sleep}hrs | Active Calories: ${health.activeCalories}
${roundNotes && roundNotes.length > 0 ? `\nPOST-ROUND DICTATION NOTES:\n${roundNotes.slice(0, 5).map((n) => `- ${n.date} | Round: ${n.roundId || "unmatched"} | Notes: "${n.transcript}"`).join("\n")}` : ""}
Provide specific, actionable coaching advice. Reference the player's actual data. Be conversational but knowledgeable. Use strokes gained analysis to identify weaknesses. Consider health data when relevant (fatigue, recovery). Keep responses focused and practical.`;
  };
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = newMessages.map((m) => ({ role: m.role, content: m.content }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildContext(),
          messages: apiMessages,
        }),
      });
      const data = await response.json();
      const text = data.content?.map((c) => c.text || "").join("") || "I couldn't process that. Try again!";
      setMessages([...newMessages, { role: "assistant", content: text }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Connection issue — please try again." }]);
    }
    setLoading(false);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 0" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 16 }}>
            <div
              style={{
                maxWidth: "80%",
                padding: "14px 18px",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                backgroundColor: m.role === "user" ? "#166534" : "rgba(255,255,255,0.06)",
                color: m.role === "user" ? "#dcfce7" : "#e5e7eb",
                fontSize: 14,
                lineHeight: 1.6,
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "pre-wrap",
                border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
            <div style={{ padding: "14px 18px", borderRadius: "18px 18px 18px 4px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#6ee7b7", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      {/* Recording UI */}
      {isRecording && (
        <div style={{ padding: "12px 16px", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ef4444", animation: "pulse 1s infinite" }} />
            <span style={{ fontSize: 13, color: "#fca5a5", fontWeight: 600 }}>Recording post-round notes...</span>
            <button onClick={stopDictation} style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: 8, border: "none", backgroundColor: "#ef4444", color: "#fff", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Stop & Save</button>
          </div>
          {transcript && <div style={{ fontSize: 13, color: "#e5e7eb", fontStyle: "italic", lineHeight: 1.5 }}>"{transcript}"</div>}
        </div>
      )}
      {/* Video player */}
      {videoUrl && (
        <div style={{ marginBottom: 8, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          <video src={videoUrl} controls style={{ width: "100%", maxHeight: 240, backgroundColor: "#000" }} />
          <button onClick={() => setVideoUrl(null)} style={{ width: "100%", padding: "6px", border: "none", backgroundColor: "rgba(255,255,255,0.04)", color: "#6b7280", fontSize: 11, cursor: "pointer" }}>Dismiss video</button>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button onClick={startDictation} disabled={isRecording} title="Dictate post-round notes"
          style={{ padding: "14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: isRecording ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)", color: isRecording ? "#fca5a5" : "#9ca3af", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="mic" size={18} color="currentColor" /></button>
        <button onClick={() => videoInputRef.current?.click()} title="Upload swing video"
          style={{ padding: "14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)", color: "#9ca3af", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="video" size={18} color="currentColor" /></button>
        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: "none" }} />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask your coach anything..."
          style={{
            flex: 1, padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)",
            color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: "14px 24px", borderRadius: 14, border: "none", backgroundColor: loading ? "#374151" : "#166534",
            color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: loading ? "default" : "pointer",
            transition: "all 0.2s",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
// ─── Import Modals ───
function ImportPracticeModal({ onClose, onImport }) {
  const [form, setForm] = useState({ date: new Date().toISOString().split("T")[0], type: "Range", duration: 60, focus: "", notes: "", ballsHit: 0, rating: 5 });
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }}>
      <div style={{ backgroundColor: "#1a1a2e", borderRadius: 16, padding: 32, width: "90%", maxWidth: 480, border: "1px solid rgba(255,255,255,0.1)" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff", marginBottom: 24, fontSize: 22 }}>Log Practice Session</h3>
        {[
          { label: "Date", key: "date", type: "date" },
          { label: "Duration (min)", key: "duration", type: "number" },
          { label: "Focus Area", key: "focus", type: "text", placeholder: "e.g., Iron Accuracy" },
          { label: "Balls Hit", key: "ballsHit", type: "number" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
            <input
              type={type} value={form[key]} placeholder={placeholder}
              onChange={(e) => setForm({ ...form, [key]: type === "number" ? +e.target.value : e.target.value })}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
            {["Range", "Short Game", "Putting", "Simulator", "Playing Lesson"].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Rating ({form.rating}/10)</label>
          <input type="range" min={1} max={10} value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })}
            style={{ width: "100%", accentColor: "#22c55e" }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "transparent", color: "#9ca3af", fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { onImport({ ...form, id: `p${Date.now()}` }); onClose(); }}
            style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Save Session</button>
        </div>
      </div>
    </div>
  );
}
function ImportRoundModal({ onClose, onImport }) {
  const [form, setForm] = useState({ date: new Date().toISOString().split("T")[0], course: "", score: 72, par: 72, putts: 30, fairways: "7/14", gir: "9/18", sgTotal: 0, sgPutting: 0, sgApproach: 0, sgOffTee: 0, sgAround: 0, holes: 18, tees: "Blue", rating: 72.0, slope: 130 });
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }}>
      <div style={{ backgroundColor: "#1a1a2e", borderRadius: 16, padding: 32, width: "90%", maxWidth: 520, maxHeight: "85vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff", marginBottom: 24, fontSize: 22 }}>Log Round</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Date", key: "date", type: "date", span: 2 },
            { label: "Course", key: "course", type: "text", span: 2, placeholder: "e.g., Maple Bluff CC" },
            { label: "Score", key: "score", type: "number" },
            { label: "Par", key: "par", type: "number" },
            { label: "Putts", key: "putts", type: "number" },
            { label: "Holes", key: "holes", type: "number" },
            { label: "Fairways", key: "fairways", type: "text", placeholder: "8/14" },
            { label: "GIR", key: "gir", type: "text", placeholder: "9/18" },
            { label: "Tees", key: "tees", type: "text" },
            { label: "Rating", key: "rating", type: "number" },
            { label: "Slope", key: "slope", type: "number" },
            { label: "SG Total", key: "sgTotal", type: "number" },
            { label: "SG Putting", key: "sgPutting", type: "number" },
            { label: "SG Approach", key: "sgApproach", type: "number" },
            { label: "SG Off Tee", key: "sgOffTee", type: "number" },
            { label: "SG Around Green", key: "sgAround", type: "number" },
          ].map(({ label, key, type, span, placeholder }) => (
            <div key={key} style={{ gridColumn: span === 2 ? "1 / -1" : undefined }}>
              <label style={{ display: "block", fontSize: 11, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
              <input type={type} value={form[key]} placeholder={placeholder}
                onChange={(e) => setForm({ ...form, [key]: type === "number" ? +e.target.value : e.target.value })}
                step={type === "number" && key.startsWith("sg") ? "0.1" : undefined}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "transparent", color: "#9ca3af", fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { onImport({ ...form, id: `r${Date.now()}` }); onClose(); }}
            style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Save Round</button>
        </div>
      </div>
    </div>
  );
}
function AddClubModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", brand: "", model: "", loft: "", category: "Irons", inBag: true, estimatedValue: 0, addTo: "bag" });
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }}>
      <div style={{ backgroundColor: "#1a1a2e", borderRadius: 16, padding: 32, width: "90%", maxWidth: 440, border: "1px solid rgba(255,255,255,0.1)" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff", marginBottom: 24, fontSize: 22 }}>Add Club</h3>
        {[
          { label: "Club Name", key: "name", placeholder: "e.g., 3 Iron" },
          { label: "Brand", key: "brand", placeholder: "e.g., Titleist" },
          { label: "Model", key: "model", placeholder: "e.g., T200" },
          { label: "Loft", key: "loft", placeholder: "e.g., 21°" },
        ].map(({ label, key, placeholder }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
            <input value={form[key]} placeholder={placeholder} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
              {["Woods", "Hybrids", "Irons", "Wedges", "Putter"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Add To</label>
            <select value={form.addTo} onChange={(e) => setForm({ ...form, addTo: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
              <option value="bag">My Bag</option>
              <option value="inventory">Inventory</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, color: "#9ca3af", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Est. Used Market Value ($)</label>
          <input type="number" value={form.estimatedValue} onChange={(e) => setForm({ ...form, estimatedValue: +e.target.value })} placeholder="0"
            style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "transparent", color: "#9ca3af", fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { onAdd({ ...form, id: `c${Date.now()}`, inBag: form.addTo === "bag" }); onClose(); }}
            style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>Add Club</button>
        </div>
      </div>
    </div>
  );
}
// ─── Create Drill Modal ───
function CreateDrillModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Putting");
  const [description, setDescription] = useState("");
  const [metric, setMetric] = useState("made");
  const [target, setTarget] = useState("");
  const categories = ["Putting", "Chipping", "Pitching", "Bunker", "Approach", "Driving", "Full Swing", "Other"];
  const metrics = [
    { value: "made", label: "Made / Total (e.g. 7/10)" },
    { value: "score", label: "Score (numeric)" },
    { value: "percentage", label: "Percentage (%)" },
    { value: "distance", label: "Distance (ft / yds)" },
    { value: "time", label: "Time (minutes)" },
  ];
  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate({
      id: "drill-" + Date.now(),
      name: name.trim(),
      category,
      description: description.trim(),
      metric,
      target: target ? Number(target) : null,
      results: [],
      createdAt: new Date().toISOString(),
    });
    onClose();
  };
  const labelStyle = { fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6, display: "block" };
  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" };
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 480, backgroundColor: "#1a1a2e", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", padding: 28, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, color: "#e5e7eb" }}>Create New Drill</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Drill Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. 3-4-5ft Putting Ladder" style={inputStyle} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tracking Metric</label>
            <select value={metric} onChange={(e) => setMetric(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {metrics.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Target (optional)</label>
          <input value={target} onChange={(e) => setTarget(e.target.value)} type="number" placeholder={metric === "made" ? "e.g. 8 (out of 10)" : metric === "percentage" ? "e.g. 80" : "Target value"} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Description / Instructions</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the drill steps, distances, rules..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <button onClick={handleSubmit} disabled={!name.trim()} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", backgroundColor: name.trim() ? "#166534" : "#1f2937", color: name.trim() ? "#fff" : "#6b7280", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: name.trim() ? "pointer" : "default" }}>
          Create Drill
        </button>
      </div>
    </div>
  );
}
// ─── Log Drill Result Modal ───
function DrillResultModal({ drill, onClose, onLog }) {
  const [made, setMade] = useState("");
  const [total, setTotal] = useState("10");
  const [score, setScore] = useState("");
  const [notes, setNotes] = useState("");
  const [drillDate, setDrillDate] = useState(new Date().toISOString().slice(0, 10));
  const handleSubmit = () => {
    let value;
    if (drill.metric === "made") {
      value = { made: Number(made) || 0, total: Number(total) || 10 };
    } else {
      value = Number(score) || 0;
    }
    onLog(drill.id, {
      id: "dr-" + Date.now(),
      date: new Date(drillDate + "T12:00:00").toISOString(),
      value,
      notes: notes.trim(),
    });
    onClose();
  };
  const labelStyle = { fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6, display: "block" };
  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" };
  const metricLabels = { made: "Made / Total", score: "Score", percentage: "Percentage (%)", distance: "Distance", time: "Time (min)" };
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 420, backgroundColor: "#1a1a2e", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#e5e7eb" }}>Log Result</h3>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{drill.name}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        {drill.metric === "made" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Made</label>
              <input value={made} onChange={(e) => setMade(e.target.value)} type="number" placeholder="7" style={inputStyle} autoFocus />
            </div>
            <div>
              <label style={labelStyle}>Out of</label>
              <input value={total} onChange={(e) => setTotal(e.target.value)} type="number" placeholder="10" style={inputStyle} />
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>{metricLabels[drill.metric] || "Value"}</label>
            <input value={score} onChange={(e) => setScore(e.target.value)} type="number" placeholder="Enter value" style={inputStyle} autoFocus />
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Date</label>
          <input value={drillDate} onChange={(e) => setDrillDate(e.target.value)} type="date" style={{ ...inputStyle, colorScheme: "dark" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Notes (optional)</label>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did it feel? Anything notable?" style={inputStyle} />
        </div>
        {drill.target && (
          <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>Target: </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6ee7b7" }}>{drill.target}{drill.metric === "percentage" ? "%" : drill.metric === "made" ? ` / ${total}` : ""}</span>
          </div>
        )}
        <button onClick={handleSubmit} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
          Log Result
        </button>
      </div>
    </div>
  );
}
// ─── Main App ───
export default function App() {
  const [tab, setTab] = useState("home");
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS);
  const [practice, setPractice] = useState(DEFAULT_PRACTICE);
  const [clubs, setClubs] = useState(DEFAULT_CLUBS);
  const [health] = useState(DEFAULT_HEALTH);
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [roundNotes, setRoundNotes] = useState([]);
  const [drills, setDrills] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [showClubModal, setShowClubModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showDrillModal, setShowDrillModal] = useState(false);
  const [showDrillResultModal, setShowDrillResultModal] = useState(null);
  const [expandedDrill, setExpandedDrill] = useState(null);
  const [mapView, setMapView] = useState("us");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const [savedRounds, savedPractice, savedClubs, savedCourses, savedNotes, savedDrills, savedTheme, savedUser] = await Promise.all([
        loadData(STORAGE_KEYS.rounds),
        loadData(STORAGE_KEYS.practice),
        loadData(STORAGE_KEYS.clubs),
        loadData(STORAGE_KEYS.courses),
        loadData(STORAGE_KEYS.roundNotes),
        loadData(STORAGE_KEYS.drills),
        loadData(STORAGE_KEYS.theme),
        loadData(STORAGE_KEYS.user),
      ]);
      if (savedRounds) setRounds(savedRounds);
      if (savedPractice) setPractice(savedPractice);
      if (savedClubs) setClubs(savedClubs);
      if (savedCourses) setCourses(savedCourses);
      if (savedNotes) setRoundNotes(savedNotes);
      if (savedDrills) setDrills(savedDrills);
      if (savedTheme) setTheme(savedTheme);
      if (savedUser) setUser(savedUser);
      setLoaded(true);
    })();
  }, []);
  useEffect(() => {
    if (loaded) {
      saveData(STORAGE_KEYS.rounds, rounds);
      saveData(STORAGE_KEYS.practice, practice);
      saveData(STORAGE_KEYS.clubs, clubs);
      saveData(STORAGE_KEYS.courses, courses);
      saveData(STORAGE_KEYS.roundNotes, roundNotes);
      saveData(STORAGE_KEYS.drills, drills);
      saveData(STORAGE_KEYS.theme, theme);
      saveData(STORAGE_KEYS.user, user);
    }
  }, [rounds, practice, clubs, courses, roundNotes, drills, theme, user, loaded]);
  const handicap = calcHandicap(rounds);
  const inBagClubs = clubs.filter((c) => c.inBag);
  const inventoryClubs = clubs.filter((c) => !c.inBag);
  const tabs = [
    { id: "home", label: "Dashboard", icon: "home" },
    { id: "coach", label: "Coach", icon: "brain" },
    { id: "rounds", label: "Rounds", icon: "flag" },
    { id: "practice", label: "Practice", icon: "target" },
    { id: "bag", label: "My Bag", icon: "bag" },
    { id: "courses", label: "Courses", icon: "map" },
    { id: "account", label: "Account", icon: "person" },
  ];
  const avgScore = rounds.length > 0 ? (rounds.reduce((s, r) => s + r.score, 0) / rounds.length).toFixed(1) : "—";
  const avgSG = rounds.length > 0 ? (rounds.reduce((s, r) => s + r.sgTotal, 0) / rounds.length).toFixed(1) : "—";
  const isDark = theme === "dark";
  const T = {
    bg: isDark ? "#0a0a0f" : "#f2f2f7",
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    cardBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    cardHover: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: isDark ? "#f5f5f7" : "#1d1d1f",
    textPrimary: isDark ? "#e5e5ea" : "#1d1d1f",
    textSecondary: isDark ? "#8e8e93" : "#6e6e73",
    textMuted: isDark ? "#636366" : "#8e8e93",
    textFaint: isDark ? "#48484a" : "#c7c7cc",
    border: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    borderLight: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    inputBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    hoverBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    modalBg: isDark ? "#1c1c1e" : "#ffffff",
    scrollThumb: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    selectBg: isDark ? "#1c1c1e" : "#ffffff",
    accent: "#30d158",
    accentDark: "#248a3d",
    accentSoft: isDark ? "rgba(48,209,88,0.12)" : "rgba(36,138,61,0.08)",
  };
  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.bg, color: T.text, fontFamily: "'DM Sans', sans-serif", transition: "background-color 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.scrollThumb}; border-radius: 3px; }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        .card { background: ${T.cardBg}; border: 1px solid ${T.cardBorder}; border-radius: 12px; padding: 24px; animation: fadeIn 0.35s ease; transition: border-color 0.2s, background 0.2s; }
        .card:hover { border-color: ${T.cardHover}; }
        .tab-btn { padding: 8px 14px; border-radius: 8px; border: none; background: transparent; color: ${T.textSecondary}; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
        .tab-btn.active { background: ${T.accentSoft}; color: ${T.accent}; }
        .tab-btn:hover:not(.active) { background: ${T.hoverBg}; color: ${T.textPrimary}; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: ${isDark ? "invert(1)" : "none"}; }
        select option { background: ${T.selectBg}; color: ${T.text}; }
      `}</style>
      {/* Header */}
      <header style={{ padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="golf" size={20} color="#ffffff" /></div>
          <div>
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>
              Looper
            </h1>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 10, backgroundColor: T.inputBg, border: `1px solid ${T.cardBorder}` }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          <span style={{ fontSize: 12, color: T.textSecondary }}>HCP</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{handicap}</span>
        </div>
      </header>
      {/* Navigation */}
      <nav style={{ padding: "12px 28px", display: "flex", gap: 6, overflowX: "auto", borderBottom: `1px solid ${T.borderLight}` }}>
        {tabs.map((t) => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <Icon name={t.icon} size={16} color="currentColor" /> {t.label}
          </button>
        ))}
      </nav>
      {/* Content */}
      <main style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {/* ═══ HOME DASHBOARD ═══ */}
        {tab === "home" && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            {/* Key Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Handicap Index", value: handicap, sub: `Trend: ${trendArrow(rounds.map((r) => r.score - r.par))} ${rounds.length > 2 ? (parseFloat(handicap) < 10 ? "Single digits!" : "") : ""}`, color: T.accent },
                { label: "Avg Score", value: avgScore, sub: `Last ${rounds.length} rounds`, color: T.textPrimary },
                { label: "Avg Strokes Gained", value: avgSG, sub: "vs scratch golfer", color: parseFloat(avgSG) >= 0 ? T.accent : "#ef4444" },
                { label: "Practice Sessions", value: practice.length, sub: `${practice.filter((p) => { const d = new Date(p.date); const w = new Date(); w.setDate(w.getDate() - 7); return d >= w; }).length} this week`, color: T.textPrimary },
              ].map((stat, i) => (
                <div key={i} className="card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>{stat.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 600, color: stat.color, fontFamily: "'DM Sans', sans-serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{stat.sub}</div>
                </div>
              ))}
            </div>
            {/* Strokes Gained Breakdown */}
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}>Strokes Gained Breakdown</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
                {[
                  { label: "Off the Tee", key: "sgOffTee" },
                  { label: "Approach", key: "sgApproach" },
                  { label: "Around Green", key: "sgAround" },
                  { label: "Putting", key: "sgPutting" },
                ].map((cat) => {
                  const vals = rounds.map((r) => r[cat.key]);
                  const avg = vals.length > 0 ? (vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(2) : 0;
                  return (
                    <div key={cat.key} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>{cat.label}</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: sgColor(parseFloat(avg)), fontFamily: "'DM Sans', sans-serif" }}>{avg > 0 ? "+" : ""}{avg}</div>
                      <MiniBarChart data={vals.slice(-5).reverse()} height={40} />
                      <div style={{ fontSize: 10, color: "#6b7280", marginTop: 6 }}>Last {Math.min(5, vals.length)} rounds</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Recent Activity + Health Side by Side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="card">
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}>Recent Rounds</h3>
                {rounds.slice(0, 3).map((r, i) => (
                  <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb" }}>{r.course}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{formatDate(r.date)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{r.score}</div>
                      <div style={{ fontSize: 11, color: sgColor(r.sgTotal) }}>SG: {r.sgTotal > 0 ? "+" : ""}{r.sgTotal}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <Icon name="heart" size={20} color="#ef4444" />
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#e5e7eb" }}>Health & Recovery</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { label: "Steps", value: health.steps.toLocaleString(), icon: "shoe" },
                    { label: "Resting HR", value: `${health.restingHR} bpm`, icon: "heart" },
                    { label: "HRV", value: `${health.hrv} ms`, icon: "chart" },
                    { label: "Sleep", value: `${health.sleep} hrs`, icon: "moon" },
                  ].map((item) => (
                    <div key={item.label} style={{ padding: 12, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{item.icon} {item.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#e5e7eb", marginTop: 4 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6 }}>Weekly HRV Trend</div>
                  <SparkLine data={health.weeklyTrend.map((d) => d.hrv)} color="#818cf8" width={280} height={36} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {health.weeklyTrend.map((d) => (
                      <span key={d.day} style={{ fontSize: 9, color: "#6b7280" }}>{d.day}</span>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(129, 140, 248, 0.08)", border: "1px solid rgba(129, 140, 248, 0.15)" }}>
                  <div style={{ fontSize: 12, color: "#a5b4fc" }}>
                    {health.hrv > 45 ? "<Icon name=\"check\" size={14} color=\"#22c55e\" /> Recovery looks good — solid day for competitive play or intense practice." : "Warning: HRV is below average — consider lighter practice today."}
                  </div>
                </div>
              </div>
            </div>
            {/* Score Trend */}
            <div className="card" style={{ marginTop: 16 }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}>Score Trend</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
                {[...rounds].reverse().map((r, i) => {
                  const diff = r.score - r.par;
                  const maxDiff = Math.max(...rounds.map((x) => Math.abs(x.score - x.par)), 1);
                  const h = (Math.abs(diff) / maxDiff) * 80 + 20;
                  return (
                    <div key={r.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: diff <= 0 ? "#22c55e" : diff <= 5 ? "#fbbf24" : "#ef4444" }}>{r.score}</div>
                      <div style={{ width: "100%", height: h, borderRadius: "6px 6px 0 0", backgroundColor: diff <= 0 ? "#22c55e" : diff <= 5 ? "#fbbf24" : "#ef4444", opacity: 0.7, transition: "height 0.5s ease" }} />
                      <div style={{ fontSize: 9, color: "#6b7280" }}>{formatDate(r.date)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {/* ═══ COACH TAB ═══ */}
        {tab === "coach" && (
          <div style={{ height: "calc(100vh - 160px)", animation: "fadeIn 0.4s ease" }}>
            <CoachChat practice={practice} rounds={rounds} clubs={clubs} health={health} roundNotes={roundNotes} onAddRoundNote={(note) => setRoundNotes([note, ...roundNotes])} />
          </div>
        )}
        {/* ═══ ROUNDS TAB ═══ */}
        {tab === "rounds" && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: "#e5e7eb" }}>Rounds & Strokes Gained</h2>
                <p style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>Track your competitive rounds and strokes gained data. Connect sources in <span onClick={() => setTab("account")} style={{ color: "#6ee7b7", cursor: "pointer", textDecoration: "underline" }}>Account</span>.</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowRoundModal(true)}
                  style={{ padding: "10px 18px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                  + Log Round
                </button>
              </div>
            </div>
            {/* SG Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Total", key: "sgTotal" },
                { label: "Off Tee", key: "sgOffTee" },
                { label: "Approach", key: "sgApproach" },
                { label: "Around Green", key: "sgAround" },
                { label: "Putting", key: "sgPutting" },
              ].map((cat) => {
                const avg = rounds.length > 0 ? (rounds.reduce((s, r) => s + r[cat.key], 0) / rounds.length).toFixed(2) : "0.00";
                return (
                  <div key={cat.key} className="card" style={{ textAlign: "center", padding: 16 }}>
                    <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{cat.label}</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: sgColor(parseFloat(avg)), fontFamily: "'DM Sans', sans-serif", marginTop: 6 }}>
                      {parseFloat(avg) > 0 ? "+" : ""}{avg}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Rounds Table */}
            <div className="card">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Date", "Course", "Score", "Putts", "FW", "GIR", "SG Total", "SG Putt", "SG App", "SG Tee", "SG Around"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid rgba(255,255,255,0.08)", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rounds.map((r, i) => (
                      <tr key={r.id} style={{ animation: `slideIn 0.3s ease ${i * 0.05}s both` }}>
                        <td style={{ padding: "12px", fontSize: 13, color: "#9ca3af", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{formatDate(r.date)}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: "#e5e7eb", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.course}</td>
                        <td style={{ padding: "12px", fontSize: 15, color: "#fff", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.score}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: "#9ca3af", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.putts}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: "#9ca3af", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.fairways}</td>
                        <td style={{ padding: "12px", fontSize: 13, color: "#9ca3af", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{r.gir}</td>
                        {[r.sgTotal, r.sgPutting, r.sgApproach, r.sgOffTee, r.sgAround].map((sg, j) => (
                          <td key={j} style={{ padding: "12px", fontSize: 13, fontWeight: 600, color: sgColor(sg), borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            {sg > 0 ? "+" : ""}{sg.toFixed(1)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* ═══ PRACTICE TAB ═══ */}
        {tab === "practice" && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: "#e5e7eb" }}>Practice Log</h2>
                <p style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>Track sessions manually or auto-import. Manage connections in <span onClick={() => setTab("account")} style={{ color: "#6ee7b7", cursor: "pointer", textDecoration: "underline" }}>Account</span>.</p>
              </div>
              <button onClick={() => setShowPracticeModal(true)}
                style={{ padding: "10px 18px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                + Log Session
              </button>
            </div>
            {/* ── Recent Simulator Imports (sample auto-imported data) ── */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#e5e7eb" }}>Recent Imports</h3>
                <button style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "transparent", color: "#6ee7b7", fontSize: 12, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="sync" size={14} color="currentColor" /> Sync Now
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { source: "Awesome Golf", icon: "gamepad", color: "#22c55e", date: "Feb 14", type: "Virtual Round — Pebble Beach", shots: 72, avgCarry: "238 yds", avgClubSpeed: "108 mph", avgBallSpeed: "162 mph", avgSmash: "1.50", topClub: "Driver" },
                  { source: "TrackMan", icon: "chart", color: "#3b82f6", date: "Feb 13", type: "Range Session — Iron Work", shots: 85, avgCarry: "162 yds", avgClubSpeed: "87 mph", avgBallSpeed: "121 mph", avgSmash: "1.39", topClub: "7 Iron" },
                  { source: "Awesome Golf", icon: "gamepad", color: "#22c55e", date: "Feb 11", type: "Skills Challenge — Closest to Pin", shots: 40, avgCarry: "145 yds", avgClubSpeed: "82 mph", avgBallSpeed: "115 mph", avgSmash: "1.40", topClub: "9 Iron" },
                  { source: "TrackMan", icon: "chart", color: "#3b82f6", date: "Feb 9", type: "Range Session — Driver Tuning", shots: 48, avgCarry: "255 yds", avgClubSpeed: "112 mph", avgBallSpeed: "168 mph", avgSmash: "1.50", topClub: "Driver" },
                ].map((imp, i) => (
                  <div key={i} style={{
                    padding: "14px 18px", borderRadius: 12, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    animation: `slideIn 0.3s ease ${i * 0.06}s both`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={imp.icon} size={16} color={imp.color} /></div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb" }}>{imp.type}</div>
                          <div style={{ fontSize: 11, color: "#6b7280" }}>via {imp.source} · {imp.date}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 6, backgroundColor: "rgba(34,197,94,0.1)" }}>
                        <span style={{ fontSize: 10, color: "#6ee7b7" }}><Icon name="check" size={12} color="#6ee7b7" /> Auto-imported</span>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
                      {[
                        { label: "Shots", value: imp.shots },
                        { label: "Avg Carry", value: imp.avgCarry },
                        { label: "Club Speed", value: imp.avgClubSpeed },
                        { label: "Ball Speed", value: imp.avgBallSpeed },
                        { label: "Smash Factor", value: imp.avgSmash },
                        { label: "Primary Club", value: imp.topClub },
                      ].map((stat) => (
                        <div key={stat.label} style={{ textAlign: "center", padding: "8px 4px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.02)" }}>
                          <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 3 }}>{stat.label}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb" }}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Practice Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Total Sessions", value: practice.length + 20, color: "#6ee7b7", sub: "manual + imported" },
                { label: "Total Hours", value: (practice.reduce((s, p) => s + p.duration, 0) / 60 + 14.5).toFixed(1), color: "#fbbf24", sub: "all sources" },
                { label: "Avg Rating", value: (practice.reduce((s, p) => s + p.rating, 0) / practice.length).toFixed(1) + "/10", color: T.textPrimary, sub: "self-assessed" },
                { label: "Balls Hit", value: (practice.reduce((s, p) => s + p.ballsHit, 0) + 245).toLocaleString(), sub: "range + sim", color: T.textPrimary },
                { label: "Avg Carry", value: "198 yds", color: T.accent, sub: "all clubs avg" },
                { label: "Avg Smash", value: "1.44", color: T.textPrimary, sub: "launch monitor" },
              ].map((stat, i) => (
                <div key={i} className="card" style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 600, color: stat.color, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>{stat.sub}</div>
                </div>
              ))}
            </div>
            {/* Practice by Type — updated to include sim categories */}
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}>Time by Category</h3>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { type: "Range", mins: practice.filter((p) => p.type === "Range").reduce((s, p) => s + p.duration, 0), color: "#22c55e" },
                  { type: "Short Game", mins: practice.filter((p) => p.type === "Short Game").reduce((s, p) => s + p.duration, 0), color: "#fbbf24" },
                  { type: "Putting", mins: practice.filter((p) => p.type === "Putting").reduce((s, p) => s + p.duration, 0), color: "#818cf8" },
                  { type: "Sim Rounds", mins: 185, color: "#f472b6" },
                  { type: "Sim Practice", mins: 120, color: "#a855f7" },
                  { type: "Launch Monitor", mins: 210, color: "#3b82f6" },
                  { type: "Lessons", mins: practice.filter((p) => p.type === "Playing Lesson").reduce((s, p) => s + p.duration, 0), color: "#06b6d4" },
                ].map((item) => {
                  const allMins = 135 + 85 + 30 + 185 + 120 + 210 + 0;
                  const pct = allMins > 0 ? (item.mins / allMins) * 100 : 0;
                  return (
                    <div key={item.type} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ height: 80, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                        <div style={{ width: "65%", height: `${Math.max(pct, 4)}%`, backgroundColor: item.color, borderRadius: "5px 5px 0 0", opacity: 0.8, transition: "height 0.5s" }} />
                      </div>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 6 }}>{item.type}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#e5e7eb" }}>{item.mins}m</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ── My Drills ── */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="target" size={20} color={T.textSecondary} />
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#e5e7eb" }}>My Drills</h3>
                    <p style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{drills.length} drill{drills.length !== 1 ? "s" : ""} · Track your progress over time</p>
                  </div>
                </div>
                <button onClick={() => setShowDrillModal(true)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                  + New Drill
                </button>
              </div>
              {drills.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 20px", borderRadius: 12, backgroundColor: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}>
                  <div style={{ marginBottom: 10 }}><Icon name="dumbbell" size={32} color={T.textMuted} /></div>
                  <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 6 }}>No drills yet</div>
                  <div style={{ fontSize: 12, color: "#4b5563" }}>Create a drill to start tracking your practice progress</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {drills.map((drill, di) => {
                    const isExpanded = expandedDrill === drill.id;
                    const results = drill.results || [];
                    const lastResult = results.length > 0 ? results[results.length - 1] : null;
                    const categoryIcons = { Putting: "target", Chipping: "flag", Pitching: "flag", Bunker: "alert", Approach: "target", Driving: "golf", "Full Swing": "dumbbell", Other: "file" };
                    const formatValue = (val) => {
                      if (drill.metric === "made" && val && typeof val === "object") return `${val.made}/${val.total}`;
                      if (drill.metric === "percentage") return `${val}%`;
                      if (drill.metric === "distance") return `${val}`;
                      if (drill.metric === "time") return `${val} min`;
                      return `${val}`;
                    };
                    const getNumericValue = (val) => {
                      if (drill.metric === "made" && val && typeof val === "object") return val.total > 0 ? (val.made / val.total) * 100 : 0;
                      return typeof val === "number" ? val : 0;
                    };
                    const trend = results.length >= 2 ? getNumericValue(results[results.length - 1].value) - getNumericValue(results[results.length - 2].value) : 0;
                    return (
                      <div key={drill.id} style={{ borderRadius: 14, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", animation: `slideIn 0.3s ease ${di * 0.05}s both` }}>
                        {/* Drill Header — clickable */}
                        <div onClick={() => setExpandedDrill(isExpanded ? null : drill.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", cursor: "pointer", transition: "background 0.2s" }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                            <Icon name={categoryIcons[drill.category] || "file"} size={18} color={T.accent} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb" }}>{drill.name}</span>
                              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, backgroundColor: "rgba(255,255,255,0.05)", color: "#6b7280" }}>{drill.category}</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                              {results.length} result{results.length !== 1 ? "s" : ""}{lastResult ? ` · Last: ${formatValue(lastResult.value)}` : ""}
                              {trend !== 0 && results.length >= 2 && (
                                <span style={{ marginLeft: 6, color: trend > 0 ? "#22c55e" : "#ef4444", fontSize: 11 }}>
                                  {trend > 0 ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}{drill.metric === "made" || drill.metric === "percentage" ? "%" : ""}
                                </span>
                              )}
                            </div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setShowDrillResultModal(drill); }} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(34,197,94,0.25)", backgroundColor: "rgba(34,197,94,0.08)", color: "#6ee7b7", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                            + Log
                          </button>
                          <span style={{ fontSize: 14, color: "#4b5563", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                        </div>
                        {/* Expanded Detail */}
                        {isExpanded && (
                          <div style={{ padding: "0 18px 16px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                            {drill.description && <p style={{ fontSize: 12, color: "#6b7280", padding: "12px 0 8px", lineHeight: 1.5, fontStyle: "italic" }}>{drill.description}</p>}
                            {/* Mini progress chart */}
                            {results.length > 1 && (
                              <div style={{ marginTop: 8, marginBottom: 12 }}>
                                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Progress</div>
                                <svg viewBox={`0 0 ${Math.max(results.length - 1, 1) * 60 + 40} 60`} style={{ width: "100%", height: 60 }}>
                                  {(() => {
                                    const vals = results.map((r) => getNumericValue(r.value));
                                    const mn = Math.min(...vals), mx = Math.max(...vals);
                                    const rng = mx - mn || 1;
                                    const pts = vals.map((v, i) => `${i * 60 + 20},${55 - ((v - mn) / rng) * 45}`).join(" ");
                                    return (
                                      <>
                                        {drill.target && (() => {
                                          const ty = 55 - ((drill.target - mn) / rng) * 45;
                                          return <line x1="0" y1={ty} x2={vals.length * 60} y2={ty} stroke="rgba(251,191,36,0.3)" strokeWidth="1" strokeDasharray="4,3" />;
                                        })()}
                                        <polyline points={pts} fill="none" stroke="rgba(110,231,183,0.5)" strokeWidth="2" strokeLinejoin="round" />
                                        {vals.map((v, i) => <circle key={i} cx={i * 60 + 20} cy={55 - ((v - mn) / rng) * 45} r="3" fill="#6ee7b7" />)}
                                      </>
                                    );
                                  })()}
                                </svg>
                              </div>
                            )}
                            {/* Results list */}
                            <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>History</div>
                            {results.length === 0 ? (
                              <div style={{ fontSize: 12, color: "#4b5563", padding: "10px 0" }}>No results yet — tap "+ Log" to record your first attempt.</div>
                            ) : (
                              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                                {[...results].reverse().map((r, ri) => (
                                  <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: ri < results.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                      <span style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb", minWidth: 60 }}>{formatValue(r.value)}</span>
                                      {r.notes && <span style={{ fontSize: 11, color: "#6b7280" }}>{r.notes}</span>}
                                    </div>
                                    <span style={{ fontSize: 11, color: "#4b5563" }}>{new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {/* Delete drill */}
                            <button onClick={() => { if (confirm("Delete this drill and all its results?")) setDrills(drills.filter((d) => d.id !== drill.id)); }} style={{ marginTop: 12, padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", backgroundColor: "rgba(239,68,68,0.06)", color: "#ef4444", fontSize: 11, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                              Delete Drill
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Manual Practice Sessions List */}
            <div className="card">
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}>Manual Session History</h3>
              {practice.map((p, i) => (
                <div key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 0", borderBottom: i < practice.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", animation: `slideIn 0.3s ease ${i * 0.05}s both` }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {{ Range: "target", "Short Game": "flag", Putting: "target", Simulator: "chart", "Playing Lesson": "file" }[p.type] || "golf"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#e5e7eb" }}>{p.type} — {p.focus}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{formatDate(p.date)}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{p.notes}</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                      <span style={{ fontSize: 12, color: "#6b7280" }}><Icon name="clock" size={14} color="#6b7280" /> {p.duration}min</span>
                      {p.ballsHit > 0 && <span style={{ fontSize: 12, color: "#6b7280" }}><Icon name="golf" size={14} color="#6b7280" /> {p.ballsHit} balls</span>}
                      <span style={{ fontSize: 12, color: "#fbbf24" }}><Icon name="star" size={14} color="#fbbf24" /> {p.rating}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* ═══ BAG TAB ═══ */}
        {tab === "bag" && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: "#e5e7eb" }}>My Bag & Inventory</h2>
                <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{inBagClubs.length} clubs in bag · {inventoryClubs.length} in inventory · {14 - inBagClubs.length} slots remaining</p>
              </div>
              <button onClick={() => setShowClubModal(true)}
                style={{ padding: "10px 18px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                + Add Club
              </button>
            </div>
            {/* Bag Capacity Bar */}
            <div className="card" style={{ marginBottom: 24, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Bag Capacity</span>
                <span style={{ fontSize: 12, color: inBagClubs.length > 14 ? "#ef4444" : "#6ee7b7", fontWeight: 600 }}>{inBagClubs.length}/14</span>
              </div>
              <div style={{ height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(inBagClubs.length / 14) * 100}%`, backgroundColor: inBagClubs.length > 14 ? "#ef4444" : "#22c55e", borderRadius: 4, transition: "width 0.5s ease" }} />
              </div>
            </div>
            {/* In Bag */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}><Icon name="bag" size={18} color={T.accent} /> In My Bag</h3>
              {["Woods", "Hybrids", "Irons", "Wedges", "Putter"].map((cat) => {
                const catClubs = inBagClubs.filter((c) => c.category === cat);
                if (catClubs.length === 0) return null;
                return (
                  <div key={cat} style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>{cat}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                      {catClubs.map((c) => (
                        <div key={c.id} style={{ padding: "12px 16px", borderRadius: 12, backgroundColor: "rgba(34, 197, 94, 0.06)", border: "1px solid rgba(34, 197, 94, 0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb" }}>{c.name}</div>
                            <div style={{ fontSize: 12, color: "#6b7280" }}>{c.brand} {c.model} · {c.loft}</div>
                          </div>
                          <button onClick={() => setClubs(clubs.map((cl) => cl.id === c.id ? { ...cl, inBag: false } : cl))}
                            style={{ padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "transparent", color: "#9ca3af", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Inventory */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#e5e7eb" }}><Icon name="file" size={18} color={T.accent} /> Inventory</h3>
                <button onClick={() => setShowClubModal(true)} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "transparent", color: "#6ee7b7", fontSize: 12, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>+ Add to Inventory</button>
              </div>
              {inventoryClubs.length > 0 && (
                <>
                  {/* Total value summary */}
                  <div style={{ padding: "12px 16px", borderRadius: 10, backgroundColor: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon name="target" size={16} color={T.accent} />
                      <span style={{ fontSize: 13, color: "#fbbf24", fontWeight: 600 }}>Estimated Inventory Value</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22, fontWeight: 600, color: T.textPrimary, fontFamily: "'DM Sans', sans-serif" }}>
                        ${inventoryClubs.reduce((s, c) => s + (c.estimatedValue || 0), 0).toLocaleString()}
                      </span>
                      <span style={{ fontSize: 10, color: "#6b7280", padding: "2px 6px", borderRadius: 4, backgroundColor: "rgba(255,255,255,0.04)" }}>via Golf Market API <Icon name="settings" size={10} color="#6b7280" /></span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                    {inventoryClubs.map((c) => (
                      <div key={c.id} style={{ padding: "12px 16px", borderRadius: 12, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#9ca3af" }}>{c.name}</div>
                            <div style={{ fontSize: 12, color: "#6b7280" }}>{c.brand} {c.model} · {c.loft}</div>
                          </div>
                          {c.estimatedValue > 0 && (
                            <div style={{ padding: "4px 10px", borderRadius: 8, backgroundColor: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: "#fbbf24" }}>${c.estimatedValue}</div>
                              <div style={{ fontSize: 9, color: "#92400e" }}>used market</div>
                            </div>
                          )}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button onClick={() => setClubs(clubs.map((cl) => cl.id === c.id ? { ...cl, inBag: true } : cl))}
                            style={{ flex: 1, padding: "6px 10px", borderRadius: 8, border: "none", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#6ee7b7", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                            Add to Bag
                          </button>
                          <button onClick={() => setClubs(clubs.filter((cl) => cl.id !== c.id))}
                            style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", backgroundColor: "transparent", color: "#f87171", fontSize: 11, cursor: "pointer" }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {inventoryClubs.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 0", color: "#4b5563" }}>
                  <div style={{ marginBottom: 8 }}><Icon name="file" size={32} color={T.textMuted} /></div>
                  <div style={{ fontSize: 14 }}>No clubs in inventory. Add clubs you're not currently using.</div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* ═══ COURSES TAB ═══ */}
        {tab === "courses" && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: "#e5e7eb" }}>Course Map</h2>
                <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{courses.filter((c) => c.played).length} courses played · {courses.filter((c) => c.wishlist).length} on your wishlist</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
                  {["us", "world"].map((v) => (
                    <button key={v} onClick={() => setMapView(v)}
                      style={{ padding: "8px 16px", border: "none", backgroundColor: mapView === v ? "rgba(22,101,52,0.3)" : "rgba(255,255,255,0.04)", color: mapView === v ? "#6ee7b7" : "#6b7280", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", textTransform: "uppercase" }}>
                      {v === "us" ? "US" : "World"}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowCourseModal(true)}
                  style={{ padding: "10px 18px", borderRadius: 12, border: "none", backgroundColor: "#166534", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                  + Add Course
                </button>
              </div>
            </div>
            {/* Map */}
            <div className="card" style={{ marginBottom: 24, padding: 16 }}>
              <GolfMap courses={courses} mapView={mapView} />
            </div>
            {/* Played Courses */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}><Icon name="check" size={18} color="#22c55e" /> Courses Played</h3>
              {courses.filter((c) => c.played).length === 0 && <div style={{ color: "#4b5563", fontSize: 14, textAlign: "center", padding: 24 }}>No courses logged yet. Add your first round!</div>}
              {courses.filter((c) => c.played).map((c, i) => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < courses.filter((x) => x.played).length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#e5e7eb" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{c.city}, {c.state} {c.country !== "US" ? `· ${c.country}` : ""}</div>
                    {c.notes && <div style={{ fontSize: 12, color: "#4b5563", marginTop: 4, fontStyle: "italic" }}>{c.notes}</div>}
                  </div>
                  <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 16, color: "#fbbf24" }}>{[...Array(c.rating)].map((_, i) => <Icon key={`f-${i}`} name="star" size={16} color="#fbbf24" />)} {[...Array(5-c.rating)].map((_, i) => <Icon key={`e-${i}`} name="star-empty" size={16} color="#6b7280" />)}</div>
                      {c.lastPlayed && <div style={{ fontSize: 11, color: "#6b7280" }}>Last: {formatDate(c.lastPlayed)}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Wishlist */}
            <div className="card">
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, marginBottom: 16, color: "#e5e7eb" }}><Icon name="star" size={18} color="#fbbf24" /> Want to Play</h3>
              {courses.filter((c) => c.wishlist).sort((a, b) => (a.rank || 99) - (b.rank || 99)).map((c, i, arr) => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fbbf24", flexShrink: 0 }}>{c.rank || i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#e5e7eb" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{c.city}, {c.state} {c.country !== "US" ? `· ${c.country}` : ""}</div>
                    {c.notes && <div style={{ fontSize: 12, color: "#4b5563", marginTop: 2, fontStyle: "italic" }}>{c.notes}</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button onClick={() => { const wl = courses.filter((x) => x.wishlist).sort((a, b) => (a.rank || 99) - (b.rank || 99)); const idx = wl.findIndex((x) => x.id === c.id); if (idx > 0) { setCourses(courses.map((x) => x.id === c.id ? { ...x, rank: wl[idx - 1].rank || idx } : x.id === wl[idx - 1].id ? { ...x, rank: (c.rank || idx + 1) } : x)); } }}
                      style={{ padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "transparent", color: "#6b7280", fontSize: 11, cursor: "pointer" }}>↑</button>
                    <button onClick={() => { const wl = courses.filter((x) => x.wishlist).sort((a, b) => (a.rank || 99) - (b.rank || 99)); const idx = wl.findIndex((x) => x.id === c.id); if (idx < wl.length - 1) { setCourses(courses.map((x) => x.id === c.id ? { ...x, rank: wl[idx + 1].rank || idx + 2 } : x.id === wl[idx + 1].id ? { ...x, rank: (c.rank || idx + 1) } : x)); } }}
                      style={{ padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "transparent", color: "#6b7280", fontSize: 11, cursor: "pointer" }}>↓</button>
                  </div>
                </div>
              ))}
              {courses.filter((c) => c.wishlist).length === 0 && <div style={{ color: "#4b5563", fontSize: 14, textAlign: "center", padding: 24 }}>Your wishlist is empty. Add dream courses!</div>}
            </div>
          </div>
        )}
        {/* ═══ ACCOUNT TAB ═══ */}
        {tab === "account" && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: T.textPrimary }}>Account</h2>
              <p style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>Manage your profile, connections, and preferences.</p>
            </div>
            {/* ── Auth / Profile ── */}
            <div className="card" style={{ marginBottom: 24 }}>
              {!user ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, rgba(110,231,183,0.15), rgba(34,197,94,0.08))", border: `2px solid ${T.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Icon name="person" size={32} color={T.accent} /></div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, color: T.textPrimary, marginBottom: 6 }}>Sign In to Looper</h3>
                  <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 24, maxWidth: 360, margin: "0 auto 24px" }}>Sign-in coming soon. Your data is saved locally on this device.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto" }}>
                    <button onClick={() => setUser({ name: "Taylor Smith", email: "smith.robert.taylor@gmail.com", provider: "google", avatar: null, memberSince: new Date().toISOString() })} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 20px", borderRadius: 12, border: `1px solid ${T.inputBorder}`, backgroundColor: T.inputBg, color: T.textPrimary, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                      <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                      Continue with Google
                    </button>
                    <button onClick={() => setUser({ name: "Taylor Smith", email: "smith.robert.taylor@gmail.com", provider: "apple", avatar: null, memberSince: new Date().toISOString() })} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 20px", borderRadius: 12, border: `1px solid ${T.inputBorder}`, backgroundColor: T.inputBg, color: T.textPrimary, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={T.text}><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                      Continue with Apple
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#fff", fontWeight: 600 }}>
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: T.textPrimary }}>{user.name}</div>
                      <div style={{ fontSize: 13, color: T.textMuted }}>{user.email}</div>
                      <div style={{ fontSize: 11, color: T.textFaint, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                        {user.provider === "google" ? "Google" : "Apple"} account
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setUser(null)} style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid rgba(239,68,68,0.2)`, backgroundColor: "rgba(239,68,68,0.06)", color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            {/* ── Account Status ── */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <Icon name="chart" size={20} color={T.textSecondary} />
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: T.textPrimary }}>Account Status</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
                {[
                  { label: "Plan", value: "Pro", color: "#6ee7b7", sub: "Local storage only" },
                  { label: "Member Since", value: user ? new Date(user.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—", color: T.textPrimary, sub: user ? "Active" : "Not signed in" },
                  { label: "Rounds Logged", value: rounds.length, color: T.accent, sub: "Total rounds" },
                  { label: "Practice Sessions", value: practice.length, color: T.textPrimary, sub: "Total sessions" },
                  { label: "Drills Created", value: drills.length, color: T.textPrimary, sub: `${drills.reduce((s, d) => s + (d.results || []).length, 0)} results` },
                ].map((stat, i) => (
                  <div key={i} style={{ padding: 16, borderRadius: 12, backgroundColor: T.inputBg, border: `1px solid ${T.cardBorder}` }}>
                    <div style={{ fontSize: 10, color: T.textSecondary, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: stat.color, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{stat.value}</div>
                    <div style={{ fontSize: 10, color: T.textFaint, marginTop: 2 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* ── Connected Sources ── */}
            <div className="card" style={{ marginBottom: 24, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="signal" size={20} color={T.textSecondary} />
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: T.textPrimary }}>Connected Sources</h3>
                </div>
                <span style={{ fontSize: 11, color: T.textMuted }}>Link your golf accounts for automatic data import</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                {[
                  { name: "GHIN", desc: "Official USGA handicap index, round history & score posting", icon: "link", color: "#3b82f6", bgColor: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.25)", status: "available", lastSync: null, sessions: 0 },
                  { name: "Arccos", desc: "Automated round capture, GPS tracking & shot detection", icon: "location", color: "#10b981", bgColor: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", status: "available", lastSync: null, sessions: 0 },
                  { name: "Awesome Golf", desc: "Simulator sessions, shot data & virtual rounds", icon: "gamepad", color: "#22c55e", bgColor: "rgba(34,197,94,0.08)", borderColor: "rgba(34,197,94,0.25)", status: "available", lastSync: "2 hours ago", sessions: 12 },
                  { name: "TrackMan", desc: "Launch monitor data, club speed, spin & carry", icon: "chart", color: "#3b82f6", bgColor: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.25)", status: "available", lastSync: "1 day ago", sessions: 8 },
                  { name: "Toptracer", desc: "Range sessions, ball flight & distance tracking", icon: "target", color: "#f59e0b", bgColor: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.25)", status: "available", lastSync: null, sessions: 0 },
                  { name: "Full Swing", desc: "Simulator play, shot shape & performance data", icon: "golf", color: "#a855f7", bgColor: "rgba(168,85,247,0.08)", borderColor: "rgba(168,85,247,0.25)", status: "available", lastSync: null, sessions: 0 },
                  { name: "Garmin Golf", desc: "GPS watch data, approach distances & club tracking", icon: "watch", color: "#06b6d4", bgColor: "rgba(6,182,212,0.08)", borderColor: "rgba(6,182,212,0.25)", status: "available", lastSync: null, sessions: 0 },
                  { name: "CSV Import", desc: "Import shot data from any source via spreadsheet", icon: "file", color: isDark ? "#9ca3af" : "#6b7280", bgColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", status: "manual", lastSync: null, sessions: 0 },
                ].map((source) => (
                  <div key={source.name} style={{
                    padding: 16, borderRadius: 14, backgroundColor: source.bgColor, border: `1px solid ${source.borderColor}`,
                    transition: "all 0.25s", cursor: "pointer", position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: 12, right: 12 }}>
                      {source.status === "connected" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 6, backgroundColor: "rgba(34,197,94,0.15)" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                          <span style={{ fontSize: 10, color: "#6ee7b7", fontWeight: 600 }}>LINKED</span>
                        </div>
                      ) : source.status === "manual" ? (
                        <div style={{ padding: "3px 8px", borderRadius: 6, backgroundColor: T.hoverBg }}>
                          <span style={{ fontSize: 10, color: T.textSecondary, fontWeight: 500 }}>UPLOAD</span>
                        </div>
                      ) : (
                        <div style={{ padding: "3px 8px", borderRadius: 6, backgroundColor: T.inputBg, border: `1px solid ${T.cardBorder}` }}>
                          <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 500 }}>CONNECT</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={source.icon} size={18} color={source.color} /></div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{source.name}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.4, marginBottom: 10 }}>{source.desc}</div>
                    {source.status === "connected" && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: `1px solid ${source.borderColor}` }}>
                        <span style={{ fontSize: 11, color: T.textMuted }}>Last sync: {source.lastSync}</span>
                        <span style={{ fontSize: 11, color: source.color, fontWeight: 600 }}>{source.sessions} sessions</span>
                      </div>
                    )}
                    {source.status === "available" && (
                      <button style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${source.borderColor}`, backgroundColor: "transparent", color: source.color, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", marginTop: 2 }}>
                        Connect Account →
                      </button>
                    )}
                    {source.status === "manual" && (
                      <button style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${T.inputBorder}`, backgroundColor: "transparent", color: T.textSecondary, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", marginTop: 2 }}>
                        Upload CSV File →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* ── Preferences ── */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <Icon name="settings" size={20} color={T.textSecondary} />
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: T.textPrimary }}>Preferences</h3>
              </div>
              {/* Theme toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>Appearance</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>Switch between dark and light mode</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: T.textSecondary }}>{isDark ? "Dark" : "Light"}</span>
                  <div onClick={() => setTheme(isDark ? "light" : "dark")} style={{
                    width: 52, height: 28, borderRadius: 14, backgroundColor: isDark ? "rgba(34,197,94,0.3)" : "rgba(0,0,0,0.15)",
                    border: `1px solid ${isDark ? "rgba(34,197,94,0.4)" : "rgba(0,0,0,0.2)"}`, cursor: "pointer", position: "relative", transition: "all 0.3s",
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", backgroundColor: isDark ? "#22c55e" : "#f59e0b",
                      position: "absolute", top: 2, left: isDark ? 27 : 2, transition: "all 0.3s",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                    }}>
                      {isDark ? <Icon name="moon" size={16} color={T.accent} /> : <Icon name="sun" size={16} color={T.accent} />}
                    </div>
                  </div>
                </div>
              </div>
              {/* Units preference */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>Distance Units</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>Choose your preferred unit of measurement</div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {["Yards", "Meters"].map((u) => (
                    <button key={u} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${u === "Yards" ? "rgba(110,231,183,0.3)" : T.inputBorder}`, backgroundColor: u === "Yards" ? "rgba(34,197,94,0.1)" : "transparent", color: u === "Yards" ? "#6ee7b7" : T.textSecondary, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              {/* Notifications */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>Coach Notifications</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>Get reminded to log rounds and practice</div>
                </div>
                <div onClick={() => {}} style={{
                  width: 52, height: 28, borderRadius: 14, backgroundColor: "rgba(34,197,94,0.3)",
                  border: "1px solid rgba(34,197,94,0.4)", cursor: "pointer", position: "relative",
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#22c55e", position: "absolute", top: 2, left: 27, transition: "all 0.3s" }} />
                </div>
              </div>
            </div>
            {/* ── Danger Zone ── */}
            <div className="card" style={{ borderColor: "rgba(239,68,68,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Icon name="alert" size={20} color="#ef4444" />
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#ef4444" }}>Danger Zone</h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>Reset All Data</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>Clear all rounds, practice sessions, drills, and preferences</div>
                </div>
                <button style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.25)", backgroundColor: "rgba(239,68,68,0.06)", color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer" }}>
                  Reset Data
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Modals */}
      {showPracticeModal && <ImportPracticeModal onClose={() => setShowPracticeModal(false)} onImport={(p) => setPractice([p, ...practice])} />}
      {showRoundModal && <ImportRoundModal onClose={() => setShowRoundModal(false)} onImport={(r) => setRounds([r, ...rounds])} />}
      {showClubModal && <AddClubModal onClose={() => setShowClubModal(false)} onAdd={(c) => setClubs([...clubs, c])} />}
      {showCourseModal && <AddCourseModal onClose={() => setShowCourseModal(false)} onAdd={(c) => setCourses([...courses, c])} />}
      {showDrillModal && <CreateDrillModal onClose={() => setShowDrillModal(false)} onCreate={(d) => setDrills([...drills, d])} />}
      {showDrillResultModal && <DrillResultModal drill={showDrillResultModal} onClose={() => setShowDrillResultModal(null)} onLog={(drillId, result) => setDrills(drills.map((d) => d.id === drillId ? { ...d, results: [...(d.results || []), result] } : d))} />}
    </div>
  );
}
