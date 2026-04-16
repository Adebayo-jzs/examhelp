import React from 'react';
import CurvyBackground from './CurvyBackground';

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}m ${r}s` : `${r}s`;
};

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CrossIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export default function ReviewScreen({ quizState, onBack }) {
  const { filtered, order, answered, score, finalTime } = quizState;
  const total = order.length;

  return (
    <div className="page-bg">
      <CurvyBackground />

      <div style={{ width: '100%', maxWidth: 1000, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <button className="btn-back" onClick={onBack}>← Results</button>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            {score}/{total} correct · {formatTime(finalTime)}
          </span>
        </div>
        <div className='review-cards-container'>
        {order.map((qi, i) => {
          const q = filtered[qi];
          const sel = answered[i];
          const ok = sel === q.a;
          const statusColor = sel === undefined ? '#9ca3af' : (ok ? '#16a34a' : '#dc2626');
          const statusText = sel === undefined ? 'Not answered' : (ok ? 'Correct' : 'Incorrect');

          return (
            <div key={i} className="review-card">
              <div className="review-header">
                <div className="review-num">{String(i + 1).padStart(2, '0')}. {q.cat}</div>
                <span className="review-status" style={{ color: statusColor }}>{statusText}</span>
              </div>

              <div className="q-text" style={{ fontSize: 14, marginBottom: '10px' }}>{q.q}</div>

              <div className="options">
                {q.opts.map((o, oi) => {
                  let cls = 'opt disabled';
                  if (oi === q.a) cls += ' correct';
                  else if (oi === sel && sel !== q.a) cls += ' wrong';
                  const isCorrect = oi === q.a;
                  const isWrong = oi === sel && sel !== q.a;

                  return (
                    <div key={oi} className={cls}>
                      <div className="opt-left">
                        <div className="opt-radio" />
                        <span className="opt-text">{String.fromCharCode(65 + oi)}. {o}</span>
                      </div>
                      {(isCorrect || isWrong) && (
                        <div className="opt-check" style={{ opacity: 1, background: isWrong ? '#dc2626' : '#16a34a' }}>
                          {isWrong ? <CrossIcon /> : <CheckIcon />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {sel === undefined ? (
                <div className="feedback wrong" style={{ marginBottom: 0 }}>
                  Not answered. Correct: {q.opts[q.a]}
                </div>
              ) : !ok ? (
                <div className="feedback wrong" style={{ marginBottom: 0 }}>
                  You chose: {q.opts[sel]}. Correct: {q.opts[q.a]}
                </div>
              ) : (
                <div className="feedback correct" style={{ marginBottom: 0 }}>Correct! ✓</div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
