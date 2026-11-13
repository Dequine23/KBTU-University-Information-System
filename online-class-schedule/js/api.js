const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri"];

const REGISTRATIONS_KEY = "kbtu_registrations";
const SECTIONS_KEY = "kbtu_sections";

const COURSES = [
    {
        id: 1,
        code: "CS101",
        category: "cs",
        name: {
            en: "Introduction to Programming",
            ru: "Введение в программирование",
            kk: "Бағдарламалауға кіріспе"
        },
        description: {
            en: "Learn programming fundamentals, algorithms and problem solving.",
            ru: "Основы программирования, алгоритмы и решение задач.",
            kk: "Бағдарламалау негіздері, алгоритмдер және есеп шығару."
        },
        instructor: "John Smith",
        credits: 5,
        day: "mon",
        start: "09:00",
        end: "10:50",
        room: { kind: "room", no: "301" },
        seats: 20
    },
    {
        id: 2,
        code: "CS205",
        category: "cs",
        name: {
            en: "Database Management Systems",
            ru: "Системы управления базами данных",
            kk: "Дерекқорды басқару жүйелері"
        },
        description: {
            en: "Learn SQL, database design, relationships and data management.",
            ru: "SQL, проектирование баз данных, связи между таблицами и управление данными.",
            kk: "SQL, дерекқор жобалау, кестелер арасындағы байланыстар және деректерді басқару."
        },
        instructor: "Michael Brown",
        credits: 5,
        day: "tue",
        start: "11:00",
        end: "12:50",
        room: { kind: "room", no: "204" },
        seats: 15
    },
    {
        id: 3,
        code: "MATH101",
        category: "math",
        name: {
            en: "Calculus I",
            ru: "Математический анализ I",
            kk: "Математикалық анализ I"
        },
        description: {
            en: "Introduction to limits, derivatives and integrals.",
            ru: "Введение в пределы, производные и интегралы.",
            kk: "Шектерге, туындыларға және интегралдарға кіріспе."
        },
        instructor: "Sarah Wilson",
        credits: 4,
        day: "wed",
        start: "09:00",
        end: "10:50",
        room: { kind: "room", no: "105" },
        seats: 25
    },
    {
        id: 4,
        code: "ENG102",
        category: "languages",
        name: {
            en: "Academic English",
            ru: "Академический английский",
            kk: "Академиялық ағылшын тілі"
        },
        description: {
            en: "Develop academic writing, speaking and communication skills.",
            ru: "Развитие навыков академического письма, речи и общения.",
            kk: "Академиялық жазу, сөйлеу және қарым-қатынас дағдыларын дамыту."
        },
        instructor: "David Johnson",
        credits: 3,
        day: "thu",
        start: "14:00",
        end: "15:50",
        room: { kind: "room", no: "402" },
        seats: 18
    },
    {
        id: 5,
        code: "CS310",
        category: "cs",
        name: {
            en: "Computer Networks",
            ru: "Компьютерные сети",
            kk: "Компьютерлік желілер"
        },
        description: {
            en: "Study network architecture, protocols and communication.",
            ru: "Архитектура сетей, протоколы и сетевое взаимодействие.",
            kk: "Желі архитектурасы, протоколдар және желілік байланыс."
        },
        instructor: "Alex Miller",
        credits: 5,
        day: "fri",
        start: "10:00",
        end: "11:50",
        room: { kind: "lab", no: "2" },
        seats: 12
    },
    {
        id: 6,
        code: "STAT201",
        category: "math",
        name: {
            en: "Statistics",
            ru: "Статистика",
            kk: "Статистика"
        },
        description: {
            en: "Study probability, distributions and statistical analysis.",
            ru: "Вероятность, распределения и статистический анализ.",
            kk: "Ықтималдық, таралулар және статистикалық талдау."
        },
        instructor: "Emily Davis",
        credits: 4,
        day: "mon",
        start: "13:00",
        end: "14:50",
        room: { kind: "room", no: "210" },
        seats: 20
    },
    {
        id: 7,
        code: "KAZ101",
        category: "languages",
        name: {
            en: "Kazakh Language",
            ru: "Казахский язык",
            kk: "Қазақ тілі"
        },
        description: {
            en: "Develop Kazakh language skills for academic and everyday communication.",
            ru: "Развитие навыков казахского языка для учёбы и повседневного общения.",
            kk: "Оқуға және күнделікті қарым-қатынасқа арналған қазақ тілі дағдыларын дамыту."
        },
        instructor: "Aigerim Nurlanova",
        credits: 3,
        day: "tue",
        start: "09:00",
        end: "10:50",
        room: { kind: "room", no: "103" },
        seats: 30
    },
    {
        id: 8,
        code: "RUS101",
        category: "languages",
        name: {
            en: "Russian Language",
            ru: "Русский язык",
            kk: "Орыс тілі"
        },
        description: {
            en: "Develop Russian language skills for academic and everyday communication.",
            ru: "Развитие навыков русского языка для учёбы и повседневного общения.",
            kk: "Оқуға және күнделікті қарым-қатынасқа арналған орыс тілі дағдыларын дамыту."
        },
        instructor: "Dana Sadykova",
        credits: 3,
        day: "wed",
        start: "14:00",
        end: "15:50",
        room: { kind: "room", no: "108" },
        seats: 30
    },
    {
        id: 9,
        code: "PHYS101",
        category: "physics",
        name: {
            en: "General Physics",
            ru: "Общая физика",
            kk: "Жалпы физика"
        },
        description: {
            en: "Mechanics, thermodynamics and the basics of electricity and magnetism.",
            ru: "Механика, термодинамика и основы электричества и магнетизма.",
            kk: "Механика, термодинамика, электр және магнетизм негіздері."
        },
        instructor: "Robert Taylor",
        credits: 4,
        day: "thu",
        start: "09:00",
        end: "10:50",
        room: { kind: "room", no: "220" },
        seats: 22
    },
    {
        id: 10,
        code: "ECON101",
        category: "economics",
        name: {
            en: "Microeconomics",
            ru: "Микроэкономика",
            kk: "Микроэкономика"
        },
        description: {
            en: "Study consumer and firm behavior, markets and prices.",
            ru: "Поведение потребителей и фирм, рынки и цены.",
            kk: "Тұтынушылар мен фирмалардың мінез-құлқы, нарықтар және бағалар."
        },
        instructor: "Anna Lee",
        credits: 3,
        day: "fri",
        start: "16:00",
        end: "17:50",
        room: { kind: "room", no: "305" },
        seats: 25
    },
    {
        id: 11,
        code: "UX201",
        category: "design",
        name: {
            en: "UI/UX Design",
            ru: "UI/UX дизайн",
            kk: "UI/UX дизайн"
        },
        description: {
            en: "Learn user research, wireframing, prototyping and interface design.",
            ru: "Исследование пользователей, wireframe, прототипирование и дизайн интерфейсов.",
            kk: "Пайдаланушыларды зерттеу, wireframe, прототиптеу және интерфейс дизайны."
        },
        instructor: "Kamila Bekova",
        credits: 4,
        day: "tue",
        start: "14:00",
        end: "15:50",
        room: { kind: "lab", no: "1" },
        seats: 15
    },
    {
        id: 12,
        code: "CS220",
        category: "cs",
        name: {
            en: "Web Development",
            ru: "Веб-разработка",
            kk: "Веб-әзірлеу"
        },
        description: {
            en: "Build modern websites with HTML, CSS, JavaScript and backend basics.",
            ru: "Создание современных сайтов на HTML, CSS, JavaScript и основы backend.",
            kk: "HTML, CSS, JavaScript арқылы заманауи сайттар жасау және backend негіздері."
        },
        instructor: "Daniel Carter",
        credits: 5,
        day: "wed",
        start: "11:00",
        end: "12:50",
        room: { kind: "lab", no: "3" },
        seats: 18
    },
    {
        id: 13,
        code: "MATH202",
        category: "math",
        name: {
            en: "Linear Algebra",
            ru: "Линейная алгебра",
            kk: "Сызықтық алгебра"
        },
        description: {
            en: "Vectors, matrices, linear systems and eigenvalues.",
            ru: "Векторы, матрицы, системы линейных уравнений и собственные значения.",
            kk: "Векторлар, матрицалар, сызықтық теңдеулер жүйесі және меншікті мәндер."
        },
        instructor: "Sarah Wilson",
        credits: 4,
        day: "thu",
        start: "11:00",
        end: "12:50",
        room: { kind: "room", no: "107" },
        seats: 24
    },
    {
        id: 14,
        code: "CS240",
        category: "cs",
        name: {
            en: "Operating Systems",
            ru: "Операционные системы",
            kk: "Операциялық жүйелер"
        },
        description: {
            en: "Processes, memory management, file systems and concurrency.",
            ru: "Процессы, управление памятью, файловые системы и параллелизм.",
            kk: "Процестер, жадты басқару, файлдық жүйелер және параллелизм."
        },
        instructor: "Timur Akhmetov",
        credits: 5,
        day: "mon",
        start: "11:00",
        end: "12:50",
        room: { kind: "room", no: "215" },
        seats: 20
    },
    {
        id: 15,
        code: "CS330",
        category: "cs",
        name: {
            en: "Cybersecurity Fundamentals",
            ru: "Основы кибербезопасности",
            kk: "Киберқауіпсіздік негіздері"
        },
        description: {
            en: "Threats, cryptography basics, secure authentication and network defense.",
            ru: "Угрозы, основы криптографии, безопасная аутентификация и защита сети.",
            kk: "Қауіптер, криптография негіздері, қауіпсіз аутентификация және желіні қорғау."
        },
        instructor: "Nurlan Kassymov",
        credits: 5,
        day: "mon",
        start: "14:00",
        end: "15:50",
        room: { kind: "lab", no: "4" },
        seats: 16
    },
    {
        id: 16,
        code: "CS250",
        category: "cs",
        name: {
            en: "Data Structures and Algorithms",
            ru: "Структуры данных и алгоритмы",
            kk: "Деректер құрылымдары мен алгоритмдер"
        },
        description: {
            en: "Lists, trees, graphs, sorting and algorithm complexity.",
            ru: "Списки, деревья, графы, сортировка и сложность алгоритмов.",
            kk: "Тізімдер, ағаштар, графтар, сұрыптау және алгоритм күрделілігі."
        },
        instructor: "John Smith",
        credits: 5,
        day: "fri",
        start: "15:00",
        end: "16:50",
        room: { kind: "lab", no: "2" },
        seats: 20
    },
    {
        id: 17,
        code: "MATH301",
        category: "math",
        name: {
            en: "Discrete Mathematics",
            ru: "Дискретная математика",
            kk: "Дискретті математика"
        },
        description: {
            en: "Logic, sets, combinatorics and graph theory.",
            ru: "Логика, множества, комбинаторика и теория графов.",
            kk: "Логика, жиындар, комбинаторика және графтар теориясы."
        },
        instructor: "Olga Ivanova",
        credits: 4,
        day: "tue",
        start: "13:00",
        end: "14:50",
        room: { kind: "room", no: "112" },
        seats: 26
    },
    {
        id: 18,
        code: "ECON201",
        category: "economics",
        name: {
            en: "Macroeconomics",
            ru: "Макроэкономика",
            kk: "Макроэкономика"
        },
        description: {
            en: "National income, inflation, unemployment and economic policy.",
            ru: "Национальный доход, инфляция, безработица и экономическая политика.",
            kk: "Ұлттық табыс, инфляция, жұмыссыздық және экономикалық саясат."
        },
        instructor: "Anna Lee",
        credits: 3,
        day: "wed",
        start: "16:00",
        end: "17:50",
        room: { kind: "room", no: "306" },
        seats: 25
    },
    {
        id: 19,
        code: "DES101",
        category: "design",
        name: {
            en: "Graphic Design Basics",
            ru: "Основы графического дизайна",
            kk: "Графикалық дизайн негіздері"
        },
        description: {
            en: "Composition, color theory and typography fundamentals.",
            ru: "Композиция, теория цвета и основы типографики.",
            kk: "Композиция, түс теориясы және типографика негіздері."
        },
        instructor: "Kamila Bekova",
        credits: 3,
        day: "thu",
        start: "16:00",
        end: "17:50",
        room: { kind: "lab", no: "1" },
        seats: 18
    },
    {
        id: 20,
        code: "PHYS201",
        category: "physics",
        name: {
            en: "Optics and Waves",
            ru: "Оптика и волны",
            kk: "Оптика және толқындар"
        },
        description: {
            en: "Wave motion, light, interference and optical instruments.",
            ru: "Волновые процессы, свет, интерференция и оптические приборы.",
            kk: "Толқындық қозғалыс, жарық, интерференция және оптикалық құралдар."
        },
        instructor: "Robert Taylor",
        credits: 4,
        day: "mon",
        start: "16:00",
        end: "17:50",
        room: { kind: "room", no: "221" },
        seats: 20
    },
    {
     id: 21,
        code: "INFT3107",
        category: "cs",
        name: {
            en: "Basics of Information Systems",
            ru: "Основы информационных систем",
            kk: "Ақпараттық жүйелер негіздері"
        },
        description: {
            en: "Collection, processing, storage of information, basics of information management systems.",
            ru: "Сбор, обработка, хранение информации, Основы систем управления информацией.",
            kk: "Ақпаратты жинау, өңдеу және сақтау."
        },
        instructor: "Issabek A.",
        credits: 3,
        day: "fri",
        start: "13:00",
        end: "13:50",
        room: { kind: "room", no: "222" },
        seats: 74
    }
];

