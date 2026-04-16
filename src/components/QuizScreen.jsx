import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurvyBackground from './CurvyBackground';

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}m ${r}s` : `${r}s`;
};

export default function QuizScreen({ quizState, onAnswer, onNav, onFinish, onQuit }) {
  const [secs, setSecs] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [localSel, setLocalSel] = useState(null);

  const { filtered, order, idx, score, answered, selMode, selCourseTitle } = quizState;
  const q = filtered[order[idx]];
  const total = order.length;
  const done = Object.keys(answered).length;
  const progress = Math.round(((idx + 1) / total) * 100);
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
  }, [idx, prevSel, selMode]);

  const handleSelect = (i) => {
    if (revealed || (selMode === 'immediate' && localSel !== null)) return;
    
    setLocalSel(i);
    onAnswer(i, secs);

    if (selMode === 'immediate') {
      setRevealed(true);
      // Auto-advance after 1400ms if not last question
      if (idx < total - 1) {
        setTimeout(() => onNav(1), 1400);
      }
    }
  };

  const scoreLabel = selMode === 'immediate'
    ? `${score} / ${done} correct`
    : `${done} / ${total} answered`;

  return (
    <div className="page-bg">
      <CurvyBackground /> 

      <div className="page-header">
        <h1>{selCourseTitle}</h1>
        <p>Answer the questions to test your knowledge</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          {/* Progress row */}
          <div className="progress-row">
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: `${Math.max(2, Math.round(((idx) / total) * 100))}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="progress-label">{progress}% Complete</span>
          </div>

          {/* Question Counter */}
          <div className="q-counter">
            Question {String(idx + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
          </div>

          {/* Question Text */}
          <h2 className="q-text">{q.q}</h2>

          <div className="select-label">Select Your Answer:</div>

          {/* Options List */}
          <div className="options">
            {q.opts.map((o, i) => {
              const isSelected = localSel === i;
              
              let feedbackCls = "";
              if (revealed) {
                if (i === q.a) feedbackCls = "correct";
                else if (isSelected) feedbackCls = "wrong";
              }

              return (
                <div 
                  key={i} 
                  className={`opt-row ${isSelected ? 'selected' : ''} ${feedbackCls}`}
                  onClick={() => handleSelect(i)}
                >
                  <div className="opt-radio-circle">
                    <div className="opt-radio-inner" />
                  </div>
                  <span className="opt-text-label">{o}</span>
                </div>
              );
            })}
          </div>

          {/* Nav Buttons */}
          <div className="nav-row" style={{ justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              className="btn-back" 
              onClick={() => onNav(-1)} 
              disabled={idx === 0}
            >
              Back
            </button>
            
            {idx < total - 1 ? (
              <button 
                className="btn-next" 
                onClick={() => onNav(1)} 
                disabled={localSel === null && selMode === 'end'}
              >
                Next
              </button>
            ) : (
              <button 
                className="btn-next" 
                onClick={() => onFinish(secs)} 
                disabled={localSel === null}
              >
                Finish
              </button>
            )}
          </div>

          {/* Quit link at very bottom */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
             <button className="btn-quit" onClick={onQuit} style={{ color: '#a1a1aa', fontSize: '14px', textDecoration: 'underline' }}>Quit Quiz</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
