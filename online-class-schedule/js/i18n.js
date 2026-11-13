const LANGS = {
    kk: "Қазақша",
    ru: "Русский",
    en: "English"
};

const LANG_KEY = "kbtu_lang";

const TRANSLATIONS = {

    /* english */
    en: {
        "app.title": "Online Class Schedule",
        "footer": "KBTU Online Class Schedule © 2026",

        "login.title": "Welcome Back",
        "login.email": "Email",
        "login.password": "Password",
        "login.button": "Login",
        "login.newStudent": "New student ?",
        "login.register": "Register",

        "reg.title": "Student Registration",
        "reg.fullName": "Full Name",
        "reg.namePh": "Your full name",
        "reg.studentId": "Student ID",
        "reg.passwordPh": "Minimum 6 characters",
        "reg.create": "Create Account",
        "reg.already": "Already registered?",
        "reg.success": "Registration successful! Please login.",

        "nav.home": "Home",
        "nav.courses": "All Courses",
        "nav.myCourses": "My Courses",
        "nav.schedule": "University schedule",
        "schedule.title": "University course schedule",
        "schedule.subtitle": "See when courses meet across the university.",
        "schedule.legend": "Course meetings by weekday and start time",
        "section.title": "Choose your class section",
        "section.help": "Select an instructor, day and time. The system checks for timetable conflicts.",
        "nav.logout": "Logout",

        "header.loggedInAs": "Logged in as:",
        "header.language": "Language",

        "role.student": "Student",
        "role.teacher": "Teacher",
        "role.admin": "Admin",

        "dash.welcome": "Welcome, {name}!",
        "dash.subtitle": "Your KBTU academic dashboard",
        "dash.available": "Available Courses",
        "dash.browse": "Browse Courses",
        "dash.registered": "My Registered Courses",
        "dash.viewMy": "View My Courses",
        "dash.credits": "Total Credits",
        "dash.semester": "Current semester",
        "dash.weekly": "My Weekly Schedule",

        "sched.time": "Time",
        "sched.empty": "No registered courses yet.",
        "sched.registerBtn": "Register for Courses",

        "day.mon": "Monday",
        "day.tue": "Tuesday",
        "day.wed": "Wednesday",
        "day.thu": "Thursday",
        "day.fri": "Friday",

        "cat.all": "All",
        "cat.cs": "Computer Science",
        "cat.math": "Mathematics",
        "cat.languages": "Languages",
        "cat.physics": "Physics",
        "cat.economics": "Economics",
        "cat.design": "Design",

        "catalog.title": "Course Catalog",
        "catalog.subtitle": "Explore and register for available courses.",

        "filter.search": "Search Courses",
        "filter.searchPh": "Search by name, code or instructor...",
        "filter.category": "Category",
        "filter.day": "Day",
        "filter.instructor": "Instructor",
        "filter.credits": "Credits",
        "filter.any": "Any",
        "filter.onlyAvailable": "Only courses with available seats",
        "filter.sort": "Sort by",
        "filter.reset": "Reset filters",
        "filter.results": "Courses found: {count}",

        "sort.code": "Course code",
        "sort.name": "Name",
        "sort.instructor": "Instructor",
        "sort.credits": "Credits",
        "sort.seats": "Available seats",
        "sort.day": "Day and time",
        "sort.asc": "Ascending",
        "sort.desc": "Descending",

        "col.code": "Code",
        "col.course": "Course",
        "col.schedule": "Schedule",

        "course.noResults": "No courses found.",
        "course.instructor": "Instructor",
        "course.credits": "Credits",
        "course.seats": "Available seats",
        "course.day": "Day",
        "course.time": "Time",
        "course.location": "Location",
        "course.description": "Course Description",
        "course.viewDetails": "View Details",
        "course.back": "← Back to Courses",
        "course.register": "Register for Course",
        "course.already": "Already Registered",
        "course.full": "No seats left",
        "course.registeredBadge": "Registered",
        "course.unregister": "Unregister",

        "room.room": "Room",
        "room.lab": "Lab",

        "mycourses.title": "My Courses",
        "mycourses.subtitle": "Your registered courses for this semester.",
        "mycourses.none": "You have not registered for any courses.",

        "confirm.register": "Register for {name}?",
        "confirm.unregister": "Are you sure you want to unregister?",
        "msg.registered": "Successfully registered for {name}",

        "err.alreadyRegistered": "You are already registered.",
        "err.noSeats": "No available seats.",
        "err.conflict": "Registration failed: schedule conflict with {name}!",
        "err.notFound": "Course not found.",
        "err.wrongInstructor": "This instructor is not assigned to this course. Please choose the listed instructor.",

        "auth.locked": "Too many failed attempts. Access is locked for {time}.",
        "auth.invalid": "Invalid email or password. Attempts left: {n}",
        "auth.emailTaken": "This email is already registered.",
        "auth.idTaken": "This student ID is already registered.",
        "auth.sessionExpired": "Your session has expired. Please login again.",
        "auth.loginFirst": "Please login first.",
        "auth.denied": "Access denied! Insufficient permissions.",

        "time.min": "min",
        "time.sec": "sec"
    },

    /* русский */
    ru: {
        "app.title": "Онлайн-расписание занятий",
        "footer": "Онлайн-расписание KBTU © 2026",

        "login.title": "С возвращением",
        "login.email": "Email",
        "login.password": "Пароль",
        "login.button": "Войти",
        "login.newStudent": "Новый студент?",
        "login.register": "Регистрация",

        "reg.title": "Регистрация студента",
        "reg.fullName": "Полное имя",
        "reg.namePh": "Ваше полное имя",
        "reg.studentId": "Студенческий ID",
        "reg.passwordPh": "Минимум 6 символов",
        "reg.create": "Создать аккаунт",
        "reg.already": "Уже зарегистрированы?",
        "reg.success": "Регистрация прошла успешно! Войдите в систему.",

        "nav.home": "Главная",
        "nav.courses": "Все курсы",
        "nav.myCourses": "Мои курсы",
        "nav.schedule": "Расписание университета",
        "schedule.title": "Расписание занятий университета",
        "schedule.subtitle": "Посмотрите, когда проходят занятия по всем курсам.",
        "schedule.legend": "Занятия по дням недели и времени начала",
        "section.title": "Выберите группу",
        "section.help": "Выберите преподавателя, день и время. Система проверит конфликты в расписании.",
        "nav.logout": "Выйти",

        "header.loggedInAs": "Вы вошли как:",
        "header.language": "Язык",

        "role.student": "Студент",
        "role.teacher": "Преподаватель",
        "role.admin": "Администратор",

        "dash.welcome": "Добро пожаловать, {name}!",
        "dash.subtitle": "Ваша академическая панель KBTU",
        "dash.available": "Доступные курсы",
        "dash.browse": "Смотреть курсы",
        "dash.registered": "Мои зарегистрированные курсы",
        "dash.viewMy": "Посмотреть мои курсы",
        "dash.credits": "Всего кредитов",
        "dash.semester": "Текущий семестр",
        "dash.weekly": "Моё недельное расписание",

        "sched.time": "Время",
        "sched.empty": "Пока нет зарегистрированных курсов.",
        "sched.registerBtn": "Записаться на курсы",

        "day.mon": "Понедельник",
        "day.tue": "Вторник",
        "day.wed": "Среда",
        "day.thu": "Четверг",
        "day.fri": "Пятница",

        "cat.all": "Все",
        "cat.cs": "Информатика",
        "cat.math": "Математика",
        "cat.languages": "Языки",
        "cat.physics": "Физика",
        "cat.economics": "Экономика",
        "cat.design": "Дизайн",

        "catalog.title": "Каталог курсов",
        "catalog.subtitle": "Просматривайте курсы и записывайтесь на них.",

        "filter.search": "Поиск курсов",
        "filter.searchPh": "Поиск по названию, коду или преподавателю...",
        "filter.category": "Категория",
        "filter.day": "День",
        "filter.instructor": "Преподаватель",
        "filter.credits": "Кредиты",
        "filter.any": "Любой",
        "filter.onlyAvailable": "Только курсы со свободными местами",
        "filter.sort": "Сортировать",
        "filter.reset": "Сбросить фильтры",
        "filter.results": "Найдено курсов: {count}",

        "sort.code": "Код курса",
        "sort.name": "Название",
        "sort.instructor": "Преподаватель",
        "sort.credits": "Кредиты",
        "sort.seats": "Свободные места",
        "sort.day": "День и время",
        "sort.asc": "По возрастанию",
        "sort.desc": "По убыванию",

        "col.code": "Код",
        "col.course": "Курс",
        "col.schedule": "Расписание",

        "course.noResults": "Курсы не найдены.",
        "course.instructor": "Преподаватель",
        "course.credits": "Кредиты",
        "course.seats": "Свободные места",
        "course.day": "День",
        "course.time": "Время",
        "course.location": "Аудитория",
        "course.description": "Описание курса",
        "course.viewDetails": "Подробнее",
        "course.back": "← Назад к курсам",
        "course.register": "Записаться на курс",
        "course.already": "Вы уже записаны",
        "course.full": "Мест нет",
        "course.registeredBadge": "Записан",
        "course.unregister": "Отказаться",

        "room.room": "Ауд.",
        "room.lab": "Лаб.",

        "mycourses.title": "Мои курсы",
        "mycourses.subtitle": "Ваши зарегистрированные курсы на этот семестр.",
        "mycourses.none": "Вы ещё не записаны ни на один курс.",

        "confirm.register": "Записаться на курс «{name}»?",
        "confirm.unregister": "Вы уверены, что хотите отказаться от курса?",
        "msg.registered": "Вы успешно записались на курс «{name}»",

        "err.alreadyRegistered": "Вы уже записаны на этот курс.",
        "err.noSeats": "Свободных мест нет.",
        "err.conflict": "Не удалось записаться: конфликт расписания с курсом «{name}»!",
        "err.notFound": "Курс не найден.",
        "err.wrongInstructor": "Этот преподаватель не ведёт данный курс. Выберите преподавателя, указанного для курса.",

        "auth.locked": "Слишком много неудачных попыток. Доступ заблокирован на {time}.",
        "auth.invalid": "Неверный email или пароль. Осталось попыток: {n}",
        "auth.emailTaken": "Этот email уже зарегистрирован.",
        "auth.idTaken": "Этот студенческий ID уже зарегистрирован.",
        "auth.sessionExpired": "Срок сессии истёк. Войдите снова.",
        "auth.loginFirst": "Сначала войдите в систему.",
        "auth.denied": "Доступ запрещён! Недостаточно прав.",

        "time.min": "мин",
        "time.sec": "сек"
    },

    // =========================
    // kazakh
    // =========================
    kk: {
        "app.title": "Онлайн сабақ кестесі",
        "footer": "KBTU онлайн сабақ кестесі © 2026",

        "login.title": "Қайта қош келдіңіз",
        "login.email": "Email",
        "login.password": "Құпия сөз",
        "login.button": "Кіру",
        "login.newStudent": "Жаңа студентсіз бе?",
        "login.register": "Тіркелу",

        "reg.title": "Студентті тіркеу",
        "reg.fullName": "Аты-жөні",
        "reg.namePh": "Толық аты-жөніңіз",
        "reg.studentId": "Студент ID",
        "reg.passwordPh": "Кемінде 6 таңба",
        "reg.create": "Аккаунт құру",
        "reg.already": "Тіркеліп қойдыңыз ба?",
        "reg.success": "Тіркелу сәтті аяқталды! Жүйеге кіріңіз.",

        "nav.home": "Басты бет",
        "nav.courses": "Барлық курстар",
        "nav.myCourses": "Менің курстарым",
        "nav.schedule": "Университет кестесі",
        "schedule.title": "Университет сабақтарының кестесі",
        "schedule.subtitle": "Университеттегі барлық курстардың уақытын қараңыз.",
        "schedule.legend": "Апта күндері мен басталу уақыты бойынша сабақтар",
        "section.title": "Сабақ тобын таңдаңыз",
        "section.help": "Оқытушыны, күнді және уақытты таңдаңыз. Жүйе кестедегі қайшылықтарды тексереді.",
        "nav.logout": "Шығу",

        "header.loggedInAs": "Ретінде кірді:",
        "header.language": "Тіл",

        "role.student": "Студент",
        "role.teacher": "Оқытушы",
        "role.admin": "Әкімші",

        "dash.welcome": "Қош келдіңіз, {name}!",
        "dash.subtitle": "Сіздің KBTU академиялық панеліңіз",
        "dash.available": "Қолжетімді курстар",
        "dash.browse": "Курстарды қарау",
        "dash.registered": "Тіркелген курстарым",
        "dash.viewMy": "Менің курстарымды қарау",
        "dash.credits": "Жалпы кредиттер",
        "dash.semester": "Ағымдағы семестр",
        "dash.weekly": "Апталық кестем",

        "sched.time": "Уақыт",
        "sched.empty": "Тіркелген курстар әлі жоқ.",
        "sched.registerBtn": "Курстарға тіркелу",

        "day.mon": "Дүйсенбі",
        "day.tue": "Сейсенбі",
        "day.wed": "Сәрсенбі",
        "day.thu": "Бейсенбі",
        "day.fri": "Жұма",

        "cat.all": "Барлығы",
        "cat.cs": "Информатика",
        "cat.math": "Математика",
        "cat.languages": "Тілдер",
        "cat.physics": "Физика",
        "cat.economics": "Экономика",
        "cat.design": "Дизайн",

        "catalog.title": "Курстар каталогы",
        "catalog.subtitle": "Қолжетімді курстарды қарап, тіркеліңіз.",

        "filter.search": "Курстарды іздеу",
        "filter.searchPh": "Атауы, коды немесе оқытушы бойынша іздеу...",
        "filter.category": "Санат",
        "filter.day": "Күн",
        "filter.instructor": "Оқытушы",
        "filter.credits": "Кредиттер",
        "filter.any": "Кез келген",
        "filter.onlyAvailable": "Тек бос орындары бар курстар",
        "filter.sort": "Сұрыптау",
        "filter.reset": "Сүзгілерді тазалау",
        "filter.results": "Табылған курстар: {count}",

        "sort.code": "Курс коды",
        "sort.name": "Атауы",
        "sort.instructor": "Оқытушы",
        "sort.credits": "Кредиттер",
        "sort.seats": "Бос орындар",
        "sort.day": "Күн және уақыт",
        "sort.asc": "Өсу бойынша",
        "sort.desc": "Кему бойынша",

        "col.code": "Коды",
        "col.course": "Курс",
        "col.schedule": "Кесте",

        "course.noResults": "Курстар табылмады.",
        "course.instructor": "Оқытушы",
        "course.credits": "Кредиттер",
        "course.seats": "Бос орындар",
        "course.day": "Күн",
        "course.time": "Уақыты",
        "course.location": "Орны",
        "course.description": "Курс сипаттамасы",
        "course.viewDetails": "Толығырақ",
        "course.back": "← Курстарға оралу",
        "course.register": "Курсқа тіркелу",
        "course.already": "Тіркелгенсіз",
        "course.full": "Бос орын жоқ",
        "course.registeredBadge": "Тіркелген",
        "course.unregister": "Тіркеуден шығу",

        "room.room": "Ауд.",
        "room.lab": "Зертх.",

        "mycourses.title": "Менің курстарым",
        "mycourses.subtitle": "Осы семестрге тіркелген курстарыңыз.",
        "mycourses.none": "Сіз әлі ешбір курсқа тіркелмегенсіз.",

        "confirm.register": "«{name}» курсына тіркелесіз бе?",
        "confirm.unregister": "Тіркеуден шығуға сенімдісіз бе?",
        "msg.registered": "«{name}» курсына сәтті тіркелдіңіз",

        "err.alreadyRegistered": "Сіз бұл курсқа тіркелгенсіз.",
        "err.noSeats": "Бос орын қалмады.",
        "err.conflict": "Тіркелу сәтсіз: «{name}» курсымен кесте сәйкес келмейді!",
        "err.notFound": "Курс табылмады.",
        "err.wrongInstructor": "Бұл оқытушы осы пәнге бекітілмеген. Пәнге көрсетілген оқытушыны таңдаңыз.",

        "auth.locked": "Тым көп қате әрекет. Қолжетімділік {time} бұғатталды.",
        "auth.invalid": "Email немесе құпия сөз қате. Қалған әрекет: {n}",
        "auth.emailTaken": "Бұл email бұрын тіркелген.",
        "auth.idTaken": "Бұл студент ID бұрын тіркелген.",
        "auth.sessionExpired": "Сессия мерзімі аяқталды. Қайта кіріңіз.",
        "auth.loginFirst": "Алдымен жүйеге кіріңіз.",
        "auth.denied": "Қолжетімділік жоқ! Құқығыңыз жеткіліксіз.",

        "time.min": "мин",
        "time.sec": "сек"
    }
};

/* detect language */
function detectLanguage() {
    try {
        const saved = localStorage.getItem(LANG_KEY);

        if (saved && LANGS[saved]) {
            return saved;
        }
    } catch (error) {
        // poka bos
    }

    const browserLang = (navigator.language || "en")
        .slice(0, 2)
        .toLowerCase();

    return LANGS[browserLang] ? browserLang : "en";
}

let currentLang = detectLanguage();

document.documentElement.lang = currentLang;

function t(key, params) {
    let text =
        (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
        TRANSLATIONS.en[key] ||
        key;

    if (params) {
        Object.keys(params).forEach(name => {
            text = text.split("{" + name + "}").join(params[name]);
        });
    }

    return text;
}

// en, ru, kz auystyrushyy
function loc(value) {
    if (value && typeof value === "object") {
        return value[currentLang] || value.en || "";
    }

    return value;
}

/* tildi auystyru fucn */
function setLanguage(lang) {
    if (!LANGS[lang]) {
        return;
    }

    currentLang = lang;

    try {
        localStorage.setItem(LANG_KEY, lang);
    } catch (error) {
        // ignore
    }

    document.documentElement.lang = lang;
    document.title = t("app.title");
}
function esc(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}