/* =========================================================
   WHO IS LYING?
   app.js
   Main application controller
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   GLOBAL APP STATE
--------------------------------------------------------- */

const APP = {
    version: "1.0.0",

    state: {
        screen: "landing",
        currentCase: null,
        selectedStatement: null,
        selectedBot: null,

        investigationsUsed: 0,
        maxInvestigations: 12,

        cluesFound: [],
        evidenceCollected: [],
        importantEvidence: [],
        notes: [],
        connections: [],

        searchedTerms: [],
        completedMiniGames: [],

        accusedStatement: null,
        caseStartedAt: null,
        caseFinishedAt: null,

        muted: false,
        initialized: false
    },

    elements: {},

    settings: {
        sound: true,
        animations: true,
        particles: true,
        scanlines: true,
        reducedMotion: false
    }
};


/* =========================================================
   DOM HELPERS
========================================================= */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}

function $$(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function createElement(tag, className = "", content = "") {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (content !== undefined && content !== null) {
        element.innerHTML = content;
    }

    return element;
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    if (APP.state.initialized) return;

    APP.state.initialized = true;

    cacheElements();
    loadSettings();
    initializeParticles();
    initializeNavigation();
    initializeGlobalButtons();
    initializeKeyboardControls();
    updatePlayerInterface();
    showScreen("landing");

    if (typeof AudioManager !== "undefined") {
        AudioManager.init();
    }

    console.log(
        "%c WHO IS LYING? ",
        "background:#050816;color:#00e5ff;font-size:20px;font-weight:bold;padding:8px 14px;"
    );

    console.log(
        "%cDetective system initialized.",
        "color:#8b5cf6;font-size:13px;"
    );
}


/* =========================================================
   CACHE DOM
========================================================= */

function cacheElements() {
    APP.elements = {
        app: $("#app"),
        screenContainer: $("#screen-container"),

        landingScreen: $("#landing-screen"),
        dashboardScreen: $("#dashboard-screen"),
        casesScreen: $("#cases-screen"),
        investigationScreen: $("#investigation-screen"),
        botsScreen: $("#bots-screen"),
        searchScreen: $("#search-screen"),
        evidenceScreen: $("#evidence-screen"),
        minigamesScreen: $("#minigames-screen"),
        accusationScreen: $("#accusation-screen"),
        resultsScreen: $("#results-screen"),
        achievementsScreen: $("#achievements-screen"),
        profileScreen: $("#profile-screen"),
        settingsScreen: $("#settings-screen"),
        helpScreen: $("#help-screen"),

        playerName: $("#player-name"),
        playerXP: $("#player-xp"),
        playerLevel: $("#player-level"),
        playerRank: $("#player-rank"),

        toastContainer: $("#toast-container"),
        modalContainer: $("#modal-container"),

        globalMute: $("#global-mute"),
        backButton: $("#back-button")
    };
}


/* =========================================================
   SETTINGS
========================================================= */

function loadSettings() {
    let saved = null;

    try {
        saved = JSON.parse(
            localStorage.getItem("wil_settings") || "null"
        );
    } catch (error) {
        console.warn("Could not load settings.");
    }

    if (saved && typeof saved === "object") {
        APP.settings = {
            ...APP.settings,
            ...saved
        };
    }

    APP.state.muted = !APP.settings.sound;

    applySettingsToDocument();
}

function saveSettings() {
    localStorage.setItem(
        "wil_settings",
        JSON.stringify(APP.settings)
    );
}

function applySettingsToDocument() {
    document.documentElement.classList.toggle(
        "reduced-motion",
        APP.settings.reducedMotion
    );

    document.documentElement.classList.toggle(
        "no-animations",
        !APP.settings.animations
    );

    document.documentElement.classList.toggle(
        "no-particles",
        !APP.settings.particles
    );

    document.documentElement.classList.toggle(
        "no-scanlines",
        !APP.settings.scanlines
    );

    APP.state.muted = !APP.settings.sound;

    updateMuteButton();
}

function toggleSetting(setting) {
    if (!(setting in APP.settings)) return;

    APP.settings[setting] = !APP.settings[setting];

    saveSettings();
    applySettingsToDocument();

    playUI("click");

    showToast(
        `${formatSettingName(setting)} ${APP.settings[setting] ? "enabled" : "disabled"}`,
        "info"
    );
}

function formatSettingName(setting) {
    return setting
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, char => char.toUpperCase());
}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {
    document.addEventListener("click", event => {
        const navigationButton =
            event.target.closest("[data-screen]");

        if (!navigationButton) return;

        const screen =
            navigationButton.dataset.screen;

        if (screen) {
            showScreen(screen);
        }
    });
}

function showScreen(screenName, options = {}) {
    const screen = normalizeScreenName(screenName);

    APP.state.screen = screen;

    const allScreens = $$(".screen");

    allScreens.forEach(screenElement => {
        screenElement.classList.remove("active");
        screenElement.setAttribute("aria-hidden", "true");
    });

    const target = $(`#${screen}-screen`);

    if (target) {
        target.classList.add("active");
        target.setAttribute("aria-hidden", "false");
    }

    updateNavigationState(screen);

    if (!options.skipRender) {
        renderScreen(screen);
    }

    window.scrollTo({
        top: 0,
        behavior: APP.settings.reducedMotion
            ? "auto"
            : "smooth"
    });
}

function normalizeScreenName(screen) {
    return String(screen || "")
        .replace("-screen", "")
        .trim()
        .toLowerCase();
}

function updateNavigationState(activeScreen) {
    $$("[data-screen]").forEach(button => {
        const target = normalizeScreenName(
            button.dataset.screen
        );

        button.classList.toggle(
            "active",
            target === activeScreen
        );
    });
}


/* =========================================================
   SCREEN RENDERING
========================================================= */

function renderScreen(screen) {
    switch (screen) {
        case "landing":
            renderLanding();
            break;

        case "dashboard":
            renderDashboard();
            break;

        case "cases":
            renderCases();
            break;

        case "investigation":
            renderInvestigation();
            break;

        case "bots":
            renderBots();
            break;

        case "search":
            renderSearch();
            break;

        case "evidence":
            renderEvidence();
            break;

        case "minigames":
            renderMiniGames();
            break;

        case "accusation":
            renderAccusation();
            break;

        case "results":
            renderResults();
            break;

        case "achievements":
            renderAchievements();
            break;

        case "profile":
            renderProfile();
            break;

        case "settings":
            renderSettings();
            break;

        case "help":
            renderHelp();
            break;

        default:
            console.warn(`Unknown screen: ${screen}`);
            showScreen("landing");
    }
}


/* =========================================================
   LANDING
========================================================= */

