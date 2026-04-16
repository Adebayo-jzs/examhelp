import React, { useState, useEffect } from 'react';
import { getSubjects, getSubjectStats, SUBJECTS } from '../data/dataUtils';

export default function StartScreen({ onStart }) {
  const subjects = getSubjects();

  const [selSubject, setSelSubject] = useState(subjects[0].id);
  const [selCat, setSelCat] = useState('All');
  const [selMode, setSelMode] = useState('immediate');
  const [selCount, setSelCount] = useState(20);
  const [customCount, setCustomCount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [stats, setStats] = useState(getSubjectStats(subjects[0].id));

  useEffect(() => {
    const s = getSubjectStats(selSubject);
    setStats(s);
    setSelCat('All');
    setUseCustom(false);
  }, [selSubject]);

  const max = stats.max;
  const catMax = stats.catCounts[selCat] || max;
  const effective = Math.min(Math.max(1, useCustom ? (parseInt(customCount) || 0) : selCount), catMax);
  const presets = [10, 20, 30, 50];

  const handleStart = () => {
    const subjectTitle = SUBJECTS[selSubject].title;
    onStart(selSubject, selCat, selMode, effective, subjectTitle);
  };

  return (
    <div className="page-bg">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="start-header">
        <h1>What will you be<br />studying today?</h1>
        <p>Choose your subject and customise your quiz session</p>
      </div>

      {/* Subject */}
      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        <div className="section-label">Choose Subject</div>
        <div className="subject-grid">
          {subjects.map(s => (
            <div
              key={s.id}
              className={`subject-card ${selSubject === s.id ? 'selected' : ''}`}
              onClick={() => setSelSubject(s.id)}
            >
              <div className="subject-title">{s.title}</div>
              <div className="subject-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Category */}
        <div className="section-label">Category</div>
        <div className="cat-grid">
          {stats.categories.map(c => (
            <div
              key={c}
              className={`cat-card ${selCat === c ? 'selected' : ''}`}
              onClick={() => { setSelCat(c); setUseCustom(false); }}
            >
              <div className="cn">{c}</div>
              <div className="cc">{stats.catCounts[c]} qs</div>
            </div>
          ))}
        </div>

        {/* Count */}
        <div className="section-label">Number of Questions</div>
        <div className="qcount-row">
          {presets.map(n => {
            const disabled = n > catMax;
            return (
              <button
                key={n}
                className={`qcount-btn ${!useCustom && selCount === n ? 'selected' : ''}`}
                disabled={disabled}
                onClick={() => { setSelCount(n); setUseCustom(false); }}
              >
                {n}
              </button>
            );
          })}
          <button
            className={`qcount-btn ${!useCustom && selCount === catMax ? 'selected' : ''}`}
            onClick={() => { setSelCount(catMax); setUseCustom(false); }}
          >
            All ({catMax})
          </button>
          <div className="qcount-custom">
            <input
              type="number"
              min="1"
              max={catMax}
              placeholder="?"
              className={useCustom ? 'selected-input' : ''}
              value={customCount}
              onChange={e => { setCustomCount(e.target.value); setUseCustom(e.target.value.trim() !== ''); }}
            />
            <span className="qcount-max">max {catMax}</span>
          </div>
        </div>

        {/* Mode */}
        <div className="section-label">Answer Mode</div>
        <div className="mode-grid" style={{ marginBottom: '1.5rem' }}>
          <div
            className={`mode-card ${selMode === 'immediate' ? 'selected' : ''}`}
            onClick={() => setSelMode('immediate')}
          >
            <div className="mn">⚡ Immediate</div>
            <div className="md">See if you're right after each answer</div>
          </div>
          <div
            className={`mode-card ${selMode === 'end' ? 'selected' : ''}`}
            onClick={() => setSelMode('end')}
          >
            <div className="mn">📋 Reveal at end</div>
            <div className="md">All answers shown on results screen</div>
          </div>
        </div>

        <button className="start-btn" onClick={handleStart} disabled={effective < 1}>
          Start {effective} Question{effective !== 1 ? 's' : ''} →
        </button>
        <p className="start-count-hint">Questions are drawn randomly from the pool</p>
      </div>
    </div>
  );
}
