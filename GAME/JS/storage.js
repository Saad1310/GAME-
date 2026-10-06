const Storage = {

  key:"who_is_lying_save_v1",

  defaultState(){

    return {
      name:"Detective",

      xp:0,
      level:1,
      rank:"ROOKIE",

      completed:[],
      wrong:0,
      clues:0,

      streak:0,

      accuracy:{
        total:0,
        correct:0
      },

      achievements:[],

      notes:{},

      daily:{
        date:"",
        caseId:"",
        done:false
      },

      mute:false
    };
  },

  load(){

    try{

      const raw=localStorage.getItem(this.key);

      if(!raw){
        return this.defaultState();
      }

      return {
        ...this.defaultState(),
        ...JSON.parse(raw)
      };

    }catch(error){

      console.warn("Save load failed:",error);

      return this.defaultState();
    }
  },

  save(state){

    localStorage.setItem(
      this.key,
      JSON.stringify(state)
    );

  },

  reset(){

    localStorage.removeItem(this.key);

  },

  addXP(state,amount){

    state.xp+=Math.max(0,amount);

    const oldLevel=state.level;

    state.level=
      Math.floor(state.xp/1000)+1;

    const ranks=[
      ["ROOKIE",1],
      ["CADET",3],
      ["INVESTIGATOR",5],
      ["DETECTIVE",8],
      ["SENIOR DETECTIVE",12],
      ["MASTER DETECTIVE",17],
      ["LEGEND",25]
    ];

    for(const [rank,level] of ranks){

      if(state.level>=level){
        state.rank=rank;
      }

    }

    return {
      oldLevel,
      newLevel:state.level,
      leveled:state.level>oldLevel
    };
  },

  xpIntoLevel(state){

    return state.xp%1000;
  }
};