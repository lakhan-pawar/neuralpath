// Interview-focused "How It Works" explanations for system designs
// Concise, memorable explanations perfect for interviews

import { HOW_IT_WORKS_PART1 } from './howItWorks1';
import { HOW_IT_WORKS_PART2 } from './howItWorks2';
import { HOW_IT_WORKS_PART3 } from './howItWorks3';

// Merge all parts into single object
export const HOW_IT_WORKS: Record<string, string> = {
  ...HOW_IT_WORKS_PART1,
  ...HOW_IT_WORKS_PART2,
  ...HOW_IT_WORKS_PART3,
};
