import { literatureEasyQuestions as literatureEasy } from './literatureEasy.js';
import { literatureMediumQuestions as literatureMedium } from './literatureMedium.js';
import { literatureHardQuestions as literatureHard } from './literatureHard.js';

export {
    literatureEasy,
    literatureMedium,
    literatureHard
};

// Combined questions array if needed
export const allLiteratureQuestions = [
    ...literatureEasy,
    ...literatureMedium,
    ...literatureHard
];
