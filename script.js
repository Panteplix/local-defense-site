const joinBtn = document.getElementById("joinBtn");
const wowQuotePopup = document.getElementById("wowQuotePopup");
const wowQuoteText = document.getElementById("wowQuoteText");
const wowQuoteSpeaker = document.getElementById("wowQuoteSpeaker");
const closeQuotePopup = document.getElementById("closeQuotePopup");

const wowQuotes = [
  { text: "More work?", speaker: "Random Peon" },
  { text: "Work work.", speaker: "Random Peon" },
  { text: "Zug zug.", speaker: "Random Orc" },
  { text: "Me not that kind of orc!", speaker: "Peon" },
  { text: "Jobs done!", speaker: "Human Peasant" },
  { text: "Ready to work!", speaker: "Human Peasant" },
  { text: "You require my assistance?", speaker: "Human Footman" },
  { text: "I have been chosen, by the big metal hand in the sky!", speaker: "Mimiron" },
  { text: "Time is money, friend.", speaker: "Goblin" },
  { text: "Keep your feet on the ground.", speaker: "Tauren" },
  { text: "An illusion! What are you hiding?", speaker: "Kil'jaeden" },
  { text: "Too soon! You have awakened me too soon, Executus!", speaker: "Ragnaros" },
  { text: "You are not prepared!", speaker: "Illidan Stormrage" },
  { text: "For the Lich King!", speaker: "The Scourge" },
  { text: "I return! A second chance to carve your skull!", speaker: "Ingvar the Plunderer" },
  { text: "Let them come. Frostmourne hungers.", speaker: "The Lich King" },
  { text: "There must always be a Lich King.", speaker: "Bolvar Fordragon" },
  { text: "The light will abandon you.", speaker: "Yogg-Saron" },
  { text: "Your fate is sealed.", speaker: "Yogg-Saron" },
  { text: "I am the lucid dream, the monster in your nightmares.", speaker: "Yogg-Saron" },
  { text: "Bow down before the god of death!", speaker: "Yogg-Saron" },
  { text: "No king rules forever, my son.", speaker: "Terenas Menethil II" },
  { text: "Champions, attack!", speaker: "Highlord Tirion Fordring" },
  { text: "BY FIRE BE PURGED!", speaker: "High Priest Rohan / Scarlet-style line" },
  { text: "Run away, little girl! Run away!", speaker: "Big Bad Wolf" },
  { text: "Ah, I've been waiting for a real challenge!", speaker: "Heigan the Unclean / arena-style energy" },
  { text: "We will crush you!", speaker: "Kologarn" },
  { text: "I am a god!", speaker: "Arthas Menethil" },
  { text: "Taste the chill of true death.", speaker: "The Lich King" },
  { text: "Ulduar is coming. Repent your sins.", speaker: "Titan Warning Board" },
  { text: "Do not stand in the fire.", speaker: "Every Raid Leader Ever" },
  { text: "A prepared raider is a living raider.", speaker: "Guild Wisdom" },
  { text: "Your parses will be judged.", speaker: "The Titans" }
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * wowQuotes.length);
  return wowQuotes[randomIndex];
}

function showRandomQuote() {
  if (!wowQuotePopup || !wowQuoteText || !wowQuoteSpeaker) return;

  const quote = getRandomQuote();
  wowQuoteText.textContent = `"${quote.text}"`;
  wowQuoteSpeaker.textContent = `- ${quote.speaker}`;
  wowQuotePopup.classList.remove("hidden");
}

if (closeQuotePopup) {
  closeQuotePopup.addEventListener("click", function () {
    wowQuotePopup.classList.add("hidden");
  });
}

if (joinBtn) {
  joinBtn.addEventListener("click", function () {
    alert("Recruitment system coming soon for Local Defense!");
  });
}

showRandomQuote();

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");

// Prevent greeting loop with a flag
let greetingUpdated = false;

