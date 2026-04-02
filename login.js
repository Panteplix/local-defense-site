// ============================================================
// LOCAL DEFENSE - LOGIN SYSTEM (localStorage-based)
// ============================================================
// This is a frontend-only login system for the guild website beta.
// For production, this should be replaced with proper backend auth.

// Storage keys
const STORAGE_KEYS = {
  GUILD_USERS: "guildUsers",
  CURRENT_USER: "currentUser"
};

// ============================================================
// STORAGE INITIALIZATION
// ============================================================

// Initialize default users if localStorage is empty
function initGuildStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.GUILD_USERS)) {
    const defaultUsers = [
      { username: "admin", password: "1234", role: "Admin" },
      { username: "officer", password: "raidlead", role: "Officer" },
      { username: "member", password: "guild123", role: "Member" }
    ];
    localStorage.setItem(STORAGE_KEYS.GUILD_USERS, JSON.stringify(defaultUsers));
    console.log("[LOCAL DEFENSE AUTH] Guild storage initialized with 3 default users");
  }
}

// Get all users from storage
function getAllUsers() {
  const users = localStorage.getItem(STORAGE_KEYS.GUILD_USERS);
  return users ? JSON.parse(users) : [];
}

// Check if username exists
function userExists(username) {
  const users = getAllUsers();
  return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

// Add new user to storage (always as Member role)
function addUser(username, password) {
  const users = getAllUsers();
  users.push({
    username: username,
    password: password,
    role: "Member"
  });
  localStorage.setItem(STORAGE_KEYS.GUILD_USERS, JSON.stringify(users));
  console.log(`[LOCAL DEFENSE AUTH] New user registered: "${username}" (Member role)`);
}

// Verify credentials and return user if valid
function verifyCredentials(username, password) {
  const users = getAllUsers();
  return users.find(user => 
    user.username.toLowerCase() === username.toLowerCase() && 
    user.password === password
  );
}

// ============================================================
// LOGIN/LOGOUT MANAGEMENT
// ============================================================

// Login user - store to currentUser
function loginUser(username, password) {
  const user = verifyCredentials(username, password);
  if// Create a safe copy without exposing password in logs/storage
    const safeUser = { username: user.username, role: user.role };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    console.log(`[LOCAL DEFENSE AUTH] Login successful: "${username}" (${user.role})`);
    return true;
  }
  console.log(`[LOCAL DEFENSE AUTH] Login failed for username: "${username}"`); return true;
  }
  return false;STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
}

// Logout user - remove from storage
function logoutUser() {
  const user = getCurrentUser();
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  if (user) {
    console.log(`[LOCAL DEFENSE AUTH] Logout: "${user.username}"`);
  }
}

// Logout user - remove from storage
function logoutUser() {
  localStorage.removeItem("currentUser");
}

// ============================================================
// UI STATE MANAGEMENT
// ============================================================

// Update UI based on login state
function updateLoginUI() {
  const guestPanel = document.getElementById("guestPanel");
  const loggedInPanel = document.getElementById("loggedInPanel");
  const currentUser = getCurrentUser();

  if (currentUser) {
    // User is logged in - show dashboard
    if (guestPanel) guestPanel.style.display = "none";
    if (loggedInPanel) loggedInPanel.style.display = "block";

    const welcomeMessage = document.getElementById("welcomeMessage");
    const roleMessage = document.getElementById("roleMessage");
    
    if (welcomeMessage) welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
    if (roleMessage) roleMessage.textContent = `Role: ${currentUser.role}`;

    // Populate options menu
    const optionsMenu = document.getElementById("optionsMenu");
    populateOptionsMenu(currentUser.role, optionsMenu);

    // Populate role-specific panel
    const rolePanel = document.getElementById("rolePanel");
    populateRolePanel(currentUser.role, rolePanel);
  } else {
    // User is logged out - show guest forms
    if (guestPanel) guestPanel.style.display = "block";
    if (loggedInPanel) loggedInPanel.style.display = "none";
  }
}

