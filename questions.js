/* ============================================================
   questions.js
   Question bank for the Multi-Subject Quiz App.

   Data shape:
   QUIZ_DATA = {
     subjectKey: {
       name: "Display Name",
       icon: "emoji",
       questions: [
         {
           q: "Question text?",
           options: ["A text", "B text", "C text", "D text"],
           answer: 0,            // index (0-3) of the correct option
           difficulty: "easy"    // "easy" | "medium" | "hard"
         },
         ...
       ]
     },
     ...
   }
   ============================================================ */

const QUIZ_DATA = {
  physics: {
    name: "Physics",
    icon: "\u269B\uFE0F",
    questions: [
      { q: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 1, difficulty: "easy" },
      { q: "What is the acceleration due to gravity on Earth (approx.)?", options: ["6.8 m/s\u00B2", "9.8 m/s\u00B2", "11.2 m/s\u00B2", "3.7 m/s\u00B2"], answer: 1, difficulty: "easy" },
      { q: "Which particle has a negative charge?", options: ["Proton", "Neutron", "Electron", "Positron"], answer: 2, difficulty: "easy" },
      { q: "What does E = mc\u00B2 represent?", options: ["Mass-energy equivalence", "Newton's second law", "Law of gravitation", "Ohm's law"], answer: 0, difficulty: "medium" },
      { q: "The speed of light in a vacuum is approximately:", options: ["3 \u00D7 10\u2076 m/s", "3 \u00D7 10\u2078 m/s", "3 \u00D7 10\u00B9\u2070 m/s", "3 \u00D7 10\u2074 m/s"], answer: 1, difficulty: "medium" },
      { q: "Which law states that every action has an equal and opposite reaction?", options: ["First law", "Second law", "Third law", "Law of inertia"], answer: 2, difficulty: "medium" },
      { q: "What is the unit of electrical resistance?", options: ["Ampere", "Volt", "Ohm", "Coulomb"], answer: 2, difficulty: "easy" },
      { q: "Which phenomenon explains the bending of light as it passes between media?", options: ["Reflection", "Refraction", "Diffraction", "Dispersion"], answer: 1, difficulty: "medium" },
      { q: "Heisenberg's uncertainty principle relates the uncertainties of:", options: ["Energy and time only", "Position and momentum", "Mass and velocity", "Charge and field"], answer: 1, difficulty: "hard" },
      { q: "What is the dimensional formula of power?", options: ["[ML\u00B2T\u207B\u00B3]", "[MLT\u207B\u00B2]", "[ML\u00B2T\u207B\u00B2]", "[MLT\u207B\u00B9]"], answer: 0, difficulty: "hard" },
      { q: "A superconductor has what electrical resistance below its critical temperature?", options: ["Very high", "Zero", "Infinite", "Negative"], answer: 1, difficulty: "hard" },
      { q: "Which color of visible light has the longest wavelength?", options: ["Blue", "Green", "Violet", "Red"], answer: 3, difficulty: "easy" }
    ]
  },

  chemistry: {
    name: "Chemistry",
    icon: "\uD83E\uDDEA",
    questions: [
      { q: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2, difficulty: "easy" },
      { q: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 2, difficulty: "easy" },
      { q: "What is the pH of a neutral solution at 25\u00B0C?", options: ["0", "7", "14", "1"], answer: 1, difficulty: "easy" },
      { q: "How many protons does a carbon atom have?", options: ["6", "12", "8", "14"], answer: 0, difficulty: "easy" },
      { q: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Oxygen"], answer: 1, difficulty: "easy" },
      { q: "What type of bond involves the sharing of electron pairs?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: 1, difficulty: "medium" },
      { q: "What is the chemical formula of table salt?", options: ["NaCl", "KCl", "CaCO\u2083", "NaHCO\u2083"], answer: 0, difficulty: "easy" },
      { q: "Which acid is found in the human stomach?", options: ["Sulfuric acid", "Nitric acid", "Hydrochloric acid", "Acetic acid"], answer: 2, difficulty: "medium" },
      { q: "The mole is a unit of:", options: ["Mass", "Volume", "Amount of substance", "Concentration"], answer: 2, difficulty: "medium" },
      { q: "Which of these is a noble gas?", options: ["Chlorine", "Argon", "Sodium", "Sulfur"], answer: 1, difficulty: "easy" },
      { q: "What is Avogadro's number (approx.)?", options: ["6.022 \u00D7 10\u00B2\u00B3", "3.0 \u00D7 10\u2078", "1.6 \u00D7 10\u207B\u00B9\u2079", "9.1 \u00D7 10\u207B\u00B3\u00B9"], answer: 0, difficulty: "hard" },
      { q: "Which process describes the conversion of a solid directly into a gas?", options: ["Condensation", "Sublimation", "Evaporation", "Deposition"], answer: 1, difficulty: "medium" }
    ]
  },

  biology: {
    name: "Biology",
    icon: "\uD83E\uDDEC",
    questions: [
      { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], answer: 2, difficulty: "easy" },
      { q: "Which molecule carries genetic information?", options: ["RNA", "DNA", "ATP", "Lipid"], answer: 1, difficulty: "easy" },
      { q: "How many chambers does the human heart have?", options: ["2", "3", "4", "5"], answer: 2, difficulty: "easy" },
      { q: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2, difficulty: "easy" },
      { q: "Which blood cells help fight infection?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"], answer: 1, difficulty: "easy" },
      { q: "What is the basic structural unit of life?", options: ["Tissue", "Organ", "Cell", "Molecule"], answer: 2, difficulty: "easy" },
      { q: "The process by which organisms convert food into energy is called:", options: ["Respiration", "Digestion", "Excretion", "Transpiration"], answer: 0, difficulty: "medium" },
      { q: "Which part of the brain controls balance and coordination?", options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], answer: 1, difficulty: "medium" },
      { q: "What pigment makes plants green?", options: ["Hemoglobin", "Melanin", "Chlorophyll", "Carotene"], answer: 2, difficulty: "easy" },
      { q: "Which scientist proposed the theory of evolution by natural selection?", options: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Robert Hooke"], answer: 1, difficulty: "medium" },
      { q: "During which phase of mitosis do chromosomes line up at the cell's equator?", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], answer: 1, difficulty: "hard" },
      { q: "Which enzyme begins the digestion of starch in the mouth?", options: ["Pepsin", "Amylase", "Lipase", "Trypsin"], answer: 1, difficulty: "hard" }
    ]
  },

  mathematics: {
    name: "Mathematics",
    icon: "\u2795",
    questions: [
      { q: "What is 7 \u00D7 8?", options: ["54", "56", "63", "48"], answer: 1, difficulty: "easy" },
      { q: "What is the value of \u03C0 (pi) to two decimal places?", options: ["3.41", "3.14", "3.12", "3.16"], answer: 1, difficulty: "easy" },
      { q: "What is the square root of 144?", options: ["11", "12", "13", "14"], answer: 1, difficulty: "easy" },
      { q: "How many degrees are in a right angle?", options: ["45", "90", "180", "360"], answer: 1, difficulty: "easy" },
      { q: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: 2, difficulty: "medium" },
      { q: "What is the next prime number after 7?", options: ["9", "10", "11", "13"], answer: 2, difficulty: "easy" },
      { q: "Solve for x: 2x + 6 = 14", options: ["2", "4", "6", "8"], answer: 1, difficulty: "medium" },
      { q: "What is the area of a circle with radius r?", options: ["2\u03C0r", "\u03C0r\u00B2", "\u03C0d", "2\u03C0r\u00B2"], answer: 1, difficulty: "medium" },
      { q: "What is the sum of interior angles of a triangle?", options: ["90\u00B0", "180\u00B0", "270\u00B0", "360\u00B0"], answer: 1, difficulty: "easy" },
      { q: "What is the derivative of x\u00B2 with respect to x?", options: ["x", "2x", "x\u00B2", "2"], answer: 1, difficulty: "hard" },
      { q: "What is the value of 5! (5 factorial)?", options: ["25", "60", "120", "150"], answer: 2, difficulty: "medium" },
      { q: "If log\u2081\u2080(1000) = x, what is x?", options: ["2", "3", "10", "100"], answer: 1, difficulty: "hard" }
    ]
  },

  economics: {
    name: "Economics",
    icon: "\uD83D\uDCB9",
    questions: [
      { q: "What does GDP stand for?", options: ["Gross Domestic Product", "General Domestic Price", "Gross Demand Percentage", "Global Development Plan"], answer: 0, difficulty: "easy" },
      { q: "The study of individual markets and consumers is called:", options: ["Macroeconomics", "Microeconomics", "Econometrics", "Fiscal policy"], answer: 1, difficulty: "medium" },
      { q: "What term describes a general rise in prices over time?", options: ["Deflation", "Inflation", "Recession", "Stagnation"], answer: 1, difficulty: "easy" },
      { q: "The law of demand states that as price increases, quantity demanded usually:", options: ["Increases", "Decreases", "Stays the same", "Doubles"], answer: 1, difficulty: "easy" },
      { q: "A market with a single seller is called a:", options: ["Monopoly", "Oligopoly", "Duopoly", "Perfect competition"], answer: 0, difficulty: "medium" },
      { q: "Which institution typically controls a country's money supply?", options: ["Stock exchange", "Central bank", "Treasury court", "Trade union"], answer: 1, difficulty: "medium" },
      { q: "Opportunity cost refers to:", options: ["The money you spend", "The next best alternative given up", "Total revenue", "Fixed costs"], answer: 1, difficulty: "medium" },
      { q: "What is it called when a country sells goods to other countries?", options: ["Importing", "Exporting", "Tariff", "Quota"], answer: 1, difficulty: "easy" },
      { q: "GDP measured using current market prices is called:", options: ["Real GDP", "Nominal GDP", "Per capita GDP", "Potential GDP"], answer: 1, difficulty: "hard" },
      { q: "Which curve shows the relationship between unemployment and inflation?", options: ["Laffer curve", "Phillips curve", "Lorenz curve", "Demand curve"], answer: 1, difficulty: "hard" },
      { q: "A tax levied on imported goods is known as a:", options: ["Subsidy", "Tariff", "Rebate", "Dividend"], answer: 1, difficulty: "easy" },
      { q: "Fiscal policy is primarily managed by the:", options: ["Central bank", "Government", "World Bank", "Stock market"], answer: 1, difficulty: "medium" }
    ]
  },

  history: {
    name: "History",
    icon: "\uD83C\uDFDB\uFE0F",
    questions: [
      { q: "In which year did World War II end?", options: ["1918", "1939", "1945", "1950"], answer: 2, difficulty: "easy" },
      { q: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: 1, difficulty: "easy" },
      { q: "The Great Wall is located in which country?", options: ["Japan", "India", "China", "Mongolia"], answer: 2, difficulty: "easy" },
      { q: "Which ancient civilization built the pyramids of Giza?", options: ["Roman", "Greek", "Egyptian", "Mayan"], answer: 2, difficulty: "easy" },
      { q: "Who is known as the 'Father of the Indian Nation'?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "B. R. Ambedkar"], answer: 1, difficulty: "medium" },
      { q: "The Renaissance began in which country?", options: ["France", "England", "Italy", "Spain"], answer: 2, difficulty: "medium" },
      { q: "In which year did the French Revolution begin?", options: ["1776", "1789", "1804", "1815"], answer: 1, difficulty: "medium" },
      { q: "Who discovered America in 1492?", options: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "Marco Polo"], answer: 2, difficulty: "easy" },
      { q: "The Roman Empire was eventually divided into how many parts?", options: ["Two", "Three", "Four", "Five"], answer: 0, difficulty: "hard" },
      { q: "Which treaty ended World War I?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Tordesillas", "Treaty of Ghent"], answer: 1, difficulty: "hard" },
      { q: "Who was the British Prime Minister during most of World War II?", options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"], answer: 1, difficulty: "medium" },
      { q: "The Cold War was primarily between the USA and which country?", options: ["China", "Germany", "Soviet Union", "Japan"], answer: 2, difficulty: "easy" }
    ]
  },

  geography: {
    name: "Geography",
    icon: "\uD83C\uDF0D",
    questions: [
      { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3, difficulty: "easy" },
      { q: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1, difficulty: "medium" },
      { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2, difficulty: "medium" },
      { q: "Mount Everest is located in which mountain range?", options: ["Andes", "Rockies", "Himalayas", "Alps"], answer: 2, difficulty: "easy" },
      { q: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "South America"], answer: 1, difficulty: "easy" },
      { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2, difficulty: "easy" },
      { q: "Which country has the largest population in the world (2023)?", options: ["China", "India", "USA", "Indonesia"], answer: 1, difficulty: "medium" },
      { q: "The Equator divides the Earth into which two hemispheres?", options: ["East and West", "Northern and Southern", "Upper and Lower", "Left and Right"], answer: 1, difficulty: "easy" },
      { q: "Which is the smallest country in the world by area?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], answer: 2, difficulty: "hard" },
      { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: 2, difficulty: "medium" },
      { q: "Which line of longitude is also known as the Prime Meridian?", options: ["0\u00B0", "90\u00B0", "180\u00B0", "45\u00B0"], answer: 0, difficulty: "hard" },
      { q: "Lake Baikal, the world's deepest lake, is in which country?", options: ["Canada", "Russia", "Mongolia", "Kazakhstan"], answer: 1, difficulty: "hard" }
    ]
  },

  gk: {
    name: "General Knowledge",
    icon: "\uD83D\uDCA1",
    questions: [
      { q: "How many colors are there in a rainbow?", options: ["5", "6", "7", "8"], answer: 2, difficulty: "easy" },
      { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1, difficulty: "easy" },
      { q: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], answer: 2, difficulty: "easy" },
      { q: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], answer: 2, difficulty: "easy" },
      { q: "How many players are there in a standard football (soccer) team?", options: ["9", "10", "11", "12"], answer: 2, difficulty: "easy" },
      { q: "Which is the largest mammal in the world?", options: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"], answer: 1, difficulty: "easy" },
      { q: "What does 'WWW' stand for?", options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], answer: 0, difficulty: "easy" },
      { q: "Which is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: 2, difficulty: "medium" },
      { q: "In computing, what does 'CPU' stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Utility"], answer: 1, difficulty: "medium" },
      { q: "Which language has the most native speakers worldwide?", options: ["English", "Hindi", "Mandarin Chinese", "Spanish"], answer: 2, difficulty: "hard" },
      { q: "The Statue of Liberty was a gift to the USA from which country?", options: ["United Kingdom", "France", "Italy", "Spain"], answer: 1, difficulty: "medium" },
      { q: "How many bones are there in the adult human body?", options: ["196", "206", "216", "226"], answer: 1, difficulty: "hard" }
    ]
  }
};
