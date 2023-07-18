import { LogLevel, ILogger } from '../types';
import { format, isLevelEnough } from '../utils';

/**
 *
 *
 * @class Logger
 * @implements {ILogger}
 */
export class Logger implements ILogger {
	protected name: string;
	protected level: LogLevel;

	constructor(name: string, logLevel = LogLevel.DEBUG) {
		this.name = name;
		this.level = logLevel;
	}

	public trace(...args) {
		this.logHandler(LogLevel.TRACE, args);
	}

	public debug(...args) {
		this.logHandler(LogLevel.DEBUG, args);
	}

	public info(...args) {
		this.logHandler(LogLevel.INFO, args);
	}

	public warn(...args) {
		this.logHandler(LogLevel.WARN, args);
	}

	public error(...args) {
		this.logHandler(LogLevel.ERROR, args);
	}

	public log(...args) {
		this.logHandler(LogLevel.LOG, args);
	}

	private logHandler(level: LogLevel, msgArgs: any[]) {
		if (LoggerUtils.isLevelEnough(this.level, level)) {
			let consoleMethod = console.log;

			if (level === LogLevel.TRACE && console.trace) {
				consoleMethod = console.trace;
			} else if (level === LogLevel.DEBUG && console.debug) {
				consoleMethod = console.debug;
			} else if (level === LogLevel.INFO && console.info) {
				consoleMethod = console.info;
			} else if (level === LogLevel.WARN && console.warn) {
				consoleMethod = console.warn;
			} else if (level === LogLevel.ERROR && console.error) {
				consoleMethod = console.error;
			}

			const args = LoggerUtils.format(level, this.name, msgArgs);
			LoggerUtils.apply.call(consoleMethod, console, args);
		}
	}

	public getName() {
		return this.name;
	}

	public getLevel() {
		return this.level;
	}
	public setLevel(level: LogLevel) {
		this.level = level;
	}
}

// need it for unit tests
const LoggerUtils = {
	format,
	isLevelEnough,
	apply: Function.prototype.apply,
};
export default LoggerUtils;
