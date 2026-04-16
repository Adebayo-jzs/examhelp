import React from 'react';

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}m ${r}s` : `${r}s`;
};

export default function ResultsScreen({ quizState, onRetry, onChangeSettings, onReview }) {
  const { order, score, finalTime, selCat, selMode, selSubjectTitle } = quizState;
  const total = order.length;
  const pct = Math.round((score / total) * 100) || 0;
  const wrong = total - score;

  const getMessage = () => {
    if (pct >= 90) return 'Outstanding! 🏆';
    if (pct >= 75) return 'Great job! 🎉';
    if (pct >= 60) return 'Good effort! 💪';
    if (pct >= 40) return 'Keep practising! 📚';
    return 'Keep going! You\'ll get there 💡';
  };

  return (
    <div className="page-bg">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="results-card">
        <div className="results-big">
          <div className="score-circle">
            <div className="score-pct">{pct}%</div>
            <div className="score-lbl">Score</div>
          </div>
          <div className="results-title">{getMessage()}</div>
          <div className="results-sub">
            You scored {score} out of {total} · {formatTime(finalTime)}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: '1.25rem' }}>
            {selSubjectTitle} · {selCat} · {selMode === 'immediate' ? 'Immediate' : 'Reveal at end'}
          </div>

          <div className="stat-grid">
            <div className="stat">
              <div className="stat-n" style={{ color: '#16a34a' }}>{score}</div>
              <div className="stat-l">Correct</div>
            </div>
            <div className="stat">
              <div className="stat-n" style={{ color: '#dc2626' }}>{wrong}</div>
              <div className="stat-l">Incorrect</div>
            </div>
            <div className="stat">
              <div className="stat-n">{total}</div>
              <div className="stat-l">Total</div>
            </div>
          </div>

          <div className="rbtns">
            <button className="btn-next" onClick={onRetry}>Retry Quiz</button>
            <button className="btn-back" style={{ width: '100%' }} onClick={onReview}>Review Answers</button>
            <button className="btn-quit" style={{ width: '100%', padding: '10px' }} onClick={onChangeSettings}>← Change Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
