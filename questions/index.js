import { javascriptEasyQuestions } from './javascript/JavaScript-easy.js';
import { javascriptMediumQuestions } from './javascript/JavaScript-medium.js';
import { javascriptHardQuestions } from './javascript/JavaScript-hard.js';

import { pythonEasyQuestions } from './python/Python-easy.js';
import { pythonMediumQuestions } from './python/Python-medium.js';
import { pythonHardQuestions } from './python/Python-hard.js';

import { htmlcssEasyQuestions } from './htmlcss/HTML-easy.js';
import { htmlcssMediumQuestions } from './htmlcss/HTML-medium.js';
import { htmlcssHardQuestions } from './htmlcss/HTML-hard.js';

import { goEasyQuestions } from './go/easy.js';
import { goMediumQuestions } from './go/medium.js';
import { goHardQuestions } from './go/hard.js';

import { literatureEasy, literatureMedium, literatureHard } from './literature/index.js';

export const questions = {
    javascript: {
        easy: javascriptEasyQuestions,
        medium: javascriptMediumQuestions,
        hard: javascriptHardQuestions
    },
    python: {
        easy: pythonEasyQuestions,
        medium: pythonMediumQuestions,
        hard: pythonHardQuestions
    },
    htmlcss: {
        easy: htmlcssEasyQuestions,
        medium: htmlcssMediumQuestions,
        hard: htmlcssHardQuestions
    },
    go: {
        easy: goEasyQuestions,
        medium: goMediumQuestions,
        hard: goHardQuestions
    },
    literature: {
        easy: literatureEasy,
        medium: literatureMedium,
        hard: literatureHard
    }
};
