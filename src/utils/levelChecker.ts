import { LogLevel } from '../types';
import { LogLevelSeverity } from '../constants/levels';

export function isLevelEnough(logLevel: LogLevel, wantedLogLevel: LogLevel) {
	return logLevel !== LogLevel.OFF && (wantedLogLevel === LogLevel.LOG || LogLevelSeverity[logLevel] <= LogLevelSeverity[wantedLogLevel]);
}
