import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NotesPage.css';

const chapters = [
  {
    num: "Introduction", title: "Introduction to the Origins of Science", sub: "Life origin, philosophy, religion and science",
    color: "#3C3489", tag: "tag-purple",
    intro: "Life origin has become an intricate subject due to differing accounts — Biblical creation, philosophical questions, and scientific theories. This text uses a balanced approach from science, philosophy, and religion to investigate issues of life's origin, history, and scientific underpinnings.",
    sections: [
      {
        label: "Key objectives", points: [
          ["Conceptualize the complex origin of life", "from both scientific and Biblical perspectives"],
          ["Synthesize multidimensional views", "on origins of universe and life"],
          ["Proffer answers to philosophical questions", "in the context of faith, reason and science"],
        ]
      },
      {
        label: "Core philosophical questions every human asks", points: [
          ["Who am I?", "A question of identity and self"],
          ["Where did I come from?", "A question of origin and creation"],
          ["When I die, where will I go?", "A question of destiny and afterlife"],
          ["Is there a Supreme Being or God?", "A question of theology and metaphysics"],
        ]
      },
      {
        label: "What is Science?", points: [
          ["Definition", "A search for truth through repeated experimentation and observations"],
          ["Limitations", "Incompleteness of sample size, limitation in time and scale, qualitative data interpretation"],
          ["Notable scientists of faith", "Carl Linnaeus, Isaac Newton, Gregory Mendel, Werner Arber, Ben Carson"],
        ]
      },
      {
        label: "Definitions", table: [
          ["Epistemology", "The branch of philosophy concerned with knowledge and how we know what we know"],
          ["Metaphysics", "Branch of philosophy dealing with the fundamental nature of reality beyond the physical"],
          ["Cosmogony", "The aspect of philosophy concerned with the origin of the universe"],
          ["Astronomy", "Studies the origin and structure of the universe, its extent and components"],
        ]
      },
    ],
    quiz: [
      { q: "What approach does this book use to investigate the origin of life?", o: ["Scientific only", "Religious only", "A balanced approach from science, philosophy and religion", "Political and sociological"], a: 2 },
      { q: "Science is defined as a search for truth through:", o: ["Faith and prayer", "Repeated experimentation and observations", "Philosophical reasoning alone", "Biblical accounts"], a: 1 },
      { q: "Which of the following is a notable limitation of science?", o: ["It cannot make predictions", "Incompleteness of sample size and limitation in time and scale", "It is too expensive", "It relies on God"], a: 1 },
      { q: "Which scientist listed is NOT mentioned as being a person of faith?", o: ["Carl Linnaeus", "Isaac Newton", "Charles Darwin", "Gregory Mendel"], a: 2 },
      { q: "The aspect of philosophy concerned with the origin of the universe is called:", o: ["Epistemology", "Metaphysics", "Cosmogony", "Anthropology"], a: 2 },
    ]
  },
  {
    num: "Chapter 2", title: "Origin of Life", sub: "From Creation to Evolution",
    color: "#0F6E56", tag: "tag-green",
    intro: "Life origin theories range from Biblical creation to naturalistic evolution. Darwin's observations during his voyage on the HMS Beagle led to a theory that changed how science understands the diversity of life.",
    sections: [
      {
        label: "Eight theories of life origin", table: [
          ["1. Creation", "Also called Young Earth/Fiat Creation. God created in 6 literal days ~6–10,000 years ago"],
          ["2. Gap Theory", "God created, gap period, created again. No scientific or fossil support"],
          ["3. Progressive Creation", "God created & destroyed multiple times over long ages"],
          ["4. Theistic Evolution", "God directed evolution from simple to complex over long ages"],
          ["5. Deistic Evolution", "God was active only at the beginning, then stepped back"],
          ["6. Pantheistic Evolution", "God progresses with evolution itself — similar to Eastern/New Age ideas"],
          ["7. Space Ancestry", "Life from extra-terrestrial organisms/meteorites. Purely speculative"],
          ["8. Evolution", "No God involved. Naturalistic evolution over long ages"],
        ]
      },
      {
        label: "Darwin's key contemplations", points: [
          ["Fixity of species", "On HMS Beagle (1831–36) Darwin observed diversity on Galapagos — finches & giant tortoises raised doubts"],
          ["Natural theology", "Why would a benevolent God create killer parasites and ruthless predators?"],
          ["Geo-heliocentrism", "Development of telescopes confirmed the sun, not Earth, is at the center"],
          ["Uniformitarian geology", "Studied Charles Lyell's theory of slow, gradual geological change"],
          ["Independent discovery", "Alfred Russel Wallace independently developed a similar theory in 1823–1913"],
        ]
      },
      {
        label: "Darwin's theory — 4 key points", points: [
          ["Variation", "There is variation among organisms as a result of genetic recombination and mutation. No two are the same"],
          ["Overproduction", "Organisms produce more offspring than can survive — creating a struggle for survival"],
          ["Differential survival", "Some individuals have a better chance of surviving based on fitness and natural selection"],
          ["Natural selection", "The mechanism that eliminates less fit individuals and favors the best adapted"],
        ]
      },
      {
        label: "Speciation processes", points: [
          ["Geographic isolation", "Populations separated by physical barriers diverge over time"],
          ["Adaptation to new environments", "Organisms adapt structures and behaviours to new conditions"],
          ["Reproductive isolation", "Populations stop interbreeding — sympatric or allopatric species form"],
          ["Microevolution", "Small changes within populations — new strains, races, subspecies"],
          ["Macroevolution", "Large transformations — reptiles from amphibians, humans from primates"],
        ]
      },
    ],
    quiz: [
      { q: "Which life origin theory is also called 'Recent/Special/Young Earth/Fiat Creation'?", o: ["Gap Theory", "Progressive Creation", "Creation", "Theistic Evolution"], a: 2 },
      { q: "Darwin sailed the world as a guest of the captain on which ship?", o: ["HMS Victory", "HMS Discovery", "HMS Beagle", "HMS Endeavour"], a: 2 },
      { q: "Which island group most inspired Darwin's ideas on species variation?", o: ["Hawaiian Islands", "Canary Islands", "Galapagos Islands", "Maldive Islands"], a: 2 },
      { q: "Evolution is defined as a change in the frequency of an allele within a:", o: ["Species", "Organism", "Gene pool", "Chromosome"], a: 2 },
      { q: "The phenomenon where dark moths became dominant during England's industrial revolution is called:", o: ["Natural selection only", "Industrial melanism", "Geographic isolation", "Adaptive radiation"], a: 1 },
    ]
  },
  {
    num: "Chapter 3", title: "The Geologic Column and Fossil Record", sub: "Earth's layered history and preserved life",
    color: "#993C1D", tag: "tag-coral",
    intro: "The geologic column is a series of rock layers set by sediment deposition over very long periods, with simplest fossils at the bottom and more complex organisms toward the top. Fossils provide clues about past life — but the record is incomplete.",
    sections: [
      {
        label: "The Geologic Column — eras (top to bottom)", table: [
          ["Cenozoic", "Quaternary, Neogene, Tertiary, Paleogene — rise of mammals, evolution of humans"],
          ["Mesozoic", "Cretaceous, Jurassic, Triassic — age of dinosaurs, first birds & mammals"],
          ["Paleozoic", "Permian, Carboniferous, Devonian, Silurian, Ordovician, Cambrian — first fishes, land plants, reptiles"],
          ["Precambrian", "Proterozoic, Archean — bacteria, algae, first soft-bodied metazoans"],
        ]
      },
      {
        label: "Fossilization processes", table: [
          ["Permineralization", "Mineral-rich water fills cellular spaces creating a stone-like replica — most common method"],
          ["Cast & Mold", "Mold = hollow impression; Cast = mineral fills mold in 3D — shows exterior shape"],
          ["Amber preservation", "Organism enclosed in hardened tree resin — preserves soft tissue, cells, DNA information"],
          ["Carbonization", "Volatile materials lost; carbon residue left — thin dark film on rock (leaves, fish, jellyfish)"],
          ["Freezing", "Organism buried in ice — preserves skin, hair, flesh for DNA analysis (mammoths)"],
        ]
      },
      {
        label: "Types of fossils", points: [
          ["Body fossils", "Preserved hard parts — bones, teeth, shells. Gives insight into anatomy and size"],
          ["Trace fossils (ichnofossils)", "Indirect evidence — worm burrows, footprints, bite marks, coprolites (feces)"],
          ["Transitional fossils", "Possess intermediate traits — e.g. Archaeopteryx has both dinosaur and bird features"],
          ["Geological strata fossils", "Fossils typical of a geological time period — used to date rock layers"],
        ]
      },
      {
        label: "Significance of fossil record", points: [
          ["Understanding past environments", "Snapshots of ancient ecosystems, climate conditions and biodiversity"],
          ["Tracing evolutionary patterns", "Shows species diversification, adaptation and extinction over time"],
          ["Recording major events", "Marks Cambrian Explosion, mass extinctions (Permian, Cretaceous)"],
          ["Limitation", "Lacks intermediate fossils connecting ancestral classes to descendants — 'no meaningful sequence'"],
        ]
      },
    ],
    quiz: [
      { q: "In the geologic column, which era is at the very top (most recent)?", o: ["Paleozoic", "Mesozoic", "Precambrian", "Cenozoic"], a: 3 },
      { q: "Which fossilization method involves mineral-rich water creating a stone-like replica in cellular spaces?", o: ["Carbonization", "Amber preservation", "Permineralization", "Freezing"], a: 2 },
      { q: "Fossils are mostly found in which type of rock?", o: ["Igneous rocks", "Metamorphic rocks", "Sedimentary rocks", "Volcanic rocks"], a: 2 },
      { q: "Archaeopteryx is an example of which fossil type?", o: ["Body fossil", "Trace fossil", "Transitional fossil", "Index fossil"], a: 2 },
      { q: "The 'Cambrian Explosion' refers to the sudden appearance of many complex phyla at which geological period?", o: ["Upper Cambrian", "Lower Cambrian", "Jurassic", "Permian"], a: 1 },
    ]
  },
  {
    num: "Chapter 4", title: "Dating Methods and Their Drawbacks", sub: "How scientists estimate the age of rocks and fossils",
    color: "#185FA5", tag: "tag-blue",
    intro: "Scientific dating techniques allow us to characterize the age of organic and inorganic materials. There are two major categories: relative dating (sequence only) and absolute dating (numerical age estimates). Each method has limitations.",
    sections: [
      {
        label: "Relative dating methods", table: [
          ["Ice Core", "Drilling core samples from glacial ice — dark/light rings show age. Pitfall: rings diffuse with time"],
          ["Stratigraphy", "Rock layers — younger on top, older below (superposition). Pitfall: fails when strata disturbed"],
          ["Biostratigraphy", "Index species (widespread, short-lived fossils) used as markers. Enhances stratigraphy"],
          ["Lithostratigraphy", "Physical characteristics (composition, texture) match strata across regions"],
          ["Geological relationships", "Cross-cutting features determine relative ages — intrusion is younger than what it cuts"],
        ]
      },
      {
        label: "Absolute dating methods", table: [
          ["Carbon-14 (Radiocarbon)", "Half-life ~5,730 yrs. Dates organic material up to ~50–70,000 yrs. Cannot date rocks"],
          ["Uranium-Lead (U-Pb)", "Dates ancient rocks & zircon crystals. Very precise. Half-life of U-235: ~0.7 billion yrs"],
          ["Potassium-Argon (K-Ar)", "Dates volcanic rocks & ash layers. Half-life of K-40: 1.26 billion yrs"],
          ["Thermoluminescence (TL)", "Measures electrons trapped in minerals. At most 15% accurate. Dates ceramics, burnt stone"],
          ["Dendrochronology", "Tree ring dating. Each ring = 1 year. Also reveals past climate. Limited to tree-bearing regions"],
        ]
      },
      {
        label: "Two worldviews on dating implications", points: [
          ["Young Earth Creationism", "Earth 6,000–10,000 yrs old. Rejects scientific timeline. Fossil record explained by Noah's Flood"],
          ["Old Earth (Evolutionism)", "Earth ~4.54 billion yrs old. Supported by geology, astronomy and physics"],
          ["Intelligent Design (ID)", "Not strictly creationism — complex organisms suggest an intelligent designer; cites irreducible complexity"],
          ["Overall drawback", "Assumptions about initial conditions, environmental factors, and closed systems can compromise accuracy"],
        ]
      },
      {
        label: "Radiometric dating assumptions", table: [
          ["Assumption 1", "Known amounts of daughter isotopes at start (usually zero)"],
          ["Assumption 2", "No gain or loss of parent/daughter isotopes except through radioactive decay"],
          ["Assumption 3", "Constant decay rate throughout time"],
        ]
      },
    ],
    quiz: [
      { q: "Relative dating establishes the sequence of events but does NOT provide:", o: ["Rock layer order", "Specific numerical age estimates", "Fossil identification", "Stratigraphic sequence"], a: 1 },
      { q: "Carbon-14 dating is limited to samples up to approximately:", o: ["5,000 years", "500,000 years", "50,000–70,000 years", "500 million years"], a: 2 },
      { q: "Uranium-Lead dating is particularly effective for dating rocks containing:", o: ["Quartz crystals", "Feldspar crystals", "Zircon crystals", "Calcite crystals"], a: 2 },
      { q: "Thermoluminescence (TL) dating is at most how accurate?", o: ["5%", "15%", "50%", "85%"], a: 1 },
      { q: "Young Earth Creationists believe most of the fossil record is explained by:", o: ["Slow uniform sedimentation over millions of years", "A recent catastrophic worldwide flood", "Multiple volcanic events", "Meteorite impacts"], a: 1 },
    ]
  },
  {
    num: "Chapter 5", title: "The Flood and the Geologic Column", sub: "Contextual view of fossils and sediment layers",
    color: "#854F0B", tag: "tag-amber",
    intro: "Creation and evolution propose contrasting mechanisms for the fossil record. Creation supports catastrophism (rapid, major events), while evolution supports uniformitarianism (slow, gradual change). The Genesis flood provides a cohesive geological alternative model.",
    sections: [
      {
        label: "Two contrasting frameworks", table: [
          ["Catastrophism (Creation view)", "Rapid, unusual major geological events — the Genesis Flood explains fossil record"],
          ["Uniformitarianism (Evolution view)", "Slow, gradual geological changes over hundreds of millions of years"],
          ["Evolutionists view fossils as...", "A record of gradual development of life forms over long ages"],
          ["Creationists view fossils as...", "A record of burial during the worldwide deluge"],
        ]
      },
      {
        label: "4 Major geological evidences for a worldwide flood", points: [
          ["1. Abundant underwater activity", "Marine sedimentary rocks are far more common on land than all other rocks combined — turbidites found on all continents"],
          ["2. Widespread sedimentary deposits", "Dakota Formation covers 815,000 sq km; Canadian Permian formations persist over 470,000 sq km — uniquely widespread"],
          ["3. Incomplete ecosystems over long periods", "Fossils show animals without corresponding plants to feed them — sorting by flood resolves the dilemma"],
          ["4. Gaps in sedimentary layers without erosion", "Grand Canyon gaps represent 6, 14 and 100+ million missing years — flat unweathered surfaces suggest rapid burial"],
        ]
      },
      {
        label: "The Grand Canyon as evidence", points: [
          ["Kaibab Formation (top)", "270 Ma — topmost, youngest Paleozoic layer"],
          ["Coconino Sandstone", "280 Ma — light-coloured quartz, eolian origin, sheer cliffs"],
          ["Hermit Formation", "285 Ma"],
          ["Supai Group", "290–325 Ma — bottommost visible layer in the canyon"],
          ["Significance", "Gaps between layers show no erosion — suggests rapid deposition consistent with a flood"],
        ]
      },
      {
        label: "Reconciling science and faith", points: [
          ["Balanced approach", "Harmonize empirical science with spiritual truths of Scripture"],
          ["Biblical language", "Sometimes uses metaphorical/phenomenological language, not literal scientific description"],
          ["Intelligent Design", "God intervenes in natural history through constancy of natural laws"],
          ["Conclusion", "Both young-age and old-age frameworks require faith application in their respective areas"],
        ]
      },
    ],
    quiz: [
      { q: "The creation view supports the concept of 'catastrophism', which means:", o: ["Slow gradual changes over billions of years", "Rapid unusual major geological events", "Uniform deposition of sediments", "Evolutionary change through selection"], a: 1 },
      { q: "Which type of sedimentary rock is far more common on land than all others combined?", o: ["Igneous rock", "Metamorphic rock", "Marine sedimentary rock", "Volcanic rock"], a: 2 },
      { q: "The Dakota Formation of the western United States covers approximately:", o: ["15,000 sq km", "81,500 sq km", "815,000 sq km", "8,150,000 sq km"], a: 2 },
      { q: "What does the absence of erosion at sedimentary layer gaps suggest to flood proponents?", o: ["Extremely slow deposition over millions of years", "Little or no time passed — consistent with rapid flood deposition", "Wind erosion removed the evidence", "The layers formed deep underwater only"], a: 1 },
      { q: "Evolution suggests phanerozoic sediments were deposited over hundreds of millions of years, while the Biblical flood model proposes:", o: ["Thousands of years", "One year", "Ten years", "One million years"], a: 1 },
    ]
  },
  {
    num: "Chapter 7", title: "The Cosmic Environment", sub: "The Universe, solar system, Earth and its atmosphere",
    color: "#3C3489", tag: "tag-purple",
    intro: "Human existence is inseparable from the environment — from the Earth's crust to the cosmos. This chapter studies the Universe, the Milky Way galaxy, our solar system, and the layered spheres of Earth including the biosphere, hydrosphere, lithosphere and atmosphere.",
    sections: [
      {
        label: "The Solar System — planets", table: [
          ["Mercury", "Smallest planet, no satellite"],
          ["Venus", "Most brilliant; surface melts lead at 393°C; spins clockwise unlike others"],
          ["Earth", "Only planet supporting life; one satellite (moon)"],
          ["Mars", "Red planet; seasons, polar ice caps, volcanoes; two moons (Phobos & Deimos)"],
          ["Jupiter", "Largest planet; 79 moons; Great Red Spot; 4 Galilean moons (Io, Europa, Ganymede, Callisto)"],
          ["Saturn", "Second largest; fastest spinning; 82 moons; beautiful rings"],
          ["Uranus", "Third largest radius; coldest; 27 moons; blue-green due to methane"],
          ["Neptune", "Farthest; strongest winds; 17× Earth's mass; bluish from methane"],
        ]
      },
      {
        label: "Earth's atmosphere — layers (bottom to top)", table: [
          ["Troposphere", "0–10 km; 75–80% of atmosphere's mass; all weather; temperature drops with altitude"],
          ["Stratosphere", "10–50 km; contains the ozone layer; temperature rises with altitude; CFCs damage ozone"],
          ["Mesosphere", "50–85 km; coldest layer (~-90°C); meteors burn here; 'middle atmosphere'"],
          ["Thermosphere", "90–1000 km; very hot (up to 2000°C); Space Shuttle orbits here; ionosphere overlaps"],
          ["Exosphere", "1000 km+; fades into space; ISS orbits here; atmosphere 'leaks' into space"],
        ]
      },
      {
        label: "Earth's major spheres", points: [
          ["Biosphere", "Area where life exists — Earth crust, forests, oceans, atmosphere. Over 1.6 million known species"],
          ["Hydrosphere", "Total mass of water — 71% of Earth's surface; mostly oceans (98%); drives climate and erosion"],
          ["Lithosphere", "Solid rock outer shell — crust and upper mantle; 10–300 km thick"],
          ["Atmosphere", "Mixed gaseous air — 78% Nitrogen, 20.95% Oxygen, 0.45% Argon, 0.035% CO₂"],
        ]
      },
      {
        label: "Types of galaxies", table: [
          ["Spiral", "Flat, bulging centre; spiral arms containing gas & dust for new star formation — e.g. Milky Way"],
          ["Elliptical", "Billions of old stars; very little gas; usually largest galaxies"],
          ["Irregular", "Varying irregular shapes and sizes; difficult to classify"],
        ]
      },
    ],
    quiz: [
      { q: "Which planet spins clockwise on its axis unlike all other planets?", o: ["Mercury", "Mars", "Venus", "Uranus"], a: 2 },
      { q: "Which layer of the atmosphere contains the ozone layer that absorbs ultraviolet radiation?", o: ["Troposphere", "Mesosphere", "Stratosphere", "Thermosphere"], a: 2 },
      { q: "The coldest layer of the atmosphere, reaching about -90°C, is the:", o: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], a: 2 },
      { q: "Earth's atmosphere is approximately what percentage Nitrogen?", o: ["20.95%", "50%", "78%", "0.45%"], a: 2 },
      { q: "Recent Hubble Space Telescope 3D estimates put the number of galaxies in the Universe at:", o: ["100 billion", "200 billion", "1 trillion", "Two trillion"], a: 3 },
    ]
  },
  {
    num: "Chapter 8", title: "The Origin of the Universe", sub: "Big Bang, fundamental forces, and fundamental particles",
    color: "#0F6E56", tag: "tag-green",
    intro: "The Big Bang Theory is the broadly accepted scientific theory for the origin of the Universe — proposing it began with an explosion of a single particle approximately 13.7 billion years ago. Matter, stars, and galaxies emerged gradually through defined epochs.",
    sections: [
      {
        label: "Evidence for the Big Bang", points: [
          ["Finite beginning", "The certainty that the Universe had a start — supported by Einstein's General Relativity"],
          ["Expansion of the Universe", "Galaxies are receding from us at speeds proportional to their distance (Hubble, 1929)"],
          ["Cosmic Microwave Background (CMB)", "Remnant heat from the Big Bang — 2.725 K radiation discovered by Penzias & Wilson (1965), Nobel Prize 1978"],
          ["Abundance of light elements", "H, He, Li believed fused in the first few minutes after the Big Bang"],
        ]
      },
      {
        label: "Epochs of the early Universe", table: [
          ["1. Planck Epoch", "0–10⁻⁴³ seconds — singularity; immeasurable density and heat"],
          ["2. Second Era", "10⁻³⁶–10⁻³² seconds — electroweak and strong forces separate; no adequate theory exists"],
          ["3. Inflation Epoch", "10⁻³²–10⁻¹¹ seconds — quarks and leptons form; protons and neutrons emerge"],
          ["4. Cooling Epoch", "10⁻¹¹–10⁻⁴ seconds — particles combine to form baryons; hydrogen & helium nuclei form"],
          ["5. Nucleosynthesis Era", "Neutrons + protons → Deuterium → Helium; Lithium formed"],
          ["6. Atom Formation", "~379,000 years — electrons bind to nuclei; CMB radiation released; Universe becomes transparent"],
          ["7. Structure Epoch", "~1 billion years — matter attracted gravitationally; gas clouds, stars, galaxies form"],
        ]
      },
      {
        label: "The 4 Fundamental Forces of Nature", table: [
          ["Gravitational force", "Weakest force; affects all matter; governs planetary orbits; described by Einstein's General Relativity"],
          ["Electromagnetic force", "Carried by photon; creates electric & magnetic fields; responsible for friction, light, chemistry"],
          ["Weak force", "Carried by W & Z bosons; causes particle decay; responsible for nuclear fusion in the sun"],
          ["Strong force", "Strongest force; carried by gluons; binds quarks into protons and neutrons"],
        ]
      },
      {
        label: "Mysteries of the Universe", points: [
          ["Dark Matter", "Does not emit electromagnetic radiation. Makes up ~26% of Universe. 5.5× more dark than ordinary matter"],
          ["Dark Energy", "Acts like anti-gravity — accelerates Universe expansion. Makes up ~74% of energy density"],
          ["Black Holes", "Objects where gravity is so strong light cannot escape. Detected by accretion disk X-ray emission"],
          ["Theory of Everything", "Physicists seek to unite all 4 forces — Electroweak theory achieved 1979; Grand Unified Theory pending"],
        ]
      },
    ],
    quiz: [
      { q: "The Big Bang Theory was proposed approximately when did the Universe begin?", o: ["4.5 billion years ago", "6,000 years ago", "13.7 billion years ago", "100 billion years ago"], a: 2 },
      { q: "The Cosmic Microwave Background (CMB) radiation was discovered by:", o: ["Edwin Hubble and Fred Hoyle", "Arno Penzias and Robert Wilson", "Einstein and Lemaitre", "Carl Sagan and Hawking"], a: 1 },
      { q: "Which of the four fundamental forces is the strongest?", o: ["Gravitational force", "Electromagnetic force", "Weak force", "Strong force"], a: 3 },
      { q: "Dark matter is 'dark' because it:", o: ["Is black in colour", "Does not emit electromagnetic radiation and cannot be seen", "Only exists in black holes", "Absorbs all visible light"], a: 1 },
      { q: "Dark energy is described as acting like 'anti-gravity' because it:", o: ["Slows the expansion of the Universe", "Causes galaxies to collapse", "Produces universal repulsion and accelerates expansion", "Holds galaxies together"], a: 2 },
    ]
  },
];

