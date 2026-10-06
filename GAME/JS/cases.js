const CASES = [
    {
  id:"case-01",
  number:1,
  title:"The Three-Heart Mystery",
  difficulty:"EASY",
  category:"ANIMALS",
  keywords:["octopus","hearts","blood","gills"],

  statements:[
    "Octopuses have three hearts.",
    "Two of an octopus's hearts help move blood toward its gills.",
    "An octopus has blue blood.",
    "Octopuses belong to the group of animals called cephalopods.",
    "All three octopus hearts pump blood through the body at the same time during active swimming."
  ],

  lie:4,

  explanation:
    "Octopuses do have three hearts, but their circulation is unusual. Two branchial hearts pump blood toward the gills, while the systemic heart pumps oxygenated blood around the body. During swimming, the systemic heart temporarily stops beating, making the final statement false.",

  sources:[
    "Marine biology reference",
    "Cephalopod anatomy archive",
    "Ocean science reference",
    "Animal classification archive",
    "Comparative physiology reference"
  ],

  confidence:[98,94,96,99,48],

  clues:[
    "The two branchial hearts are associated with the gills.",
    "Octopus blood contains the oxygen-carrying pigment hemocyanin.",
    "The systemic heart stops during swimming."
  ],

  search:[
    {
      title:"Cephalopod Circulation",
      snippet:"Octopuses have two branchial hearts and one systemic heart. Swimming affects the systemic heart's activity.",
      reliability:96
    },
    {
      title:"Marine Biology Archive",
      snippet:"Octopus blood is blue because oxygen is transported using copper-containing hemocyanin.",
      reliability:94
    }
  ],

  tags:[
    ["anatomy"],
    ["circulation"],
    ["blood"],
    ["classification"],
    ["physiology"]
  ]
},

{
  id:"case-02",
  number:2,
  title:"Berry or Not?",
  difficulty:"EASY",
  category:"FOOD & BOTANY",
  keywords:["banana","berry","botany","fruit"],

  statements:[
    "Botanically, a banana is classified as a berry.",
    "A strawberry is botanically a true berry.",
    "Blueberries are true botanical berries.",
    "Grapes are botanical berries.",
    "Watermelons are botanically classified as berries in the broad botanical sense."
  ],

  lie:1,

  explanation:
    "The surprising false statement is that strawberries are true botanical berries. Bananas, grapes and blueberries are berries botanically, while strawberries are aggregate accessory fruits. Watermelon belongs to a specialized berry type called a pepo.",

  sources:[
    "Botany reference",
    "Plant morphology archive",
    "Fruit classification reference",
    "Botanical fruit database",
    "Plant science archive"
  ],

  confidence:[98,22,96,96,90],

  clues:[
    "Botanical berries develop from a single ovary.",
    "Strawberries have their seeds on the outside and are not true berries.",
    "Watermelon is a specialized type of berry called a pepo."
  ],

  search:[
    {
      title:"Botanical Berry Definition",
      snippet:"A botanical berry develops from a single ovary and generally has fleshy tissue surrounding the seeds.",
      reliability:95
    },
    {
      title:"Strawberry Classification",
      snippet:"The strawberry is an aggregate accessory fruit rather than a true botanical berry.",
      reliability:98
    }
  ],

  tags:[
    ["botany"],
    ["botany"],
    ["fruit"],
    ["fruit"],
    ["classification"]
  ]
},

{
  id:"case-03",
  number:3,
  title:"Lightning Never Twice",
  difficulty:"EASY",
  category:"NATURE",
  keywords:["lightning","storm","thunder","weather"],

  statements:[
    "Lightning can strike the same place more than once.",
    "Tall objects can be struck by lightning.",
    "Lightning is an electrical discharge.",
    "Thunder is associated with the rapid heating and expansion of air caused by lightning.",
    "Lightning only occurs when rain is falling directly underneath the bolt."
  ],

  lie:4,

  explanation:
    "Lightning can occur without rain falling directly beneath the bolt, and lightning can strike the same location repeatedly. Tall structures are particularly exposed because they extend into the electric field.",

  sources:[
    "Atmospheric science reference",
    "Weather archive",
    "Electrical phenomena reference",
    "Meteorology archive",
    "Storm science reference"
  ],

  confidence:[99,98,99,97,15],

  clues:[
    "The Empire State Building is struck by lightning many times in some years.",
    "Lightning is an electrical discharge.",
    "Lightning can occur outside the area of visible rainfall."
  ],

  search:[
    {
      title:"Lightning Repeated Strikes",
      snippet:"Lightning can repeatedly strike tall buildings, towers and other exposed locations.",
      reliability:97
    },
    {
      title:"Storm Structure",
      snippet:"Rain does not have to be falling directly beneath every lightning discharge.",
      reliability:91
    }
  ],

  tags:[
    ["weather"],
    ["weather"],
    ["electricity"],
    ["thunder"],
    ["storm"]
  ]
},

{
  id:"case-04",
  number:4,
  title:"Goldfish Memory",
  difficulty:"EASY",
  category:"ANIMALS",
  keywords:["goldfish","memory","learning","fish"],

  statements:[
    "Goldfish can learn associations.",
    "Goldfish can remember information for longer than a few seconds.",
    "Fish can be trained to respond to signals.",
    "Goldfish have been used in studies of animal learning.",
    "Goldfish automatically forget everything after exactly three seconds."
  ],

  lie:4,

  explanation:
    "The famous three-second goldfish memory claim is a myth. Goldfish can learn and retain associations, and experiments have demonstrated learning over much longer periods.",

  sources:[
    "Animal cognition reference",
    "Behavioral science archive",
    "Aquatic learning study",
    "Comparative psychology archive",
    "Myth verification archive"
  ],

  confidence:[97,96,95,94,8],

  clues:[
    "Goldfish can learn responses to feeding signals.",
    "The three-second memory idea is a popular myth.",
    "Animal learning research demonstrates memory beyond seconds."
  ],

  search:[
    {
      title:"Goldfish Learning",
      snippet:"Goldfish have demonstrated learning and memory in controlled behavioral experiments.",
      reliability:93
    },
    {
      title:"The Three-Second Myth",
      snippet:"The claim that goldfish remember only three seconds is unsupported.",
      reliability:96
    }
  ],

  tags:[
    ["learning"],
    ["memory"],
    ["behavior"],
    ["research"],
    ["myth"]
  ]
},

{
  id:"case-05",
  number:5,
  title:"Sleep Debt",
  difficulty:"MEDIUM",
  category:"PSYCHOLOGY",
  keywords:["sleep","memory","brain","rest"],

  statements:[
    "Sleep is important for many aspects of brain function.",
    "Sleep can influence memory and learning.",
    "People can become impaired after insufficient sleep.",
    "The brain remains active during sleep.",
    "One good night's sleep completely erases every effect of several nights of severe sleep deprivation."
  ],

  lie:4,

  explanation:
    "Sleep supports memory, attention and many other functions, but recovery from significant sleep loss is not necessarily complete after a single night. Recovery can require additional sleep.",

  sources:[
    "Sleep science reference",
    "Neuroscience archive",
    "Cognitive performance reference",
    "Brain research archive",
    "Sleep recovery research"
  ],

  confidence:[99,98,99,99,20],

  clues:[
    "Sleep includes multiple stages with distinct brain activity.",
    "Sleep deprivation can reduce attention and reaction performance.",
    "Recovery from sleep loss can take more than one night."
  ],

  search:[
    {
      title:"Sleep and Memory",
      snippet:"Sleep contributes to memory consolidation and cognitive performance.",
      reliability:96
    },
    {
      title:"Sleep Recovery",
      snippet:"Recovery from sleep restriction can require multiple nights of adequate sleep.",
      reliability:92
    }
  ],

  tags:[
    ["sleep"],
    ["memory"],
    ["performance"],
    ["brain"],
    ["recovery"]
  ]
},

{
  id:"case-06",
  number:6,
  title:"The Red Planet",
  difficulty:"EASY",
  category:"SPACE",
  keywords:["Mars","red","iron","planet"],

  statements:[
    "Mars appears reddish partly because iron minerals on its surface have oxidized.",
    "Mars has two known small moons.",
    "Mars has a thinner atmosphere than Earth.",
    "Mars has surface features including enormous volcanoes.",
    "Mars is the hottest planet in the Solar System."
  ],

  lie:4,

  explanation:
    "Mars is not the hottest planet. Venus has the highest average surface temperature because its thick carbon-dioxide atmosphere produces an extreme greenhouse effect.",

  sources:[
    "Planetary science archive",
    "Mars mission reference",
    "Planet atmosphere archive",
    "Solar System database",
    "Planet temperature reference"
  ],

  confidence:[99,99,98,98,12],

  clues:[
    "Mars is known for iron-rich dust that gives it a reddish appearance.",
    "Mars has Phobos and Deimos.",
    "Venus is hotter than Mars."
  ],

  search:[
    {
      title:"Mars Surface",
      snippet:"Iron-bearing minerals contribute to the red appearance of Martian dust.",
      reliability:98
    },
    {
      title:"Planet Temperature",
      snippet:"Venus has a higher average surface temperature than Mars and is the hottest planet.",
      reliability:99
    }
  ],

  tags:[
    ["planet"],
    ["moons"],
    ["atmosphere"],
    ["volcano"],
    ["temperature"]
  ]
},

{
  id:"case-07",
  number:7,
  title:"The Vacuum Myth",
  difficulty:"MEDIUM",
  category:"SPACE",
  keywords:["space","vacuum","sound","astronaut"],

  statements:[
    "Sound does not travel through an ideal vacuum.",
    "Space is approximately a vacuum in many regions.",
    "Astronauts can communicate using radio systems.",
    "A normal explosion in empty space would not produce a sound wave traveling through the vacuum to a distant listener.",
    "Astronauts can hear every sound from spacecraft engines directly through open space."
  ],

  lie:4,

  explanation:
    "Sound requires a medium such as air, water or solid material to propagate. Radio communication allows astronauts and spacecraft to communicate across the vacuum of space.",

  sources:[
    "Physics reference",
    "Space environment archive",
    "Communication technology reference",
    "Acoustics archive",
    "Vacuum physics reference"
  ],

  confidence:[99,96,99,99,5],

  clues:[
    "Sound is a mechanical wave.",
    "Radio waves can travel through vacuum.",
    "A vacuum does not provide the material medium required for ordinary sound propagation."
  ],

  search:[
    {
      title:"Sound in Vacuum",
      snippet:"Ordinary sound waves require a material medium and cannot propagate through an ideal vacuum.",
      reliability:99
    },
    {
      title:"Space Communication",
      snippet:"Spacecraft use radio waves for communication across vacuum.",
      reliability:98
    }
  ],

  tags:[
    ["physics"],
    ["space"],
    ["radio"],
    ["acoustics"],
    ["vacuum"]
  ]
},

{
  id:"case-08",
  number:8,
  title:"The Great Wall Question",
  difficulty:"MEDIUM",
  category:"HISTORY",
  keywords:["Great Wall","China","moon","space"],

  statements:[
    "The Great Wall of China consists of many sections built and rebuilt over different periods.",
    "Some sections of the wall were constructed using materials available locally.",
    "The Great Wall was used for defense and border control.",
    "The Great Wall can be clearly seen from the Moon with the naked eye.",
    "Some parts of the wall have deteriorated or disappeared over time."
  ],

  lie:3,

  explanation:
    "The Great Wall is not clearly visible from the Moon with the naked eye. Its visibility from low Earth orbit can also be difficult depending on conditions, making the Moon claim especially misleading.",

  sources:[
    "Chinese history archive",
    "Architecture reference",
    "Military history archive",
    "Astronomy myth archive",
    "Conservation reference"
  ],

  confidence:[99,96,98,8,96],

  clues:[
    "The wall is composed of many sections from different eras.",
    "Visibility from space is much more complicated than popular myths suggest.",
    "The Moon is vastly farther away than low Earth orbit."
  ],

  search:[
    {
      title:"Great Wall Construction",
      snippet:"The Great Wall refers to a network of fortifications built across different periods.",
      reliability:97
    },
    {
      title:"Great Wall Visibility Myth",
      snippet:"The Great Wall is not a clearly visible naked-eye feature from the Moon.",
      reliability:99
    }
  ],

  tags:[
    ["history"],
    ["architecture"],
    ["defense"],
    ["myth"],
    ["conservation"]
  ]
},

{
  id:"case-09",
  number:9,
  title:"Cold Blooded Confusion",
  difficulty:"MEDIUM",
  category:"ANIMALS",
  keywords:["reptile","cold blooded","ectotherm","temperature"],

  statements:[
    "Many reptiles are ectothermic.",
    "Ectothermic animals rely substantially on external sources of heat to regulate body temperature.",
    "A lizard may bask in sunlight to warm itself.",
    "All reptiles maintain a constant internal temperature independent of their surroundings.",
    "Behavior can help ectothermic animals regulate body temperature."
  ],

  lie:3,

  explanation:
    "Most reptiles are ectothermic, meaning their body temperature is strongly influenced by the environment. They can regulate temperature behaviorally, for example by moving between sun and shade.",

  sources:[
    "Zoology reference",
    "Thermoregulation archive",
    "Reptile behavior study",
    "Animal physiology reference",
    "Ecology archive"
  ],

  confidence:[98,97,98,10,97],

  clues:[
    "Ectothermy means external environmental heat contributes strongly to body temperature.",
    "Basking is a common thermoregulatory behavior.",
    "Ectothermic animals can move between warmer and cooler areas."
  ],

  search:[
    {
      title:"Reptile Thermoregulation",
      snippet:"Many reptiles use environmental heat and behavioral adjustments to regulate body temperature.",
      reliability:97
    }
  ],

  tags:[
    ["reptiles"],
    ["physiology"],
    ["behavior"],
    ["temperature"],
    ["ecology"]
  ]
},

{
  id:"case-10",
  number:10,
  title:"Banana Radiation",
  difficulty:"MEDIUM",
  category:"EVERYDAY SCIENCE",
  keywords:["banana","potassium","radiation","radioactive"],

  statements:[
    "Bananas contain potassium.",
    "A tiny fraction of naturally occurring potassium is radioactive potassium-40.",
    "Bananas are a normal dietary source of potassium.",
    "Eating a banana exposes a person to a tiny amount of natural radioactivity.",
    "A banana is dangerous to eat because its radioactivity is comparable to a major radiation accident."
  ],

  lie:4,

  explanation:
    "Bananas do contain naturally occurring potassium-40, but the amount is tiny and not remotely comparable to radiation from a major accident. The banana radiation idea is often used as a fun demonstration of natural background radioactivity.",

  sources:[
    "Chemistry reference",
    "Nuclear science archive",
    "Nutrition reference",
    "Radiation science archive",
    "Radiation safety reference"
  ],

  confidence:[99,98,99,98,1],

  clues:[
    "Natural potassium includes a small amount of potassium-40.",
    "Potassium-40 is radioactive.",
    "The amount in food is extremely small."
  ],

  search:[
    {
      title:"Potassium-40",
      snippet:"Naturally occurring potassium includes the radioactive isotope potassium-40.",
      reliability:98
    },
    {
      title:"Food Radioactivity",
      snippet:"Many foods contain tiny amounts of naturally occurring radioactive isotopes.",
      reliability:96
    }
  ],

  tags:[
    ["chemistry"],
    ["radioactivity"],
    ["nutrition"],
    ["physics"],
    ["safety"]
  ]
},

{
  id:"case-11",
  number:11,
  title:"The Eiffel Mystery",
  difficulty:"MEDIUM",
  category:"INVENTIONS",
  keywords:["Eiffel Tower","Paris","Gustave Eiffel","iron"],

  statements:[
    "The Eiffel Tower is in Paris.",
    "The tower was completed for the 1889 Exposition Universelle.",
    "Gustave Eiffel's company was involved in its construction.",
    "The tower was originally intended to remain permanently unchanged forever.",
    "The structure was built primarily from wrought iron."
  ],

  lie:3,

  explanation:
    "The Eiffel Tower was initially conceived as a temporary structure for the 1889 exposition, although it became permanent because of its usefulness for communications and its cultural significance.",

  sources:[
    "Paris history archive",
    "1889 exposition archive",
    "Engineering history reference",
    "Eiffel Tower historical archive",
    "Structural engineering reference"
  ],

  confidence:[99,98,98,18,97],

  clues:[
    "The tower was constructed for the 1889 exposition.",
    "It became useful for radio and communications experiments.",
    "Its material is wrought iron."
  ],

  search:[
    {
      title:"Eiffel Tower History",
      snippet:"The tower was built for the 1889 World's Fair in Paris.",
      reliability:99
    },
    {
      title:"Temporary Structure",
      snippet:"The Eiffel Tower was initially associated with a temporary exhibition project.",
      reliability:95
    }
  ],

  tags:[
    ["Paris"],
    ["history"],
    ["engineering"],
    ["construction"],
    ["architecture"]
  ]
},

{
  id:"case-12",
  number:12,
  title:"The Coffee Myth",
  difficulty:"MEDIUM",
  category:"FOOD",
  keywords:["coffee","caffeine","dehydration","water"],

  statements:[
    "Coffee contains caffeine.",
    "Caffeine is a stimulant.",
    "Coffee contributes fluid to a person's daily intake.",
    "Moderate coffee consumption does not simply cancel out its water content because of its caffeine.",
    "Every cup of coffee causes severe dehydration in healthy people."
  ],

  lie:4,

  explanation:
    "Coffee contains caffeine, which has a mild diuretic effect, but ordinary coffee consumption still contributes fluid to hydration. Severe dehydration from every cup is a myth.",

  sources:[
    "Nutrition reference",
    "Caffeine science archive",
    "Hydration reference",
    "Nutrition research",
    "Myth verification archive"
  ],

  confidence:[99,99,96,91,8],

  clues:[
    "Coffee is mostly water.",
    "Caffeine can have a diuretic effect.",
    "Normal coffee consumption still contributes to total fluid intake."
  ],

  search:[
    {
      title:"Coffee and Hydration",
      snippet:"Coffee contributes to fluid intake despite caffeine's mild diuretic effect.",
      reliability:93
    }
  ],

  tags:[
    ["coffee"],
    ["caffeine"],
    ["hydration"],
    ["nutrition"],
    ["myth"]
  ]
},

{
  id:"case-13",
  number:13,
  title:"The Speed of Light",
  difficulty:"HARD",
  category:"PHYSICS",
  keywords:["light","speed","vacuum","relativity"],

  statements:[
    "Light travels through vacuum at approximately 300,000 kilometers per second.",
    "Light travels more slowly through materials such as glass than through vacuum.",
    "The speed of light is important in Einstein's theory of relativity.",
    "No information-carrying object can locally accelerate past the speed of light in vacuum according to special relativity.",
    "Light travels at exactly the same speed through every material."
  ],

  lie:4,

  explanation:
    "Light's speed depends on the medium. In vacuum it travels at about 299,792 km/s, while its effective propagation speed through materials is lower.",

  sources:[
    "Physics reference",
    "Optics archive",
    "Relativity reference",
    "Modern physics archive",
    "Optics textbook"
  ],

  confidence:[99,98,98,96,7],

  clues:[
    "The vacuum speed of light is approximately 299,792 km/s.",
    "Refractive index affects propagation through materials.",
    "Special relativity uses c as a fundamental invariant speed."
  ],

  search:[
    {
      title:"Speed of Light",
      snippet:"Light travels at approximately 299,792 kilometers per second in vacuum.",
      reliability:99
    },
    {
      title:"Light in Glass",
      snippet:"Light propagates more slowly through glass than through vacuum.",
      reliability:98
    }
  ],

  tags:[
    ["physics"],
    ["optics"],
    ["relativity"],
    ["speed"],
    ["materials"]
  ]
},

{
  id:"case-14",
  number:14,
  title:"The Roman Concrete Puzzle",
  difficulty:"HARD",
  category:"HISTORY",
  keywords:["Roman","concrete","architecture","lime"],

  statements:[
    "Ancient Romans used concrete extensively.",
    "Roman concrete was used in large structures.",
    "Some Roman concrete structures have survived for centuries.",
    "Modern researchers have studied chemical and structural features of Roman concrete.",
    "Roman concrete was identical in composition and behavior to every modern concrete mixture."
  ],

  lie:4,

  explanation:
    "Roman concrete was not identical to every modern concrete mixture. Its ingredients, reactions and performance varied, and some formulations show unusual durability characteristics.",

  sources:[
    "Roman engineering archive",
    "Archaeological materials reference",
    "Ancient architecture archive",
    "Materials science research",
    "Concrete engineering reference"
  ],

  confidence:[99,98,98,96,12],

  clues:[
    "Roman builders used concrete in harbors and monumental architecture.",
    "Researchers have identified distinctive mineral structures.",
    "Modern concrete mixtures are diverse and not identical to Roman formulations."
  ],

  search:[
    {
      title:"Roman Concrete",
      snippet:"Roman builders used concrete extensively, including in large architectural and maritime structures.",
      reliability:98
    },
    {
      title:"Ancient Materials Research",
      snippet:"Researchers continue to investigate the chemistry and durability of Roman concrete.",
      reliability:95
    }
  ],

  tags:[
    ["engineering"],
    ["history"],
    ["materials"],
    ["archaeology"],
    ["chemistry"]
  ]
},

{
  id:"case-15",
  number:15,
  title:"The Shark Fact File",
  difficulty:"HARD",
  category:"ANIMALS",
  keywords:["shark","skeleton","cartilage","fish"],

  statements:[
    "Sharks are cartilaginous fish.",
    "Shark skeletons are primarily made of cartilage rather than true bone.",
    "Sharks are vertebrates.",
    "Sharks have evolved specialized teeth adapted to different diets.",
    "Sharks are mammals because they breathe air using lungs."
  ],

  lie:4,

  explanation:
    "Sharks are fish, not mammals. They are cartilaginous vertebrates and use gills for respiration rather than lungs.",

  sources:[
    "Marine zoology reference",
    "Comparative anatomy archive",
    "Vertebrate classification reference",
    "Shark biology archive",
    "Marine physiology reference"
  ],

  confidence:[99,99,99,98,2],

  clues:[
    "Sharks belong to Chondrichthyes.",
    "Their skeletons are primarily cartilage.",
    "Sharks breathe through gills."
  ],

  search:[
    {
      title:"Shark Classification",
      snippet:"Sharks are cartilaginous fish and vertebrates.",
      reliability:99
    }
  ],

  tags:[
    ["fish"],
    ["cartilage"],
    ["vertebrate"],
    ["teeth"],
    ["respiration"]
  ]
},

{
  id:"case-16",
  number:16,
  title:"The Moon Has No Light",
  difficulty:"HARD",
  category:"SPACE",
  keywords:["Moon","sunlight","reflection","lunar"],

  statements:[
    "The Moon does not produce visible light like the Sun.",
    "Moonlight is reflected sunlight.",
    "The Moon has phases as seen from Earth.",
    "The far side of the Moon is sometimes incorrectly called the dark side.",
    "The Moon is permanently dark because sunlight never reaches its far side."
  ],

  lie:4,

  explanation:
    "The Moon's far side receives sunlight too. The phrase 'dark side' is misleading because the far side experiences day and night just like the near side.",

  sources:[
    "Lunar science reference",
    "Astronomy archive",
    "Moon phase reference",
    "Planetary science archive",
    "Lunar illumination reference"
  ],

  confidence:[99,99,98,94,5],

  clues:[
    "The Moon reflects sunlight.",
    "Both lunar hemispheres experience sunlight.",
    "Far side and dark side are not synonymous."
  ],

  search:[
    {
      title:"Lunar Far Side",
      snippet:"The far side of the Moon receives sunlight and experiences lunar day and night.",
      reliability:99
    }
  ],

  tags:[
    ["Moon"],
    ["light"],
    ["phases"],
    ["astronomy"],
    ["illumination"]
  ]
},

{
  id:"case-17",
  number:17,
  title:"The Brain Uses Everything",
  difficulty:"HARD",
  category:"PSYCHOLOGY",
  keywords:["brain","10 percent","neurons","myth"],

  statements:[
    "The brain is metabolically expensive.",
    "Different brain regions have different functions.",
    "Brain imaging can show activity in many regions.",
    "The claim that humans use only 10 percent of their brains is a popular myth.",
    "At any moment, exactly 90 percent of the human brain is completely inactive and useless."
  ],

  lie:4,

  explanation:
    "The 10-percent brain myth is false. Brain activity varies across tasks and states, but the idea that 90 percent is simply useless is not supported by neuroscience.",

  sources:[
    "Neuroscience reference",
    "Brain anatomy archive",
    "Neuroimaging reference",
    "Psychology myth archive",
    "Brain physiology reference"
  ],

  confidence:[99,99,98,99,3],

  clues:[
    "Different brain areas perform different functions.",
    "The brain consumes substantial energy.",
    "The 10-percent claim has no scientific basis."
  ],

  search:[
    {
      title:"Ten Percent Brain Myth",
      snippet:"The claim that humans use only ten percent of their brains is a persistent myth.",
      reliability:99
    }
  ],

  tags:[
    ["brain"],
    ["neuroscience"],
    ["myth"],
    ["psychology"],
    ["energy"]
  ]
},

{
  id:"case-18",
  number:18,
  title:"The Microwave Myth",
  difficulty:"HARD",
  category:"TECHNOLOGY",
  keywords:["microwave","radiation","oven","food"],

  statements:[
    "Microwave ovens use electromagnetic waves to heat food.",
    "The radiation used by microwave ovens is non-ionizing radiation.",
    "Microwave ovens heat food through interactions involving polar molecules such as water.",
    "A microwave oven is designed to contain most microwave energy within its metal enclosure.",
    "Microwave ovens make food radioactive after heating."
  ],

  lie:4,

  explanation:
    "Microwave ovens do not make food radioactive. Their electromagnetic radiation is non-ionizing and is used to transfer energy to molecules in the food.",

  sources:[
    "Electromagnetism reference",
    "Radiation science archive",
    "Food physics reference",
    "Appliance engineering archive",
    "Radiation safety reference"
  ],

  confidence:[99,98,96,96,3],

  clues:[
    "Microwaves are non-ionizing.",
    "Heating food does not make it radioactive.",
    "The oven's metal cavity helps contain microwave energy."
  ],

  search:[
    {
      title:"Microwave Radiation",
      snippet:"Microwave ovens use non-ionizing electromagnetic radiation to heat food.",
      reliability:99
    },
    {
      title:"Food Radioactivity",
      snippet:"Heating food in a microwave does not induce ordinary radioactivity.",
      reliability:98
    }
  ],

  tags:[
    ["technology"],
    ["radiation"],
    ["food"],
    ["physics"],
    ["safety"]
  ]
},

{
  id:"case-19",
  number:19,
  title:"The Everest Ocean",
  difficulty:"EXPERT",
  category:"GEOGRAPHY",
  keywords:["Everest","ocean","elevation","mountain"],

  statements:[
    "Mount Everest is the highest mountain above sea level.",
    "Everest is part of the Himalayas.",
    "The elevation of Everest has been measured and revised as surveying methods improve.",
    "Everest is located on the border between Nepal and China.",
    "Everest is the tallest mountain in the world when measured from the center of Earth."
  ],

  lie:4,

  explanation:
    "Everest is the highest mountain above sea level, but Chimborazo's summit is farther from Earth's center because Earth bulges at the equator.",

  sources:[
    "Geography reference",
    "Himalayan archive",
    "Surveying reference",
    "Nepal-China geography archive",
    "Earth geometry reference"
  ],

  confidence:[99,99,96,98,12],

  clues:[
    "Everest's ranking depends on the measurement convention.",
    "Earth is not a perfect sphere.",
    "Chimborazo's equatorial position gives its summit greater distance from Earth's center."
  ],

  search:[
    {
      title:"Everest Measurement",
      snippet:"Everest is the highest point above mean sea level.",
      reliability:99
    },
    {
      title:"Chimborazo and Earth's Center",
      snippet:"Because Earth bulges at the equator, Chimborazo's summit is farther from Earth's center than Everest's summit.",
      reliability:96
    }
  ],

  tags:[
    ["geography"],
    ["mountains"],
    ["surveying"],
    ["border"],
    ["Earth geometry"]
  ]
},

{
  id:"case-20",
  number:20,
  title:"The Sahara Wasn't Always Dry",
  difficulty:"EXPERT",
  category:"GEOGRAPHY",
  keywords:["Sahara","Africa","climate","green Sahara"],

  statements:[
    "The Sahara is currently one of the world's largest hot deserts.",
    "The Sahara has experienced major climate changes over geological time.",
    "Parts of the Sahara were much wetter during periods of the African Humid Period.",
    "Ancient human communities lived in regions that are now extremely dry desert.",
    "The Sahara has had exactly the same climate throughout human history."
  ],

  lie:4,

  explanation:
    "The Sahara has undergone major climate shifts. During the African Humid Period, parts of the region supported lakes, grasslands and human populations.",

  sources:[
    "African climate archive",
    "Paleoclimate reference",
    "African Humid Period research",
    "Archaeological archive",
    "Desert climatology reference"
  ],

  confidence:[99,99,98,96,4],

  clues:[
    "Ancient rock art documents animals and environments unlike today's Sahara.",
    "Lake sediments preserve evidence of wetter periods.",
    "Earth's orbital cycles influence African monsoon patterns."
  ],

  search:[
    {
      title:"African Humid Period",
      snippet:"The Sahara experienced a significantly wetter climate during the African Humid Period.",
      reliability:98
    }
  ],

  tags:[
    ["climate"],
    ["paleoclimate"],
    ["Africa"],
    ["archaeology"],
    ["desert"]
  ]
},

{
  id:"case-21",
  number:21,
  title:"The Invention Timeline",
  difficulty:"EXPERT",
  category:"INVENTIONS",
  keywords:["telephone","Bell","Gray","invention","patent"],

  statements:[
    "Alexander Graham Bell is strongly associated with the development of the telephone.",
    "The history of the telephone involved multiple inventors and researchers.",
    "Patent history around the telephone is complex.",
    "Antonio Meucci has also been discussed in historical accounts of early telephone development.",
    "Alexander Graham Bell invented every component and idea ever used in telephone technology completely alone."
  ],

  lie:4,

  explanation:
    "Telephone development was a multi-person technological history involving multiple inventors, experiments and improvements. The claim that Bell independently invented every component and idea is far too absolute.",

  sources:[
    "Technology history archive",
    "Invention history reference",
    "Patent archive",
    "Telephone history archive",
    "Engineering history reference"
  ],

  confidence:[98,99,96,91,2],

  clues:[
    "Major technologies usually develop through cumulative work.",
    "Several inventors worked on voice transmission.",
    "Patent disputes show the history was not simple."
  ],

  search:[
    {
      title:"Telephone Development",
      snippet:"The telephone emerged through a complex history involving multiple inventors and experiments.",
      reliability:96
    }
  ],

  tags:[
    ["invention"],
    ["technology"],
    ["patents"],
    ["history"],
    ["telephone"]
  ]
},

{
  id:"case-22",
  number:22,
  title:"The T. Rex Time Gap",
  difficulty:"EXPERT",
  category:"PALEONTOLOGY",
  keywords:["Tyrannosaurus","Stegosaurus","dinosaurs","time"],

  statements:[
    "Tyrannosaurus rex lived during the Late Cretaceous.",
    "Stegosaurus lived much earlier than Tyrannosaurus rex.",
    "Humans and Tyrannosaurus rex did not live at the same time.",
    "Tyrannosaurus rex lived closer in time to humans than to Stegosaurus.",
    "The Jurassic period came before the Cretaceous period."
  ],

  lie:3,

  explanation:
    "Tyrannosaurus rex lived about 68–66 million years ago, while Stegosaurus lived roughly 150 million years ago. The gap between T. rex and Stegosaurus was far larger than the gap between T. rex and modern humans.",

  sources:[
    "Paleontology archive",
    "Dinosaur timeline reference",
    "Human evolution archive",
    "Geological timescale reference",
    "Geology archive"
  ],

  confidence:[99,99,99,5,99],

  clues:[
    "Stegosaurus lived during the Late Jurassic.",
    "T. rex lived during the Late Cretaceous.",
    "Modern humans appeared extremely recently compared with dinosaur timescales."
  ],

  search:[
    {
      title:"Dinosaur Timeline",
      snippet:"Stegosaurus lived tens of millions of years before Tyrannosaurus rex.",
      reliability:99
    },
    {
      title:"T. rex and Humans",
      snippet:"The time separating T. rex from modern humans is much smaller than the time separating T. rex from Stegosaurus.",
      reliability:98
    }
  ],

  tags:[
    ["dinosaurs"],
    ["Jurassic"],
    ["Cretaceous"],
    ["evolution"],
    ["geology"]
  ]
},

{
  id:"case-23",
  number:23,
  title:"The Octopus Intelligence File",
  difficulty:"EXPERT",
  category:"ANIMALS",
  keywords:["octopus","intelligence","neurons","behavior"],

  statements:[
    "Octopuses are known for complex behavior.",
    "Octopuses can solve certain problems in laboratory settings.",
    "A large portion of an octopus's nervous system is distributed through its arms.",
    "Octopuses have highly developed nervous systems relative to many invertebrates.",
    "Octopuses have human-like intelligence and think exactly like humans."
  ],

  lie:4,

  explanation:
    "Octopuses demonstrate sophisticated behavior, but saying they have human-like intelligence and think exactly like humans is unsupported and misleading. Their nervous system is organized very differently.",

  sources:[
    "Cephalopod neuroscience reference",
    "Animal cognition archive",
    "Octopus nervous system research",
    "Comparative biology archive",
    "Comparative cognition reference"
  ],

  confidence:[98,94,98,97,2],

  clues:[
    "Octopus nervous systems are highly distributed.",
    "Their behavior includes problem solving and learning.",
    "Different species can have very different nervous system organization."
  ],

  search:[
    {
      title:"Octopus Cognition",
      snippet:"Octopuses demonstrate learning, exploration and problem-solving behavior.",
      reliability:94
    },
    {
      title:"Distributed Nervous System",
      snippet:"Octopus nervous systems contain substantial neural processing in their arms.",
      reliability:95
    }
  ],

  tags:[
    ["intelligence"],
    ["learning"],
    ["neurons"],
    ["behavior"],
    ["comparison"]
  ]
},

{
  id:"case-24",
  number:24,
  title:"The Poison Apple",
  difficulty:"EXPERT",
  category:"FOOD",
  keywords:["apple","seeds","cyanide","fruit"],

  statements:[
    "Apple seeds contain compounds that can release cyanide when metabolized.",
    "The presence of such compounds does not mean ordinary apple eating is normally dangerous.",
    "The amount of a substance matters when evaluating toxicity.",
    "Chewing and digesting seeds affects exposure compared with swallowing them whole.",
    "Eating one normal apple automatically gives a person a lethal dose of cyanide."
  ],

  lie:4,

  explanation:
    "Apple seeds contain amygdalin, which can release cyanide under certain conditions, but ordinary consumption of an apple does not automatically provide a lethal cyanide dose.",

  sources:[
    "Food chemistry reference",
    "Toxicology archive",
    "Dose-response reference",
    "Food digestion reference",
    "Toxicology myth archive"
  ],

  confidence:[97,98,99,92,1],

  clues:[
    "Toxicity depends on dose and exposure.",
    "Apple seeds contain amygdalin.",
    "Ordinary apple consumption is not equivalent to consuming a lethal poison dose."
  ],

  search:[
    {
      title:"Apple Seed Chemistry",
      snippet:"Apple seeds contain amygdalin, a cyanogenic compound.",
      reliability:95
    },
    {
      title:"Dose and Toxicity",
      snippet:"Toxic effects depend on dose, exposure and other factors rather than simply the presence of a chemical.",
      reliability:98
    }
  ],

  tags:[
    ["food"],
    ["chemistry"],
    ["toxicology"],
    ["dose"],
    ["myth"]
  ]
},

{
  id:"case-25",
  number:25,
  title:"The Penguin Problem",
  difficulty:"HARD",
  category:"ANIMALS",
  keywords:["penguin","Antarctica","Arctic","birds"],

  statements:[
    "Penguins are birds.",
    "Penguins cannot fly through the air.",
    "Many penguin species live in the Southern Hemisphere.",
    "Penguins are adapted for swimming.",
    "Wild penguins naturally live at the North Pole."
  ],

  lie:4,

  explanation:
    "Penguins are naturally associated with the Southern Hemisphere. There are no wild penguin populations naturally living at the North Pole.",

  sources:[
    "Ornithology reference",
    "Penguin biology archive",
    "Polar geography reference",
    "Marine bird archive",
    "Arctic wildlife reference"
  ],

  confidence:[99,99,98,99,1],

  clues:[
    "Penguins are flightless birds.",
    "Penguins have streamlined bodies and powerful flippers.",
    "The North Pole is in the Arctic."
  ],

  search:[
    {
      title:"Penguin Distribution",
      snippet:"Penguins are naturally distributed primarily in the Southern Hemisphere.",
      reliability:99
    }
  ],

  tags:[
    ["birds"],
    ["flightless"],
    ["Southern Hemisphere"],
    ["swimming"],
    ["polar"]
  ]
},

{
  id:"case-26",
  number:26,
  title:"The Color of the Sky",
  difficulty:"HARD",
  category:"PHYSICS",
  keywords:["sky","blue","Rayleigh","scattering"],

  statements:[
    "Earth's daytime sky often appears blue.",
    "Shorter visible wavelengths are scattered more strongly by Earth's atmosphere than longer wavelengths.",
    "Sunsets can appear red or orange because light travels through a longer atmospheric path.",
    "The Sun itself emits only blue light.",
    "Atmospheric scattering contributes to the sky's color."
  ],

  lie:3,

  explanation:
    "The Sun emits a broad range of visible wavelengths, not only blue light. Atmospheric scattering changes how different wavelengths reach an observer.",

  sources:[
    "Optics reference",
    "Atmospheric physics archive",
    "Rayleigh scattering reference",
    "Solar spectrum archive",
    "Atmospheric science reference"
  ],

  confidence:[99,99,98,3,99],

  clues:[
    "Sunlight contains many visible wavelengths.",
    "Rayleigh scattering is stronger for shorter wavelengths.",
    "Long atmospheric paths enhance reddish colors at sunset."
  ],

  search:[
    {
      title:"Rayleigh Scattering",
      snippet:"Atmospheric molecules scatter shorter wavelengths more strongly, contributing to the blue daytime sky.",
      reliability:99
    },
    {
      title:"Solar Spectrum",
      snippet:"The Sun emits radiation across a broad range of wavelengths including visible light.",
      reliability:99
    }
  ],

  tags:[
    ["optics"],
    ["scattering"],
    ["sunset"],
    ["solar"],
    ["atmosphere"]
  ]
},

{
  id:"case-27",
  number:27,
  title:"The Human Blood File",
  difficulty:"MEDIUM",
  category:"BIOLOGY",
  keywords:["blood","red","hemoglobin","oxygen"],

  statements:[
    "Human blood appears red because of hemoglobin.",
    "Hemoglobin helps transport oxygen.",
    "Oxygen-rich blood is generally brighter red than oxygen-poor blood.",
    "Human blood is naturally blue inside veins.",
    "Blood contains cells suspended in a liquid called plasma."
  ],

  lie:3,

  explanation:
    "Human blood is red, not blue. Veins can appear blue through the skin because of how light interacts with skin and tissue, but the blood itself remains red.",

  sources:[
    "Human biology reference",
    "Hematology archive",
    "Respiratory physiology reference",
    "Optics and skin reference",
    "Blood composition archive"
  ],

  confidence:[99,99,98,4,99],

  clues:[
    "Hemoglobin is a red protein.",
    "Deoxygenated blood is dark red, not blue.",
    "Skin optics can make veins appear bluish."
  ],

  search:[
    {
      title:"Blood Color",
      snippet:"Human blood ranges from bright red to dark red depending partly on oxygenation.",
      reliability:99
    }
  ],

  tags:[
    ["blood"],
    ["hemoglobin"],
    ["oxygen"],
    ["optics"],
    ["biology"]
  ]
},

{
  id:"case-28",
  number:28,
  title:"The Earth's Rotation",
  difficulty:"EXPERT",
  category:"SPACE & EARTH",
  keywords:["Earth","rotation","day","orbit"],

  statements:[
    "Earth rotates on its axis.",
    "Earth's rotation is responsible for the daily cycle of day and night.",
    "Earth also orbits the Sun.",
    "A solar day and a sidereal day are defined in exactly the same way and are always exactly identical in length.",
    "Earth's axial rotation and orbital motion are separate motions."
  ],

  lie:3,

  explanation:
    "A solar day and sidereal day are different measurements. A solar day is based on the Sun returning to approximately the same position in the sky, while a sidereal day is measured relative to distant stars.",

  sources:[
    "Earth science reference",
    "Astronomy archive",
    "Orbital mechanics reference",
    "Timekeeping astronomy archive",
    "Planetary motion reference"
  ],

  confidence:[99,99,99,6,99],

  clues:[
    "A solar day is about 24 hours.",
    "A sidereal day is about 23 hours 56 minutes.",
    "Earth rotates while simultaneously orbiting the Sun."
  ],

  search:[
    {
      title:"Sidereal vs Solar Day",
      snippet:"A sidereal day and a solar day use different reference points and have slightly different lengths.",
      reliability:99
    }
  ],

  tags:[
    ["Earth"],
    ["rotation"],
    ["orbit"],
    ["time"],
    ["astronomy"]
  ]
},

{
  id:"case-29",
  number:29,
  title:"The Great Fire Myth",
  difficulty:"EXPERT",
  category:"HISTORY",
  keywords:["London","fire","1666","history"],

  statements:[
    "The Great Fire of London occurred in 1666.",
    "The fire destroyed a large part of medieval London.",
    "The fire began in a bakery on Pudding Lane according to historical accounts.",
    "The fire destroyed every building in London.",
    "Rebuilding after the fire changed parts of London's architecture and planning."
  ],

  lie:3,

  explanation:
    "The Great Fire devastated a large part of London but did not destroy every building in the city. Areas outside the main burned zone survived.",

  sources:[
    "London history archive",
    "Great Fire reference",
    "Historical records",
    "London architecture archive",
    "Urban history reference"
  ],

  confidence:[99,99,95,2,96],

  clues:[
    "The fire lasted several days.",
    "Large parts of London survived.",
    "The event influenced rebuilding and building regulations."
  ],

  search:[
    {
      title:"Great Fire of London",
      snippet:"The Great Fire began in 1666 and destroyed thousands of structures across a large section of London.",
      reliability:99
    }
  ],

  tags:[
    ["London"],
    ["history"],
    ["1666"],
    ["fire"],
    ["architecture"]
  ]
},

{
  id:"case-30",
  number:30,
  title:"The Everyday Gravity File",
  difficulty:"EXPERT",
  category:"PHYSICS",
  keywords:["gravity","falling","orbit","mass"],

  statements:[
    "Gravity attracts objects with mass.",
    "Objects near Earth's surface accelerate downward when air resistance is negligible.",
    "The Moon's orbit around Earth is influenced by gravity.",
    "Gravity completely disappears above Earth's atmosphere.",
    "The strength of Earth's gravitational field decreases with distance from Earth's center."
  ],

  lie:3,

  explanation:
    "Earth's gravity does not disappear at the edge of the atmosphere. It extends far into space and keeps the Moon in orbit, although its strength decreases with distance.",

  sources:[
    "Classical mechanics reference",
    "Gravity archive",
    "Orbital mechanics reference",
    "Space physics archive",
    "Newtonian physics reference"
  ],

  confidence:[99,99,99,1,99],

  clues:[
    "The atmosphere does not have a sharp wall where gravity suddenly ends.",
    "The Moon remains gravitationally bound to Earth.",
    "Gravity decreases with distance but does not suddenly vanish at the atmosphere."
  ],

  search:[
    {
      title:"Gravity in Space",
      snippet:"Earth's gravitational influence extends far beyond the atmosphere.",
      reliability:99
    },
    {
      title:"Orbital Motion",
      snippet:"Gravity provides the inward acceleration associated with orbital motion around Earth.",
      reliability:99
    }
  ],

  tags:[
    ["gravity"],
    ["acceleration"],
    ["Moon"],
    ["space"],
    ["mechanics"]
  ]
}

];