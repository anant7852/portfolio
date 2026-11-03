// The signature element: an "actual vs. predicted" seat-demand chart with a
// prediction-interval band. Pure SVG, animated on load, no runtime deps.
// The data is illustrative (synthetic) — it represents the shape of the
// forecasting work, not any proprietary figures.

const W = 460;
const H = 300;
const PAD = { t: 16, r: 16, b: 26, l: 30 };

// Synthetic weekly seat-demand curve (predicted mean).
const pred = [42, 48, 45, 58, 63, 61, 72, 78, 74, 83, 88, 92];
// Actual observations sit close to the prediction, with noise.
const actual = [40, 51, 43, 60, 61, 64, 70, 81, 72, 86, 85, 95];
// Prediction interval half-width per point.
const band = [7, 8, 7, 9, 8, 9, 10, 9, 10, 11, 10, 12];

const n = pred.length;
const maxY = 110;
const minY = 25;

const px = (i: number) => PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r);
const py = (v: number) => PAD.t + (1 - (v - minY) / (maxY - minY)) * (H - PAD.t - PAD.b);

function linePath(vals: number[]) {
  return vals.map((v, i) => `${i === 0 ? "M" : "L"} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(" ");
}

function bandPath() {
  const top = pred.map((v, i) => `${i === 0 ? "M" : "L"} ${px(i).toFixed(1)} ${py(v + band[i]).toFixed(1)}`).join(" ");
  const bottom = pred
    .map((v, i) => `L ${px(n - 1 - i).toFixed(1)} ${py(pred[n - 1 - i] - band[n - 1 - i]).toFixed(1)}`)
    .join(" ");
  return `${top} ${bottom} Z`;
}

export default function ForecastChart() {
  return (
    <div className="chart-panel" aria-label="Chart: predicted versus actual seat demand with a prediction interval">
      <div className="chart-head">
        <span className="chart-title">
          seat_demand · 12-week forecast <i className="chart-tag">illustrative</i>
        </span>
        <div className="chart-legend">
          <span><i className="swatch pred" /> predicted</span>
          <span><i className="swatch act" /> actual</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Illustrative chart of predicted versus actual seat demand">
        {/* horizontal gridlines */}
        {[40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={py(v)} y2={py(v)} stroke="var(--line)" strokeWidth="1" />
            <text x={PAD.l - 6} y={py(v) + 3} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill="var(--ink-faint)">
              {v}
            </text>
          </g>
        ))}

        {/* prediction interval band */}
        <path className="band-fill" d={bandPath()} fill="var(--blue-band)" stroke="none" />

        {/* predicted mean line */}
        <path
          className="pred-line"
          d={linePath(pred)}
          fill="none"
          stroke="var(--blue)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* actual observations */}
        {actual.map((v, i) => (
          <circle
            key={i}
            className="act-dot"
            cx={px(i)}
            cy={py(v)}
            r="3"
            fill="var(--amber)"
            stroke="var(--paper-raised)"
            strokeWidth="1.5"
            style={{ animationDelay: `${0.9 + i * 0.07}s` }}
          />
        ))}
      </svg>

      <div className="chart-foot">
        <span>synthetic data · shape of the work</span>
      </div>
    </div>
  );
}