function readRegistrations() {
    try {
        return JSON.parse(localStorage.getItem(REGISTRATIONS_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function writeRegistrations(data) {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(data));
}

function readSections() {
    try { return JSON.parse(localStorage.getItem(SECTIONS_KEY)) || {}; }
    catch (error) { return {}; }
}

function timeToMinutes(value) {
    const parts = value.split(":");

    return Number(parts[0]) * 60 + Number(parts[1]);
}

function coursesOverlap(a, b) {
    return (
        a.day === b.day &&
        timeToMinutes(a.start) < timeToMinutes(b.end) &&
        timeToMinutes(b.start) < timeToMinutes(a.end)
    );
}

// =================================
// PUBLIC API
// =================================
const CourseAPI = {

    getAll() {
        return COURSES;
    },

    getById(id) {
        return COURSES.find(course => course.id === id) || null;
    },

    getCategories() {
        return [...new Set(COURSES.map(course => course.category))];
    },

    getInstructors() {
        return [...new Set(COURSES.map(course => course.instructor))].sort();
    },

    getCreditOptions() {
        return [...new Set(COURSES.map(course => course.credits))]
            .sort((a, b) => a - b);
    },

    getSeatsLeft(id) {
        const course = this.getById(id);

        if (!course) {
            return 0;
        }

        const taken = Object.values(readRegistrations())
            .filter(ids => ids.includes(id))
            .length;

        return Math.max(0, course.seats - taken);
    },

    getRegisteredIds(email) {
        return readRegistrations()[email.toLowerCase()] || [];
    },

    getSection(email, id) {
        const sections = readSections();
        return sections[email.toLowerCase() + ":" + id] || this.getById(id);
    },

    getTotalCredits(email) {
        const ids = this.getRegisteredIds(email);

        return COURSES
            .filter(course => ids.includes(course.id))
            .reduce((total, course) => total + course.credits, 0);
    },

    // filterlar: { term, category, day, instructor, credits, onlyAvailable, sortBy }
    search(filters) {
        const f = filters || {};
        const term = (f.term || "").trim().toLowerCase();

        const list = COURSES.filter(course => {

            if (term) {
                const haystack = [
                    course.code,
                    course.instructor,
                    course.name.en,
                    course.name.ru,
                    course.name.kk
                ].join(" ").toLowerCase();

                if (!haystack.includes(term)) return false;
            }

            if (f.category && f.category !== "all" &&
                course.category !== f.category) return false;

            if (f.day && f.day !== "all" &&
                course.day !== f.day) return false;

            if (f.instructor && f.instructor !== "all" &&
                course.instructor !== f.instructor) return false;

            if (f.credits && f.credits !== "all" &&
                course.credits !== Number(f.credits)) return false;

            if (f.onlyAvailable &&
                this.getSeatsLeft(course.id) <= 0) return false;

            return true;
        });

        const sortBy = f.sortBy || "code";
        const direction = f.sortDir === "desc" ? -1 : 1;

        const byCode = (a, b) =>
            a.code.localeCompare(b.code, "en", { numeric: true });

        const comparators = {
            code: byCode,

            name: (a, b) =>
                loc(a.name).localeCompare(loc(b.name), currentLang),

            instructor: (a, b) =>
                a.instructor.localeCompare(b.instructor, "en"),

            credits: (a, b) => a.credits - b.credits,

            seats: (a, b) =>
                this.getSeatsLeft(a.id) - this.getSeatsLeft(b.id),

            // day of week first, then start time
            day: (a, b) =>
                DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) ||
                timeToMinutes(a.start) - timeToMinutes(b.start)
        };

        const compare = comparators[sortBy] || byCode;

        list.sort((a, b) => direction * compare(a, b) || byCode(a, b));

        return list;
    },

    // barlygyn tekseredy saktamai aq.
    canRegister(email, id, section) {
        const course = this.getById(id);

        if (!course) {
            return { success: false, error: "err.notFound" };
        }

        const registeredIds = this.getRegisteredIds(email);

        if (registeredIds.includes(id)) {
            return { success: false, error: "err.alreadyRegistered" };
        }

        if (section && section.instructor && section.instructor !== course.instructor) {
            return { success: false, error: "err.wrongInstructor" };
        }

        if (this.getSeatsLeft(id) <= 0) {
            return { success: false, error: "err.noSeats" };
        }

        const selected = { ...course, ...(section || {}) };
        const conflictId = registeredIds.find(otherId => {
            const other = { ...this.getById(otherId), ...this.getSection(email, otherId) };
            return coursesOverlap(other, selected);
        });
        const conflict = conflictId ? this.getById(conflictId) : null;

        if (conflict) {
            return {
                success: false,
                error: "err.conflict",
                params: { name: loc(conflict.name) }
            };
        }

        return { success: true };
    },

    register(email, id, section) {
        const check = this.canRegister(email, id, section);

        if (!check.success) {
            return check;
        }

        const key = email.toLowerCase();
        const data = readRegistrations();

        data[key] = (data[key] || []).concat(id);
        const sections = readSections();
        sections[key + ":" + id] = { ...section };
        localStorage.setItem(SECTIONS_KEY, JSON.stringify(sections));

        writeRegistrations(data);

        return { success: true };
    },

    unregister(email, id) {
        const key = email.toLowerCase();
        const data = readRegistrations();

        data[key] = (data[key] || []).filter(courseId => courseId !== id);
        const sections = readSections();
        delete sections[key + ":" + id];
        localStorage.setItem(SECTIONS_KEY, JSON.stringify(sections));

        writeRegistrations(data);

        return { success: true };
    }
};