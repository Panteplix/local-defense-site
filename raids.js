const raidSignupForm = document.getElementById("raidSignupForm");
const signupList = document.getElementById("signupList");
const characterClassSelect = document.getElementById("characterClass");
const characterSpecSelect = document.getElementById("characterSpec");
const specPreview = document.getElementById("specPreview");
const characterRoleSelect = document.getElementById("characterRole");
const raidNameSelect = document.getElementById("raidName");
const raidFilterSelect = document.getElementById("raidFilter");

const tankCount = document.getElementById("tankCount");
const healerCount = document.getElementById("healerCount");
const meleeCount = document.getElementById("meleeCount");
const rangedCount = document.getElementById("rangedCount");
const totalCount = document.getElementById("totalCount");

const STORAGE_KEY = "localDefenseRaidSignups";

const classSpecs = {
  Warrior: [
    { name: "Arms", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_savageblow.jpg" },
    { name: "Fury", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_innerrage.jpg" },
    { name: "Protection", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_defensivestance.jpg" }
  ],
  Paladin: [
    { name: "Holy", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_holybolt.jpg" },
    { name: "Protection", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_devotionaura.jpg" },
    { name: "Retribution", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_auraoflight.jpg" }
  ],
  Hunter: [
    { name: "Beast Mastery", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_bestialdiscipline.jpg" },
    { name: "Marksmanship", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_marksmanship.jpg" },
    { name: "Survival", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_camouflage.jpg" }
  ],
  Rogue: [
    { name: "Assassination", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_deadlybrew.jpg" },
    { name: "Combat", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_backstab.jpg" },
    { name: "Subtlety", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_stealth.jpg" }
  ],
  Priest: [
    { name: "Discipline", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_powerwordshield.jpg" },
    { name: "Holy", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_guardianspirit.jpg" },
    { name: "Shadow", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_shadowwordpain.jpg" }
  ],
  "Death Knight": [
    { name: "Blood", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_bloodpresence.jpg" },
    { name: "Frost", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_frostpresence.jpg" },
    { name: "Unholy", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_unholypresence.jpg" }
  ],
  Shaman: [
    { name: "Elemental", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightning.jpg" },
    { name: "Enhancement", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shaman_improvedstormstrike.jpg" },
    { name: "Restoration", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_magicimmunity.jpg" }
  ],
  Mage: [
    { name: "Arcane", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_magicalsentry.jpg" },
    { name: "Fire", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_fire_firebolt02.jpg" },
    { name: "Frost", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_frost_frostbolt02.jpg" }
  ],
  Warlock: [
    { name: "Affliction", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_deathcoil.jpg" },
    { name: "Demonology", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_metamorphosis.jpg" },
    { name: "Destruction", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_rainoffire.jpg" }
  ],
  Druid: [
    { name: "Balance", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_starfall.jpg" },
    { name: "Feral", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_druid_ferociousbite.jpg" },
    { name: "Restoration", icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_healingtouch.jpg" }
  ]
};

const classColors = {
  Warrior: "#C79C6E",
  Paladin: "#F58CBA",
  Hunter: "#ABD473",
  Rogue: "#FFF569",
  Priest: "#FFFFFF",
  "Death Knight": "#C41F3B",
  Shaman: "#0070DE",
  Mage: "#69CCF0",
  Warlock: "#9482C9",
  Druid: "#FF7D0A"
};

const specRoles = {
  "Arms": ["Melee DPS"],
  "Fury": ["Melee DPS"],
  "Protection": ["Tank"],
  "Holy": ["Healer"],
  "Retribution": ["Melee DPS"],
  "Beast Mastery": ["Ranged DPS"],
  "Marksmanship": ["Ranged DPS"],
  "Survival": ["Ranged DPS"],
  "Assassination": ["Melee DPS"],
  "Combat": ["Melee DPS"],
  "Subtlety": ["Melee DPS"],
  "Discipline": ["Healer"],
  "Shadow": ["Ranged DPS"],
  "Blood": ["Tank"],
  "Frost": ["Melee DPS"],
  "Unholy": ["Melee DPS"],
  "Elemental": ["Ranged DPS"],
  "Enhancement": ["Melee DPS"],
  "Restoration": ["Healer"],
  "Arcane": ["Ranged DPS"],
  "Fire": ["Ranged DPS"],
  "Balance": ["Ranged DPS"],
  "Affliction": ["Ranged DPS"],
  "Demonology": ["Ranged DPS"],
  "Destruction": ["Ranged DPS"],
  "Feral": ["Tank", "Melee DPS"]
};

const defaultRoles = ["Tank", "Healer", "Melee DPS", "Ranged DPS"];

function populateRoleDropdown(roles) {
  characterRoleSelect.innerHTML = "";

  roles.forEach(function (role) {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = role;
    characterRoleSelect.appendChild(option);
  });

  if (roles.length === 1) {
    characterRoleSelect.value = roles[0];
  }
}

function getStoredSignups() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveStoredSignups(signups) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));
}

function updateRaidSummary() {
  const selectedRaid = raidFilterSelect.value;
  const signupCards = document.querySelectorAll(".signup-card");

  let tanks = 0;
  let healers = 0;
  let melee = 0;
  let ranged = 0;
  let total = 0;

  signupCards.forEach(function (card) {
    const cardRaid = card.dataset.raid;
    const roleText = card.dataset.role;

    if (cardRaid === selectedRaid && card.style.display !== "none") {
      total++;

      if (roleText === "Tank") {
        tanks++;
      } else if (roleText === "Healer") {
        healers++;
      } else if (roleText === "Melee DPS") {
        melee++;
      } else if (roleText === "Ranged DPS") {
        ranged++;
      }
    }
  });

  tankCount.textContent = tanks;
  healerCount.textContent = healers;
  meleeCount.textContent = melee;
  rangedCount.textContent = ranged;
  totalCount.textContent = total;
}

function updateVisibleCards() {
  const selectedRaid = raidFilterSelect.value;
  const signupCards = document.querySelectorAll(".signup-card");

  signupCards.forEach(function (card) {
    if (card.dataset.raid === selectedRaid) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function addEmptyMessageIfNeeded() {
  const signupCards = signupList.querySelectorAll(".signup-card");
  let emptyMessage = signupList.querySelector(".empty-message");

  if (signupCards.length === 0) {
    if (!emptyMessage) {
      emptyMessage = document.createElement("p");
      emptyMessage.classList.add("empty-message");
      emptyMessage.textContent = "No signups yet.";
      signupList.appendChild(emptyMessage);
    }
  } else if (emptyMessage) {
    emptyMessage.remove();
  }
}

function removeSignup(index) {
  const signups = getStoredSignups();
  signups.splice(index, 1);
  saveStoredSignups(signups);
  renderAllSignups();
}

function createSignupCard(signupData, index) {
  const { characterName, characterClass, characterSpec, characterRole, raidName } = signupData;

  const specList = classSpecs[characterClass] || [];
  const matchedSpec = specList.find(function (spec) {
    return spec.name === characterSpec;
  });
  const specIcon = matchedSpec ? matchedSpec.icon : "";

  const signupCard = document.createElement("div");
  signupCard.classList.add("signup-card");
  signupCard.dataset.role = characterRole;
  signupCard.dataset.raid = raidName;

  const classColor = classColors[characterClass] || "#3b82f6";
  signupCard.style.borderColor = classColor;
  signupCard.style.boxShadow = `0 0 10px ${classColor}`;

  signupCard.innerHTML = `
    <h3 style="color:${classColor}">${characterName}</h3>
    <p><strong>Class:</strong> ${characterClass}</p>
    <p class="signup-spec-line">
      <strong>Spec:</strong>
      <span class="signup-spec-display">
        ${specIcon ? `<img src="${specIcon}" alt="${characterSpec}" class="signup-spec-icon">` : ""}
        ${characterSpec}
      </span>
    </p>
    <p><strong>Role:</strong> ${characterRole}</p>
    <p><strong>Raid:</strong> ${raidName}</p>
    <button class="remove-signup-btn" data-index="${index}">Remove Signup</button>
  `;

  const removeBtn = signupCard.querySelector(".remove-signup-btn");
  removeBtn.addEventListener("click", function () {
    removeSignup(index);
  });

  signupList.appendChild(signupCard);
}

function renderAllSignups() {
  signupList.innerHTML = "";

  const signups = getStoredSignups();

  signups.forEach(function (signup, index) {
    createSignupCard(signup, index);
  });

  addEmptyMessageIfNeeded();
  updateVisibleCards();
  updateRaidSummary();
}

characterClassSelect.addEventListener("change", function () {
  const selectedClass = characterClassSelect.value;
  const specs = classSpecs[selectedClass] || [];

  characterSpecSelect.innerHTML = '<option value="">Select Spec</option>';
  specPreview.innerHTML = "";
  populateRoleDropdown(defaultRoles);

  specs.forEach(function (spec) {
    const option = document.createElement("option");
    option.value = spec.name;
    option.textContent = spec.name;
    option.dataset.icon = spec.icon;
    characterSpecSelect.appendChild(option);
  });
});

characterSpecSelect.addEventListener("change", function () {
  const selectedOption = characterSpecSelect.options[characterSpecSelect.selectedIndex];
  const iconPath = selectedOption.dataset.icon;

  if (iconPath) {
    specPreview.innerHTML = `
      <img src="${iconPath}" alt="${selectedOption.value}" class="spec-icon">
      <span>${selectedOption.value}</span>
    `;
  } else {
    specPreview.innerHTML = "";
  }

  const selectedSpec = characterSpecSelect.value;

  if (selectedSpec) {
    const roles = specRoles[selectedSpec] || defaultRoles;
    populateRoleDropdown(roles);
  } else {
    populateRoleDropdown(defaultRoles);
  }
});

raidFilterSelect.addEventListener("change", function () {
  updateVisibleCards();
  updateRaidSummary();
});

raidSignupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const characterName = document.getElementById("characterName").value.trim();
  const characterClass = characterClassSelect.value;
  const characterSpec = characterSpecSelect.value;
  const characterRole = characterRoleSelect.value;
  const raidName = raidNameSelect.value;

  if (!characterName || !characterClass || !characterSpec || !characterRole || !raidName) {
    alert("Please fill in all fields.");
    return;
  }

  const newSignup = {
    characterName,
    characterClass,
    characterSpec,
    characterRole,
    raidName
  };

  const existingSignups = getStoredSignups();
  existingSignups.push(newSignup);
  saveStoredSignups(existingSignups);

  raidFilterSelect.value = raidName;
  renderAllSignups();

  raidSignupForm.reset();
  characterSpecSelect.innerHTML = '<option value="">Select Spec</option>';
  specPreview.innerHTML = "";
  populateRoleDropdown(defaultRoles);
});

populateRoleDropdown(defaultRoles);
renderAllSignups();