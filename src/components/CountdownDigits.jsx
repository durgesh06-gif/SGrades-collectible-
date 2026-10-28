const pad = (n) => String(n).padStart(2, "0");

// Big "Days / Hours / Minutes" countdown used on live auction cards.
// `to` is a Date, `now` is a timestamp in milliseconds.
export default function CountdownDigits({ to, now }) {
  const ms = Math.max(to - now, 0);
  const parts = [[Math.floor(ms / 864e5), "Days"], [Math.floor((ms % 864e5) / 36e5), "Hours"], [Math.floor((ms % 36e5) / 6e4), "Minutes"]];
  return <div className="cdw">{parts.map(([n, l]) => <div key={l}><b>{pad(n)}</b><span>{l}</span></div>)}</div>;
}
