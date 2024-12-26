const pythonQuestions = [
    // EASY QUESTIONS (8)
    {
        question: "What is Python's primary philosophy?",
        choices: [
            "Beautiful is better than ugly",
            "Complex is better than simple",
            "Speed over readability",
            "More ways to do one thing"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used for comments in Python?",
        choices: [
            "#",
            "//",
            "/*",
            "'"
        ],
        correct: 0
    },
    {
        question: "How do you create a variable 'age' with value 25?",
        choices: [
            "age = 25",
            "var age = 25",
            "int age = 25",
            "age := 25"
        ],
        correct: 0
    },
    {
        question: "What is the correct way to create a list in Python?",
        choices: [
            "my_list = [1, 2, 3]",
            "my_list = array(1, 2, 3)",
            "my_list = list(1, 2, 3)",
            "my_list = {1, 2, 3}"
        ],
        correct: 0
    },
    {
        question: "Which function prints text to the console?",
        choices: [
            "print()",
            "console.log()",
            "echo()",
            "write()"
        ],
        correct: 0
    },
    {
        question: "What is the correct file extension for Python files?",
        choices: [
            ".py",
            ".python",
            ".pt",
            ".pyt"
        ],
        correct: 0
    },
    {
        question: "How do you create a single-line comment in Python?",
        choices: [
            "# This is a comment",
            "// This is a comment",
            "/* This is a comment */",
            "-- This is a comment"
        ],
        correct: 0
    },
    {
        question: "What is the correct way to check if 5 equals 5 in Python?",
        choices: [
            "5 == 5",
            "5 = 5",
            "5 === 5",
            "5 equals 5"
        ],
        correct: 0
    },

    // MEDIUM QUESTIONS (9)
    {
        question: "What is the purpose of the __init__ method in Python classes?",
        choices: [
            "Constructor method for object initialization",
            "Destructor method for cleanup",
            "Iterator method for loops",
            "Import method for modules"
        ],
        correct: 0
    },
    {
        question: "What is a list comprehension used for?",
        choices: [
            "Creating a list based on existing iterables",
            "Sorting a list in ascending order",
            "Combining two lists together",
            "Removing items from a list"
        ],
        correct: 0
    },
    {
        question: "What does the 'self' parameter represent in class methods?",
        choices: [
            "Reference to the current instance",
            "Reference to the parent class",
            "Reference to the module",
            "Reference to the Python interpreter"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of virtual environments in Python?",
        choices: [
            "To isolate project dependencies",
            "To speed up Python execution",
            "To compress Python files",
            "To encrypt Python code"
        ],
        correct: 0
    },
    {
        question: "How do you handle exceptions in Python?",
        choices: [
            "try/except blocks",
            "if/else statements",
            "while loops",
            "for loops"
        ],
        correct: 0
    },
    {
        question: "What is the difference between append() and extend() for lists?",
        choices: [
            "append() adds one element, extend() adds multiple elements",
            "append() adds multiple elements, extend() adds one element",
            "They are exactly the same",
            "append() is for numbers, extend() is for strings"
        ],
        correct: 0
    },
    {
        question: "What are decorators in Python?",
        choices: [
            "Functions that modify other functions",
            "Special comments in code",
            "Type of loop structure",
            "Database connections"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of the 'with' statement?",
        choices: [
            "Ensures proper handling of resources",
            "Creates a new function",
            "Defines a new class",
            "Imports external modules"
        ],
        correct: 0
    },
    {
        question: "What is the difference between '==' and 'is' operators?",
        choices: [
            "'==' compares values, 'is' compares identity",
            "They are exactly the same",
            "'==' is for numbers, 'is' is for strings",
            "'is' compares values, '==' compares identity"
        ],
        correct: 0
    },

    // HARD QUESTIONS (8)
    {
        question: "What is a metaclass in Python?",
        choices: [
            "A class that defines behavior of other classes",
            "A class that contains only methods",
            "A class that cannot be instantiated",
            "A class that handles databases"
        ],
        correct: 0
    },
    {
        question: "What is the Global Interpreter Lock (GIL)?",
        choices: [
            "A mutex that protects Python objects",
            "A security feature for file access",
            "A type of Python package",
            "A database connection lock"
        ],
        correct: 0
    },
    {
        question: "How does Python's garbage collection work?",
        choices: [
            "Reference counting and generational collection",
            "Manual memory management",
            "Automatic deletion of all unused variables",
            "System calls to free memory"
        ],
        correct: 0
    },
    {
        question: "What is a generator function and how does it differ from regular functions?",
        choices: [
            "Uses 'yield' to return values one at a time",
            "Always returns multiple values",
            "Generates random numbers only",
            "Creates new functions dynamically"
        ],
        correct: 0
    },
    {
        question: "What is monkey patching in Python?",
        choices: [
            "Modifying classes/modules at runtime",
            "Debugging technique",
            "Testing methodology",
            "Performance optimization"
        ],
        correct: 0
    },
    {
        question: "Explain Python's descriptor protocol:",
        choices: [
            "Defines __get__, __set__, __delete__ methods",
            "Defines how to create new classes",
            "Handles file I/O operations",
            "Manages database connections"
        ],
        correct: 0
    },
    {
        question: "What is the difference between deep and shallow copy?",
        choices: [
            "Deep copy creates new objects for nested structures",
            "Deep copy is faster than shallow copy",
            "Shallow copy creates new objects for nested structures",
            "There is no difference"
        ],
        correct: 0
    },
    {
        question: "What are context managers and how are they implemented?",
        choices: [
            "Classes with __enter__ and __exit__ methods",
            "Special type of loops",
            "Database connection handlers",
            "File compression utilities"
        ],
        correct: 0
    }
];
