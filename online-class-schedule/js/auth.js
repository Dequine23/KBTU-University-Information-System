const DEMO_USERS = [
    {
        id: 1,
        name: "Student Demo",
        studentId: "DEMO-ST-001",
        email: "student@kbtu.kz",
        password: "student123",
        role: "student"
    },
    {
        id: 2,
        name: "Teacher Demo",
        studentId: "DEMO-TE-001",
        email: "teacher@kbtu.kz",
        password: "teacher123",
        role: "teacher"
    },
    {
        id: 3,
        name: "Admin Demo",
        studentId: "DEMO-AD-001",
        email: "admin@kbtu.kz",
        password: "admin123",
        role: "admin"
    }
];

const SESSION_KEY = "kbtu_session";
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

// Brute-force protection settings
const MAX_LOGIN_ATTEMPTS = 3;               // wrong passwords allowed
const LOCKOUT_DURATION = 5 * 60 * 1000;     // 5 minutes lock
const ATTEMPTS_KEY = "kbtu_login_attempts";

function initializeDemoUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    DEMO_USERS.forEach(demoUser => {
        const exists = users.some(
            user => user.email.toLowerCase() === demoUser.email.toLowerCase()
        );

        if (!exists) {
            users.push(demoUser);
        }
    });

    localStorage.setItem("users", JSON.stringify(users));
}

/* local access token shugaru */
function generateAccessToken() {
    const bytes = new Uint8Array(32);

    crypto.getRandomValues(bytes);

    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

function getAttemptsData() {
    return JSON.parse(localStorage.getItem(ATTEMPTS_KEY)) || {};
}

function saveAttemptsData(data) {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data));
}


function getLockRemaining(email) {
    const data = getAttemptsData();
    const record = data[email];

    if (!record || !record.lockedUntil) {
        return 0;
    }

    const remaining = record.lockedUntil - Date.now();

    if (remaining <= 0) {
        delete data[email];
        saveAttemptsData(data);
        return 0;
    }

    return remaining;
}

function formatRemaining(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return minutes + " " + t("time.min") + " " +
           seconds + " " + t("time.sec");
}

function registerFailedAttempt(email) {
    const data = getAttemptsData();
    const record = data[email] || { count: 0, lockedUntil: 0 };

    record.count += 1;

    if (record.count >= MAX_LOGIN_ATTEMPTS) {
        record.lockedUntil = Date.now() + LOCKOUT_DURATION;
    }

    data[email] = record;
    saveAttemptsData(data);

    return {
        locked: record.count >= MAX_LOGIN_ATTEMPTS,
        attemptsLeft: Math.max(0, MAX_LOGIN_ATTEMPTS - record.count)
    };
}

function clearFailedAttempts(email) {
    const data = getAttemptsData();
    delete data[email];
    saveAttemptsData(data);
}

/* userdi autentifikatsiyalau */
function authenticateLocalUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const normalizedEmail = email.trim().toLowerCase();

    // 1) Is this email locked? (checked BEFORE the password) toje seniki brat
    const lockRemaining = getLockRemaining(normalizedEmail);

    if (lockRemaining > 0) {
        return {
            success: false,
            locked: true,
            message: t("auth.locked", { time: formatRemaining(lockRemaining) })
        };
    }

    const user = users.find(item =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!user) {
        const attempt = registerFailedAttempt(normalizedEmail);

        if (attempt.locked) {
            return {
                success: false,
                locked: true,
                message: t("auth.locked", { time: formatRemaining(LOCKOUT_DURATION) })
            };
        }

        return {
            success: false,
            message: t("auth.invalid", { n: attempt.attemptsLeft })
        };
    }
    clearFailedAttempts(normalizedEmail);

    const safeUser = {
        id: user.id,
        name: user.name,
        studentId: user.studentId,
        email: user.email,
        role: user.role || "student"
    };

    const token = generateAccessToken();

    const session = {
        accessToken: token,
        user: safeUser,
        expiresAt: Date.now() + SESSION_DURATION
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    localStorage.setItem("currentUser", JSON.stringify(safeUser));

    return {
        success: true,
        user: safeUser,
        token: token
    };
}

/* tokendi validatsiya etu */
function validateAccessToken() {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));

    if (!session || !session.accessToken) {
        return false;
    }

    if (Date.now() >= session.expiresAt) {
        logoutUser();
        alert(t("auth.sessionExpired"));
        return false;
    }

    return true;
}

/* userdi alu */
function getLocalCurrentUser() {
    if (!validateAccessToken()) {
        return null;
    }

    const session = JSON.parse(localStorage.getItem(SESSION_KEY));

    return session.user;
}

function getCurrentUserRole() {
    const user = getLocalCurrentUser();

    return user ? user.role : null;
}

function hasLocalRole(...allowedRoles) {
    const role = getCurrentUserRole();

    return role !== null && allowedRoles.includes(role);
}

function requireLocalRole(...allowedRoles) {
    if (!validateAccessToken()) {
        alert(t("auth.loginFirst"));

        if (typeof showLogin === "function") {
            showLogin();
        }

        return false;
    }

    if (!hasLocalRole(...allowedRoles)) {
        alert(t("auth.denied"));
        return false;
    }

    return true;
}

/* jana userdi registratsiyalau */
function registerLocalStudent(userData) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const email = userData.email.trim().toLowerCase();
    const studentId = userData.studentId.trim();

    if (users.some(user => user.email.toLowerCase() === email)) {
        return {
            success: false,
            message: t("auth.emailTaken")
        };
    }

    if (users.some(user => user.studentId === studentId)) {
        return {
            success: false,
            message: t("auth.idTaken")
        };
    }

    users.push({
        id: Date.now(),
        name: userData.name.trim(),
        studentId: studentId,
        email: email,
        password: userData.password,
        role: "student"
    });

    localStorage.setItem("users", JSON.stringify(users));

    return {
        success: true
    };
}

function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("currentUser");
}

initializeDemoUsers();