const app = document.getElementById("app");

let currentUser = getLocalCurrentUser();

// login | register | dashboard | courses | mycourses | details
let currentView = "login";

let selectedCourseId = null;

const defaultFilters = {
    term: "",
    category: "all",
    day: "all",
    instructor: "all",
    credits: "all",
    onlyAvailable: false,
    sortBy: "code",
    sortDir: "asc"
};

let filters = { ...defaultFilters };


function userEmail() {
    return currentUser.email.toLowerCase();
}

function myCourses() {
    const ids = CourseAPI.getRegisteredIds(userEmail());

    return CourseAPI.getAll().filter(c => ids.includes(c.id)).map(c => ({
        ...c, ...CourseAPI.getSection(userEmail(), c.id)
    }));
}

function timeRange(c) {
    return c.start + " - " + c.end;
}

function roomLabel(c) {
    return t("room." + c.room.kind) + " " + c.room.no;
}

function optionList(items, selected) {
    return items.map(item => `
        <option value="${esc(item[0])}"
            ${String(item[0]) === String(selected) ? "selected" : ""}>
            ${esc(item[1])}
        </option>
    `).join("");
}

// Shows a translated error returned by CourseAPI
function showApiError(result) {
    alert(t(result.error, result.params));
}

/* til ayustyrushy */

function langSwitcher(extraClass) {
    return `
        <select
            class="lang-select ${extraClass || ""}"
            aria-label="${t("header.language")}"
            onchange="changeLanguage(this.value)">

            ${Object.keys(LANGS).map(code => `
                <option value="${code}"
                    ${code === currentLang ? "selected" : ""}>
                    ${LANGS[code]}
                </option>
            `).join("")}

        </select>
    `;
}

function changeLanguage(lang) {
    setLanguage(lang);
    render();
}

// Re-draws the page the user is currently on
function render() {

    document.title = t("app.title");

    if (currentView === "register") {
        showRegister();
        return;
    }

    if (!currentUser || currentView === "login") {
        showLogin();
        return;
    }

    navigate(currentView);
}

/* login page */

function showLogin() {

    currentView = "login";

    document.title = t("app.title");

    app.innerHTML = `
        <div class="login-page">

            ${langSwitcher("lang-floating")}

            <form class="login-form" id="loginForm">

                <h2>${t("login.title")}</h2>

                <div class="login-field">
                    <label for="loginEmail">${t("login.email")}</label>

                    <input
                        id="loginEmail"
                        type="email"
                        name="email"
                        required
                    >
                </div>

                <div class="login-field">
                    <label for="loginPassword">${t("login.password")}</label>

                    <input
                        id="loginPassword"
                        type="password"
                        name="password"
                        required
                    >
                </div>

                <button class="login-button" type="submit">
                    ${t("login.button")}
                </button>

                <p class="login-switch">
                    ${t("login.newStudent")}
                    <a onclick="showRegister()">${t("login.register")}</a>
                </p>

            </form>

        </div>
    `;

    document.getElementById("loginForm").onsubmit = function(e) {

        e.preventDefault();

        const formData = new FormData(this);

        const email = formData.get("email").trim();
        const password = formData.get("password");

        const result = authenticateLocalUser(email, password);

        if (!result.success) {
            alert(result.message);
            return;
        }

        currentUser = result.user;

        navigate("dashboard");
    };
}

/* registration pagee */

function showRegister() {

    currentView = "register";

    document.title = t("app.title");

    app.innerHTML = `
        <div class="register-page">

            ${langSwitcher("lang-floating")}

            <div class="register-box">

                <h2>${t("reg.title")}</h2>

                <form id="registerForm">

                    <label>${t("reg.fullName")}</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="${t("reg.namePh")}"
                        required
                    >

                    <label>${t("reg.studentId")}</label>
                    <input
                        name="studentId"
                        type="text"
                        placeholder="24B031234"
                        required
                    >

                    <label>${t("login.email")}</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="student@kbtu.kz"
                        required
                    >

                    <label>${t("login.password")}</label>
                    <input
                        name="password"
                        type="password"
                        minlength="6"
                        placeholder="${t("reg.passwordPh")}"
                        required
                    >

                    <button class="btn" type="submit">
                        ${t("reg.create")}
                    </button>

                </form>

                <p class="form-switch">
                    ${t("reg.already")}
                    <a onclick="showLogin()">${t("login.button")}</a>
                </p>

            </div>

        </div>
    `;

    document.getElementById("registerForm").onsubmit = function(e) {

        e.preventDefault();

        const formData = new FormData(this);

        const result = registerLocalStudent({
            name: formData.get("name"),
            studentId: formData.get("studentId"),
            email: formData.get("email"),
            password: formData.get("password")
        });

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert(t("reg.success"));

        showLogin();
    };
}

