import { LogLevel } from '../types';
import { calculateLongestElement } from '../utils/misc';

export const MAX_CHAR_LEVEL = 8; // 10 with []
export const MAX_CHAR_NAME = 23; // 25 with []
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

export const MAX_DYNAMIC_CHAR_LEVEL = calculateLongestElement(LogLevel);
