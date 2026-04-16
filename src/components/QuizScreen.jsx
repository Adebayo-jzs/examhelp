import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}m ${r}s` : `${r}s`;
};

export default function QuizScreen({ quizState, onAnswer, onNav, onFinish, onQuit }) {
  const [secs, setSecs] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [localSel, setLocalSel] = useState(null);

  const { filtered, order, idx, score, answered, selMode, selSubjectTitle } = quizState;
  const q = filtered[order[idx]];
  const total = order.length;
  const done = Object.keys(answered).length;
  const progress = Math.round(((idx) / total) * 100);
  const prevSel = answered[idx];
  const isAns = prevSel !== undefined;

  // Timer
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Reset local state when question changes
  useEffect(() => {
    if (prevSel !== undefined) {
      setLocalSel(prevSel);
      setRevealed(selMode === 'immediate');
    } else {
      setLocalSel(null);
      setRevealed(false);
    }
  }, [idx]);

  const handleSelect = (i) => {
    if (revealed || (selMode === 'immediate' && localSel !== null)) return;
    
    setLocalSel(i);
    onAnswer(i, secs);

    if (selMode === 'immediate') {
      setRevealed(true);
      // Auto-advance after 1200ms if not last question
      if (idx < total - 1) {
        setTimeout(() => onNav(1), 1400);
      }
    }
  };

  const handleManualNav = (dir) => {
    setRevealed(false);
    setLocalSel(null);
    onNav(dir);
  };

  const handleManualFinish = () => {
    onFinish(secs);
  };

  const getOptClass = (i) => {
    if (!revealed && selMode === 'end') {
      // end mode: just show selected highlight, no lock
      if (localSel === i) return 'opt-pending';
      return 'opt-default';
    }
    if (!revealed) return 'opt-default'; // immediate, not yet answered

    // Revealed (immediate mode OR reviewing):
    if (i === q.a) return 'opt-correct';
    if (i === localSel && localSel !== q.a) return 'opt-wrong';
    return 'opt-dimmed';
  };

  const scoreLabel = selMode === 'immediate'
    ? `${score} / ${done} correct`
    : `${done} / ${total} answered`;

  return (
    <div className="page-bg">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="page-header">
        <h1>{selSubjectTitle || 'Quiz'}</h1>
        <p>Answer each question to test your knowledge</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.35 }}
          className="card"
        >
          {/* Progress bar */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
                Question {String(idx + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 11, color: '#7c3aed', fontWeight: 600, background: '#f3f0ff', borderRadius: 99, padding: '3px 10px' }}>
                {q.cat}
              </span>
            </div>
            <div style={{ height: 6, background: '#e5e7eb', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: '#7c3aed', borderRadius: 99 }}
                initial={{ width: `${Math.max(2, Math.round(((idx - 1) / total) * 100))}%` }}
                animate={{ width: `${Math.max(2, progress)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Score / timer row */}
          <div className="quiz-badge-row">
            <div className="timer-badge">
              <span className="tdot" />
              <span>{formatTime(secs)}</span>
            </div>
            <span className="score-badge">{scoreLabel}</span>
          </div>

          {/* Question */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="select-label" style={{ marginBottom: 6 }}>Select Your Answer</div>
            <h2 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5, color: '#111827' }}>
              {q.q}
            </h2>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem' }}>
            {q.opts.map((o, i) => {
              const cls = getOptClass(i);
              const isCorrect = revealed && i === q.a;
              const isWrong = revealed && i === localSel && localSel !== q.a;
              const isClickable = !revealed && (selMode === 'end' || localSel === null);

              return (
                <motion.button
                  key={i}
                  whileHover={isClickable ? { scale: 1.02 } : {}}
                  whileTap={isClickable ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(i)}
                  disabled={revealed && selMode === 'immediate'}
                  className={`opt-btn ${cls}`}
                >
                  {/* Letter badge */}
                  <span className="opt-badge">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="opt-label">{o}</span>

                  {/* Result icons */}
                  <AnimatePresence>
                    {isCorrect && (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ marginLeft: 'auto', fontSize: 18, flexShrink: 0 }}
                      >
                        ✓
                      </motion.span>
                    )}
                    {isWrong && (
                      <motion.span
                        key="cross"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ marginLeft: 'auto', fontSize: 18, flexShrink: 0 }}
                      >
                        ✗
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback (immediate mode) */}
          {revealed && selMode === 'immediate' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`feedback ${localSel === q.a ? 'correct' : 'wrong'}`}
              style={{ marginBottom: '1rem' }}
            >
              {localSel === q.a
                ? '✓ Correct!'
                : `✗ Incorrect — correct answer: ${q.opts[q.a]}`}
            </motion.div>
          )}

          {/* Navigation */}
          <div className="nav-row">
            {selMode === 'end' ? (
              <>
                <button className="btn-back" onClick={() => handleManualNav(-1)} disabled={idx === 0}>
                  Back
                </button>
                <button className="btn-quit" onClick={onQuit}>✕ Quit</button>
                {idx < total - 1 ? (
                  <button className="btn-next" onClick={() => handleManualNav(1)} disabled={localSel === null}>
                    Next →
                  </button>
                ) : (
                  <button className="btn-next" onClick={handleManualFinish} disabled={localSel === null}>
                    Finish ✓
                  </button>
                )}
              </>
            ) : (
              /* Immediate mode: auto-advances, just show Quit + manual Finish on last */
              <>
                <button className="btn-quit" onClick={onQuit}>✕ Quit</button>
                {idx === total - 1 && revealed && (
                  <button className="btn-next" onClick={handleManualFinish}>
                    Finish ✓
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