/* header */

function header() {

    const role = currentUser.role || "student";

    return `
        <header class="header">

            <div class="header-logo">
                <img
                    src="assets/kbtu-logo.png"
                    alt="KBTU Logo"
                >
            </div>

            <div class="header-right">

                <div class="user-info">
                    ${t("header.loggedInAs")} ${esc(currentUser.name)}
                    <span class="role-label">
                        ${esc(t("role." + role).toUpperCase())}
                    </span>
                </div>

                ${langSwitcher()}

                <button class="header-logout" onclick="logout()">
                    ${t("nav.logout")}
                </button>

            </div>

        </header>

        <nav class="nav">

            <button onclick="navigate('dashboard')">
                ${t("nav.home")}
            </button>

            <button onclick="navigate('courses')">
                ${t("nav.courses")}
            </button>

            <button onclick="navigate('mycourses')">
                ${t("nav.myCourses")}
            </button>

            <button onclick="navigate('schedule')">
                ${t("nav.schedule")}
            </button>


        </nav>
    `;
}

/* navigation */

function navigate(page) {

    if (!currentUser || !validateAccessToken()) {
        currentUser = null;
        showLogin();
        return;
    }

    currentView = page;

    document.title = t("app.title");

    if (page === "dashboard") showDashboard();

    if (page === "courses") showCourses();

    if (page === "mycourses") showMyCourses();

    if (page === "schedule") showUniversitySchedule();

    if (page === "details") showCourseDetails();
}

/* dashboard */

function showDashboard() {

    const registered = myCourses();

    app.innerHTML = `
        ${header()}

        <main class="container">

            <h1 class="page-title">
                ${t("dash.welcome", { name: esc(currentUser.name) })}
            </h1>

            <p class="subtitle">
                ${t("dash.subtitle")}
            </p>

            <div class="grid">

                <div class="card">
                    <p>${t("dash.available")}</p>

                    <div class="stat-number">
                        ${CourseAPI.getAll().length}
                    </div>

                    <button class="btn"
                        onclick="navigate('courses')">
                        ${t("dash.browse")}
                    </button>
                </div>

                <div class="card">
                    <p>${t("dash.registered")}</p>

                    <div class="stat-number">
                        ${registered.length}
                    </div>

                    <button class="btn"
                        onclick="navigate('mycourses')">
                        ${t("dash.viewMy")}
                    </button>
                </div>

                <div class="card">
                    <p>${t("dash.credits")}</p>

                    <div class="stat-number">
                        ${CourseAPI.getTotalCredits(userEmail())}
                    </div>

                    <span class="badge">
                        ${t("dash.semester")}
                    </span>
                </div>

            </div>

            <div class="card">

                <h2>${t("dash.weekly")}</h2>

                <br>

                ${scheduleTable(registered)}

            </div>

        </main>

        <footer class="footer">
            ${t("footer")}
        </footer>
    `;
}

/* Weekly schedule table */

