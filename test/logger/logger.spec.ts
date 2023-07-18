import { assert } from 'chai';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import LoggerUtils, { Logger } from '../../src/logger/logger';
import { LogLevel } from '../../src/types';

describe('Logger tests', () => {
	describe('constructor', () => {
		it('given name and logLevel, should set the name and log level correctly', () => {
			// given
			const name = 'FakeLogger';
			const logLevel = LogLevel.DEBUG;

			// when
			const logger = new Logger(name, logLevel);

			// then
			assert.equal(logger.getName(), name);
			assert.equal(logger.getLevel(), logLevel);
		});

		it('given name only, should set the log level as DEBUG when not provided', () => {
			// given
			const name = 'FakeLogger';

			// when
			const logger = new Logger('FakeLogger');

			// then
			assert.equal(logger.getName(), name);
			assert.equal(logger.getLevel(), LogLevel.DEBUG);
		});
	});

	describe('logHandler', () => {
		let formatSpy: SinonSpy;
		let isLevelEnoughSpy: SinonSpy;

		beforeEach(() => {
			formatSpy = sinon.spy(LoggerUtils, 'format');
			isLevelEnoughSpy = sinon.spy(LoggerUtils, 'isLevelEnough');
		});

		it('given arguments, should call the formatter and console.warn with the given arguments when log level is set to TRACE', () => {
			// given
			const name = 'FakeLogger';
			const logLevel = LogLevel.TRACE;
			const logger = new Logger(name, logLevel);

			const consoleTraceStub = sinon.stub(console, 'trace');

			// when
			logger.trace('Hello', 'World');

			// then
			assert.isTrue(isLevelEnoughSpy.calledOnceWithExactly(logger.getLevel(), LogLevel.TRACE));
			assert.isTrue(formatSpy.calledOnceWithExactly(LogLevel.TRACE, name, ['Hello', 'World']));
			assert.isTrue(consoleTraceStub.calledWithMatch(sinon.match.string, 'Hello', 'World'));
		});

		it('given arguments,should call the formatter and console.warn with the given arguments when log level is set to DEBUG', () => {
			// given
			const name = 'FakeLogger';
			const logLevel = LogLevel.DEBUG;
			const logger = new Logger(name, logLevel);

			const consoleDebugStub = sinon.stub(console, 'debug');

			// when
			logger.debug('Hello', 'World');

			// then
			assert.isTrue(isLevelEnoughSpy.calledOnceWithExactly(logger.getLevel(), LogLevel.DEBUG));
			assert.isTrue(formatSpy.calledOnceWithExactly(LogLevel.DEBUG, name, ['Hello', 'World']));
			assert.isTrue(consoleDebugStub.calledWithMatch(sinon.match.string, 'Hello', 'World'));
		});

		it('given arguments,should call the formatter and console.info with the given arguments when log level is set to INFO', () => {
			// given
			const name = 'FakeLogger';
			const logLevel = LogLevel.INFO;
			const logger = new Logger(name, logLevel);

			const consoleInfoStub = sinon.stub(console, 'info');

			// when
			logger.info('Hello', 'World');

			// then
			assert.isTrue(isLevelEnoughSpy.calledOnceWithExactly(logger.getLevel(), LogLevel.INFO));
			assert.isTrue(formatSpy.calledOnceWithExactly(LogLevel.INFO, name, ['Hello', 'World']));
			assert.isTrue(consoleInfoStub.calledWithMatch(sinon.match.string, 'Hello', 'World'));
		});

		it('given arguments,should call the formatter and console.warn with the given arguments when log level is set to WARN', () => {
			// given
			const name = 'FakeLogger';
			const logLevel = LogLevel.WARN;
			const logger = new Logger(name, logLevel);

			const consoleWarnStub = sinon.stub(console, 'warn');

			// when
			logger.warn('Hello', 'World');

			// then
			assert.isTrue(isLevelEnoughSpy.calledOnceWithExactly(logger.getLevel(), LogLevel.WARN));
			assert.isTrue(formatSpy.calledOnceWithExactly(LogLevel.WARN, name, ['Hello', 'World']));
			assert.isTrue(consoleWarnStub.calledWithMatch(sinon.match.string, 'Hello', 'World'));
		});

		it('given arguments,should call the formatter and console.error with the given arguments when log level is set to ERROR', () => {
			// given
			const name = 'FakeLogger';
			const logLevel = LogLevel.ERROR;
			const logger = new Logger(name, logLevel);

			const consoleErrorStub = sinon.stub(console, 'error');

			// when
			logger.error('Hello', 'World');

			// then
			assert.isTrue(isLevelEnoughSpy.calledOnceWithExactly(logger.getLevel(), LogLevel.ERROR));
			assert.isTrue(formatSpy.calledOnceWithExactly(LogLevel.ERROR, name, ['Hello', 'World']));
			assert.isTrue(consoleErrorStub.calledWithMatch(sinon.match.string, 'Hello', 'World'));
		});

		it('given arguments,should call the formatter and console.log with the given arguments when log level is set to LOG', () => {
			// given
			const name = 'FakeLogger';
			const logLevel = LogLevel.LOG;
			const logger = new Logger(name, logLevel);

			const consoleLogStub = sinon.stub(console, 'log');

			// when
			logger.log('Hello', 'World');

			// then
			assert.isTrue(isLevelEnoughSpy.calledOnceWithExactly(logger.getLevel(), LogLevel.LOG));
			assert.isTrue(formatSpy.calledOnceWithExactly(LogLevel.LOG, name, ['Hello', 'World']));
			assert.isTrue(consoleLogStub.calledWithMatch(sinon.match.string, 'Hello', 'World'));
		});
	});

	describe('setLevel', () => {
		it('should set the log level to the given value', () => {
			// given
			const logger = new Logger('Test', LogLevel.INFO);

			// when
			logger.setLevel(LogLevel.WARN);

			// then
			assert.equal(logger.getLevel(), LogLevel.WARN);
		});
	});
});
