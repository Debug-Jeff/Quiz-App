// Import the separated question files
import { javascriptEasyQuestions } from './questions/javascript/JavaScript-easy.js';
import { javascriptMediumQuestions } from './questions/javascript/JavaScript-medium.js';
import { javascriptHardQuestions } from './questions/javascript/JavaScript-hard.js';

// Export combined questions if needed
export const javascriptQuestions = {
    easy: javascriptEasyQuestions,
    medium: javascriptMediumQuestions,
    hard: javascriptHardQuestions
};