// Update initial greeting ONCE on page load
window.addEventListener("DOMContentLoaded", function () {
  if (chatMessages && !greetingUpdated) {
    const firstMessage = chatMessages.querySelector(".bot-message");
    if (firstMessage && firstMessage.textContent.includes("Guild Chancellor: Greetings")) {
      firstMessage.innerHTML = `<strong>Guild Chancellor:</strong> Greetings, champion. I am the Guild Chancellor of Local Defense. I offer guidance for Azeroth through the Wrath of the Lich King era, with awareness of Warmane Onyxia. Know this: I am still in beta, and my counsel is not infallible. Verify important details before acting. Ask me about raids, classes, specs, consumables, gear, leveling, or our guild systems.`;
      greetingUpdated = true;
    }
  }
});

function addChatMessage(text, sender) {
  if (!chatMessages) return;

  const message = document.createElement("div");
  message.classList.add("chat-message");
  message.classList.add(sender === "bot" ? "bot-message" : "user-message");

  const speaker = sender === "bot" ? "Guild Chancellor" : "You";
  message.innerHTML = `<strong>${speaker}:</strong> ${text}`;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Comprehensive Knowledge Base for Guild Chancellor
const knowledge = {
  classes: {
    warrior: "Warriors are the ultimate tanks and melee heavyweights. Protection (tank) uses shield and armor for survival. Fury (DPS) dual-wields for massive damage. Arms (DPS) uses 2-handers and provides Mortal Strike debuff. Stack strength and stamina.",
    
    paladin: "Paladins are holy knights balancing offense and defense. Holy (healer) uses auras and beacons for group healing. Protection (tank) combines shield and aura buffs for survivability. Retribution (DPS) crusades with melee strikes. Stack spellpower for healers, strength for melee.",
    
    hunter: "Hunters are ranged damage dealers with pet companions. Beast Mastery empowers your pet's damage. Marksmanship focuses on heavy hitting shots. Survival offers crowd control and traps. Keep your pet happy with food and maintain aggro management.",
    
    rogue: "Rogues are assassination specialists with high burst and stealth. Combat builds consistent DPS through fast attacks. Assassination stacks poisons for DoT damage. Subtlety offers stealth and crowd control. Stack agility and avoid standing in front of bosses.",
    
    priest: "Priests balance healing and damage. Holy (healer) uses shields and prayer spells. Discipline (healer/DPS hybrid) emphasizes absorption shields. Shadow (DPS) burns with mind control and void magic. Spellpower and spirit are essential for both roles.",
    
    deathknight: "Death Knights are former enemies now fighting for the Horde. Blood spec tanks through self-healing. Frost spec DPS with crowd control and runic power. Unholy summons undead pets and spreads disease. Strength and armor are core.",
    
    shaman: "Shamans commune with the elements. Restoration (healer) chains healing and uses nature's blessing. Enhancement (melee DPS) wields dual-wields and weapon buffs. Elemental (ranged DPS) casts fire and lightning. Totems provide group buffs—place them strategically.",
    
    mage: "Mages are versatile spellcasters. Arcane builds stacking spellpower for consistent damage. Fire focuses on burst and AoE damage. Frost provides crowd control and water elemental pets. Stack spellpower, crit, and haste.",
    
    warlock: "Warlocks summon demons and cast curses. Affliction (DoT DPS) stacks multiple damage-over-time spells. Demonology (pet DPS) empowers your demon companion. Destruction (burst DPS) casts massive instant spells. Use soulstones and manage threat carefully.",
    
    druid: "Druids shapeshift and adapt. Balance (ranged DPS) attacks with moonfire and starfire. Feral (tank/melee DPS) shifts to cat or bear form. Restoration (healer) heals through hot spells and rejuvenation. Learn when to shift for different situations."
  },
  
  specs: {
    tank: "Tanks mitigate group damage and maintain threat. Key stats: armor, stamina, and threat generation. Practice positioning the boss and managing adds. Hold your ground and protect your allies.",
    
    healer: "Healers keep your group alive. Key stats: spellpower, spirit (for mana regen), and haste. Know your cooldowns and position safely away from melee. Manage mana carefully on long fights.",
    
    dps: "Damage dealers burn enemies. Key stats: primary stat (strength/agility/spellpower), hit cap (262), then crit and haste. Maximize your uptime and avoid mechanics that take you out of the fight.",
    
    melee: "Melee DPS stands close to enemies. Watch for AoE mechanics and move appropriately. Keep threat low relative to tank. Position behind or to the side of the boss.",
    
    ranged: "Ranged DPS attacks from distance. Maintain maximum uptime—don't move unless avoiding mechanics. Watch for range requirements and stay positioned carefully. Don't stand in fire or cleaves.",
    
    affliction: "Affliction warlocks stack damage-over-time spells. Corruption, Immolate, and Unstable Affliction are core. Let DoTs tick and maintain high uptime for massive sustained damage.",
    
    assassination: "Assassination rogues poison their weapons. Deadly Poison and Instant Poison stack for burst. Combo points build your critical strikes. Position behind targets for backstab bonuses.",
    
    fury: "Fury warriors dual-wield massive weapons. Bloodthirst heals you while dealing damage. Whirlwind hits all nearby enemies. Keep both weapon slots filled and manage rage carefully.",
    
    marksmanship: "Marksmanship hunters focus on heavy single-target shots. Multi-shot is your AoE. Keep distance and maintain focus fire on priority targets.",
    
    destruction: "Destruction warlocks cast massive single spells. Shadowbolt, Conflagrate, and Chaos Bolt are core. Manage threat carefully as destruction builds threat quickly."
  },

  raids: {
    naxxramas: "Naxxramas is the gateway raid. Arachnid Quarter, Plague Quarter, Military Quarter, and Construct Quarter. Each wing teaches mechanics. Loot is T7 gear. Smooth farming starts here.",
    
    obsidian: "Obsidian Sanctum is a single-room raid with Sartharion Drake boss. One-drake is easy, three-drake is challenging, four-drake is hardcore. Great for alt gearing and learning mechanics quickly.",
    
    eye: "Eye of Eternity features Malygos, the Spell-Weaver. Intense DPS race with three phases. Phase 3 teleports you to ride dragons. Requires solid DPS and positioning discipline. Loot is T7 and magical weapons.",
    
    ulduar: "Ulduar is the premier raid dungeon with Titan lore. Multiple bosses, hard modes unlock for each. Flame Leviathan is a vehicular boss famous for crashing. Progression raid for serious guilds.",
    
    trial: "Trial of the Crusader cycles through boss encounters. Fast-paced with rotating faction bosses. Anub'arak is the final trial. Teaches you to adapt to changing boss mechanics.",
    
    icc: "Icecrown Citadel is the final battle against the Lich King. 12 bosses climbing the Frozen Throne. The Lich King encounter is epic and demanding. Loot is T10 legendary-tier gear.",
    
    ruby: "Ruby Sanctum is an accessible optional raid with one main boss, Zarithian the dream dragon. No joke in difficulty. Offers T10 alternatives. Worthwhile loot and bragging rights.",
    
    sarth: "Sartharion in Obsidian Sanctum offers drake loot. Dragons around him add difficulty. Can be solo-tanked on low drakes. Great for testing new gear setups.",
    
    malygos: "Malygos is the final boss of Eye of Eternity. Spell-damage intensive. Phase 3 requires perfect dragon positioning. Practice positioning and raid awareness here.",
    
    anub: "Anub'arak is the final boss of Trial. Swarms you with adds. Chill mechanic damages through armor. Tests your group's ability to handle adds and timing mechanics."
  },

  consumables: {
    flask: "Flasks are mandatory for raids. Battle Flask of the Eternal (+80 attack power), Eternal Power (+67 spellpower), Flask of Endless Rage, and Flask of the Frost Wyrm. Stack with food buffs.",
    
    food: "Food buffs stack with flasks and provide different benefits. Roasted Worg, Spiced Worm Burger (+90 damage), or specific role buffs. Always bring stacks and eat before pulls.",
    
    potion: "Potions provide burst in specific moments. Eternal Fire Potions boost damage on pull. Eternal Power for healers during crunch. Keep emergency healing potions for survivability.",
    
    buff: "Combat buffs include Stamina scrolls, Armor scrolls, and spell damage scrolls. Warlocks provide Soul Well and soulstones. Use temporary buffs before major encounters.",
    
    rune: "Runecloth rune provides temporary armor. Eternal armor potions add survivability. Use before heavy AoE or tank damage spikes.",
    
    scroll: "Scrolls provide temporary stat buffs. Strength scrolls boost melee damage. Intellect scrolls beef up mana pools. Use before pulls to maximize performance.",
    
    haste: "Haste potions and buff spells improve attack speed and casting speed. Useful for burst phases and tight DPS checks. Alchemists can create permanent potions.",
    
    hit: "Hit rating potions boost hit chance. Important when gearing new characters to cap hit rating at 262 for raids.",
    
    crit: "Crit potions increase critical strike chance. Useful for burst phases and when you already have hit capped."
  },

  gear: {
    prebis: "Pre-raid BiS (best-in-slot) gear comes entirely from heroic dungeons and reputation vendors. The Heroic Halls of Stone and Stone Vault offer excellent starter items. Farm heroics before attempting raids.",
    
    bis: "Raid BiS is your ultimate goal for each tier. Naxx BiS differs from Ulduar BiS. Track upgrades carefully and prioritize high-impact pieces. Each tier offers better stats than the last.",
    
    enchant: "Enchants are mandatory upgrades. Main-hand weapon gets high-tier enchants. Armor pieces get stat boosts. Cloak enchants provide damage or survivability. Don't skip enchants—they stack multiplicitly.",
    
    gem: "Gems are customizable stat boosts inserted into socket colors. Red sockets take damage gems. Blue sockets take mana gems. Yellow sockets take hit gems. Meta gems exist in headgear—follow their requirements.",
    
    chant: "Profession enchants are permanent bonuses. Bracers enchant provides +healing or damage. Glove enchants provide haste or crit. Shoulder enchants from inscribers provide large boosts.",
    
    rep: "Reputation gear unlocks as you gain standing. Argent Crusade offers tier alternatives. Quartermaster vendors provide non-raid upgrades. Grind reputation for exclusive items.",
    
    set: "Set gear provides bonuses when you equip multiple pieces. 2-piece bonuses are minor. 4-piece bonuses are powerful. Balance set bonuses with upgrade priorities.",
    
    transmog: "Transmogrification (on some servers) lets you change gear appearance. Not available on all realms. Check with guild leadership if this feature is available."
  },

  topics: {
    warmane: "Warmane Onyxia is a Wrath progression server with custom tuning. Bosses may hit harder or have different mechanics than retail. Always verify current nerfs, buffs, and changes on forums.",
    
    lordaeron: "Lordaeron is Warmane's PvP realm with constant faction battles. Expect camping at raids and dungeons. Organize escorts and guild protection. Check server rules for griefing limits.",
    
    leveling: "Level 1-58 in Azeroth (old world), 58-68 in Outland (Burning Crusade), then 68-80 in Northrend (Wrath). Mix questing with dungeons for fast XP. At 80, run heroics for raid prep gear.",
    
    zone: "Northrend zones: Howling Fjord and Borean Tundra (easy), Grizzly Hills and Zul'Drak (mid), Sholazar Basin and Storm Peaks (hard), Icecrown and Wintergrasp (endgame PvP).",
    
    pvp: "PvP requires resilience early (reduces critical damage taken). Transition to PvE gear once you have enough resilience. Practice crowd control combos and map awareness. Battlegrounds teach positioning.",
    
    professions: "Choose two complementary professions. Herbalism + Alchemy = potions and flasks. Mining + Blacksmithing = armor and weapons. Inscription provides buffs. Enchanting disenchants gear. All are profitable.",
    
    alchemy: "Alchemy creates flasks, potions, and elixirs. Permanent buffs that stack. High demand in guilds. Requires herbs. Transmutes offer daily valuable items for gold profit.",
    
    herbalism: "Herbalism gathers plants for alchemy and enchanting. Northeast Dragonblight and Sholazar Basin are prime spots. Sell herbs on auction house or process yourself for better profit.",
    
    mining: "Mining gathers ore for blacksmithing and engineering. Sholazar Basin and Storm Peaks have dense ore concentrations. Sell ore or smelt into bars for higher profit margin.",
    
    engineering: "Engineering creates guns, dynamite, and trinkets. Removes fall damage. Creates useful temporary items. High specialization choices—pick one path.",
    
    enchanting: "Enchanting adds permanent bonuses to gear. Disenchants unwanted gear for materials. Requires dust and essence. Sells for high gold values on auction house.",
    
    tailoring: "Tailoring creates cloth armor and bags. Bags are always in demand. Produces tier gear competition. Cloth demand peaks at expansion start.",
    
    leatherworking: "Leatherworking creates leather and mail armor. Drums buff raid groups. Leg armor adds significant leg stats. Scales with leather gathering."
  },

  guildhelp: {
    signup: "Visit the Raids page to signup for guild raids. Enter your character name, class, spec, and preferred role. Select raid dates you can attend. Show up 5-10 minutes early.",
    
    raids: "The Raids page shows all scheduled guild raids with real-time signups. You can view role breakdowns (tanks needed, healers required, DPS slots). Cancel signups if plans change.",
    
    login: "Log in on the Login page using Discord OAuth (recommended) or traditional username/password. Verify your account gets proper guild rank. Report login issues to officers.",
    
    apply: "Apply to Local Defense on the Apply page. Tell us your playtime, raiding experience, and why you want to join. Applications are reviewed by officers. Be respectful and detailed.",
    
    members: "The Members page lists all active guild members with ranks and roles. See who's online, who leads raids, and who crafts items. Connect with members for social activities.",
    
    officer: "Officers handle raid organization, discipline, and recruitment. Contact them with issues, suggestions, or recruitment recommendations. They set raid schedules and manage guild events.",
    
    loot: "Loot rules are determined per raid. Master Looter distributes based on need/greed/disenchant. Priority often goes to fill roles, then raid attendance. Ask before rolling.",
    
    discord: "Join the guild Discord for real-time communication. Voice channels for raids, text channels for strategies. Notifications keep you informed of events and announcements.",
    
    bank: "Guild bank stores crafting materials, enchants, and repair supplies. High-rank members can withdraw freely. Lower ranks may have restrictions. Ask officers for access.",
    
    event: "Guild events include weekly raid nights, PvP nights, and social gatherings. Check the calendar for upcoming events. RSVPs help with planning and organization.",
    
    rules: "Guild rules enforce respectful behavior. No racial slurs, no drama, no ninja looting. Follow master looter decisions. Respect is mandatory. Breaking rules results in warnings or removal."
  },

  strategies: {
    threat: "Threat management keeps you alive. Tanks generate threat; DPS stays below. Use threat meters (Omen addon). Wait for tank to establish threat before attacking. Let aggro settle.",
    
    mechanics: "Boss mechanics require adaptation. Read abilities before fights. Announce important mechanics to the raid. Position accordingly and execute mechanics perfectly.",
    
    burst: "Burst DPS wins on DPS checks. Wait for tank threat ceiling, then unleash cooldowns. Pop potions on certain phases. Chain cooldowns for maximum damage windows.",
    
    sustain: "Sustained damage wins long fights. Manage mana and resource generation. Maintain consistent rotation. Don't overspend resources early—conserve for fight duration.",
    
    positioning: "Positioning prevents unnecessary damage. Melee stays behind boss. Ranged spreads to avoid AoE overlap. Healers position for line-of-sight safety. Move smoothly into position.",
    
    kiting: "Kiting keeps you alive while dealing damage. Move while attacking ranged enemies. Use slows and stuns to prevent closing distance. Practice kiting in dungeons first.",
    
    cc: "Crowd control keeps adds manageable. Trap, stun, or slow dangerous enemies. Coordinate CC with your group. Don't break CC prematurely. Communicate targets."
  }
};

function matchKeywords(text, category) {
  const keywords = Object.keys(knowledge[category]);
  for (let keyword of keywords) {
    if (text.includes(keyword)) {
      return knowledge[category][keyword];
    }
  }
  return null;
}

function getBotReply(userText) {
  const text = userText.toLowerCase().trim();

  // Greetings
  if (text.match(/^(hi|hello|hey|greetings|sup|yo|wassup)(\s|$)/)) {
    return "Greetings, adventurer. How may I serve Local Defense today?";
  }

  // Classes - most specific first
  const classMatch = matchKeywords(text, "classes");
  if (classMatch) return classMatch;

  // Specs and roles
  const specMatch = matchKeywords(text, "specs");
  if (specMatch) return specMatch;

  // Raids
  const raidMatch = matchKeywords(text, "raids");
  if (raidMatch) return raidMatch;

  // Consumables
  const consumMatch = matchKeywords(text, "consumables");
  if (consumMatch) return consumMatch;

  // Gear
  const gearMatch = matchKeywords(text, "gear");
  if (gearMatch) return gearMatch;

  // Topics (professions, leveling, PvP)
  const topicMatch = matchKeywords(text, "topics");
  if (topicMatch) return topicMatch;

  // Guild help
  const guildMatch = matchKeywords(text, "guildhelp");
  if (guildMatch) return guildMatch;

  // Strategies
  const stratMatch = matchKeywords(text, "strategies");
  if (stratMatch) return stratMatch;

  // Multi-word phrases
  if (text.includes("sign up") || text.includes("signup") || text.includes("raid sign")) {
    return "Visit the Raids page to sign up for upcoming guild raids. Enter your character, spec, and preferred role. Show up 5-10 minutes early for raid start.";
  }

  if (text.includes("what can you") || text.includes("what do you") || text.includes("help me")) {
    return "I guide you on Wrath of the Lich King content: all 10 classes, raid strategies, consumables, gear progression, professions, leveling zones, PvP, guild systems, and more. Ask about specific topics and I will elaborate!";
  }

  if (text.includes("thank") || text.includes("thanks") || text.includes("appreciate") || text.includes("awesome")) {
    return "May your adventures be legendary, champion. Remember to bring flasks!";
  }

  if (text.includes("how do i") || text.includes("how to")) {
    return "Ask me specifics and I'll guide you. Whether it's leveling a class, gearing up, raiding strategy, or guild features—I have answers for champions of Local Defense.";
  }

  // Fallback intelligent response
  return "My knowledge spans Wrath of the Lich King, all 10 classes with specs, every major raid, consumables, gear progression, professions, leveling zones, PvP tactics, and Local Defense guild systems. Ask me about a specific class, raid, zone, profession, or mechanic, and I will provide detailed guidance, champion.";
}

function handleChatSend() {
  if (!chatInput || !chatMessages) return;

  const userText = chatInput.value.trim();
  if (!userText) return;

  addChatMessage(userText, "user");
  chatInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(userText);
    addChatMessage(reply, "bot");
  }, 400);
}

