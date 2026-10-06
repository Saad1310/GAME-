const Evidence={

  confidence(value){

    if(value>=90)return"VERY HIGH";

    if(value>=75)return"HIGH";

    if(value>=55)return"MEDIUM";

    return"LOW";
  },

  sourceType(source){

    if(!source)return"UNKNOWN";

    const value=source.toLowerCase();

    if(value.includes("archive"))return"ARCHIVE";

    if(value.includes("study"))return"STUDY";

    if(value.includes("museum"))return"MUSEUM";

    if(value.includes("university"))return"UNIVERSITY";

    return"REFERENCE";
  },

  build(statement,index,caseData){

    const confidence=
      caseData.confidence?.[index]||
      60;

    return {

      id:`${caseData.id}-statement-${index}`,

      statement,

      index,

      confidence,

      source:
        caseData.sources?.[index]||
        "TruthFinder archive",

      tags:
        caseData.tags?.[index]||
        ["claim"],

      type:this.sourceType(
        caseData.sources?.[index]
      )
    };
  }
};