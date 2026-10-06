const Game={

  state:null,

  current:null,

  mode:"STORY",

  actions:0,

  maxActions:8,

  clues:[],

  inspected:new Set(),

  unlockedEvidence:[],

  boardItems:[],

  selectedBot:"nova",

  searches:0,

  miniUsed:false,

  startedAt:0,

  init(){

    this.state=Storage.load();

    this.checkDaily();

    UI.updateHeader(this.state);

    UI.renderDashboard(this.state);

    const cases=
      UI.el("allCases");

    if(cases){
      cases.innerHTML=
        CASES.map(c=>UI.card(c)).join("");
    }

  },

  checkDaily(){

    const today=
      new Date()
      .toISOString()
      .slice(0,10);

    if(this.state.daily.date!==today){

      const index=
        Math.floor(
          Math.random()*CASES.length
        );

      this.state.daily={
        date:today,
        caseId:CASES[index].id,
        done:false
      };

      Storage.save(this.state);

    }

  },

  start(id,mode="STORY"){

    const found=
      CASES.find(c=>c.id===id);

    if(!found)return;

    this.current=found;

    this.mode=mode;

    this.actions=0;

    this.clues=[];

    this.inspected=new Set();

    this.unlockedEvidence=[];

    this.boardItems=[];

    this.selectedBot="nova";

    this.searches=0;

    this.miniUsed=false;

    this.startedAt=Date.now();

    this.maxActions=
      mode==="QUICK"?6:
      mode==="BOT"?7:
      8;

    UI.show("investigation");

    this.renderInvestigation();

    AudioFX.unlock();

  },

  spend(){

    if(this.actions>=this.maxActions){

      UI.toast(
        "Investigation limit reached. Use the evidence you already have.",
        "bad"
      );

      return false;
    }

    this.actions++;

    this.renderInvestigation();

    return true;
  },

  inspect(index){

    if(this.inspected.has(index)){

      UI.toast(
        "Statement already inspected.",
        "bad"
      );

      return;
    }

    if(!this.spend())return;

    this.inspected.add(index);

    const statement=
      Evidence.build(
        this.current.statements[index],
        index,
        this.current
      );

    this.unlockedEvidence.push(statement);

    this.addBoard(index);

    UI.modal(`

      <div class="eyebrow">
        STATEMENT FILE ${index+1}
      </div>

      <h2>
        Claim analysis
      </h2>

      <div class="clue">
        ${UI.esc(statement.statement)}
      </div>

      <p>
        Initial confidence:
        <strong>
          ${statement.confidence}%
        </strong>
      </p>

      <p>
        Source:
        ${UI.esc(statement.source)}
      </p>

      <p>
        Classification:
        ${UI.esc(statement.type)}
      </p>

      <div class="modal-actions">

        <button
          class="btn btn-primary"
          data-action="add-clue"
          data-i="${index}">
          ADD TO EVIDENCE
        </button>

        <button
          class="btn btn-ghost"
          data-action="modal-close">
          CLOSE
        </button>

      </div>

    `);

  },

  addClue(index){

    const statement=
      this.current.statements[index];

    if(!this.clues.includes(statement)){

      this.clues.push(statement);

      this.state.clues++;

      Storage.save(this.state);

      AudioFX.unlock();

      UI.toast(
        "Statement added to your clue file.",
        "good"
      );

    }

    UI.closeModal();

    this.renderInvestigation();
  },

  addBoard(index){

    const statement=
      this.current.statements[index];

    if(
      !this.boardItems.some(
        x=>x.index===index
      )
    ){

      this.boardItems.push({
        index,
        statement
      });

    }

  },

  selectBot(id){

    this.selectedBot=id;

    this.renderInvestigation();

  },

  askBot(questionIndex){

    if(!this.spend())return;

    const bot=
      BOTS.find(
        x=>x.id===this.selectedBot
      );

    const c=this.current;

    const keyword=
      c.keywords[
        Math.floor(
          Math.random()*c.keywords.length
        )
      ];

    const replies=[

      `I'd investigate “${keyword}” first. ${bot.lines[(questionIndex+1)%bot.lines.length]}`,

      `My confidence is ${bot.reliability}%, not 100%. ${bot.lines[(questionIndex+2)%bot.lines.length]}`,

      `The useful question is whether the claim survives an independent source. ${bot.lines[questionIndex%bot.lines.length]}`

    ];

    const log=
      UI.el("chatLog");

    if(log){

      log.insertAdjacentHTML(
        "beforeend",

        `
        <div class="bubble user">
          <span class="meta">YOU</span>
          ${UI.esc(bot.ask[questionIndex])}
        </div>

        <div class="typing" id="typing">
          <i></i><i></i><i></i>
        </div>
        `
      );

      log.scrollTop=log.scrollHeight;

      setTimeout(()=>{

        UI.el("typing")?.remove();

        log.insertAdjacentHTML(
          "beforeend",

          `
          <div class="bubble bot">
            <span class="meta">${bot.name}</span>
            ${UI.esc(
              replies[
                Math.floor(
                  Math.random()*replies.length
                )
              ]
            )}
          </div>
          `
        );

        log.scrollTop=log.scrollHeight;

        AudioFX.message();

      },450);

    }

  },

  truthfinder(){

    if(!this.spend())return;

    const c=this.current;

    this.searches++;

    const html=`

      <div class="eyebrow">
        LOCAL ARCHIVE // TRUTHFINDER
      </div>

      <h2>
        Search the evidence network
      </h2>

      <p>
        Nothing here accesses the internet.
        Results are fictionalized case records
        with mixed reliability.
      </p>

      <div class="search-form">

        <input
          class="input"
          id="truthInput"
          placeholder="Try: ${UI.esc(c.keywords[0])}">

        <button
          class="btn btn-primary"
          data-action="run-search">
          SEARCH
        </button>

      </div>

      <div
        id="searchResults"
        class="search-results">
      </div>

      <div class="modal-actions">

        <button
          class="btn btn-ghost"
          data-action="modal-close">
          CLOSE
        </button>

      </div>
    `;

    UI.modal(html);

  },

  runSearch(){

    const q=
      UI.el("truthInput")?.value||"";

    const rs=
      SEARCH.query(q,this.current);

    const host=
      UI.el("searchResults");

    if(!host)return;

    host.innerHTML=
      rs.length?

      rs.map((r,i)=>`

        <div class="result">

          <h4>
            ${UI.esc(r.title)}
          </h4>

          <p>
            ${UI.esc(r.snippet)}
          </p>

          <div class="reliability">

            RELIABILITY ${r.reliability}%

            <button
              class="text-btn"
              data-action="save-search-clue"
              data-ri="${i}"
              style="float:right">
              SAVE CLUE
            </button>

          </div>

        </div>

      `).join("")

      :

      `
      <p style="color:var(--muted)">
        No local archive match.
        Try a case keyword.
      </p>
      `;

    this._results=rs;

  },

  saveSearchClue(index){

    const result=
      this._results?.[index];

    if(!result)return;

    this.state.clues++;

    this.unlock("researcher");

    Storage.save(this.state);

    this.addBoard(0);

    UI.toast(
      "Search result marked as evidence.",
      "good"
    );

    AudioFX.unlock();

  },

  minigame(){

    if(this.miniUsed){

      UI.toast(
        "You already completed the mini-game for this case.",
        "bad"
      );

      return;
    }

    if(!this.spend())return;

    const m=
      MiniGames.run();

    UI.modal(`

      <div class="mini-wrap">

        <div class="eyebrow">
          SIDE CHANNEL // ${m.type.toUpperCase()}
        </div>

        <h2>${m.title}</h2>

        <div class="mini-question">
          ${m.q}
        </div>

        <div class="mini-options">

          ${m.opts.map(
            (option,index)=>`

              <button
                class="mini-option"
                data-action="mini-answer"
                data-i="${index}">
                ${UI.esc(option)}
              </button>

            `
          ).join("")}

        </div>

      </div>

    `);

    this._mini=m;

  },

  miniAnswer(index){

    const m=this._mini;

    this.miniUsed=true;

    if(Number(index)===m.answer){

      this.state.clues++;

      Storage.addXP(
        this.state,
        m.reward
      );

      this.unlock("cluehound");

      Storage.save(this.state);

      AudioFX.good();

      UI.closeModal();

      UI.toast(
        `Mini-game solved. +${m.reward} XP and a clue.`,
        "good"
      );

      this.addBoard(0);

      this.renderInvestigation();

    }else{

      AudioFX.bad();

      UI.toast(
        "Incorrect. The side channel closed without a clue.",
        "bad"
      );

      UI.closeModal();

    }

  },

  notes(){

    UI.modal(`

      <div class="eyebrow">
        FIELD NOTES
      </div>

      <h2>
        Investigation notebook
      </h2>

      <textarea
        class="notes"
        id="notesInput">${UI.esc(
          this.state.notes[this.current.id]||""
        )}</textarea>

      <div class="modal-actions">

        <button
          class="btn btn-primary"
          data-action="save-notes">
          SAVE NOTES
        </button>

      </div>

    `);

  },

  saveNotes(){

    this.state.notes[this.current.id]=
      UI.el("notesInput").value;

    Storage.save(this.state);

    UI.closeModal();

    UI.toast(
      "Notes saved locally.",
      "good"
    );

  },

  accuse(){

    if(this.inspected.size<2){

      UI.toast(
        "Open at least two statement files before accusing.",
        "bad"
      );

      return;
    }

    const c=this.current;

    UI.modal(`

      <div class="eyebrow">
        FINAL ACCUSATION
      </div>

      <h2>
        Who is lying?
      </h2>

      <p>
        You have one accusation.
        Select the statement you believe is false.
      </p>

      <div class="mini-options">

        ${c.statements.map(
          (statement,index)=>`

          <button
            class="mini-option"
            data-action="submit-accuse"
            data-i="${index}">

            <b>
              STATEMENT ${index+1}
            </b>

            <br>

            <small>
              ${UI.esc(statement)}
            </small>

          </button>

        `).join("")}

      </div>

    `);

  },

  submitAccuse(index){

    UI.closeModal();

    const c=this.current;

    const correct=
      Number(index)===c.lie;

    const time=
      Math.round(
        (Date.now()-this.startedAt)/1000
      );

    const efficient=
      Math.max(
        0,
        this.maxActions-this.actions
      );

    let score=
      correct?600:80;

    score=
      Math.max(
        0,

        score+
        efficient*20+
        this.unlockedEvidence.length*25-
        Math.floor(time/5)*3-
        this.state.wrong*15
      );

    const xp=
      correct?score:25;

    this.state.accuracy.total++;

    if(correct){

      this.state.accuracy.correct++;

    }else{

      this.state.wrong++;

    }

    if(correct){

      this.state.completed=[
        ...new Set([
          ...this.state.completed,
          c.id
        ])
      ];

      this.state.streak++;

    }else{

      this.state.streak=0;

    }

    if(
      this.mode==="DAILY"&&
      this.state.daily
    ){

      this.state.daily.done=true;

      this.unlock("daily");

    }

    const gain=
      Storage.addXP(
        this.state,
        xp
      );

    if(
      this.state.completed.length===1
    ){
      this.unlock("first");
    }

    if(
      correct&&
      efficient>=Math.max(
        1,
        this.maxActions-2
      )
    ){
      this.unlock("clean");
    }

    if(
      [
        "DETECTIVE",
        "SENIOR DETECTIVE",
        "MASTER DETECTIVE",
        "LEGEND"
      ].includes(this.state.rank)
    ){
      this.unlock("master");
    }

    Storage.save(this.state);

    if(correct){
      AudioFX.good();
    }else{
      AudioFX.bad();
    }

    this.showResults(
      correct,
      index,
      score,
      xp,
      time,
      gain
    );

  },

  unlock(id){

    if(
      !this.state.achievements.includes(id)
    ){

      this.state.achievements.push(id);

      UI.toast(
        "Achievement unlocked!",
        "good"
      );

    }

  },

  showResults(
    correct,
    index,
    score,
    xp,
    time,
    rankInfo
  ){

    const c=this.current;

    UI.modal(`

      <div class="result-score">

        <div class="eyebrow">
          ${correct?"CASE SOLVED":"CASE FAILED"}
        </div>

        <div class="big">
          ${score}
        </div>

        <p>
          ${
            correct
            ?
            "Excellent investigation."
            :
            "The evidence pointed elsewhere. Review the archive and try another case."
          }
        </p>

      </div>


      <div class="score-grid">

        <div>
          <b>${correct?"✓":"✕"}</b>
          <span>ACCURACY</span>
        </div>

        <div>
          <b>${this.unlockedEvidence.length}</b>
          <span>CLUES</span>
        </div>

        <div>
          <b>${time}s</b>
          <span>TIME</span>
        </div>

        <div>
          <b>+${xp}</b>
          <span>XP</span>
        </div>

      </div>


      <div
        class="glass"
        style="padding:15px;margin-top:14px">

        <div class="eyebrow">
          TRUTH REPORT
        </div>

        <h3>
          Statement ${c.lie+1} was the lie.
        </h3>

        <p>
          ${UI.esc(c.explanation)}
        </p>

        <p>
          <b>Why:</b>
          The local evidence archive contained
          independent support for the other claims
          and a contradiction for this one.
        </p>

      </div>


      <div class="modal-actions">

        <button
          class="btn btn-ghost"
          data-action="close-results">
          CASE ARCHIVE
        </button>

        <button
          class="btn btn-primary"
          data-action="next-case">
          NEXT CASE →
        </button>

      </div>

    `);

  },

  next(){

    UI.closeModal();

    const index=
      CASES.findIndex(
        x=>x.id===this.current.id
      );

    const nextIndex=
      (index+1)%CASES.length;

    this.start(
      CASES[nextIndex].id,
      "STORY"
    );

  },

  renderAchievements(){
    UI.renderAchievements(this.state);
  },

  renderProfile(){
    UI.renderProfile(this.state);
  },

  renderInvestigation(){

    const c=this.current;

    if(!c)return;

    const progress=
      Math.round(
        this.actions/
        this.maxActions*
        100
      );

    const bot=
      BOTS.find(
        b=>b.id===this.selectedBot
      );

    UI.renderInvestigation(`

      <div class="investigation-wrap">

        <div class="investigation-head">

          <div class="case-title">

            <div class="eyebrow">
              CASE ${String(c.number).padStart(2,"0")}
              // ${c.difficulty}
            </div>

            <h2>
              ${UI.esc(c.title)}
            </h2>

            <p>
              ${UI.esc(c.category)}
            </p>

          </div>

          <div class="investigation-actions">

            <button
              class="btn btn-ghost"
              data-action="dashboard">
              DASHBOARD
            </button>

            <button
              class="btn btn-primary"
              data-action="accuse">
              MAKE ACCUSATION
            </button>

          </div>

        </div>


        <div class="investigation-layout">

          <div>

            <div class="glass side-panel">

              <div class="section-title">

                <span>
                  FIVE STATEMENTS
                </span>

                <span>
                  ${this.inspected.size}/5 INSPECTED
                </span>

              </div>


              <div class="statements">

                ${c.statements.map(
                  (statement,index)=>`

                  <article
                    class="statement-card ${
                      this.inspected.has(index)
                      ?"inspected":""
                    }">

                    <div class="statement-index">
                      STATEMENT ${index+1}
                    </div>

                    <h3>
                      ${UI.esc(statement)}
                    </h3>

                    <div class="statement-footer">

                      <span class="confidence">
                        ${
                          this.inspected.has(index)
                          ?
                          `FILE OPENED`
                          :
                          `CLASSIFIED`
                        }
                      </span>

                      <button
                        class="btn btn-primary"
                        data-action="inspect"
                        data-i="${index}">
                        ${
                          this.inspected.has(index)
                          ?
                          "REVIEW"
                          :
                          "INSPECT"
                        }
                      </button>

                    </div>

                  </article>

                `).join("")}

              </div>

            </div>


            <div
              class="glass side-panel"
              style="margin-top:14px">

              <div class="section-title">
                <span>BOT NETWORK</span>
                <span>8 ONLINE</span>
              </div>

              <div class="bot-grid">

                ${BOTS.map(
                  b=>`

                  <button
                    class="bot-card ${
                      b.id===this.selectedBot
                      ?"active":""
                    }"
                    data-action="select-bot"
                    data-bot="${b.id}">

                    <b>
                      ${b.name}
                    </b>

                    <span>
                      ${b.role}
                    </span>

                  </button>

                `).join("")}

              </div>

            </div>


            <div
              class="glass side-panel"
              style="margin-top:14px">

              <div class="section-title">
                <span>
                  ${bot.name} // CHAT
                </span>

                <span>
                  ${bot.reliability}% RELIABILITY
                </span>
              </div>

              <div
                id="chatLog"
                class="chat-log">

                <div class="bubble bot">

                  <span class="meta">
                    ${bot.name}
                  </span>

                  ${UI.esc(bot.lines[0])}

                </div>

              </div>

              <div class="ask-grid">

                ${bot.ask.map(
                  (question,index)=>`

                  <button
                    class="ask-btn"
                    data-action="ask-bot"
                    data-q="${index}">

                    ${UI.esc(question)}

                  </button>

                `).join("")}

              </div>

            </div>

          </div>


          <aside class="investigation-sidebar">

            <div class="glass side-panel">

              <div class="section-title">
                <span>INVESTIGATION STATUS</span>
              </div>

              <div class="progress">
                <i style="width:${progress}%"></i>
              </div>

              <p
                style="
                  color:var(--muted);
                  font-size:10px;
                ">

                ${this.actions}/${this.maxActions}
                investigation actions used.

              </p>

            </div>


            <div class="glass side-panel">

              <div class="section-title">
                <span>TOOLS</span>
              </div>

              <div class="tool-grid">

                <button
                  class="tool-btn"
                  data-action="truthfinder">
                  🔎 SEARCH
                </button>

                <button
                  class="tool-btn"
                  data-action="minigame">
                  🧩 MINI GAME
                </button>

                <button
                  class="tool-btn"
                  data-action="notes">
                  📝 NOTES
                </button>

                <button
                  class="tool-btn"
                  data-action="accuse">
                  ⚠ ACCUSE
                </button>

              </div>

            </div>


            <div class="glass side-panel">

              <div class="section-title">
                <span>EVIDENCE BOARD</span>

                <span>
                  ${this.boardItems.length}
                </span>

              </div>

              <div class="board">

                ${
                  this.boardItems.length

                  ?

                  this.boardItems.map(
                    (item,index)=>`

                    <div class="board-item">

                      <div
                        style="
                          display:flex;
                          justify-content:space-between;
                          gap:5px;
                        ">

                        <b>
                          Statement ${item.index+1}
                        </b>

                        <button
                          class="text-btn"
                          data-action="remove-board"
                          data-i="${index}">
                          ×
                        </button>

                      </div>

                      <div style="margin-top:5px">
                        ${UI.esc(item.statement)}
                      </div>

                    </div>

                  `).join("")

                  :

                  `
                  <div
                    style="
                      color:var(--muted);
                      font-size:10px;
                      line-height:1.5;
                    ">

                    Inspect statements or save search
                    results to populate the board.

                  </div>
                  `
                }

              </div>

            </div>


            <div class="glass side-panel">

              <div class="section-title">
                <span>COLLECTED CLUES</span>
                <span>${this.clues.length}</span>
              </div>

              <div class="clue-list">

                ${
                  this.clues.length

                  ?

                  this.clues.map(
                    clue=>`

                    <div class="clue">
                      ${UI.esc(clue)}
                    </div>

                  `).join("")

                  :

                  `
                  <div
                    style="
                      color:var(--muted);
                      font-size:10px;
                    ">
                    No confirmed clues yet.
                  </div>
                  `
                }

              </div>

            </div>

          </aside>

        </div>

      </div>

    `);

  }

};