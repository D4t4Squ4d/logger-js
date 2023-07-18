import { LogLevel } from '../types';

export const LogLevelSeverity: { [level in LogLevel]: number } = {
	[LogLevel.TRACE]: 1,
	[LogLevel.DEBUG]: 2,
	[LogLevel.INFO]: 3,
	[LogLevel.WARN]: 4,
	[LogLevel.ERROR]: 5,
	[LogLevel.LOG]: Infinity,
	[LogLevel.OFF]: -1,
};
