/**
 * Format Date to DD/MM/YYYY-HH:MM:SS
 * @param {Date} [date=new Date()]
 * @return {String}
 */
 function getDateString(date = new Date()) {
	const option = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
	const str = new Intl.DateTimeFormat('fr-FR', option).format(date);
	return str.replaceAll(', ', '-');
}

/**
 * @property {Number} value
 * @property {String} name
 * @class LogLevel
 */
class LogLevel {
	static TRACE = new LogLevel(1, 'TRACE');
	static DEBUG = new LogLevel(2, 'DEBUG');
	static INFO = new LogLevel(3, 'INFO');
	static WARN = new LogLevel(4, 'WARN');
	static ERROR = new LogLevel(5, 'ERROR');
	static OFF = new LogLevel(99, 'OFF');

	constructor(value, name) {
		this.value = value;
		this.name = name;
	}
}

/**
 * @property {String} name
 * @property {LogLevel} level
 * @class Logger
 */
class Logger {
	constructor(name = null, logLevel = LogLevel.OFF) {
		this.name = name;
		this.level = logLevel;
	}

	/**
	 *
	 * @memberof Logger
	 */
	trace() {
		this.logHandler(LogLevel.TRACE, arguments);
	}

	/**
	 *
	 * @memberof Logger
	 */
	debug() {
		this.logHandler(LogLevel.DEBUG, arguments);
	}

	/**
	 *
	 * @memberof Logger
	 */
	info() {
		this.logHandler(LogLevel.INFO, arguments);
	}

	/**
	 *
	 * @memberof Logger
	 */
	warn() {
		this.logHandler(LogLevel.WARN, arguments);
	}

	/**
	 *
	 * @memberof Logger
	 */
	error() {
		this.logHandler(LogLevel.ERROR, arguments);
	}

	/**
	 * No matter what log level is set, write to the console anyway
	 * @memberof Logger
	 */
	log() {
		this.logHandler(LogLevel.OFF, arguments);
	}

	/**
	 *
	 * @param {LogLevel} level
	 * @param {any[]} msgArgs
	 * @memberof Logger
	 */
	logHandler(level, msgArgs) {
		if (this.isEnough(level)) {
			const messages = Array.prototype.slice.call(msgArgs);
			let consoleMethod = console.log;

			if (level === LogLevel.WARN && console.warn) {
				consoleMethod = console.warn;
			} else if (level === LogLevel.ERROR && console.error) {
				consoleMethod = console.error;
			} else if (level === LogLevel.INFO && console.info) {
				consoleMethod = console.info;
			} else if (level === LogLevel.DEBUG && console.debug) {
				consoleMethod = console.debug;
			} else if (level === LogLevel.TRACE && console.trace) {
				consoleMethod = console.trace;
			}

			this.formatter(messages, level);
			Function.prototype.apply.call(consoleMethod, console, messages);
		}
	}

	/**
	 * Set level of Logger
	 * @param {LogLevel} level
	 */
	isEnough(level) {
		return level.value >= this.level.value;
	}

	/**
	 *
	 * @param {any[]} messages
	 * @param {LogLevel} level
	 * @memberof Logger
	 */
	formatter(messages, level) {
		messages.unshift(`[${level.name !== 'OFF' ? level.name : 'LOG'}][${this.name}] ${getDateString()} |`);
	}

	/**
	 * Set level of Logger
	 * @param {LogLevel} level
	 */
	setLevel(level) {
		this.level = level;
	}

	/**
	 * Get level of Logger
	 * @returns {LogLevel}
	 */
	getLevel() {
		return this.level;
	}
}

/**
 * @property {Map<String, Logger>} loggers
 * @extends {Logger}
 * @class GlobaLogger
 */
class GlobaLogger extends Logger {
	static instance = null;

	/**
	 * Singleton
	 * @static
	 * @return {GlobaLogger} instance
	 */
	static getInstance() {
		if (GlobaLogger.instance === null) {
			GlobaLogger.instance = new GlobaLogger();
		}

		return GlobaLogger.instance;
	}

	constructor() {
		super(null, GlobaLogger.TRACE);
		this.loggers = new Map();
	}

	/**
	 * Set level of Logger
	 * @param {LogLevel} level
	 */
	setLevel(level) {
		this.level = level;
		for (const [key, logger] of this.loggers) {
			logger.setLevel(level);
		}
	}

	/**
	 *
	 * @param {String} name
	 * @returns {Logger}
	 */
	get(name) {
		if (this.loggers.has(name)) {
			return this.loggers.get(name);
		} else {
			const logger = new Logger(name, this.getLevel());
			this.loggers.set(name, logger);
			return logger;
		}
	}
}
const loggerInstance = GlobaLogger.getInstance();

export { loggerInstance as default, LogLevel };
