const questions = [
    {
        question: "What is JavaScript primarily used for?",
        choices: [
            "Web Development",
            "Machine Learning",
            "Database Management",
            "Operating Systems"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        choices: [
            "#",
            "//",
            "/* */",
            "Both // and /* */"
        ],
        correct: 3
    },
    {
        question: "What method is used to add elements to the end of an array?",
        choices: [
            "push()",
            "append()",
            "add()",
            "insert()"
        ],
        correct: 0
    },
    {
        question: "Which built-in method returns the length of a string?",
        choices: [
            "length()",
            "size()",
            "length",
            "count()"
        ],
        correct: 2
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        choices: [
            "variable name;",
            "var name;",
            "v name;",
            "int name;"
        ],
        correct: 1
    },
    {
        question: "Which method removes the last element from an array?",
        choices: [
            "pop()",
            "last()",
            "remove()",
            "delete()"
        ],
        correct: 0
    },
    {
        question: "What will '2' + 2 return in JavaScript?",
        choices: [
            "4",
            "22",
            "NaN",
            "Error"
        ],
        correct: 1
    },
    {
        question: "Which operator is used for strict equality comparison?",
        choices: [
            "==",
            "===",
            "=",
            "!="
        ],
        correct: 1
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choices: [
            "var colors = 'red', 'green', 'blue'",
            "var colors = ['red', 'green', 'blue']",
            "var colors = (red, green, blue)",
            "var colors = {'red', 'green', 'blue'}"
        ],
        correct: 1
    },
    {
        question: "What method is used to convert a string to lowercase?",
        choices: [
            "toLower()",
            "lowerCase()",
            "toLowerCase()",
            "convertLower()"
        ],
        correct: 2
    },
    {
        question: "Which event occurs when a user clicks on an HTML element?",
        choices: [
            "onmouseclick",
            "onclick",
            "onchange",
            "onmouseover"
        ],
        correct: 1
    },
    {
        question: "How do you declare a function in JavaScript?",
        choices: [
            "function:myFunction()",
            "function = myFunction()",
            "function myFunction()",
            "def myFunction()"
        ],
        correct: 2
    },
    {
        question: "What is the correct way to write an IF statement?",
        choices: [
            "if i = 5 then",
            "if i == 5 then",
            "if (i == 5)",
            "if i = 5"
        ],
        correct: 2
    },
    {
        question: "How do you find the minimum of x and y?",
        choices: [
            "min(x,y)",
            "Math.min(x,y)",
            "Math.minimum(x,y)",
            "minimum(x,y)"
        ],
        correct: 1
    },
    {
        question: "What is the correct JavaScript syntax to change the content of an HTML element with id 'demo'?",
        choices: [
            "document.getElementById('demo').innerHTML = 'Hello'",
            "#demo.innerHTML = 'Hello'",
            "document.getElement('demo').innerHTML = 'Hello'",
            "document.innerHTML('demo') = 'Hello'"
        ],
        correct: 0
    },
    {
        question: "What is the default value of an uninitialized variable?",
        choices: [
            "0",
            "null",
            "undefined",
            "NaN"
        ],
        correct: 2
    },
    {
        question: "Which method is used to parse a string to an integer?",
        choices: [
            "Integer.parse()",
            "parseInt()",
            "parseNumber()",
            "Number.parse()"
        ],
        correct: 1
    },
    {
        question: "What does JSON.stringify() do?",
        choices: [
            "Converts an object to JSON string",
            "Parses JSON to an object",
            "Validates JSON data",
            "Formats JSON data"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of the 'use strict' directive in JavaScript?",
        choices: [
            "Enforces stricter parsing and error handling",
            "Makes the code run faster",
            "Allows use of deprecated features",
            "Enables new JavaScript features"
        ],
        correct: 0
    },
    {
        question: "What is a Promise in JavaScript?",
        choices: [
            "A way to handle asynchronous operations",
            "A guarantee of code execution",
            "A type of function",
            "A data storage method"
        ],
        correct: 0
    },
    {
        question: "Which method is used to schedule a function to run after a delay?",
        choices: [
            "delay()",
            "wait()",
            "setTimeout()",
            "schedule()"
        ],
        correct: 2
    },
    {
        question: "What does the 'map' method do in JavaScript?",
        choices: [
            "Creates a new array with results of a function",
            "Modifies the original array",
            "Sorts the array elements",
            "Filters out array elements"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        choices: [
            "References the current object",
            "Creates a new object",
            "Defines a function",
            "Declares a variable"
        ],
        correct: 0
    },
    {
        question: "What is a closure in JavaScript?",
        choices: [
            "A function with access to outer variables",
            "A way to close a program",
            "A method to end a loop",
            "A type of array"
        ],
        correct: 0
    },
    {
        question: "Which operator is used for string concatenation in JavaScript?",
        choices: [
            "+",
            "&",
            "|",
            ","
        ],
        correct: 0
    }
];