// Populate options menu with quick-access links
function populateOptionsMenu(role, container) {
  if (!container) return;

  const optionsHTML = `
    <a href="index.html" class="option-card">
      <i class="fas fa-home"></i>
      <span>Home</span>
    </a>
    <a href="raids.html" class="option-card">
      <i class="fas fa-sword"></i>
      <span>Raid Sign Ups</span>
    </a>
    <a href="builds.html" class="option-card">
      <i class="fas fa-book"></i>
      <span>Guides</span>
    </a>
    <a href="armory.html" class="option-card">
      <i class="fas fa-search"></i>
      <span>Armory</span>
    </a>
  `;

  container.innerHTML = optionsHTML;
}

// Populate role-specific panel content
function populateRolePanel(role, container) {
  if (!container) return;

  if (role === "Admin") {
    container.innerHTML = `
      <div class="admin-section" style="margin-top: 30px; padding: 15px; background: rgba(103, 183, 255, 0.1); border-left: 3px solid #f5d77a; border-radius: 4px;">
        <strong style="color: #f5d77a;">⚔ Admin Panel</strong>
        <p style="margin: 8px 0; color: #a0b8d8; font-size: 0.9em;">Full website control, user management, and guild settings.</p>
        <p style="color: #67b7ff; font-size: 0.85em; margin-top: 12px;">Coming soon: Admin dashboard</p>
      </div>
    `;
  } else if (role === "Officer") {
    container.innerHTML = `
      <div class="officer-section" style="margin-top: 30px; padding: 15px; background: rgba(103, 183, 255, 0.1); border-left: 3px solid #f5d77a; border-radius: 4px;">
        <strong style="color: #f5d77a;">◆ Officer Tools</strong>
        <p style="margin: 8px 0; color: #a0b8d8; font-size: 0.9em;">Raid management, roster review, and member coordination.</p>
        <p style="color: #67b7ff; font-size: 0.85em; margin-top: 12px;">Coming soon: Officer dashboard</p>
      </div>
    `;
  } else if (role === "Member") {
    container.innerHTML = `
      <div class="member-section" style="margin-top: 30px; padding: 15px; background: rgba(103, 183, 255, 0.1); border-left: 3px solid #f5d77a; border-radius: 4px;">
        <strong style="color: #f5d77a;">⚜ Member Area</strong>
        <p style="margin: 8px 0; color: #a0b8d8; font-size: 0.9em;">View guild content, sign up for raids, and manage your profile later.</p>
      </div>
    `;
  }
}

// ============================================================
// EVENT HANDLERS
// ============================================================

// Handle login form submission
function handleLogin(e) {
  if (e) e.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginMessage = document.getElementById("loginMessage");

  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    if (loginMessage) {
      loginMessage.textContent = "Please enter username and password.";
      loginMessage.style.color = "#ff6b6b";
    }
    return;
  }

  if (loginUser(username, password)) {
    const user = getCurrentUser();
    if (loginMessage) {
      loginMessage.textContent = `Success! Logged in as ${username} (${user.role})`;
      loginMessage.style.color = "#51cf66";
    }

    // Clear form
    usernameInput.value = "";
    passwordInput.value = "";

    // Clear register message
    const registerMessage = document.getElementById("registerMessage");
    if (registerMessage) registerMessage.textContent = "";

    // Update UI after brief delay
    setTimeout(() => updateLoginUI(), 500);
  } else {
    if (loginMessage) {
      loginMessage.textContent = "Invalid username or password.";
      loginMessage.style.color = "#ff6b6b";
    }
  }
}

