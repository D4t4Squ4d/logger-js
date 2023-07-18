import { LogLevel } from './levels';

export interface ILogger {
	/**
	 * Log anything you want on TRACE level, works like `console.trace`
	 * ```js
	 * // examples
	 * Logger.trace("text")                         // [TRACE][Global] 1970-01-01 00:00:00.000 | test
	 * Logger.trace(1 + 2)                          // [TRACE][Global] 1970-01-01 00:00:00.000 | 3
	 * Logger.trace({ type: "object" })             // [TRACE][Global] 1970-01-01 00:00:00.000 | { type: "object" }
	 * Logger.trace("text", 1, { type: "object" })  // [TRACE][Global] 1970-01-01 00:00:00.000 | text 1 { type: 'object' }
	 * ```
	 * @param {...any[]} args
	 */
	trace(...args: any[]): void;

	/**
	 * Log anything you want on DEBUG level, works like `console.debug`
	 * ```js
	 * // examples
	 * Logger.debug("text")                         // [DEBUG][Global] 1970-01-01 00:00:00.000 | test
	 * Logger.debug(1 + 2)                          // [DEBUG][Global] 1970-01-01 00:00:00.000 | 3
	 * Logger.debug({ type: "object" })             // [DEBUG][Global] 1970-01-01 00:00:00.000 | { type: "object" }
	 * Logger.debug("text", 1, { type: "object" })  // [DEBUG][Global] 1970-01-01 00:00:00.000 | text 1 { type: 'object' }
	 * ```
	 * @param {...any[]} args
	 */
	debug(...args: any[]): void;

	/**
	 * Log anything you want on INFO level, works like `console.info`
	 * ```js
	 * // examples
	 * Logger.info("text")                         // [ INFO][Global] 1970-01-01 00:00:00.000 | test
	 * Logger.info(1 + 2)                          // [ INFO][Global] 1970-01-01 00:00:00.000 | 3
	 * Logger.info({ type: "object" })             // [ INFO][Global] 1970-01-01 00:00:00.000 | { type: "object" }
	 * Logger.info("text", 1, { type: "object" })  // [ INFO][Global] 1970-01-01 00:00:00.000 | text 1 { type: 'object' }
	 * ```
	 * @param {...any[]} args
	 */
	info(...args: any[]): void;

	/**
	 * Log anything you want on WARN level, works like `console.warn`
	 * ```js
	 * // examples
	 * Logger.warn("text")                         // [ WARN][Global] 1970-01-01 00:00:00.000 | test
	 * Logger.warn(1 + 2)                          // [ WARN][Global] 1970-01-01 00:00:00.000 | 3
	 * Logger.warn({ type: "object" })             // [ WARN][Global] 1970-01-01 00:00:00.000 | { type: "object" }
	 * Logger.warn("text", 1, { type: "object" })  // [ WARN][Global] 1970-01-01 00:00:00.000 | text 1 { type: 'object' }
	 * ```
	 * @param {...any[]} args
	 */
	warn(...args: any[]): void;

	/**
	 * Log anything you want on ERROR level, works like `console.error`
	 * ```js
	 * // examples
	 * Logger.error("text")                         // [ERROR][Global] 1970-01-01 00:00:00.000 | test
	 * Logger.error(1 + 2)                          // [ERROR][Global] 1970-01-01 00:00:00.000 | 3
	 * Logger.error({ type: "object" })             // [ERROR][Global] 1970-01-01 00:00:00.000 | { type: "object" }
	 * Logger.error("text", 1, { type: "object" })  // [ERROR][Global] 1970-01-01 00:00:00.000 | text 1 { type: 'object' }
	 * ```
	 * @param {...any[]} args
	 */
	error(...args: any[]): void;

	/**
	 * Log anything you want on LOG level, works like `console.log`
	 * ```js
	 * // examples
	 * Logger.log("text")                         // [  LOG][Global] 1970-01-01 00:00:00.000 | test
	 * Logger.log(1 + 2)                          // [  LOG][Global] 1970-01-01 00:00:00.000 | 3
	 * Logger.log({ type: "object" })             // [  LOG][Global] 1970-01-01 00:00:00.000 | { type: "object" }
	 * Logger.log("text", 1, { type: "object" })  // [  LOG][Global] 1970-01-01 00:00:00.000 | text 1 { type: 'object' }
	 * ```
	 * @param {...any[]} args
	 */
	log(...args: any[]): void;

	/** get log level of the Logger */
	getLevel(): LogLevel;

	/**
	 * Set log level of the Logger
	 * @param {LogLevel} level wanted log level
	 */
	setLevel(level: LogLevel): void;
}

export interface IGlobalLogger {
	setLevelAll(level: LogLevel): void;
}

export interface LoggerFactory {
	/**
	 * Retrieve or instantiate a new Logger with the name given in parameter
	 * ```js
	 * //example
	 * const MyLogger = GlobalLogger.get('MyLogger');
	 * MyLogger.log("something"); // [  LOG][MyLogger] 1970-01-01 00:00:00.000 | something
	 * ```
	 */
	get(name: string, level?: LogLevel): ILogger;
}