if (sendChatBtn) {
  sendChatBtn.addEventListener("click", handleChatSend);
}

if (chatInput) {
  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChatSend();
    }
  });
}

// Armory Lookup Functionality
function initArmoryLookup() {
  const searchBtn = document.getElementById("armorySearchBtn");
  const characterInput = document.getElementById("armoryCharacterName");
  const realmSelect = document.getElementById("armoryRealm");
  const resultsContainer = document.getElementById("armoryResults");

  if (!searchBtn) return;

  searchBtn.addEventListener("click", performArmorySearch);
  characterInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") performArmorySearch();
  });

  function performArmorySearch() {
    const characterName = characterInput.value.trim();
    const realm = realmSelect.value;

    resultsContainer.innerHTML = "";

    if (!characterName) {
      resultsContainer.innerHTML = '<div class="armory-error">Please enter a character name.</div>';
      return;
    }

    // Encode character name for URL (handle spaces and special chars)
    const encodedName = encodeURIComponent(characterName);
    
    // Capitalize realm name properly
    const realmCapitalized = realm.charAt(0).toUpperCase() + realm.slice(1);

    // Create armory links object with correct Warmane URL format
    const armoryLinks = {
      summary: `https://armory.warmane.com/character/${encodedName}/${realmCapitalized}/summary`,
      talents: `https://armory.warmane.com/character/${encodedName}/${realmCapitalized}/talents`,
      statistics: `https://armory.warmane.com/character/${encodedName}/${realmCapitalized}/statistics`,
      reputation: `https://armory.warmane.com/character/${encodedName}/${realmCapitalized}/reputation`
    };

    // Build result HTML
    const resultHTML = `
      <div class="armory-result-card">
        <div class="armory-character-name">${characterName}</div>
        <div class="armory-character-realm">${realm.charAt(0).toUpperCase() + realm.slice(1)} Server</div>
        <div class="armory-links-label">Select An Option:</div>
        <div class="armory-link-grid">
          <div class="armory-link-card">
            <a href="${armoryLinks.summary}" target="_blank" rel="noopener noreferrer">Summary</a>
          </div>
          <div class="armory-link-card">
            <a href="${armoryLinks.talents}" target="_blank" rel="noopener noreferrer">Talents & Skills</a>
          </div>
          <div class="armory-link-card">
            <a href="${armoryLinks.statistics}" target="_blank" rel="noopener noreferrer">Statistics</a>
          </div>
          <div class="armory-link-card">
            <a href="${armoryLinks.reputation}" target="_blank" rel="noopener noreferrer">Reputation</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 0.85em; color: #a0b8d8; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);">
          Warmane Armory access is provided through official character pages. Verify current server data directly on Warmane.
        </div>
      </div>
    `;

    resultsContainer.innerHTML = resultHTML;
  }
}

