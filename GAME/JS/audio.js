const AudioFX = {

  ctx:null,

  init(){

    if(!this.ctx){

      try{
        this.ctx=
          new (window.AudioContext||
          window.webkitAudioContext)();
      }catch(e){}

    }

  },

  tone(freq=440,duration=.08,type="sine"){

    if(Game?.state?.mute)return;

    this.init();

    if(!this.ctx)return;

    const oscillator=
      this.ctx.createOscillator();

    const gain=
      this.ctx.createGain();

    oscillator.type=type;

    oscillator.frequency.value=freq;

    gain.gain.setValueAtTime(
      .04,
      this.ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      .001,
      this.ctx.currentTime+duration
    );

    oscillator.connect(gain);

    gain.connect(this.ctx.destination);

    oscillator.start();

    oscillator.stop(
      this.ctx.currentTime+duration
    );
  },

  click(){
    this.tone(320,.04,"square");
  },

  message(){
    this.tone(560,.05,"sine");
  },

  unlock(){
    this.tone(780,.08,"triangle");

    setTimeout(()=>{
      this.tone(1040,.1,"triangle");
    },70);
  },

  good(){
    this.tone(520,.08,"sine");

    setTimeout(()=>{
      this.tone(780,.12,"sine");
    },80);
  },

  bad(){
    this.tone(160,.18,"sawtooth");
  }
};