export default function NotesPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scores, setScores] = useState({});
  const [answered, setAnswered] = useState({});

  const handleAnswer = (chapterIdx, quizIdx, correctOptIdx, selectedOptIdx) => {
    const qid = `q${chapterIdx}_${quizIdx}`;
    if (answered[qid]) return;

    setAnswered(prev => ({ ...prev, [qid]: { chosen: selectedOptIdx, correct: correctOptIdx } }));

    if (selectedOptIdx === correctOptIdx) {
      setScores(prev => ({ ...prev, [chapterIdx]: (prev[chapterIdx] || 0) + 1 }));
    }
  };

  const currentChapter = chapters[currentPage];
  const progressPercent = ((currentPage + 1) / chapters.length) * 100;

  return (
    <div className="notes-page">
      <div className="page-bg">
        <div className="book">
          <Link to="/" className="btn-back" style={{ color: '#fff', display: 'inline-block', marginBottom: '20px', padding: '10px 15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', textDecoration: 'none' }}>
            &larr; Back to Home
          </Link>

          <h2 className="sr-only">Origins and Science — interactive chapter summary notes with MCQ quizzes</h2>

          <div className="nav" id="chapter-nav">
            {chapters.map((ch, i) => (
              <button
                key={i}
                className={`nav-btn ${i === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(i)}
              >
                {i === 0 ? 'Intro' : `Ch ${i + 1}`}
              </button>
            ))}
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <div className="page active">
            <div className="chapter-header">
              <div className="chapter-num">{currentChapter.num}</div>
              <div className="chapter-title">{currentChapter.title}</div>
              <div className="chapter-sub">{currentChapter.sub}</div>
            </div>
            <div className="intro-card"><p>{currentChapter.intro}</p></div>

            {currentChapter.sections.map((sec, secIdx) => (
              <div key={secIdx}>
                <div className="section-label">{sec.label}</div>
                {sec.table && (
                  <div className="table-wrap">
                    <table className="def-table">
                      <thead>
                        <tr><th>Term / Item</th><th>Description</th></tr>
                      </thead>
                      <tbody>
                        {sec.table.map(([k, v], rIdx) => (
                          <tr key={rIdx}><td>{k}</td><td>{v}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {sec.points && (
                  <div className="key-points">
                    {sec.points.map(([k, v], pIdx) => (
                      <div className="kp" key={pIdx}>
                        <div className="kp-dot"></div>
                        <div className="kp-text"><strong>{k}</strong> — {v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="quiz-section">
              <div className="quiz-title">Practice questions</div>
              {currentChapter.quiz.map((q, qi) => {
                const qid = `q${currentPage}_${qi}`;
                const qAnswerLog = answered[qid];

                return (
                  <div className="q-card" key={qi}>
                    <div className="q-num">Question {qi + 1} of {currentChapter.quiz.length}</div>
                    <div className="q-text">{q.q}</div>
                    <div className="opts">
                      {q.o.map((opt, oi) => {
                        let optClass = "opt";
                        if (qAnswerLog) {
                          optClass += " locked";
                          if (oi === qAnswerLog.correct) {
                            optClass += qAnswerLog.chosen === qAnswerLog.correct ? " correct" : " reveal";
                          } else if (oi === qAnswerLog.chosen) {
                            optClass += " wrong";
                          }
                        }

                        return (
                          <button
                            key={oi}
                            className={optClass}
                            onClick={() => handleAnswer(currentPage, qi, q.a, oi)}
                            disabled={!!qAnswerLog}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {qAnswerLog && (
                      <div className={`q-feedback ${qAnswerLog.chosen === qAnswerLog.correct ? 'ok' : 'no'}`} style={{ display: 'block' }}>
                        {qAnswerLog.chosen === qAnswerLog.correct ? 'Correct!' : 'Incorrect. The correct answer is highlighted in blue.'}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="score-bar">
                <div className="score-num">
                  {scores[currentPage] || 0}/{currentChapter.quiz.reduce((acc, curr, qi) => acc + (answered[`q${currentPage}_${qi}`] ? 1 : 0), 0)} correct
                </div>
                <div className="score-label">answered</div>
              </div>
            </div>

            <div className="page-nav">
              <button
                className="pnav-btn"
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
              >
                &larr; Previous
              </button>
              <div className="page-indicator">{currentPage + 1} / {chapters.length}</div>
              <button
                className="pnav-btn primary"
                onClick={() => setCurrentPage(p => Math.min(chapters.length - 1, p + 1))}
                disabled={currentPage === chapters.length - 1}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
