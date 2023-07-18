/**
 * LogLevel indicates the severity of the log. There are several levels, from the lowest to the highest :
 *
 * TRACE > DEBUG > INFO > WARN > ERROR > LOG
 *
 * Special LogLeveL 'OFF' will disable all logs
 */
export enum LogLevel {
	/** Could log **ALL** severities */
	TRACE = 'TRACE',

	/** Could log severities : **DEBUG**, **INFO**, **WARN**, **ERROR**, **LOG** */
	DEBUG = 'DEBUG',

	/** Could log severities : **INFO**, **WARN**, **ERROR**, **LOG** */
	INFO = 'INFO',

	/** Could log severities : **WARN**, **ERROR**, **LOG** */
	WARN = 'WARN',

	/** Could log severities : **ERROR**, **LOG** */
	ERROR = 'ERROR',

	/** Could only log **LOG** severity */
	LOG = 'LOG',

	/** **Disable ALL** logs */
	OFF = 'OFF',
}

/** All values of LogLevel */
export type LogLevelString = keyof typeof LogLevel;
