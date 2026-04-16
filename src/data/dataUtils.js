import { philosophyData } from './philosophy';
import { scienceData } from './science';

// Normalize Philosophy data from object into flat array
const normalizedPhilosophyData = [];
for (const [cat, qs] of Object.entries(philosophyData)) {
  for (const q of qs) {
    normalizedPhilosophyData.push({
      cat,
      q: q.q,
      opts: q.o,
      a: q.a
    });
  }
}

// Science data is already a flat array, but let's just use it directly
const normalizedScienceData = scienceData;

export const COURSES = {
  philosophy: {
    title: "Philosophy & Logic",
    desc: "Multi-choice Questions across Historical Background, Branches, Doctrines, Logic & Arguments, etc.",
    data: normalizedPhilosophyData
  },
  science: {
    title: "Origins of Science",
    desc: "Creation Theories, Darwin & Natural Selection, Fossil Records, Radiometric Dating, etc.",
    data: normalizedScienceData
  }
};

export const getCourses = () => [
  { id: 'philosophy', title: COURSES.philosophy.title, desc: COURSES.philosophy.desc },
  { id: 'science', title: COURSES.science.title, desc: COURSES.science.desc }
];

export const getCourseStats = (courseId) => {
  if (!courseId || !COURSES[courseId]) return { max: 0, categories: [], catCounts: {} };
  const data = COURSES[courseId].data;
  
  const catCounts = { "All": data.length };
  const cats = new Set();
  
  data.forEach(q => {
    cats.add(q.cat);
    catCounts[q.cat] = (catCounts[q.cat] || 0) + 1;
  });
  
  return {
    max: data.length,
    categories: ["All", ...Array.from(cats)],
    catCounts
  };
};

// Shuffles an array
export const shuffle = (array) => {
  let b = [...array];
  for (let i = b.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// Gets the list of questions for the quiz
export const generateQuizPool = (courseId, category, count) => {
  const data = COURSES[courseId].data;
  const pool = category === "All" ? [...data] : data.filter(q => q.cat === category);
  const n = Math.min(Math.max(1, count), pool.length);
  const shuffledOrders = shuffle(pool.map((_, i) => i)).slice(0, n);
  
  // Return the full pool and the indices we want to take (or just extract the actual questions config)
  return {
    filtered: pool,
    order: shuffledOrders
  };
};
