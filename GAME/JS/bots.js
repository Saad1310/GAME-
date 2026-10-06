const BOTS=[

  {
    id:"nova",
    name:"NOVA",
    role:"Science Analyst",
    reliability:94,

    personality:
      "Precise, analytical and obsessed with primary evidence.",

    lines:[
      "Correlation is not proof. Find the mechanism.",
      "Interesting claim. I would want an independent source.",
      "The wording matters more than people realize.",
      "A confident statement can still be wrong."
    ],

    ask:[
      "Which part of this case looks suspicious?",
      "What evidence would you trust?",
      "Can you identify a contradiction?",
      "What should I investigate next?"
    ]
  },

  {
    id:"raven",
    name:"RAVEN",
    role:"Myth Hunter",
    reliability:82,

    personality:
      "Skeptical, sarcastic and very good at spotting popular myths.",

    lines:[
      "If everyone repeats it, that does not make it true.",
      "Sounds familiar. Familiar is not the same as factual.",
      "Someone probably confused two different facts.",
      "I would not trust a claim just because it sounds obvious."
    ],

    ask:[
      "Does any statement sound like a common myth?",
      "Which claim would you challenge first?",
      "What should I search?",
      "Could this be a wording trick?"
    ]
  },

  {
    id:"byte",
    name:"PROF. BYTE",
    role:"Technology Historian",
    reliability:91,

    personality:
      "Calm professor who remembers dates, inventions and technical details.",

    lines:[
      "Historical claims often become distorted through repetition.",
      "Dates are useful, but context matters too.",
      "The original invention and the modern version may differ.",
      "Look for the exact wording."
    ],

    ask:[
      "Could this be historically wrong?",
      "Which claim needs a date check?",
      "What technical detail matters?",
      "Which statement sounds exaggerated?"
    ]
  },

  {
    id:"milo",
    name:"MILO",
    role:"Probability Bot",
    reliability:76,

    personality:
      "Friendly but cautious. Thinks in probabilities instead of certainty.",

    lines:[
      "I would assign confidence, not certainty.",
      "That sounds possible, but possibility is not proof.",
      "The strongest clue is usually the independent one.",
      "Two weak sources do not equal one strong source."
    ],

    ask:[
      "Which statement has the lowest confidence?",
      "How should I compare clues?",
      "Is there enough evidence?",
      "What is the safest conclusion?"
    ]
  },

  {
    id:"archivist",
    name:"THE ARCHIVIST",
    role:"Historical Archive",
    reliability:97,

    personality:
      "Quiet keeper of records who prefers original documentation.",

    lines:[
      "Archives reward patience.",
      "Primary records usually beat recycled summaries.",
      "Check whether the claim matches the documented timeline.",
      "Absence of evidence is not automatically evidence of absence."
    ],

    ask:[
      "Which statement deserves archival research?",
      "Could a source be misleading?",
      "What timeline should I inspect?",
      "Which evidence would settle this?"
    ]
  },

  {
    id:"lex",
    name:"LEX",
    role:"Language Analyst",
    reliability:89,

    personality:
      "Looks for ambiguous wording, hidden assumptions and misleading phrasing.",

    lines:[
      "The claim may technically say one thing while implying another.",
      "Watch absolute words such as always, never and only.",
      "Definitions matter.",
      "A tiny wording difference can completely change a claim."
    ],

    ask:[
      "Is there a wording trap?",
      "Which word should I focus on?",
      "Does this statement use an absolute?",
      "Could the claim be technically true but misleading?"
    ]
  },

  {
    id:"glitch",
    name:"GLITCH",
    role:"Contradiction Hunter",
    reliability:72,

    personality:
      "Chaotic, fast and occasionally wrong, but excellent at noticing inconsistencies.",

    lines:[
      "WAIT. That detail does not fit.",
      "Something here is mathematically weird.",
      "I might be wrong, but check that number.",
      "Contradiction detected. Probably. Maybe. Definitely investigate."
    ],

    ask:[
      "Where is the contradiction?",
      "Which number looks suspicious?",
      "Could two claims conflict?",
      "What should I double-check?"
    ]
  },

  {
    id:"echo",
    name:"ECHO",
    role:"Public Knowledge Bot",
    reliability:61,

    personality:
      "Repeats commonly believed information and is deliberately less reliable.",

    lines:[
      "I have heard that one before.",
      "Most people would probably agree with that.",
      "That sounds true to me.",
      "I am not the best source for this one."
    ],

    ask:[
      "What do people commonly believe?",
      "Which claim sounds familiar?",
      "Could a popular belief be wrong?",
      "Should I trust common knowledge?"
    ]
  }

];