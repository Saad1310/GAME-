const UI={

  el(id){
    return document.getElementById(id);
  },

  esc(value){

    return String(value??"")
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
  },

  shell(show=true){

    UI.el("landing")
      ?.classList.toggle("active",!show);

    UI.el("topbar")
      ?.classList.toggle("hidden",!show);

    UI.el("main")
      ?.classList.toggle("hidden",!show);

    if(show){
      UI.show("dashboard");
      UI.renderDashboard(Game.state);
    }

  },

  show(id){

    document
      .querySelectorAll("main .screen")
      .forEach(screen=>{
        screen.classList.remove("active");
      });

    const screen=UI.el(id);

    if(screen){
      screen.classList.add("active");
    }

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  },

  toast(message,type=""){

    const host=UI.el("toastHost");

    if(!host)return;

    const toast=document.createElement("div");

    toast.className=
      `toast ${type}`;

    toast.textContent=message;

    host.appendChild(toast);

    setTimeout(()=>{
      toast.remove();
    },3200);
  },

  modal(html){

    const root=UI.el("modalRoot");

    root.innerHTML=`
      <div class="modal-backdrop">
        <div class="modal fade-up">
          ${html}
        </div>
      </div>
    `;

  },

  closeModal(){

    UI.el("modalRoot").innerHTML="";
  },

  card(c){

    const done=
      Game.state.completed.includes(c.id);

    return `
      <article class="case-card">

        <div class="case-number">
          CASE ${String(c.number).padStart(2,"0")}
        </div>

        <h3>${UI.esc(c.title)}</h3>

        <p>
          ${UI.esc(c.category)}
        </p>

        <div class="case-meta">

          <span class="difficulty">
            ${UI.esc(c.difficulty)}
          </span>

          <button
            class="btn btn-primary"
            data-action="open-case"
            data-case="${UI.esc(c.id)}">
            ${done?"REPLAY":"INVESTIGATE"}
          </button>

        </div>

      </article>
    `;
  },

  renderDashboard(state){

    const featured=
      UI.el("featuredCases");

    if(featured){

      featured.innerHTML=
        CASES
          .slice(0,6)
          .map(c=>UI.card(c))
          .join("");

    }

    UI.el("dashLevel").textContent=
      state.level;

    UI.el("dashXpBar").style.width=
      `${Storage.xpIntoLevel(state)/10}%`;

    UI.el("statSolved").textContent=
      state.completed.length;

    const accuracy=
      state.accuracy.total?
      Math.round(
        state.accuracy.correct/
        state.accuracy.total*
        100
      ):0;

    UI.el("statAccuracy").textContent=
      `${accuracy}%`;

    UI.el("statClues").textContent=
      state.clues;

    UI.el("statStreak").textContent=
      state.streak;

    UI.updateHeader(state);
  },

  updateHeader(state){

    UI.el("rankPill").textContent=
      state.rank;

    UI.el("xpPill").textContent=
      `${state.xp} XP`;

    UI.el("muteBtn").textContent=
      state.mute?"🔇":"🔊";

    const settingsMute=
      UI.el("settingsMute");

    if(settingsMute){
      settingsMute.textContent=
        `Sound: ${state.mute?"OFF":"ON"}`;
    }

  },

  renderInvestigation(data){

    const host=
      UI.el("investigationApp");

    if(!host)return;

    host.innerHTML=data;

  },

  renderAchievements(state){

    const achievements=[

      {
        id:"first",
        icon:"🕵️",
        name:"First Case",
        desc:"Solve your first investigation."
      },

      {
        id:"researcher",
        icon:"🔎",
        name:"Researcher",
        desc:"Save evidence from TruthFinder."
      },

      {
        id:"cluehound",
        icon:"🐺",
        name:"Cluehound",
        desc:"Solve a mini-game."
      },

      {
        id:"clean",
        icon:"🎯",
        name:"Clean Investigation",
        desc:"Solve a case efficiently."
      },

      {
        id:"daily",
        icon:"📅",
        name:"Daily Detective",
        desc:"Complete a Daily Case."
      },

      {
        id:"master",
        icon:"🏆",
        name:"Master Detective",
        desc:"Reach Detective rank or higher."
      }

    ];

    UI.el("achievementGrid").innerHTML=
      achievements.map(a=>{

        const unlocked=
          state.achievements.includes(a.id);

        return `
          <div class="achievement ${unlocked?"":"locked"}">

            <div class="achievement-icon">
              ${a.icon}
            </div>

            <h3>${a.name}</h3>

            <p>${a.desc}</p>

            <small>
              ${unlocked?"UNLOCKED":"LOCKED"}
            </small>

          </div>
        `;

      }).join("");
  },

  renderProfile(state){

    const accuracy=
      state.accuracy.total?
      Math.round(
        state.accuracy.correct/
        state.accuracy.total*
        100
      ):0;

    UI.el("profileContent").innerHTML=`

      <div class="profile-grid">

        <div class="glass profile-card">

          <div class="eyebrow">
            DETECTIVE
          </div>

          <div class="profile-big">
            ${UI.esc(state.name)}
          </div>

          <p>
            Rank: <strong>${state.rank}</strong>
          </p>

          <p>
            Level ${state.level}
          </p>

        </div>

        <div class="glass profile-card">

          <div class="eyebrow">
            FIELD STATS
          </div>

          <p>
            Cases solved:
            <strong>${state.completed.length}</strong>
          </p>

          <p>
            Accuracy:
            <strong>${accuracy}%</strong>
          </p>

          <p>
            Clues collected:
            <strong>${state.clues}</strong>
          </p>

          <p>
            Current streak:
            <strong>${state.streak}</strong>
          </p>

        </div>

      </div>

    `;
  }

};