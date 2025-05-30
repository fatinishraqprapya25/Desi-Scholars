export const COLORS = {
    primary: "#4F46E5",
    primaryLight: "#EEF2FF",
    primaryDark: "#4338CA",
    accent: "#10B981",
    text: "#1F2937",
    textLight: "#4B5563",
    border: "#D1D5DB",
    background: "#F9FAFB",
    gradientStart: "#EEF2FF",
    gradientEnd: "#E0E7FF",
};

export const examsData = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        icon: "💻",
        description: "Dive into the core concepts of JavaScript, from variables to functions.",
        difficulty: "Beginner",
        questions: [
            {
                question: "What does 'var' keyword do in JavaScript?",
                options: ["Declares a variable", "Defines a function", "Creates a loop", "Imports a module"],
                correct: 0,
                explanation:
                    "'var' is used to declare a variable in JavaScript, though 'let' and 'const' are preferred in modern JS.",
            },
            {
                question: "Which symbol is used for single-line comments in JavaScript?",
                options: ["//", "", "#", "/* */"],
                correct: 0,
                explanation: "// is used for single-line comments. /* */ is for multi-line comments.",
            },
            {
                question: "Which of the following is NOT a JavaScript data type?",
                options: ["String", "Boolean", "Float", "Undefined"],
                correct: 2,
                explanation:
                    "JavaScript uses 'Number' for both integers and floating-point numbers. 'Float' is not a distinct data type.",
            },
            {
                question: "How do you write 'Hello World' in an alert box?",
                options: [
                    "alertBox('Hello World');",
                    "msg('Hello World');",
                    "alert('Hello World');",
                    "msgBox('Hello World');",
                ],
                correct: 2,
                explanation: "The correct JavaScript syntax for an alert box is alert('message');.",
            },
            {
                question: "Where is the correct place to insert a JavaScript?",
                options: [
                    "The <body> section",
                    "The <head> section",
                    "Both the <head> and the <body> section",
                    "The <script> section",
                ],
                correct: 2,
                explanation:
                    "JavaScript can be placed in both the <head> and <body> sections, but placing it at the end of the <body> is often recommended for performance.",
            },
        ],
    },
    {
        id: 2,
        title: "HTML Essentials",
        icon: "🌐",
        description: "Master the building blocks of the web: HTML structure and semantics.",
        difficulty: "Beginner",
        questions: [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Trainer Marking Language",
                    "Hyper Text Markup Language",
                    "Hyper Text Marketing Language",
                    "Hyper Tool Multi Language",
                ],
                correct: 1,
                explanation: "HTML stands for HyperText Markup Language, which is used to structure content on the web.",
            },
            {
                question: "Which HTML tag is used to define an internal style sheet?",
                options: ["<script>", "<style>", "<css>", "<link>"],
                correct: 1,
                explanation: "The <style> tag is used to embed CSS styles directly within an HTML document.",
            },
            {
                question: "Which is the correct HTML element for inserting a line break?",
                options: ["<lb>", "<break>", "<br>", "<newline>"],
                correct: 2,
                explanation: "The <br> tag is used to insert a single line break.",
            },
            {
                question: "What is the correct HTML for adding a background color?",
                options: [
                    "<body bg='yellow'>",
                    "<background>yellow</background>",
                    "<body style='background-color:yellow;'>",
                    "<body color='yellow'>",
                ],
                correct: 2,
                explanation: "Inline styles using the 'style' attribute are a common way to apply background colors to HTML elements.",
            },
        ],
    },
    {
        id: 3,
        title: "CSS Styling & Layout",
        icon: "🎨",
        description: "Style your web pages with advanced CSS techniques and layout models.",
        difficulty: "Intermediate",
        questions: [
            {
                question: "Which CSS property controls the text size?",
                options: ["font-style", "text-size", "font-size", "text-style"],
                correct: 2,
                explanation: "The 'font-size' property is used to specify the size of the text.",
            },
            {
                question: "How do you select an element with id 'header'?",
                options: [".header", "#header", "header", "*header"],
                correct: 1,
                explanation: "The '#' symbol is used in CSS to select an element by its ID.",
            },
            {
                question: "Which property is used to change the background color?",
                options: ["color", "bgcolor", "background-color", "background"],
                correct: 2,
                explanation: "The 'background-color' property sets the background color of an element.",
            },
            {
                question: "How do you make the text bold?",
                options: ["font:bold;", "style:bold;", "font-weight:bold;", "text-decoration:bold;"],
                correct: 2,
                explanation: "The 'font-weight' property is used to set the boldness or lightness of the text.",
            },
        ],
    },
];

export const featureItems = [
    { icon: "💡", title: "Instant Feedback", text: "Get immediate results and see correct answers with detailed explanations.", delay: 0.5 },
    { icon: "📈", title: "Track Progress", text: "Monitor your learning journey and identify areas needing more attention.", delay: 0.6 },
    { icon: "📚", title: "Diverse Topics", text: "Explore a wide range of subjects, from web development to general knowledge.", delay: 0.7 },
];