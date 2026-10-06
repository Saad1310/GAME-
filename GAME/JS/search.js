const SEARCH={

  query(query,caseData){

    const q=
      String(query||"")
      .toLowerCase()
      .trim();

    if(!q){
      return [];
    }

    const all=[
      ...(caseData.search||[]),

      ...(caseData.clues||[]).map(
        (clue,index)=>({
          title:`Archive clue ${index+1}`,
          snippet:clue,
          reliability:78
        })
      )
    ];

    const words=q
      .split(/\s+/)
      .filter(Boolean);

    const scored=all.map(item=>{

      const hay=
        `${item.title} ${item.snippet}`
        .toLowerCase();

      let score=0;

      for(const word of words){

        if(hay.includes(word)){
          score++;
        }

      }

      return {
        ...item,
        score
      };
    });

    return scored
      .filter(item=>item.score>0)
      .sort((a,b)=>b.score-a.score)
      .slice(0,8);
  }

};