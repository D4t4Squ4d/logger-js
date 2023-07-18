import { assert } from 'chai';
import { isLevelEnough } from '../../src/utils/levelChecker';
import { LogLevel } from '../../src/types';

describe("levelChecker tests", () => {
	describe("isLevelEnough tests", () => {
		it('given logLevel OFF, should return false', () => {
			// given
			const logLevel = LogLevel.OFF;
			const wantedLogLevel = LogLevel.LOG;

			// when
			const actual = isLevelEnough(logLevel, wantedLogLevel);

			// then
			assert.isFalse(actual);
		});
		it('given logLevel other than OFF and wantedLogLevel LOG, should return true', () => {
			// given
			const logLevel = LogLevel.LOG;
			const wantedLogLevel = LogLevel.LOG;

			// when
			const actual = isLevelEnough(logLevel, wantedLogLevel);

			// then
			assert.isTrue(actual);
		});
		it('given logLevel DEBUG and wantedLogLevel INFO, should return true', () => {
			// given
			const logLevel = LogLevel.DEBUG;
			const wantedLogLevel = LogLevel.INFO;

			// when
			const actual = isLevelEnough(logLevel, wantedLogLevel);

			// then
			assert.isTrue(actual);
		});
		it('given logLevel INFO and wantedLogLevel DEBUG, should return false', () => {
			// given
			const logLevel = LogLevel.INFO;
			const wantedLogLevel = LogLevel.DEBUG;

			// when
			const actual = isLevelEnough(logLevel, wantedLogLevel);

			// then
			assert.isFalse(actual);
		});
	});
});