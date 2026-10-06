const MiniGames={

  games:[

    {
      type:"logic",
      title:"Contradiction Scan",
      q:"Which statement is logically safest?",
      opts:[
        "A source can be popular and still be wrong.",
        "Popular sources are always correct.",
        "Two rumors prove a fact.",
        "A confident person cannot be mistaken."
      ],
      answer:0,
      reward:80
    },

    {
      type:"pattern",
      title:"Pattern Lock",
      q:"Complete the sequence: 2, 4, 8, 16, ?",
      opts:[
        "20",
        "24",
        "32",
        "36"
      ],
      answer:2,
      reward:70
    },

    {
      type:"memory",
      title:"Evidence Memory",
      q:"Which source is normally strongest for verifying a historical event?",
      opts:[
        "Random comment",
        "Primary document",
        "Rumor",
        "Unverified meme"
      ],
      answer:1,
      reward:75
    },

    {
      type:"word",
      title:"Wording Trap",
      q:"Which word should make a detective especially cautious?",
      opts:[
        "Sometimes",
        "Often",
        "Never",
        "Usually"
      ],
      answer:2,
      reward:65
    },

    {
      type:"number",
      title:"Number Check",
      q:"If a claim says something happened 3 times in 6 trials, what fraction is that?",
      opts:[
        "1/6",
        "1/3",
        "1/2",
        "2/3"
      ],
      answer:2,
      reward:60
    },

    {
      type:"reaction",
      title:"Source Priority",
      q:"Which should normally be checked first when investigating a factual claim?",
      opts:[
        "Primary evidence",
        "A random social post",
        "A meme",
        "A comment section"
      ],
      answer:0,
      reward:55
    }

  ],

  run(){

    return this.games[
      Math.floor(
        Math.random()*this.games.length
      )
    ];
  }

};