// Handle register form submission
function handleRegister() {
  const registerUsernameInput = document.getElementById("registerUsername");
  const registerPasswordInput = document.getElementById("registerPassword");
  const registerMessage = document.getElementById("registerMessage");

  if (!registerUsernameInput || !registerPasswordInput) return;

  const username = registerUsernameInput.value.trim();
  const password = registerPasswordInput.value.trim();

  // Validation
  if (!username || !password) {
    if (registerMessage) {
      registerMessage.textContent = "Please fill in all fields.";
      registerMessage.style.color = "#ff6b6b";
    }
    return;
  }

  if (username.length < 3) {
    if (registerMessage) {
      registerMessage.textContent = "Username must be at least 3 characters.";
      registerMessage.style.color = "#ff6b6b";
    }
    return;
  }

  if (password.length < 4) {
    if (registerMessage) {
      registerMessage.textContent = "Password must be at least 4 characters.";
      registerMessage.style.color = "#ff6b6b";
    }
    return;
  }

  if (userExists(username)) {
    if (registerMessage) {
      registerMessage.textContent = "This username is already taken.";
      registerMessage.style.color = "#ff6b6b";
    }
    return;
  }

  // Create user as Member (no role selection allowed)
  addUser(username, password);

  if (registerMessage) {
    registerMessage.textContent = `Success! Account "${username}" created as Member. You can now login.`;
    registerMessage.style.color = "#51cf66";
  }

  // Clear form
  registerUsernameInput.value = "";
  registerPasswordInput.value = "";
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
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const registerUsernameInput = document.getElementById("registerUsername");
  const registerPasswordInput = document.getElementById("registerPassword");

  if (usernameInput) usernameInput.value = "";
  if (passwordInput) passwordInput.value = "";
  if (registerUsernameInput) registerUsernameInput.value = "";
  if (registerPasswordInput) registerPasswordInput.value = "";

  // Update UI
  updateLoginUI();
}

// Handle OAuth button clicks (placeholders)
function handleDiscordLogin() {
  alert("Discord login coming soon! (Backend OAuth integration required)");
}

function handleGoogleLogin() {
  alert("Google login coming soon! (Backend OAuth integration required)");
}

// ============================================================
// INITIALIZATION
// ============================================================

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize storage with default users
  initGuildStorage();

  // Set up event listeners
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", handleRegister);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  const discordLoginBtn = document.getElementById("discordLoginBtn");
  if (discordLoginBtn) {
    discordLoginBtn.addEventListener("click", handleDiscordLogin);
  }

  const googleLoginBtn = document.getElementById("googleLoginBtn");
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", handleGoogleLogin);
  }

  // Update UI to show correct state
  updateLoginUI();
  console.log("[LOCAL DEFENSE AUTH] System initialized and UI updated");
});

// ============================================================
// DEV HELPERS & SELF-CHECK
// ============================================================

/**
 * Run self-check to verify auth system integrity
 * Usage in browser console: authDebug.runAuthSelfCheck()
 */
