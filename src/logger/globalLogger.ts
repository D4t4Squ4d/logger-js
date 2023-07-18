import { LogLevel, IGlobalLogger, LoggerFactory } from '../types';
import { calculateLongestElement } from '../utils/misc';
import { Logger } from './logger';

const GLOBAL_LOGGER_NAME = 'Global';

class GlobalLogger extends Logger implements IGlobalLogger {
	protected loggers: Map<string, Logger>;

	protected constructor() {
		super(GLOBAL_LOGGER_NAME);
		this.loggers = new Map();
		this.loggers.set(this.name, this);
	}

	public setLevelAll(level: LogLevel) {
		for (const logger of this.loggers.values()) {
			logger.setLevel(level);
		}
	}
}

class GlobalLoggerInternal extends GlobalLogger {
	private static instance: GlobalLoggerInternal = null;
	private maxCharName = 0;

	public static getInstance() {
		if (GlobalLoggerInternal.instance === null) {
			GlobalLoggerInternal.instance = new GlobalLoggerInternal();
		}

		return GlobalLoggerInternal.instance;
	}

	private constructor() {
		super();
		this.calculMaxCharName();
	}

	public get(name: string, level: LogLevel = undefined): Logger {
		if (this.loggers.has(name)) {
			return this.loggers.get(name);
		} else {
			const logger = new Logger(name, level ?? this.getLevel());
			this.loggers.set(name, logger);
			this.calculMaxCharName();
			return logger;
		}
	}

	public get maxDynamicCharName() {
		return this.maxCharName;
	}

	public set maxDynamicCharName(maxCharName) {
		this.maxCharName = maxCharName;
	}

	public getLoggers() {
		return this.loggers;
	}

	private calculMaxCharName() {
		this.maxCharName = calculateLongestElement(Array.from(this.loggers.keys()));
	}
}

const internalInstance = GlobalLoggerInternal.getInstance();
const instance = internalInstance as GlobalLogger;
const factory = { get: internalInstance.get.bind(internalInstance) } as LoggerFactory;

export { internalInstance as GlobalLoggerInternal };
export { instance as GlobalLogger };
export { factory as LoggerFactory };

const UtilsGlobalLoggers = { GlobalLogger, GlobalLoggerInternal };
export { UtilsGlobalLoggers };
