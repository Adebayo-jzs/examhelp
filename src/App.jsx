import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ReviewScreen from './components/ReviewScreen';
import { generateQuizPool } from './data/dataUtils';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [quizState, setQuizState] = useState({
    selCourse: 'philosophy',
    selCourseTitle: '',
    selCat: 'All',
    selMode: 'immediate',
    filtered: [],
    order: [],
    idx: 0,
    score: 0,
    answered: {},
    finalTime: 0
  });

  const handleStart = (courseId, category, mode, count, courseTitle) => {
    const { filtered, order } = generateQuizPool(courseId, category, count);
    setQuizState({
      selCourse: courseId,
      selCourseTitle: courseTitle,
      selCat: category,
      selMode: mode,
      filtered,
      order,
      idx: 0,
      score: 0,
      answered: {},
      finalTime: 0
    });
    setScreen('quiz');
  };

  const handleAnswer = (optionIndex, currentSecs) => {
    setQuizState(prev => {
      const q = prev.filtered[prev.order[prev.idx]];
      let newScore = prev.score;
      const isCorrect = optionIndex === q.a;

      if (prev.selMode === 'end') {
        const previousAnswer = prev.answered[prev.idx];
        if (previousAnswer !== undefined && previousAnswer === q.a) {
          newScore--; // remove old score contribution
        }
        if (isCorrect) newScore++;
      } else {
        if (isCorrect) newScore++;
      }

      return {
        ...prev,
        score: newScore,
        answered: { ...prev.answered, [prev.idx]: optionIndex }
      };
    });
  };

  const handleNav = (delta) => {
    setQuizState(prev => {
      const newIdx = Math.max(0, Math.min(prev.order.length - 1, prev.idx + delta));
      return { ...prev, idx: newIdx };
    });
  };

  const handleFinish = (finalTime) => {
    setQuizState(prev => ({ ...prev, finalTime }));
    setScreen('results');
  };

  const handleQuit = () => {
    setScreen('start');
  };

  const handleRetry = () => {
    setQuizState(prev => {
      // Re-shuffle the same filter
      const newOrder = [...prev.order];
      for (let i = newOrder.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
      }
      return {
        ...prev,
        order: newOrder,
        idx: 0,
        score: 0,
        answered: {},
        finalTime: 0
      };
    });
    setScreen('quiz');
  };

  return (
    <div className="container">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      
      {screen === 'quiz' && (
        <QuizScreen 
          quizState={quizState}
          onAnswer={handleAnswer}
          onNav={handleNav}
          onFinish={handleFinish}
          onQuit={handleQuit}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen 
          quizState={quizState}
          onRetry={handleRetry}
          onChangeSettings={() => setScreen('start')}
          onReview={() => setScreen('review')}
        />
      )}

      {screen === 'review' && (
        <ReviewScreen 
          quizState={quizState}
          onBack={() => setScreen('results')}
        />
      )}
    </div>
  );
}