function scheduleTable(registered, showAll = false) {
    if (registered.length === 0 && !showAll) {
        return `
            <div class="empty">
                ${t("sched.empty")}<br>
                <button class="btn" onclick="navigate('courses')">
                    ${t("sched.registerBtn")}
                </button>
            </div>
        `;
    }

    const times = [...new Set(registered.map(c => c.start))].sort();

    return `
        <div class="schedule-wrapper">
            <table class="weekly-table">
                <thead>
                    <tr>
                        <th>${t("sched.time")}</th>
                        ${DAY_ORDER.map(day => `<th>${t("day." + day)}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${times.map(time => `
                        <tr>
                            <td class="time-cell">${time}</td>
                            ${DAY_ORDER.map(day => {
                                const courses = registered.filter(c =>
                                    c.day === day && c.start === time
                                );

                                return `
                                    <td>
                                        ${courses.length
                                            ? courses.map(course => `
                                                <div class="schedule-course">
                                                    <strong>${esc(loc(course.name))}</strong>
                                                    <span>${course.code}</span>
                                                    <span>${timeRange(course)}</span>
                                                    <span>${esc(course.instructor)}</span>
                                                    <span>${roomLabel(course)}</span>
                                                </div>
                                            `).join("")
                                            : `<span class="free-time"> </span>`
                                        }
                                    </td>
                                `;
                            }).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>

            <div class="schedule-mobile">
                ${DAY_ORDER.map(day => {
                    const courses = registered
                        .filter(course => course.day === day)
                        .sort((a, b) => a.start.localeCompare(b.start));

                    if (!courses.length) return "";

                    return `
                        <section class="mobile-day">
                            <h3>${t("day." + day)}</h3>
                            ${courses.map(course => `
                                <article class="schedule-course mobile-course">
                                    <strong>${esc(loc(course.name))}</strong>
                                    <span>${course.code}</span>
                                    <span>${timeRange(course)}</span>
                                    <span>${esc(course.instructor)}</span>
                                    <span>${roomLabel(course)}</span>
                                </article>
                            `).join("")}
                        </section>
                    `;
                }).join("")}
            </div>
        </div>
    `;
}

function showUniversitySchedule() {
    const courses = CourseAPI.getAll();
    app.innerHTML = `
        ${header()}
        <main class="container">
            <h1 class="page-title">${t("schedule.title")}</h1>
            <p class="subtitle">${t("schedule.subtitle")}</p>
            <div class="card schedule-legend"><span class="schedule-dot"></span>${t("schedule.legend")}</div>
            <div class="card">${scheduleTable(courses, true)}</div>
        </main>
        <footer class="footer">${t("footer")}</footer>`;
}

/* course catalog */
const SORT_COLUMNS = [
    ["code", "col.code"],
    ["name", "col.course"],
    ["instructor", "course.instructor"],
    ["credits", "course.credits"],
    ["day", "col.schedule"],
    ["seats", "course.seats"]
];

function sortArrow(key) {

    if (filters.sortBy !== key) return "";

    return filters.sortDir === "desc" ? " ▼" : " ▲";
}

function setSort(key) {

    if (filters.sortBy === key) {

        filters.sortDir = filters.sortDir === "asc" ? "desc" : "asc";

    } else {

        filters.sortBy = key;
        filters.sortDir =
            (key === "credits" || key === "seats") ? "desc" : "asc";
    }

    showCourses();
}

function courseRow(c) {

    const seats = CourseAPI.getSeatsLeft(c.id);

    return `
        <div class="course-row">

            <div class="cell cell-code" data-label="${t("col.code")}">
                ${c.code}
            </div>

            <div class="cell cell-name">
                <strong>${esc(loc(c.name))}</strong>
                <span class="badge">${t("cat." + c.category)}</span>
            </div>

            <div class="cell" data-label="${t("course.instructor")}">
                ${esc(c.instructor)}
            </div>

            <div class="cell" data-label="${t("course.credits")}">
                ${c.credits}
            </div>

            <div class="cell" data-label="${t("col.schedule")}">
                ${t("day." + c.day)}<br>
                <span class="muted">
                    ${timeRange(c)} · ${roomLabel(c)}
                </span>
            </div>

            <div class="cell" data-label="${t("course.seats")}">
                <span class="${seats === 0 ? "seats-full" : ""}">
                    ${seats}
                </span>
            </div>

            <div class="cell cell-action">
                <button class="btn btn-small"
                    onclick="openCourse(${c.id})">
                    ${t("course.viewDetails")}
                </button>
            </div>

        </div>
    `;
}

// Updates only the course rows
function updateCourseList() {

    const list = CourseAPI.search(filters);

    document.getElementById("resultCount").textContent =
        t("filter.results", { count: list.length });

    document.getElementById("courseRows").innerHTML = list.length
        ? list.map(courseRow).join("")
        : `<div class="card empty">${t("course.noResults")}</div>`;
}

function showCourses() {

    const categoryItems = [["all", t("cat.all")]].concat(
        CourseAPI.getCategories().map(cat => [cat, t("cat." + cat)])
    );

    const dayItems = [["all", t("filter.any")]].concat(
        DAY_ORDER.map(day => [day, t("day." + day)])
    );

    const instructorItems = [["all", t("filter.any")]].concat(
        CourseAPI.getInstructors().map(name => [name, name])
    );

    const creditItems = [["all", t("filter.any")]].concat(
        CourseAPI.getCreditOptions().map(n => [n, String(n)])
    );

    const sortItems = SORT_COLUMNS.map(col => [
        col[0],
        t("sort." + col[0])
    ]);

    const directionLabel = filters.sortDir === "desc"
        ? "▼ " + t("sort.desc")
        : "▲ " + t("sort.asc");

    app.innerHTML = `
        ${header()}

        <main class="container">

            <h1 class="page-title">
                ${t("catalog.title")}
            </h1>

            <p class="subtitle">
                ${t("catalog.subtitle")}
            </p>

            <div class="card">

                <div class="filters-grid">

                    <div class="filter-wide">
                        <label for="courseSearch">${t("filter.search")}</label>

                        <input
                            id="courseSearch"
                            placeholder="${t("filter.searchPh")}"
                            value="${esc(filters.term)}"
                        >
                    </div>

                    <div>
                        <label for="categoryFilter">${t("filter.category")}</label>

                        <select id="categoryFilter">
                            ${optionList(categoryItems, filters.category)}
                        </select>
                    </div>

                    <div>
                        <label for="dayFilter">${t("filter.day")}</label>

                        <select id="dayFilter">
                            ${optionList(dayItems, filters.day)}
                        </select>
                    </div>

                    <div>
                        <label for="instructorFilter">${t("filter.instructor")}</label>

                        <select id="instructorFilter">
                            ${optionList(instructorItems, filters.instructor)}
                        </select>
                    </div>

                    <div>
                        <label for="creditsFilter">${t("filter.credits")}</label>

                        <select id="creditsFilter">
                            ${optionList(creditItems, filters.credits)}
                        </select>
                    </div>

                    <div>
                        <label for="sortFilter">${t("filter.sort")}</label>

                        <div class="sort-controls">

                            <select id="sortFilter">
                                ${optionList(sortItems, filters.sortBy)}
                            </select>

                            <button id="sortDirection"
                                class="btn btn-light"
                                type="button">
                                ${directionLabel}
                            </button>

                        </div>
                    </div>

                </div>

                <div class="filter-actions">

                    <label class="checkbox-row">
                        <input
                            id="availableFilter"
                            type="checkbox"
                            ${filters.onlyAvailable ? "checked" : ""}
                        >
                        ${t("filter.onlyAvailable")}
                    </label>

                    <button id="resetFilters" class="btn btn-light">
                        ${t("filter.reset")}
                    </button>

                </div>

            </div>

            <p class="result-count" id="resultCount"></p>

            <div class="course-list-head">

                ${SORT_COLUMNS.map(col => `
                    <button
                        class="sort-btn ${filters.sortBy === col[0] ? "active" : ""}"
                        onclick="setSort('${col[0]}')">
                        ${t(col[1])}${sortArrow(col[0])}
                    </button>
                `).join("")}

                <span></span>

            </div>

            <div class="course-list" id="courseRows"></div>

        </main>

        <footer class="footer">
            ${t("footer")}
        </footer>
    `;

    document.getElementById("courseSearch").oninput = function() {
        filters.term = this.value;
        updateCourseList();
    };

    [
        ["categoryFilter", "category"],
        ["dayFilter", "day"],
        ["instructorFilter", "instructor"],
        ["creditsFilter", "credits"]
    ].forEach(pair => {

        document.getElementById(pair[0]).onchange = function() {
            filters[pair[1]] = this.value;
            updateCourseList();
        };
    });

    // Sort field changed from the dropdown: same direction defaults as headers
    document.getElementById("sortFilter").onchange = function() {

        filters.sortBy = this.value;

        filters.sortDir =
            (this.value === "credits" || this.value === "seats")
                ? "desc"
                : "asc";

        showCourses();
    };

    document.getElementById("sortDirection").onclick = function() {

        filters.sortDir = filters.sortDir === "asc" ? "desc" : "asc";

        showCourses();
    };

    document.getElementById("availableFilter").onchange = function() {
        filters.onlyAvailable = this.checked;
        updateCourseList();
    };

    document.getElementById("resetFilters").onclick = function() {
        filters = { ...defaultFilters };
        showCourses();
    };

    updateCourseList();
}

/* courstar turali */

function openCourse(id) {

    selectedCourseId = id;

    navigate("details");
}

function showCourseDetails() {

    const c = CourseAPI.getById(selectedCourseId);

    if (!c) {
        navigate("courses");
        return;
    }

    const isRegistered = CourseAPI
        .getRegisteredIds(userEmail())
        .includes(c.id);

    const seats = CourseAPI.getSeatsLeft(c.id);

    let buttonLabel = t("course.register");

    if (isRegistered) {
        buttonLabel = t("course.already");
    } else if (seats <= 0) {
        buttonLabel = t("course.full");
    }

    app.innerHTML = `
        ${header()}

        <main class="container">

            <button class="btn btn-light"
                onclick="navigate('courses')">
                ${t("course.back")}
            </button>

            <div class="card" style="margin-top:25px">

                <p class="course-code">
                    ${c.code}
                </p>

                <h1 class="page-title">
                    ${esc(loc(c.name))}
                </h1>

                <p class="subtitle">
                    ${t("cat." + c.category)}
                </p>

                <h3>${t("course.description")}</h3>

                <p style="margin:15px 0;line-height:1.7">
                    ${esc(loc(c.description))}
                </p>

                <div class="course-instructor">
                    
                    <img
                        class="instructor-photo"
                         src="${c.id === 21
                        ? 'assets/17515516682151.png'
                        : 'assets/137420f5b9c39bc911e472f5d20f053e.jpg'}"
                        alt="${esc(c.instructor)}"
                    >
                    <div>
                        <span class="instructor-label">${t("course.instructor")}</span>
                        <strong>${esc(c.instructor)}</strong>
                    </div>
                </div>

                <hr>

                <br>

                <p class="course-meta">

                    <strong>${t("course.credits")}:</strong> ${c.credits}<br>

                    <strong>${t("course.day")}:</strong> ${t("day." + c.day)}<br>

                    <strong>${t("course.time")}:</strong> ${timeRange(c)}<br>

                    <strong>${t("course.location")}:</strong> ${roomLabel(c)}

                </p>

                <div class="section-picker">
                    <h3>${t("section.title")}</h3>
                    <p class="muted">${t("section.help")}</p>
                    <div class="section-grid">
                        <label>${t("course.instructor")}
                            <select id="sectionInstructor">${optionList(CourseAPI.getInstructors().map(name => [name, name]), c.instructor)}</select>
                        </label>
                        <label>${t("course.day")}
                            <select id="sectionDay">${optionList(DAY_ORDER.map(day => [day, t("day." + day)]), c.day)}</select>
                        </label>
                        <label>${t("course.time")}
                            <select id="sectionTime">${optionList(["09:00|10:50", "11:00|12:50", "13:00|14:50", "14:00|15:50", "16:00|17:50"].map(slot => [slot, slot.replace("|", "–")]), c.start + "|" + c.end)}</select>
                        </label>
                    </div>
                    <div class="registration-seats">
                        <span>${t("course.seats")}</span>
                        <strong>${seats}</strong>
                    </div>
                </div>

                <button class="btn"
                    onclick="registerCourse(${c.id})"
                    ${isRegistered || seats <= 0 ? "disabled" : ""}>

                    ${buttonLabel}

                </button>

            </div>

        </main>
    `;
}

/* register */

function registerCourse(id) {

    if (!requireLocalRole("student")) return;

    const course = CourseAPI.getById(id);

    const [start, end] = document.getElementById("sectionTime").value.split("|");
    const section = { instructor: document.getElementById("sectionInstructor").value, day: document.getElementById("sectionDay").value, start, end };
    const check = CourseAPI.canRegister(userEmail(), id, section);

    if (!check.success) {
        showApiError(check);
        return;
    }

    if (!confirm(t("confirm.register", { name: loc(course.name) }))) {
        return;
    }

    const result = CourseAPI.register(userEmail(), id, section);

    if (!result.success) {
        showApiError(result);
        return;
    }

    alert(t("msg.registered", { name: loc(course.name) }));

    navigate("mycourses");
}

/* my courses osy jerde tur*/

function showMyCourses() {

    const registered = myCourses();

    app.innerHTML = `
        ${header()}

        <main class="container">

            <h1 class="page-title">
                ${t("mycourses.title")}
            </h1>

            <p class="subtitle">
                ${t("mycourses.subtitle")}
            </p>

            ${registered.length ? `

                <div class="grid">

                    ${registered.map(c => `

                        <div class="card">

                            <p class="course-code">
                                ${c.code}
                            </p>

                            <h3>${esc(loc(c.name))}</h3>

                            <p class="course-meta">

                                ${esc(c.instructor)}<br>

                                ${t("day." + c.day)} | ${timeRange(c)}<br>

                                ${t("course.credits")}: ${c.credits}

                            </p>

                            <span class="badge">
                                ${t("course.registeredBadge")}
                            </span>

                            <br>

                            <button class="btn btn-light"
                                onclick="unregisterCourse(${c.id})">
                                ${t("course.unregister")}
                            </button>

                        </div>

                    `).join("")}

                </div>

            ` : `

                <div class="card empty">

                    ${t("mycourses.none")}

                    <br>

                    <button class="btn"
                        onclick="navigate('courses')">
                        ${t("dash.browse")}
                    </button>

                </div>

            `}

        </main>

        <footer class="footer">
            ${t("footer")}
        </footer>
    `;
}

/* registerdi kaitaru*/

function unregisterCourse(id) {

    if (!requireLocalRole("student")) return;

    if (!confirm(t("confirm.unregister"))) {
        return;
    }

    CourseAPI.unregister(userEmail(), id);

    showMyCourses();
}

/* logout */

function logout() {

    logoutUser();

    currentUser = null;

    showLogin();
}


document.title = t("app.title");

if (currentUser) {

    navigate("dashboard");

} else {

    showLogin();

}