function runAuthSelfCheck() {
  console.log("\n=== LOCAL DEFENSE AUTH SELF-CHECK ===\n");
  
  let passed = 0;
  let failed = 0;

  // Check 1: Storage exists
  try {
    const users = getAllUsers();
    if (Array.isArray(users) && users.length >= 3) {
      console.log("✓ CHECK 1 PASSED: Guild users storage initialized (" + users.length + " users found)");
      passed++;
    } else {
      console.log("✗ CHECK 1 FAILED: Guild users storage is empty or invalid");
      failed++;
    }
  } catch (e) {
    console.log("✗ CHECK 1 FAILED: Error reading guild users:", e.message);
    failed++;
  }

  // Check 2: Default users exist
  try {
    const users = getAllUsers();
    const adminExists = users.some(u => u.username === "admin" && u.role === "Admin");
    const officerExists = users.some(u => u.username === "officer" && u.role === "Officer");
    const memberExists = users.some(u => u.username === "member" && u.role === "Member");
    
    if (adminExists && officerExists && memberExists) {
      console.log("✓ CHECK 2 PASSED: All 3 default users exist with correct roles");
      passed++;
    } else {
      console.log("✗ CHECK 2 FAILED: Missing default users. Admin:", adminExists, "Officer:", officerExists, "Member:", memberExists);
      failed++;
    }
  } catch (e) {
    console.log("✗ CHECK 2 FAILED: Error checking default users:", e.message);
    failed++;
  }

  // Check 3: Current user state readable
  try {
    const currentUser = getCurrentUser();
    if (currentUser === null) {
      console.log("✓ CHECK 3 PASSED: Current user is correctly null (not logged in)");
      passed++;
    } else if (typeof currentUser === 'object' && currentUser.username && currentUser.role) {
      console.log(`✓ CHECK 3 PASSED: Current user is logged in: "${currentUser.username}" (${currentUser.role})`);
      passed++;
    } else {
      console.log("✗ CHECK 3 FAILED: Current user state is invalid");
      failed++;
    }
  } catch (e) {
    console.log("✗ CHECK 3 FAILED: Error reading current user:", e.message);
    failed++;
  }

  // Check 4: Options menu function works
  try {
    // Create a temporary container
    const testContainer = document.createElement("div");
    populateOptionsMenu("Member", testContainer);
    const linkCount = testContainer.querySelectorAll("a").length;
    
    if (linkCount === 4) {
      console.log("✓ CHECK 4 PASSED: Options menu renders 4 links correctly");
      passed++;
    } else {
      console.log("✗ CHECK 4 FAILED: Options menu expected 4 links, found", linkCount);
      failed++;
    }
  } catch (e) {
    console.log("✗ CHECK 4 FAILED: Error testing options menu:", e.message);
    failed++;
  }

  // Check 5: Role panel function works
  try {
    const testContainer = document.createElement("div");
    populateRolePanel("Admin", testContainer);
    const content = testContainer.textContent;
    
    if (content.includes("Admin")) {
      console.log("✓ CHECK 5 PASSED: Role panel renders correctly for Admin");
      passed++;
    } else {
      console.log("✗ CHECK 5 FAILED: Role panel content missing for Admin");
      failed++;
    }
  } catch (e) {
    console.log("✗ CHECK 5 FAILED: Error testing role panel:", e.message);
    failed++;
  }

  // Summary
  console.log("\n=== RESULTS ===");
  console.log(`✓ Passed: ${passed}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`Status: ${failed === 0 ? "✓ ALL CHECKS PASSED" : "✗ SOME CHECKS FAILED"}\n`);
  
  return { passed, failed, success: failed === 0 };
}

/**
 * Debug helper to list all users
 * Usage: authDebug.getUsers()
 */
function getDebugUsers() {
  const users = getAllUsers();
  console.log("Guild Users:", users);
  return users;
}

/**
 * Debug helper to get current user state
 * Usage: authDebug.getCurrentUser()
 */
function getDebugCurrentUser() {
  const user = getCurrentUser();
  console.log("Current User:", user);
  return user;
}

/**
 * Debug helper to clear all auth data (CAREFUL!)
 * Usage: authDebug.clearAllAuthData()
 */
function clearAllAuthData() {
  if (confirm("⚠️  WARNING: This will clear ALL auth data including user accounts!\n\nContinue?")) {
    localStorage.removeItem(STORAGE_KEYS.GUILD_USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    console.log("[LOCAL DEFENSE AUTH] All auth data cleared!");
    location.reload();
  }
}

/**
 * Debug helper to add test user
 * Usage: authDebug.addTestUser("testuser", "password123")
 */
function addTestUser(username, password) {
  if (userExists(username)) {
    console.log(`✗ User "${username}" already exists`);
    return false;
  }
  addUser(username, password);
  console.log(`✓ Test user "${username}" added as Member`);
  return true;
}

// Expose debug helpers on window object
window.authDebug = {
  runAuthSelfCheck,
  getUsers: getDebugUsers,
  getCurrentUser: getDebugCurrentUser,
  clearAllAuthData,
  addTestUser,
  getAllUsers,
  logout: () => { logoutUser(); updateLoginUI(); console.log("Logged out"); }
};

console.log("[LOCAL DEFENSE AUTH] Debug helpers available at: window.authDebug");