function renderLanding() {
    const startButton = $("[data-action='start-investigation']");

    if (startButton) {
        startButton.onclick = () => {
            startNewCase();
        };
    }

    const dailyButton = $("[data-action='daily-case']");

    if (dailyButton) {
        dailyButton.onclick = () => {
            startDailyCase();
        };
    }

    const howToButton = $("[data-action='how-to-play']");

    if (howToButton) {
        howToButton.onclick = () => {
            showScreen("help");
        };
    }
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {
    const stats = getPlayerStats();

    setText("[data-dashboard='xp']", stats.xp);
    setText("[data-dashboard='level']", stats.level);
    setText("[data-dashboard='rank']", stats.rank);
    setText(
        "[data-dashboard='completed']",
        stats.completedCases.length
    );

    setText(
        "[data-dashboard='accuracy']",
        `${stats.accuracy}%`
    );

    setText(
        "[data-dashboard='streak']",
        stats.streak
    );

    const continueButton =
        $("[data-action='continue-case']");

    if (continueButton) {
        const savedCase =
            getSavedInvestigation();

        continueButton.style.display =
            savedCase ? "inline-flex" : "none";

        continueButton.onclick = () => {
            if (savedCase) {
                restoreInvestigation(savedCase);
            }
        };
    }

    const dailyButton =
        $("[data-action='dashboard-daily']");

    if (dailyButton) {
        dailyButton.onclick = startDailyCase;
    }
}


/* =========================================================
   CASE SELECTION
========================================================= */

function renderCases() {
    const container =
        $("[data-container='case-list']");

    if (!container) return;

    if (typeof CASES === "undefined") {
        container.innerHTML = `
            <div class="empty-state">
                <strong>CASE DATABASE OFFLINE</strong>
                <p>cases.js could not be loaded.</p>
            </div>
        `;
        return;
    }

    const stats = getPlayerStats();

    container.innerHTML = "";

    CASES.forEach((caseData, index) => {
        const completed =
            stats.completedCases.includes(caseData.id);

        const card = createElement(
            "article",
            `case-card ${completed ? "completed" : ""}`
        );

        card.innerHTML = `
            <div class="case-card-top">
                <span class="case-number">
                    CASE ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="difficulty ${String(caseData.difficulty || "").toLowerCase()}">
                    ${escapeHTML(caseData.difficulty || "Unknown")}
                </span>
            </div>

            <h3>${escapeHTML(caseData.title)}</h3>

            <p>
                ${escapeHTML(
                    caseData.description ||
                    "A new investigation is waiting."
                )}
            </p>

            <div class="case-meta">
                <span>
                    ${escapeHTML(caseData.category || "General")}
                </span>

                ${
                    completed
                        ? `<span class="case-completed">✓ COMPLETED</span>`
                        : ""
                }
            </div>

            <button
                class="btn primary case-start-button"
                data-case-id="${escapeHTML(caseData.id)}"
            >
                ${completed ? "REOPEN CASE" : "START CASE"}
            </button>
        `;

        container.appendChild(card);
    });

    $$(".case-start-button", container).forEach(button => {
        button.addEventListener("click", () => {
            startCase(button.dataset.caseId);
        });
    });
}


/* =========================================================
   CASE START
========================================================= */

function startNewCase() {
    if (typeof CASES === "undefined" || !CASES.length) {
        showToast(
            "Case database unavailable.",
            "error"
        );
        return;
    }

    const stats = getPlayerStats();

    const incomplete =
        CASES.filter(
            caseData =>
                !stats.completedCases.includes(caseData.id)
        );

    const pool =
        incomplete.length ? incomplete : CASES;

    const randomCase =
        pool[Math.floor(Math.random() * pool.length)];

    startCase(randomCase.id);
}

function startDailyCase() {
    if (typeof CASES === "undefined" || !CASES.length) {
        showToast(
            "Case database unavailable.",
            "error"
        );
        return;
    }

    const today =
        new Date().toISOString().slice(0, 10);

    const hash = hashString(today);

    const index =
        Math.abs(hash) % CASES.length;

    startCase(
        CASES[index].id,
        {
            daily: true
        }
    );
}

function startCase(caseId, options = {}) {
    if (typeof CASES === "undefined") {
        showToast(
            "Case database unavailable.",
            "error"
        );
        return;
    }

    const caseData =
        CASES.find(item => item.id === caseId);

    if (!caseData) {
        showToast(
            "Case not found.",
            "error"
        );
        return;
    }

    APP.state.currentCase = structuredCloneSafe(caseData);

    APP.state.selectedStatement = null;
    APP.state.selectedBot = null;

    APP.state.investigationsUsed = 0;
    APP.state.cluesFound = [];
    APP.state.evidenceCollected = [];
    APP.state.importantEvidence = [];
    APP.state.notes = [];
    APP.state.connections = [];
    APP.state.searchedTerms = [];
    APP.state.completedMiniGames = [];

    APP.state.accusedStatement = null;

    APP.state.caseStartedAt = Date.now();
    APP.state.caseFinishedAt = null;

    APP.state.daily = Boolean(options.daily);

    clearSavedInvestigation();

    saveInvestigation();

    playUI("caseStart");

    showScreen("investigation");

    showToast(
        `CASE ${caseData.id} OPENED`,
        "success"
    );
}


/* =========================================================
   INVESTIGATION SCREEN
========================================================= */

function renderInvestigation() {
    const caseData = APP.state.currentCase;

    if (!caseData) {
        showScreen("cases");
        return;
    }

    setText(
        "[data-case='id']",
        `CASE ${caseData.id}`
    );

    setText(
        "[data-case='title']",
        caseData.title
    );

    setText(
        "[data-case='difficulty']",
        caseData.difficulty || "UNKNOWN"
    );

    setText(
        "[data-case='category']",
        caseData.category || "GENERAL"
    );

    setText(
        "[data-case='description']",
        caseData.description || ""
    );

    renderStatements();
    renderInvestigationStats();
    renderRecentEvidence();
    renderCaseNotes();
}

function renderStatements() {
    const container =
        $("[data-container='statements']");

    if (!container) return;

    const caseData = APP.state.currentCase;

    container.innerHTML = "";

    const statements =
        caseData.statements || [];

    statements.forEach((statement, index) => {
        const selected =
            APP.state.selectedStatement === statement.id;

        const card = createElement(
            "article",
            `statement-card ${selected ? "selected" : ""}`
        );

        card.dataset.statementId =
            statement.id;

        card.innerHTML = `
            <div class="statement-header">
                <span class="statement-number">
                    ${index + 1}
                </span>

                <span class="statement-status">
                    ${
                        selected
                            ? "UNDER INVESTIGATION"
                            : "UNVERIFIED"
                    }
                </span>
            </div>

            <div class="statement-body">
                <p>
                    ${escapeHTML(statement.claim)}
                </p>
            </div>

            <div class="statement-footer">
                <span>
                    Confidence:
                    ${statement.confidence || "Unknown"}
                </span>

                <button
                    class="btn small secondary"
                    data-action="investigate-statement"
                    data-statement-id="${escapeHTML(statement.id)}"
                >
                    INVESTIGATE
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    $$(
        "[data-action='investigate-statement']",
        container
    ).forEach(button => {
        button.addEventListener("click", () => {
            investigateStatement(
                button.dataset.statementId
            );
        });
    });
}

function investigateStatement(statementId) {
    const caseData = APP.state.currentCase;

    if (!caseData) return;

    const statement =
        caseData.statements.find(
            item => item.id === statementId
        );

    if (!statement) return;

    APP.state.selectedStatement = statementId;

    if (
        APP.state.investigationsUsed >=
        APP.state.maxInvestigations
    ) {
        showToast(
            "Investigation limit reached. Use your evidence wisely.",
            "warning"
        );

        renderInvestigation();
        return;
    }

    APP.state.investigationsUsed++;

    playUI("investigate");

    revealStatementInformation(statement);

    saveInvestigation();

    renderInvestigation();
}

function revealStatementInformation(statement) {
    const clues =
        statement.clues || [];

    const evidence =
        statement.evidence || [];

    const sources =
        statement.sources || [];

    let html = `
        <div class="investigation-detail">
            <div class="detail-section">
                <h3>CLAIM</h3>
                <p>${escapeHTML(statement.claim)}</p>
            </div>
    `;

    if (statement.knownInfo) {
        html += `
            <div class="detail-section">
                <h3>KNOWN INFORMATION</h3>
                <p>${escapeHTML(statement.knownInfo)}</p>
            </div>
        `;
    }

    if (clues.length) {
        html += `
            <div class="detail-section">
                <h3>RELATED CLUES</h3>
                <div class="clue-list">
                    ${clues.map(clue => `
                        <button
                            class="clue-item"
                            data-clue-id="${escapeHTML(
                                typeof clue === "object"
                                    ? clue.id
                                    : clue
                            )}"
                        >
                            <span>◈</span>
                            ${
                                escapeHTML(
                                    typeof clue === "object"
                                        ? clue.title || clue.text
                                        : clue
                                )
                            }
                        </button>
                    `).join("")}
                </div>
            </div>
        `;
    }

    if (evidence.length) {
        html += `
            <div class="detail-section">
                <h3>EVIDENCE</h3>
                <div class="evidence-list">
                    ${evidence.map(item => `
                        <div class="evidence-preview">
                            ${escapeHTML(
                                typeof item === "object"
                                    ? item.text || item.title
                                    : item
                            )}
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    if (sources.length) {
        html += `
            <div class="detail-section">
                <h3>SOURCES</h3>
                <div class="source-list">
                    ${sources.map(source => `
                        <span class="source-chip">
                            ${escapeHTML(source)}
                        </span>
                    `).join("")}
                </div>
            </div>
        `;
    }

    html += `</div>`;

    openModal(
        "STATEMENT INVESTIGATION",
        html
    );
}


/* =========================================================
   INVESTIGATION STATS
========================================================= */

function renderInvestigationStats() {
    const clueCount =
        APP.state.cluesFound.length;

    const evidenceCount =
        APP.state.evidenceCollected.length;

    const remaining =
        Math.max(
            0,
            APP.state.maxInvestigations -
            APP.state.investigationsUsed
        );

    setText(
        "[data-investigation='clues']",
        clueCount
    );

    setText(
        "[data-investigation='evidence']",
        evidenceCount
    );

    setText(
        "[data-investigation='investigations']",
        remaining
    );

    const progress =
        Math.min(
            100,
            Math.round(
                (
                    (
                        clueCount +
                        evidenceCount +
                        APP.state.searchedTerms.length
                    ) /
                    10
                ) * 100
            )
        );

    const progressBar =
        $("[data-investigation='progress-bar']");

    if (progressBar) {
        progressBar.style.width =
            `${progress}%`;
    }
}


/* =========================================================
   EVIDENCE
========================================================= */

function renderRecentEvidence() {
    const container =
        $("[data-container='recent-evidence']");

    if (!container) return;

    container.innerHTML = "";

    const evidence =
        APP.state.evidenceCollected.slice(-5).reverse();

    if (!evidence.length) {
        container.innerHTML = `
            <div class="empty-state small">
                No evidence collected yet.
            </div>
        `;
        return;
    }

    evidence.forEach(item => {
        const evidenceElement =
            createElement(
                "div",
                "evidence-mini-card"
            );

        evidenceElement.innerHTML = `
            <span class="evidence-icon">◈</span>
            <div>
                <strong>
                    ${escapeHTML(
                        item.title ||
                        item.name ||
                        "Evidence"
                    )}
                </strong>

                <small>
                    ${escapeHTML(
                        item.description ||
                        item.text ||
                        ""
                    )}
                </small>
            </div>
        `;

        container.appendChild(evidenceElement);
    });
}

function collectEvidence(evidence) {
    if (!evidence) return false;

    const id =
        typeof evidence === "string"
            ? evidence
            : evidence.id;

    if (!id) return false;

    if (
        APP.state.evidenceCollected.some(
            item =>
                (typeof item === "string"
                    ? item
                    : item.id) === id
        )
    ) {
        return false;
    }

    const normalized =
        typeof evidence === "string"
            ? {
                id,
                title: evidence,
                description: ""
            }
            : structuredCloneSafe(evidence);

    APP.state.evidenceCollected.push(
        normalized
    );

    saveInvestigation();

    playUI("evidence");

    showToast(
        `Evidence acquired: ${normalized.title || normalized.name || id}`,
        "success"
    );

    renderInvestigation();

    return true;
}


/* =========================================================
   CLUES
========================================================= */

function discoverClue(clue) {
    if (!clue) return false;

    const id =
        typeof clue === "string"
            ? clue
            : clue.id;

    if (!id) return false;

    if (APP.state.cluesFound.includes(id)) {
        return false;
    }

    APP.state.cluesFound.push(id);

    if (clue.evidence) {
        collectEvidence(clue.evidence);
    }

    saveInvestigation();

    playUI("clue");

    showToast(
        `CLUE DISCOVERED: ${
            typeof clue === "string"
                ? clue
                : clue.title || clue.text || id
        }`,
        "success"
    );

    renderInvestigation();

    return true;
}


/* =========================================================
   BOTS
========================================================= */

function renderBots() {
    const container =
        $("[data-container='bots']");

    if (!container) return;

    if (typeof BOTS === "undefined") {
        container.innerHTML = `
            <div class="empty-state">
                Bot database unavailable.
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    Object.values(BOTS).forEach(bot => {
        const card =
            createElement(
                "article",
                "bot-card"
            );

        card.innerHTML = `
            <div class="bot-avatar">
                ${escapeHTML(bot.avatar || "◉")}
            </div>

            <div class="bot-info">
                <h3>${escapeHTML(bot.name)}</h3>

                <span class="bot-role">
                    ${escapeHTML(bot.role || "Unknown")}
                </span>

                <p>
                    ${escapeHTML(
                        bot.description ||
                        "Investigation contact."
                    )}
                </p>

                <div class="bot-reliability">
                    <span>RELIABILITY</span>
                    <strong>
                        ${bot.reliability ?? "?"}%
                    </strong>
                </div>
            </div>

            <button
                class="btn primary bot-contact"
                data-bot-id="${escapeHTML(bot.id)}"
            >
                CONTACT
            </button>
        `;

        container.appendChild(card);
    });

    $$(".bot-contact", container).forEach(button => {
        button.addEventListener("click", () => {
            openBotChat(button.dataset.botId);
        });
    });
}

function openBotChat(botId) {
    if (typeof BOTS === "undefined") return;

    const bot =
        Object.values(BOTS).find(
            item => item.id === botId
        );

    if (!bot) return;

    APP.state.selectedBot = botId;

    showScreen("bots");

    renderBotChat(bot);
}

function renderBotChat(bot) {
    const container =
        $("[data-container='bot-chat']");

    if (!container) return;

    const history =
        getBotHistory(bot.id);

    container.innerHTML = `
        <div class="chat-header">
            <div class="bot-avatar">
                ${escapeHTML(bot.avatar || "◉")}
            </div>

            <div>
                <h3>${escapeHTML(bot.name)}</h3>
                <span>${escapeHTML(bot.role || "")}</span>
            </div>

            <span class="online-status">
                ONLINE
            </span>
        </div>

        <div class="chat-messages" data-chat-messages></div>

        <div class="chat-input-row">
            <input
                type="text"
                id="bot-question"
                placeholder="Ask your question..."
                maxlength="180"
                autocomplete="off"
            >

            <button
                class="btn primary"
                data-action="send-bot-question"
            >
                SEND
            </button>
        </div>
    `;

    const messages =
        $("[data-chat-messages]", container);

    history.forEach(message => {
        appendChatMessage(
            messages,
            message.sender,
            message.text
        );
    });

    const sendButton =
        $("[data-action='send-bot-question']", container);

    const input =
        $("#bot-question", container);

    const send = () => {
        const question =
            input.value.trim();

        if (!question) return;

        sendBotQuestion(bot, question);

        input.value = "";
        input.focus();
    };

    sendButton.addEventListener(
        "click",
        send
    );

    input.addEventListener(
        "keydown",
        event => {
            if (event.key === "Enter") {
                send();
            }
        }
    );
}

function appendChatMessage(container, sender, text) {
    const message =
        createElement(
            "div",
            `chat-message ${sender === "player" ? "player" : "bot"}`
        );

    message.innerHTML = `
        <div class="message-author">
            ${sender === "player" ? "YOU" : escapeHTML(
                APP.state.selectedBot || "BOT"
            )}
        </div>

        <div class="message-content">
            ${escapeHTML(text)}
        </div>
    `;

    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

function sendBotQuestion(bot, question) {
    const container =
        $("[data-chat-messages]");

    if (!container) return;

    appendChatMessage(
        container,
        "player",
        question
    );

    saveBotMessage(
        bot.id,
        "player",
        question
    );

    showTypingIndicator(container);

    setTimeout(() => {
        removeTypingIndicator(container);

        const response =
            getBotResponse(
                bot,
                question
            );

        appendChatMessage(
            container,
            "bot",
            response.text
        );

        saveBotMessage(
            bot.id,
            "bot",
            response.text
        );

        if (response.clue) {
            discoverClue(response.clue);
        }

        if (response.evidence) {
            collectEvidence(response.evidence);
        }

        saveInvestigation();
    }, 700 + Math.random() * 900);
}

function getBotResponse(bot, question) {
    const normalized =
        question.toLowerCase();

    if (
        typeof bot.answerQuestion === "function"
    ) {
        return bot.answerQuestion(
            normalized,
            APP.state.currentCase,
            APP.state
        );
    }

    const dialogues =
        bot.dialogue ||
        bot.dialogues ||
        [];

    if (dialogues.length) {
        const matching =
            dialogues.find(dialogue => {
                const keywords =
                    dialogue.keywords || [];

                return keywords.some(
                    keyword =>
                        normalized.includes(
                            keyword.toLowerCase()
                        )
                );
            });

        if (matching) {
            return {
                text:
                    matching.response ||
                    matching.text ||
                    "I don't have enough information.",
                clue:
                    matching.clue || null,
                evidence:
                    matching.evidence || null
            };
        }

        const random =
            dialogues[
                Math.floor(
                    Math.random() *
                    dialogues.length
                )
            ];

        return {
            text:
                random.response ||
                random.text ||
                "Interesting question. Investigate the evidence.",
            clue:
                random.clue || null,
            evidence:
                random.evidence || null
        };
    }

    return {
        text:
            "I can't tell you the answer. Check the evidence and compare the claims.",
        clue: null,
        evidence: null
    };
}

function showTypingIndicator(container) {
    const typing =
        createElement(
            "div",
            "chat-message bot typing-message"
        );

    typing.dataset.typing = "true";

    typing.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator(container) {
    const typing =
        $("[data-typing='true']", container);

    if (typing) {
        typing.remove();
    }
}

function getBotHistory(botId) {
    try {
        const all =
            JSON.parse(
                localStorage.getItem(
                    "wil_bot_history"
                ) || "{}"
            );

        return all[botId] || [];
    } catch {
        return [];
    }
}

function saveBotMessage(botId, sender, text) {
    let all = {};

    try {
        all =
            JSON.parse(
                localStorage.getItem(
                    "wil_bot_history"
                ) || "{}"
            );
    } catch {
        all = {};
    }

    if (!Array.isArray(all[botId])) {
        all[botId] = [];
    }

    all[botId].push({
        sender,
        text,
        timestamp: Date.now()
    });

    all[botId] =
        all[botId].slice(-50);

    localStorage.setItem(
        "wil_bot_history",
        JSON.stringify(all)
    );
}


/* =========================================================
   SEARCH / TRUTHFINDER
========================================================= */

function renderSearch() {
    const input =
        $("[data-search-input]");

    const button =
        $("[data-action='search']");

    if (button && input) {
        button.onclick = () => {
            performSearch(input.value);
        };

        input.onkeydown = event => {
            if (event.key === "Enter") {
                performSearch(input.value);
            }
        };
    }
}

function performSearch(query) {
    const cleanQuery =
        query.trim();

    if (!cleanQuery) {
        showToast(
            "Enter a search term.",
            "warning"
        );
        return;
    }

    if (
        APP.state.searchedTerms.length >= 8 &&
        !APP.state.searchedTerms.includes(
            cleanQuery.toLowerCase()
        )
    ) {
        showToast(
            "TruthFinder search limit reached.",
            "warning"
        );
        return;
    }

    const normalized =
        cleanQuery.toLowerCase();

    if (
        !APP.state.searchedTerms.includes(
            normalized
        )
    ) {
        APP.state.searchedTerms.push(
            normalized
        );
    }

    let results = [];

    if (typeof SEARCH_DATABASE !== "undefined") {
        results =
            searchDatabase(
                cleanQuery,
                SEARCH_DATABASE
            );
    }

    if (
        typeof TruthFinder !== "undefined" &&
        typeof TruthFinder.search === "function"
    ) {
        results =
            TruthFinder.search(
                cleanQuery,
                APP.state.currentCase
            );
    }

    renderSearchResults(
        results,
        cleanQuery
    );

    saveInvestigation();
    renderInvestigation();

    playUI("search");
}

function searchDatabase(query, database) {
    const words =
        query
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);

    return database
        .map(item => {
            const text =
                `${item.title || ""} ${
                    item.text || ""
                } ${
                    item.description || ""
                }`.toLowerCase();

            const score =
                words.reduce(
                    (total, word) =>
                        total +
                        (text.includes(word) ? 1 : 0),
                    0
                );

            return {
                ...item,
                score
            };
        })
        .filter(item => item.score > 0)
        .sort(
            (a, b) =>
                b.score - a.score
        );
}

function renderSearchResults(results, query) {
    const container =
        $("[data-container='search-results']");

    if (!container) return;

    container.innerHTML = `
        <div class="search-query">
            SEARCH RESULTS FOR:
            <strong>${escapeHTML(query)}</strong>
        </div>
    `;

    if (!results || !results.length) {
        container.innerHTML += `
            <div class="empty-state">
                <strong>NO RELEVANT RESULTS</strong>
                <p>
                    Try a different keyword or investigate another source.
                </p>
            </div>
        `;

        return;
    }

    results.forEach(result => {
        const card =
            createElement(
                "article",
                "search-result"
            );

        const reliability =
            result.reliability ||
            result.sourceType ||
            "UNKNOWN";

        card.innerHTML = `
            <div class="result-top">
                <span class="result-source">
                    ${escapeHTML(
                        result.source ||
                        "TruthFinder"
                    )}
                </span>

                <span class="result-reliability">
                    ${escapeHTML(reliability)}
                </span>
            </div>

            <h3>
                ${escapeHTML(
                    result.title ||
                    "Untitled result"
                )}
            </h3>

            <p>
                ${escapeHTML(
                    result.text ||
                    result.description ||
                    ""
                )}
            </p>

            ${
                result.contradiction
                    ? `
                    <div class="result-warning">
                        ⚠ CONTRADICTION DETECTED
                    </div>
                    `
                    : ""
            }

            ${
                result.evidence
                    ? `
                    <button
                        class="btn small primary"
                        data-action="collect-search-evidence"
                    >
                        SAVE EVIDENCE
                    </button>
                    `
                    : ""
            }
        `;

        const evidenceButton =
            $(
                "[data-action='collect-search-evidence']",
                card
            );

        if (evidenceButton) {
            evidenceButton.onclick = () => {
                collectEvidence(
                    result.evidence
                );

                evidenceButton.disabled = true;
                evidenceButton.textContent =
                    "SAVED";
            };
        }

        container.appendChild(card);
    });
}


/* =========================================================
   EVIDENCE BOARD
========================================================= */

function renderEvidence() {
    const container =
        $("[data-container='evidence-board']");

    if (!container) return;

    container.innerHTML = "";

    if (!APP.state.evidenceCollected.length) {
        container.innerHTML = `
            <div class="empty-state">
                <strong>EVIDENCE BOARD EMPTY</strong>
                <p>
                    Investigate statements, talk to bots,
                    search TruthFinder, and solve mini-games.
                </p>
            </div>
        `;
        return;
    }

    APP.state.evidenceCollected.forEach(
        (evidence, index) => {
            const id =
                evidence.id ||
                `evidence-${index}`;

            const important =
                APP.state.importantEvidence.includes(id);

            const card =
                createElement(
                    "article",
                    `evidence-card ${important ? "important" : ""}`
                );

            card.dataset.evidenceId = id;

            card.innerHTML = `
                <div class="evidence-card-header">
                    <span class="evidence-type">
                        ${escapeHTML(
                            evidence.type ||
                            "EVIDENCE"
                        )}
                    </span>

                    <button
                        class="evidence-menu"
                        data-action="toggle-important"
                        data-evidence-id="${escapeHTML(id)}"
                    >
                        ${important ? "★" : "☆"}
                    </button>
                </div>

                <h3>
                    ${escapeHTML(
                        evidence.title ||
                        evidence.name ||
                        "Evidence"
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        evidence.description ||
                        evidence.text ||
                        ""
                    )}
                </p>

                <div class="evidence-actions">
                    <button
                        class="btn tiny secondary"
                        data-action="remove-evidence"
                        data-evidence-id="${escapeHTML(id)}"
                    >
                        REMOVE
                    </button>
                </div>
            `;

            container.appendChild(card);
        }
    );

    initializeEvidenceActions();
}

function initializeEvidenceActions() {
    $$("[data-action='toggle-important']").forEach(
        button => {
            button.onclick = () => {
                toggleImportantEvidence(
                    button.dataset.evidenceId
                );
            };
        }
    );

    $$("[data-action='remove-evidence']").forEach(
        button => {
            button.onclick = () => {
                removeEvidence(
                    button.dataset.evidenceId
                );
            };
        }
    );
}

function toggleImportantEvidence(id) {
    const index =
        APP.state.importantEvidence.indexOf(id);

    if (index === -1) {
        APP.state.importantEvidence.push(id);

        showToast(
            "Evidence marked important.",
            "success"
        );
    } else {
        APP.state.importantEvidence.splice(
            index,
            1
        );
    }

    saveInvestigation();
    renderEvidence();
}

function removeEvidence(id) {
    APP.state.evidenceCollected =
        APP.state.evidenceCollected.filter(
            evidence =>
                (evidence.id ||
                    evidence.name) !== id
        );

    APP.state.importantEvidence =
        APP.state.importantEvidence.filter(
            evidenceId =>
                evidenceId !== id
        );

    saveInvestigation();
    renderEvidence();
}


/* =========================================================
   NOTES
========================================================= */

function renderCaseNotes() {
    const container =
        $("[data-container='notes']");

    if (!container) return;

    container.innerHTML = "";

    APP.state.notes.forEach(
        (note, index) => {
            const element =
                createElement(
                    "div",
                    "note-card"
                );

            element.innerHTML = `
                <p>${escapeHTML(note.text)}</p>

                <button
                    class="note-delete"
                    data-note-index="${index}"
                >
                    ×
                </button>
            `;

            container.appendChild(element);
        }
    );

    $$("[data-note-index]", container).forEach(
        button => {
            button.onclick = () => {
                const index =
                    Number(
                        button.dataset.noteIndex
                    );

                APP.state.notes.splice(
                    index,
                    1
                );

                saveInvestigation();
                renderCaseNotes();
            };
        }
    );
}

function addNote(text) {
    const clean =
        String(text || "").trim();

    if (!clean) return;

    APP.state.notes.push({
        text: clean,
        timestamp: Date.now()
    });

    saveInvestigation();
    renderCaseNotes();

    showToast(
        "Investigation note saved.",
        "success"
    );
}


/* =========================================================
   MINI GAMES
========================================================= */

function renderMiniGames() {
    const container =
        $("[data-container='minigames']");

    if (!container) return;

    if (typeof MiniGames === "undefined") {
        container.innerHTML = `
            <div class="empty-state">
                Mini-game module unavailable.
            </div>
        `;
        return;
    }

    const games =
        typeof MiniGames.getAvailable === "function"
            ? MiniGames.getAvailable(
                APP.state.currentCase
            )
            : [];

    container.innerHTML = "";

    games.forEach(game => {
        const completed =
            APP.state.completedMiniGames.includes(
                game.id
            );

        const card =
            createElement(
                "article",
                `minigame-card ${completed ? "completed" : ""}`
            );

        card.innerHTML = `
            <div class="game-icon">
                ${escapeHTML(game.icon || "◆")}
            </div>

            <h3>${escapeHTML(game.title)}</h3>

            <p>
                ${escapeHTML(game.description || "")}
            </p>

            <span class="game-type">
                ${escapeHTML(game.type || "PUZZLE")}
            </span>

            <button
                class="btn primary"
                data-game-id="${escapeHTML(game.id)}"
            >
                ${completed ? "PLAY AGAIN" : "START"}
            </button>
        `;

        container.appendChild(card);
    });

    $$("[data-game-id]", container).forEach(
        button => {
            button.onclick = () => {
                startMiniGame(
                    button.dataset.gameId
                );
            };
        }
    );
}

function startMiniGame(gameId) {
    if (
        typeof MiniGames === "undefined" ||
        typeof MiniGames.start !== "function"
    ) {
        showToast(
            "Mini-game system unavailable.",
            "error"
        );
        return;
    }

    MiniGames.start(
        gameId,
        APP.state.currentCase,
        result => {
            if (!result) return;

            if (result.success) {
                if (
                    !APP.state.completedMiniGames.includes(
                        gameId
                    )
                ) {
                    APP.state.completedMiniGames.push(
                        gameId
                    );
                }

                if (result.clue) {
                    discoverClue(result.clue);
                }

                if (result.evidence) {
                    collectEvidence(
                        result.evidence
                    );
                }

                showToast(
                    "MINI-GAME COMPLETE — NEW INFORMATION UNLOCKED",
                    "success"
                );

                playUI("success");

                saveInvestigation();
            } else {
                showToast(
                    "Investigation failed. Try again.",
                    "warning"
                );

                playUI("wrong");
            }

            renderMiniGames();
        }
    );
}


/* =========================================================
   ACCUSATION
========================================================= */

function renderAccusation() {
    const container =
        $("[data-container='accusation']");

    if (!container) return;

    const caseData =
        APP.state.currentCase;

    if (!caseData) return;

    container.innerHTML = `
        <div class="accusation-warning">
            <span class="warning-icon">⚠</span>

            <div>
                <strong>FINAL ACCUSATION</strong>

                <p>
                    Choose carefully. A wrong accusation
                    will affect your detective score.
                </p>
            </div>
        </div>

        <div class="accusation-statements">
            ${
                (caseData.statements || [])
                    .map(
                        (statement, index) => `
                        <button
                            class="accusation-option"
                            data-accuse-id="${escapeHTML(
                                statement.id
                            )}"
                        >
                            <span>${index + 1}</span>

                            <p>
                                ${escapeHTML(
                                    statement.claim
                                )}
                            </p>
                        </button>
                    `
                    )
                    .join("")
            }
        </div>
    `;

    $$(
        "[data-accuse-id]",
        container
    ).forEach(button => {
        button.onclick = () => {
            confirmAccusation(
                button.dataset.accuseId
            );
        };
    });
}

function confirmAccusation(statementId) {
    const statement =
        APP.state.currentCase?.statements?.find(
            item => item.id === statementId
        );

    if (!statement) return;

    const modalHTML = `
        <div class="confirmation-modal">
            <div class="danger-symbol">!</div>

            <h3>LOCK ACCUSATION?</h3>

            <p>
                You are accusing statement:
            </p>

            <blockquote>
                ${escapeHTML(statement.claim)}
            </blockquote>

            <div class="modal-actions">
                <button
                    class="btn secondary"
                    data-modal-close
                >
                    CANCEL
                </button>

                <button
                    class="btn danger"
                    data-confirm-accusation
                >
                    LOCK ACCUSATION
                </button>
            </div>
        </div>
    `;

    openModal(
        "FINAL DECISION",
        modalHTML
    );

    const confirmButton =
        $("[data-confirm-accusation]");

    if (confirmButton) {
        confirmButton.onclick = () => {
            closeModal();
            makeAccusation(statementId);
        };
    }
}

function makeAccusation(statementId) {
    const caseData =
        APP.state.currentCase;

    if (!caseData) return;

    APP.state.accusedStatement =
        statementId;

    APP.state.caseFinishedAt =
        Date.now();

    const correctId =
        caseData.answer ||
        caseData.correctAnswer ||
        caseData.falseStatement;

    const correct =
        statementId === correctId;

    const result =
        calculateCaseScore(correct);

    recordCaseResult(
        caseData,
        correct,
        result
    );

    clearSavedInvestigation();

    playUI(
        correct
            ? "success"
            : "wrong"
    );

    showScreen("results");
}


/* =========================================================
   SCORE SYSTEM
========================================================= */

function calculateCaseScore(correct) {
    const elapsed =
        Math.max(
            1,
            (
                APP.state.caseFinishedAt -
                APP.state.caseStartedAt
            ) / 1000
        );

    let score = 0;

    if (correct) {
        score += 1000;
    } else {
        score -= 400;
    }

    const clueBonus =
        APP.state.cluesFound.length * 100;

    const evidenceBonus =
        APP.state.evidenceCollected.length * 75;

    const investigationPenalty =
        Math.max(
            0,
            APP.state.investigationsUsed - 6
        ) * 25;

    const searchBonus =
        Math.min(
            300,
            APP.state.searchedTerms.length * 50
        );

    const timeBonus =
        Math.max(
            0,
            500 - Math.floor(elapsed / 10) * 10
        );

    score += clueBonus;
    score += evidenceBonus;
    score += searchBonus;
    score += timeBonus;
    score -= investigationPenalty;

    return {
        score: Math.max(0, Math.round(score)),
        correct,
        elapsed,
        clues: APP.state.cluesFound.length,
        evidence:
            APP.state.evidenceCollected.length,
        investigations:
            APP.state.investigationsUsed,
        searches:
            APP.state.searchedTerms.length
    };
}


/* =========================================================
   RESULTS
========================================================= */

function renderResults() {
    const caseData =
        APP.state.currentCase;

    if (!caseData) return;

    const correctId =
        caseData.answer ||
        caseData.correctAnswer ||
        caseData.falseStatement;

    const accused =
        caseData.statements?.find(
            item =>
                item.id ===
                APP.state.accusedStatement
        );

    const correctStatement =
        caseData.statements?.find(
            item =>
                item.id === correctId
        );

    const wasCorrect =
        APP.state.accusedStatement === correctId;

    setText(
        "[data-result='status']",
        wasCorrect
            ? "CASE SOLVED"
            : "WRONG ACCUSATION"
    );

    setText(
        "[data-result='accused']",
        accused?.claim || "Unknown"
    );

    setText(
        "[data-result='correct']",
        correctStatement?.claim || "Unknown"
    );

    const explanation =
        caseData.explanation ||
        caseData.answerExplanation ||
        "The evidence reveals which statement was false.";

    setText(
        "[data-result='explanation']",
        explanation
    );

    const resultStats =
        calculateCaseScore(wasCorrect);

    setText(
        "[data-result='score']",
        resultStats.score
    );

    setText(
        "[data-result='time']",
        formatTime(resultStats.elapsed)
    );

    setText(
        "[data-result='clues']",
        resultStats.clues
    );

    setText(
        "[data-result='evidence']",
        resultStats.evidence
    );

    setText(
        "[data-result='investigations']",
        resultStats.investigations
    );

    setText(
        "[data-result='searches']",
        resultStats.searches
    );

    const nextButton =
        $("[data-action='next-case']");

    if (nextButton) {
        nextButton.onclick = () => {
            startNewCase();
        };
    }

    const casesButton =
        $("[data-action='back-to-cases']");

    if (casesButton) {
        casesButton.onclick = () => {
            showScreen("cases");
        };
    }
}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function renderAchievements() {
    const container =
        $("[data-container='achievements']");

    if (!container) return;

    const stats =
        getPlayerStats();

    const achievements =
        getAchievements();

    container.innerHTML = "";

    achievements.forEach(achievement => {
        const unlocked =
            stats.achievements.includes(
                achievement.id
            );

        const card =
            createElement(
                "article",
                `achievement-card ${unlocked ? "unlocked" : "locked"}`
            );

        card.innerHTML = `
            <div class="achievement-icon">
                ${escapeHTML(
                    achievement.icon || "◆"
                )}
            </div>

            <div>
                <h3>
                    ${escapeHTML(
                        achievement.title
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        achievement.description
                    )}
                </p>

                <span>
                    ${
                        unlocked
                            ? "UNLOCKED"
                            : "LOCKED"
                    }
                </span>
            </div>
        `;

        container.appendChild(card);
    });
}

function getAchievements() {
    return [
        {
            id: "first-case",
            title: "First Blood",
            description: "Complete your first case.",
            icon: "◆"
        },
        {
            id: "perfect-case",
            title: "Perfect Detective",
            description: "Solve a case correctly.",
            icon: "★"
        },
        {
            id: "clue-hunter",
            title: "Clue Hunter",
            description: "Discover 10 clues.",
            icon: "◈"
        },
        {
            id: "evidence-master",
            title: "Evidence Master",
            description: "Collect 20 pieces of evidence.",
            icon: "▣"
        },
        {
            id: "speed-detective",
            title: "Speed Detective",
            description: "Solve a case in under 3 minutes.",
            icon: "⚡"
        },
        {
            id: "streak-5",
            title: "Hot Streak",
            description: "Reach a 5-case streak.",
            icon: "🔥"
        },
        {
            id: "master",
            title: "Master Detective",
            description: "Reach Master Detective rank.",
            icon: "♛"
        }
    ];
}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {
    const stats =
        getPlayerStats();

    setText(
        "[data-profile='name']",
        stats.name
    );

    setText(
        "[data-profile='level']",
        stats.level
    );

    setText(
        "[data-profile='rank']",
        stats.rank
    );

    setText(
        "[data-profile='xp']",
        stats.xp
    );

    setText(
        "[data-profile='cases']",
        stats.completedCases.length
    );

    setText(
        "[data-profile='accuracy']",
        `${stats.accuracy}%`
    );

    setText(
        "[data-profile='streak']",
        stats.streak
    );

    setText(
        "[data-profile='best-time']",
        stats.bestTime
            ? formatTime(stats.bestTime)
            : "--:--"
    );
}


/* =========================================================
   SETTINGS SCREEN
========================================================= */

function renderSettings() {
    const mappings = [
        "sound",
        "animations",
        "particles",
        "scanlines",
        "reducedMotion"
    ];

    mappings.forEach(setting => {
        const checkbox =
            $(`[data-setting='${setting}']`);

        if (checkbox) {
            checkbox.checked =
                Boolean(
                    APP.settings[setting]
                );

            checkbox.onchange = () => {
                toggleSetting(setting);
            };
        }
    });

    const resetButton =
        $("[data-action='reset-progress']");

    if (resetButton) {
        resetButton.onclick =
            confirmResetProgress;
    }
}


/* =========================================================
   HELP
========================================================= */

function renderHelp() {
    const container =
        $("[data-container='help']");

    if (!container) return;

    container.innerHTML = `
        <div class="help-section">
            <h2>HOW TO PLAY</h2>

            <p>
                Every case contains five statements.
                Four are true. One is false.
            </p>

            <p>
                Your job is to investigate before making
                your final accusation.
            </p>
        </div>

        <div class="help-section">
            <h2>INVESTIGATE</h2>

            <p>
                Examine statements, search TruthFinder,
                question bots, collect clues and solve
                mini-games.
            </p>
        </div>

        <div class="help-section">
            <h2>EVIDENCE</h2>

            <p>
                Evidence can confirm or contradict
                statements. Do not trust every source.
            </p>
        </div>

        <div class="help-section">
            <h2>FINAL ACCUSATION</h2>

            <p>
                When you are confident, choose the one
                statement you believe is false.
            </p>
        </div>

        <div class="help-section">
            <h2>SCORING</h2>

            <p>
                Correct accusations, clues, evidence,
                speed and efficient investigations
                affect your final score.
            </p>
        </div>
    `;
}


/* =========================================================
   PLAYER DATA
========================================================= */

function getDefaultPlayerStats() {
    return {
        name: "Detective",
        xp: 0,
        level: 1,
        rank: "Rookie Detective",

        completedCases: [],
        totalCases: 0,
        correctCases: 0,
        wrongAccusations: 0,

        streak: 0,
        bestStreak: 0,

        accuracy: 0,
        bestTime: null,

        totalClues: 0,
        totalEvidence: 0,

        achievements: [],

        dailyCompleted: [],
        lastCaseDate: null
    };
}

function getPlayerStats() {
    let stats;

    try {
        stats =
            JSON.parse(
                localStorage.getItem(
                    "wil_player"
                ) || "null"
            );
    } catch {
        stats = null;
    }

    if (!stats) {
        stats =
            getDefaultPlayerStats();

        savePlayerStats(stats);
    }

    return {
        ...getDefaultPlayerStats(),
        ...stats
    };
}

function savePlayerStats(stats) {
    localStorage.setItem(
        "wil_player",
        JSON.stringify(stats)
    );

    updatePlayerInterface();
}

function updatePlayerInterface() {
    const stats =
        getPlayerStats();

    setText(
        "#player-name",
        stats.name
    );

    setText(
        "#player-xp",
        stats.xp
    );

    setText(
        "#player-level",
        stats.level
    );

    setText(
        "#player-rank",
        stats.rank
    );

    const xpNeeded =
        xpForNextLevel(stats.level);

    const progress =
        Math.min(
            100,
            Math.round(
                (
                    (
                        stats.xp -
                        xpForLevel(stats.level)
                    ) /
                    (
                        xpNeeded -
                        xpForLevel(stats.level)
                    )
                ) * 100
            )
        );

    const xpBars =
        $$("[data-player-xp-bar]");

    xpBars.forEach(bar => {
        bar.style.width =
            `${Math.max(0, progress)}%`;
    });
}


/* =========================================================
   XP / LEVEL / RANK
========================================================= */

function xpForLevel(level) {
    return Math.max(
        0,
        (level - 1) * 1000
    );
}

function xpForNextLevel(level) {
    return level * 1000;
}

function calculateRank(level) {
    if (level >= 30) return "Legend";
    if (level >= 25) return "Master Detective";
    if (level >= 20) return "Senior Detective";
    if (level >= 15) return "Detective";
    if (level >= 10) return "Investigator";
    if (level >= 5) return "Cadet";
    return "Rookie Detective";
}

function addXP(amount) {
    const stats =
        getPlayerStats();

    const oldLevel =
        stats.level;

    stats.xp =
        Math.max(
            0,
            stats.xp + amount
        );

    while (
        stats.xp >=
        xpForNextLevel(stats.level)
    ) {
        stats.level++;
    }

    stats.rank =
        calculateRank(stats.level);

    savePlayerStats(stats);

    if (stats.level > oldLevel) {
        showLevelUp(
            stats.level,
            stats.rank
        );
    }
}

function showLevelUp(level, rank) {
    playUI("achievement");

    openModal(
        "LEVEL UP",
        `
            <div class="level-up-modal">
                <div class="level-up-icon">⬆</div>

                <h2>LEVEL ${level}</h2>

                <p>
                    You have reached:
                </p>

                <strong>
                    ${escapeHTML(rank)}
                </strong>
            </div>
        `
    );
}


/* =========================================================
   CASE RESULT RECORDING
========================================================= */

function recordCaseResult(
    caseData,
    correct,
    result
) {
    const stats =
        getPlayerStats();

    const caseId =
        caseData.id;

    if (
        !stats.completedCases.includes(
            caseId
        )
    ) {
        stats.completedCases.push(
            caseId
        );
    }

    stats.totalCases++;

    if (correct) {
        stats.correctCases++;
        stats.streak++;

        stats.bestStreak =
            Math.max(
                stats.bestStreak,
                stats.streak
            );
    } else {
        stats.wrongAccusations++;
        stats.streak = 0;
    }

    stats.totalClues +=
        result.clues;

    stats.totalEvidence +=
        result.evidence;

    stats.accuracy =
        stats.totalCases
            ? Math.round(
                (
                    stats.correctCases /
                    stats.totalCases
                ) * 100
            )
            : 0;

    if (
        stats.bestTime === null ||
        result.elapsed < stats.bestTime
    ) {
        stats.bestTime =
            result.elapsed;
    }

    const xpGain =
        Math.max(
            100,
            Math.floor(
                result.score / 4
            )
        );

    stats.xp += xpGain;

    while (
        stats.xp >=
        xpForNextLevel(stats.level)
    ) {
        stats.level++;
    }

    stats.rank =
        calculateRank(stats.level);

    unlockAchievements(
        stats,
        result,
        correct
    );

    stats.lastCaseDate =
        new Date()
            .toISOString()
            .slice(0, 10);

    savePlayerStats(stats);

    if (APP.state.daily) {
        markDailyComplete();
    }
}

function unlockAchievements(
    stats,
    result,
    correct
) {
    const checks = [];

    if (
        stats.completedCases.length >= 1
    ) {
        checks.push("first-case");
    }

    if (correct) {
        checks.push("perfect-case");
    }

    if (stats.totalClues >= 10) {
        checks.push("clue-hunter");
    }

    if (stats.totalEvidence >= 20) {
        checks.push("evidence-master");
    }

    if (
        correct &&
        result.elapsed < 180
    ) {
        checks.push("speed-detective");
    }

    if (stats.bestStreak >= 5) {
        checks.push("streak-5");
    }

    if (stats.level >= 25) {
        checks.push("master");
    }

    checks.forEach(id => {
        if (
            !stats.achievements.includes(id)
        ) {
            stats.achievements.push(id);

            const achievement =
                getAchievements().find(
                    item => item.id === id
                );

            if (achievement) {
                setTimeout(() => {
                    showToast(
                        `ACHIEVEMENT UNLOCKED: ${achievement.title}`,
                        "success"
                    );

                    playUI("achievement");
                }, 500);
            }
        }
    });
}


/* =========================================================
   DAILY CASE
========================================================= */

function markDailyComplete() {
    const stats =
        getPlayerStats();

    const today =
        new Date()
            .toISOString()
            .slice(0, 10);

    if (
        !stats.dailyCompleted.includes(
            today
        )
    ) {
        stats.dailyCompleted.push(
            today
        );
    }

    savePlayerStats(stats);
}

function isDailyCompleted() {
    const stats =
        getPlayerStats();

    const today =
        new Date()
            .toISOString()
            .slice(0, 10);

    return stats.dailyCompleted.includes(
        today
    );
}


/* =========================================================
   INVESTIGATION SAVE / RESTORE
========================================================= */

function saveInvestigation() {
    if (!APP.state.currentCase) return;

    const saveData = {
        caseId:
            APP.state.currentCase.id,

        selectedStatement:
            APP.state.selectedStatement,

        investigationsUsed:
            APP.state.investigationsUsed,

        cluesFound:
            APP.state.cluesFound,

        evidenceCollected:
            APP.state.evidenceCollected,

        importantEvidence:
            APP.state.importantEvidence,

        notes:
            APP.state.notes,

        connections:
            APP.state.connections,

        searchedTerms:
            APP.state.searchedTerms,

        completedMiniGames:
            APP.state.completedMiniGames,

        caseStartedAt:
            APP.state.caseStartedAt,

        daily:
            Boolean(APP.state.daily)
    };

    localStorage.setItem(
        "wil_investigation",
        JSON.stringify(saveData)
    );
}

function getSavedInvestigation() {
    try {
        return JSON.parse(
            localStorage.getItem(
                "wil_investigation"
            ) || "null"
        );
    } catch {
        return null;
    }
}

function restoreInvestigation(saveData) {
    if (
        !saveData ||
        typeof CASES === "undefined"
    ) {
        return;
    }

    const caseData =
        CASES.find(
            item =>
                item.id === saveData.caseId
        );

    if (!caseData) {
        clearSavedInvestigation();
        return;
    }

    APP.state.currentCase =
        structuredCloneSafe(caseData);

    APP.state.selectedStatement =
        saveData.selectedStatement || null;

    APP.state.investigationsUsed =
        saveData.investigationsUsed || 0;

    APP.state.cluesFound =
        saveData.cluesFound || [];

    APP.state.evidenceCollected =
        saveData.evidenceCollected || [];

    APP.state.importantEvidence =
        saveData.importantEvidence || [];

    APP.state.notes =
        saveData.notes || [];

    APP.state.connections =
        saveData.connections || [];

    APP.state.searchedTerms =
        saveData.searchedTerms || [];

    APP.state.completedMiniGames =
        saveData.completedMiniGames || [];

    APP.state.caseStartedAt =
        saveData.caseStartedAt ||
        Date.now();

    APP.state.daily =
        Boolean(saveData.daily);

    showScreen("investigation");

    showToast(
        "Previous investigation restored.",
        "success"
    );
}

function clearSavedInvestigation() {
    localStorage.removeItem(
        "wil_investigation"
    );
}


/* =========================================================
   RESET PROGRESS
========================================================= */

function confirmResetProgress() {
    openModal(
        "RESET ALL PROGRESS?",
        `
            <div class="danger-modal">
                <p>
                    This will permanently delete your
                    XP, cases, achievements, streaks,
                    evidence and investigation progress.
                </p>

                <div class="modal-actions">
                    <button
                        class="btn secondary"
                        data-modal-close
                    >
                        CANCEL
                    </button>

                    <button
                        class="btn danger"
                        data-action="confirm-reset"
                    >
                        RESET EVERYTHING
                    </button>
                </div>
            </div>
        `
    );

    const button =
        $("[data-action='confirm-reset']");

    if (button) {
        button.onclick = () => {
            resetAllProgress();
        };
    }
}

function resetAllProgress() {
    const keys = [
        "wil_player",
        "wil_investigation",
        "wil_settings",
        "wil_bot_history"
    ];

    keys.forEach(
        key =>
            localStorage.removeItem(key)
    );

    APP.state.currentCase = null;
    APP.state.cluesFound = [];
    APP.state.evidenceCollected = [];
    APP.state.notes = [];
    APP.state.connections = [];

    APP.settings = {
        sound: true,
        animations: true,
        particles: true,
        scanlines: true,
        reducedMotion: false
    };

    saveSettings();

    closeModal();

    showToast(
        "All detective progress has been reset.",
        "success"
    );

    updatePlayerInterface();
    showScreen("landing");
}


/* =========================================================
   GLOBAL BUTTONS
========================================================= */

function initializeGlobalButtons() {
    const mute =
        APP.elements.globalMute;

    if (mute) {
        mute.addEventListener(
            "click",
            () => {
                APP.settings.sound =
                    !APP.settings.sound;

                saveSettings();
                applySettingsToDocument();

                if (
                    APP.settings.sound
                ) {
                    playUI("click");
                }
            }
        );
    }

    document.addEventListener(
        "click",
        event => {
            const actionButton =
                event.target.closest(
                    "[data-action]"
                );

            if (!actionButton) return;

            const action =
                actionButton.dataset.action;

            switch (action) {
                case "add-note": {
                    const input =
                        $("[data-note-input]");

                    if (input) {
                        addNote(input.value);
                        input.value = "";
                    }

                    break;
                }

                case "open-accusation":
                    showScreen("accusation");
                    break;

                case "open-evidence":
                    showScreen("evidence");
                    break;

                case "open-bots":
                    showScreen("bots");
                    break;

                case "open-search":
                    showScreen("search");
                    break;

                case "open-minigames":
                    showScreen("minigames");
                    break;

                case "save-note":
                    break;

                case "mute":
                    APP.settings.sound =
                        !APP.settings.sound;

                    saveSettings();
                    applySettingsToDocument();
                    break;
            }
        }
    );
}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

function initializeKeyboardControls() {
    document.addEventListener(
        "keydown",
        event => {
            if (event.key === "Escape") {
                closeModal();
            }

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "s"
            ) {
                event.preventDefault();

                if (
                    APP.state.currentCase
                ) {
                    saveInvestigation();

                    showToast(
                        "Investigation saved.",
                        "success"
                    );
                }
            }
        }
    );
}


/* =========================================================
   MODAL SYSTEM
========================================================= */

function openModal(title, content) {
    const container =
        APP.elements.modalContainer ||
        $("#modal-container");

    if (!container) return;

    container.innerHTML = `
        <div class="modal-backdrop">
            <div
                class="modal"
                role="dialog"
                aria-modal="true"
            >
                <div class="modal-header">
                    <h2>
                        ${escapeHTML(title)}
                    </h2>

                    <button
                        class="modal-close"
                        data-modal-close
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;

    container.classList.add("active");

    $$("[data-modal-close]", container).forEach(
        button => {
            button.onclick = closeModal;
        }
    );

    const backdrop =
        $(".modal-backdrop", container);

    if (backdrop) {
        backdrop.onclick = event => {
            if (
                event.target === backdrop
            ) {
                closeModal();
            }
        };
    }
}

function closeModal() {
    const container =
        APP.elements.modalContainer ||
        $("#modal-container");

    if (!container) return;

    container.classList.remove("active");

    setTimeout(() => {
        if (
            !container.classList.contains(
                "active"
            )
        ) {
            container.innerHTML = "";
        }
    }, 200);
}


/* =========================================================
   TOAST SYSTEM
========================================================= */

function showToast(
    message,
    type = "info",
    duration = 3200
) {
    const container =
        APP.elements.toastContainer ||
        $("#toast-container");

    if (!container) return;

    const toast =
        createElement(
            "div",
            `toast toast-${type}`
        );

    toast.innerHTML = `
        <div class="toast-icon">
            ${getToastIcon(type)}
        </div>

        <div class="toast-message">
            ${escapeHTML(message)}
        </div>

        <button
            class="toast-close"
            aria-label="Close"
        >
            ×
        </button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    const close =
        () => {
            toast.classList.remove("show");

            setTimeout(
                () => toast.remove(),
                250
            );
        };

    $(".toast-close", toast).onclick =
        close;

    setTimeout(
        close,
        duration
    );
}

function getToastIcon(type) {
    switch (type) {
        case "success":
            return "✓";

        case "error":
            return "×";

        case "warning":
            return "!";

        default:
            return "i";
    }
}


/* =========================================================
   AUDIO
========================================================= */

function playUI(sound) {
    if (
        !APP.settings.sound ||
        APP.state.muted
    ) {
        return;
    }

    try {
        if (
            typeof AudioManager !== "undefined" &&
            typeof AudioManager.play === "function"
        ) {
            AudioManager.play(sound);
        }
    } catch (error) {
        console.warn(
            "Audio unavailable:",
            error
        );
    }
}

function updateMuteButton() {
    const buttons =
        $$(
            "[data-action='mute'], #global-mute"
        );

    buttons.forEach(button => {
        const muted =
            !APP.settings.sound;

        button.setAttribute(
            "aria-pressed",
            String(muted)
        );

        button.innerHTML =
            muted
                ? "🔇"
                : "🔊";
    });
}


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

function initializeParticles() {
    if (
        !APP.settings.particles ||
        APP.settings.reducedMotion
    ) {
        return;
    }

    const canvas =
        document.getElementById(
            "particle-canvas"
        );

    if (!canvas) return;

    const context =
        canvas.getContext("2d");

    if (!context) return;

    let width =
        canvas.width =
        window.innerWidth;

    let height =
        canvas.height =
        window.innerHeight;

    const particles = [];

    const count =
        Math.min(
            100,
            Math.floor(
                window.innerWidth / 12
            )
        );

    for (
        let index = 0;
        index < count;
        index++
    ) {
        particles.push({
            x:
                Math.random() * width,

            y:
                Math.random() * height,

            size:
                Math.random() * 2 + 0.5,

            speedX:
                (Math.random() - 0.5) * 0.25,

            speedY:
                (Math.random() - 0.5) * 0.25,

            alpha:
                Math.random() * 0.5 + 0.1
        });
    }

    function resize() {
        width =
            canvas.width =
            window.innerWidth;

        height =
            canvas.height =
            window.innerHeight;
    }

    window.addEventListener(
        "resize",
        resize
    );

    function animate() {
        if (
            !APP.settings.particles ||
            APP.settings.reducedMotion
        ) {
            context.clearRect(
                0,
                0,
                width,
                height
            );

            return;
        }

        context.clearRect(
            0,
            0,
            width,
            height
        );

        particles.forEach(
            particle => {
                particle.x +=
                    particle.speedX;

                particle.y +=
                    particle.speedY;

                if (
                    particle.x < 0
                ) {
                    particle.x = width;
                }

                if (
                    particle.x > width
                ) {
                    particle.x = 0;
                }

                if (
                    particle.y < 0
                ) {
                    particle.y = height;
                }

                if (
                    particle.y > height
                ) {
                    particle.y = 0;
                }

                context.globalAlpha =
                    particle.alpha;

                context.fillStyle =
                    "#35d8ff";

                context.beginPath();

                context.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                context.fill();
            }
        );

        context.globalAlpha = 1;

        requestAnimationFrame(
            animate
        );
    }

    animate();
}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function setText(selector, value) {
    const element =
        $(selector);

    if (!element) return;

    element.textContent =
        value ?? "";
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "--:--";
    }

    const total =
        Math.max(
            0,
            Math.floor(seconds)
        );

    const minutes =
        Math.floor(total / 60);

    const secs =
        total % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function hashString(string) {
    let hash = 0;

    for (
        let index = 0;
        index < string.length;
        index++
    ) {
        hash =
            (
                (
                    hash << 5
                ) -
                hash +
                string.charCodeAt(index)
            ) |
            0;
    }

    return hash;
}

function structuredCloneSafe(value) {
    if (
        typeof structuredClone ===
        "function"
    ) {
        return structuredClone(value);
    }

    return JSON.parse(
        JSON.stringify(value)
    );
}


/* =========================================================
   GLOBAL ERROR HANDLING
========================================================= */

window.addEventListener(
    "error",
    event => {
        console.error(
            "WHO IS LYING? Error:",
            event.error || event.message
        );
    }
);

window.addEventListener(
    "unhandledrejection",
    event => {
        console.error(
            "Unhandled promise rejection:",
            event.reason
        );
    }
);


/* =========================================================
   EXPOSE APP FOR OTHER MODULES
========================================================= */

window.WhoIsLying = {
    APP,

    startCase,
    startNewCase,
    startDailyCase,

    showScreen,

    investigateStatement,
    discoverClue,
    collectEvidence,

    performSearch,

    addNote,

    startMiniGame,

    makeAccusation,

    getPlayerStats,
    savePlayerStats,
    addXP,

    showToast,
    openModal,
    closeModal,

    saveInvestigation,
    restoreInvestigation,

    getSavedInvestigation,

    isDailyCompleted,

    escapeHTML
};