// Initialize armory when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initArmoryLookup();
});

// ========================================
// GUILD ACCOUNT SYSTEM (localStorage-based)
// ========================================

// Initialize users in localStorage if not exists
function initGuildStorage() {
  if (!localStorage.getItem("guildUsers")) {
    // Initialize with default admin user
    const defaultUsers = [
      { username: "admin", password: "admin123", role: "Admin" }
    ];
    localStorage.setItem("guildUsers", JSON.stringify(defaultUsers));
  }
}

// Get all users from localStorage
function getAllUsers() {
  const users = localStorage.getItem("guildUsers");
  return users ? JSON.parse(users) : [];
}

// Check if user exists
function userExists(username) {
  const users = getAllUsers();
  return users.some(u => u.username.toLowerCase() === username.toLowerCase());
}

// Add new user
function addUser(username, password, role) {
  const users = getAllUsers();
  users.push({ username, password, role });
  localStorage.setItem("guildUsers", JSON.stringify(users));
}

// Verify user credentials
function verifyCredentials(username, password) {
  const users = getAllUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (user && user.password === password) {
    return user;
  }
  return null;
}

// Login user
function loginUser(username, password) {
  const user = verifyCredentials(username, password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }
  return false;
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// Logout user
function logoutUser() {
  localStorage.removeItem("currentUser");
}

// Update UI based on login state
function updateLoginUI() {
  const guestPanel = document.getElementById("guestPanel");
  const loggedInPanel = document.getElementById("loggedInPanel");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const roleMessage = document.getElementById("roleMessage");
  const optionsMenu = document.getElementById("optionsMenu");
  const rolePanel = document.getElementById("rolePanel");

  const currentUser = getCurrentUser();

  if (currentUser) {
    // User is logged in - show dashboard
    if (guestPanel) guestPanel.style.display = "none";
    if (loggedInPanel) loggedInPanel.style.display = "block";
    
    if (welcomeMessage) welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
    if (roleMessage) roleMessage.textContent = `Role: ${currentUser.role}`;

    // Populate options menu based on role
    populateOptionsMenu(currentUser.role, optionsMenu);

    // Populate role-specific panel
    populateRolePanel(currentUser.role, rolePanel);
  } else {
    // User is logged out - show guest forms
    if (guestPanel) guestPanel.style.display = "block";
    if (loggedInPanel) loggedInPanel.style.display = "none";
  }
}

// Populate options menu with role-aware links
function populateOptionsMenu(role, container) {
  if (!container) return;

  const optionsHTML = `
    <a href="raids.html" class="option-card">
      <i class="fas fa-sword"></i>
      <span>Raid Sign Ups</span>
    </a>
    <a href="armory.html" class="option-card">
      <i class="fas fa-search"></i>
      <span>Armory</span>
    </a>
    <a href="builds.html" class="option-card">
      <i class="fas fa-book"></i>
      <span>Guides</span>
    </a>
    <a href="index.html" class="option-card">
      <i class="fas fa-home"></i>
      <span>Home</span>
    </a>
  `;

  container.innerHTML = optionsHTML;
}

// Populate role-specific panel with admin/officer tools
function populateRolePanel(role, container) {
  if (!container) return;

  if (role === "Admin") {
    container.innerHTML = `
      <div class="admin-section">
        <strong style="color: #f5d77a;">⚔ Admin Panel</strong>
        <p>Full website control, user management, and guild settings are available through the admin interface.</p>
        <p style="color: #67b7ff; font-size: 0.85em; margin-top: 12px;">Coming soon: Admin dashboard</p>
      </div>
    `;
  } else if (role === "Officer") {
    container.innerHTML = `
      <div class="officer-section">
        <strong style="color: #f5d77a;">◆ Officer Tools</strong>
        <p>Raid management, roster review, and member coordination features are available to you.</p>
        <p style="color: #67b7ff; font-size: 0.85em; margin-top: 12px;">Coming soon: Officer dashboard</p>
      </div>
    `;
  } else {
    container.innerHTML = "";
  }
}

// Handle login form submission
function handleLogin(e) {
  if (e) e.preventDefault();

  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const loginMessage = document.getElementById("loginMessage");

  if (!username || !password) {
    if (loginMessage) loginMessage.textContent = "Please enter username and password.";
    if (loginMessage) loginMessage.style.color = "#ff6b6b";
    return;
  }

  if (loginUser(username, password)) {
    const user = getCurrentUser();
    if (loginMessage) loginMessage.textContent = `Success! Logged in as ${username} (${user.role})`;
    if (loginMessage) loginMessage.style.color = "#51cf66";
    
    // Clear form
    if (document.getElementById("username")) document.getElementById("username").value = "";
    if (document.getElementById("password")) document.getElementById("password").value = "";
    
    // Clear register message
    const registerMessage = document.getElementById("registerMessage");
    if (registerMessage) registerMessage.textContent = "";
    
    // Update UI
    setTimeout(() => updateLoginUI(), 500);
  } else {
    if (loginMessage) loginMessage.textContent = "Invalid username or password.";
    if (loginMessage) loginMessage.style.color = "#ff6b6b";
  }
}

// Handle register form submission
function handleRegister() {
  const username = document.getElementById("registerUsername")?.value.trim();
  const password = document.getElementById("registerPassword")?.value.trim();
  const registerMessage = document.getElementById("registerMessage");

  if (!username || !password) {
    if (registerMessage) registerMessage.textContent = "Please fill in all fields.";
    if (registerMessage) registerMessage.style.color = "#ff6b6b";
    return;
  }

  if (username.length < 3) {
    if (registerMessage) registerMessage.textContent = "Username must be at least 3 characters.";
    if (registerMessage) registerMessage.style.color = "#ff6b6b";
    return;
  }

  if (password.length < 4) {
    if (registerMessage) registerMessage.textContent = "Password must be at least 4 characters.";
    if (registerMessage) registerMessage.style.color = "#ff6b6b";
    return;
  }

  if (userExists(username)) {
    if (registerMessage) registerMessage.textContent = "This username is already taken.";
    if (registerMessage) registerMessage.style.color = "#ff6b6b";
    return;
  }

  // Always assign "Member" role to new users - no role selection allowed
  const role = "Member";
  addUser(username, password, role);
  
  if (registerMessage) registerMessage.textContent = `Success! Account "${username}" created as Member. You can now login.`;
  if (registerMessage) registerMessage.style.color = "#51cf66";

  // Clear form
  if (document.getElementById("registerUsername")) document.getElementById("registerUsername").value = "";
  if (document.getElementById("registerPassword")) document.getElementById("registerPassword").value = "";
}

// Handle logout
function handleLogout() {
  logoutUser();
  
  // Clear all messages
  const loginMessage = document.getElementById("loginMessage");
  const registerMessage = document.getElementById("registerMessage");
  
  if (loginMessage) loginMessage.textContent = "";
  if (registerMessage) registerMessage.textContent = "";
  
  // Clear forms
  if (document.getElementById("username")) document.getElementById("username").value = "";
  if (document.getElementById("password")) document.getElementById("password").value = "";
  if (document.getElementById("registerUsername")) document.getElementById("registerUsername").value = "";
  if (document.getElementById("registerPassword")) document.getElementById("registerPassword").value = "";
  
  updateLoginUI();
}

// Initialize login/register system
function initLoginSystem() {
  initGuildStorage();
  
  // Login form handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Register button handler
  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", handleRegister);
  }

  // Logout button handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Update UI on page load
  updateLoginUI();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initLoginSystem();
});