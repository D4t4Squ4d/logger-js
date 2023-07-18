import { assert, expect } from 'chai';
import sinon from 'sinon';
import { GlobalLogger, GlobalLoggerInternal, LoggerFactory, UtilsGlobalLoggers as Utils, Logger } from '../../src/logger';
import { LogLevel } from '../../src/types';

describe("GlobalLogger tests", () => {
	describe('GlobalLogger', () => {
		describe('setLevelAll', () => {
			it('given multiple loggers, should set the log level of all loggers in the map to the given value', () => {
				// given
				const logger1 = LoggerFactory.get('Logger1');
				const logger2 = LoggerFactory.get('Logger2');

				const setLevelStub1 = sinon.stub(GlobalLogger, 'setLevel');
				const setLevelStub2 = sinon.stub(logger1, 'setLevel');
				const setLevelStub3 = sinon.stub(logger2, 'setLevel');
	
	
				// when
				GlobalLogger.setLevelAll(LogLevel.WARN);
	
				// then
				assert.isTrue(setLevelStub1.calledWith(LogLevel.WARN));
				assert.isTrue(setLevelStub2.calledWith(LogLevel.WARN));
				assert.isTrue(setLevelStub3.calledWith(LogLevel.WARN));
			});
		});
	});
	describe("GlobalLoggerInternal tests", () => {
		describe('getInstance', () => {
			it('should return the same instance of GlobalLoggerInternal', () => {
				// when
				const instance1 = Utils.GlobalLoggerInternal.getInstance();
				const instance2 = Utils.GlobalLoggerInternal.getInstance();
	
				// then
				assert.strictEqual(instance1, instance2);
			});
		});
		describe('get', () => {
			beforeEach(() => {
				GlobalLoggerInternal.getLoggers().clear();
				GlobalLoggerInternal.getLoggers().set(GlobalLoggerInternal.getName(), GlobalLoggerInternal);
			});

			it('given name, should return the logger with the given name if it exists in the loggers map', () => {
				// given
				const name = 'FakeLogger'
				const logger = new Logger(name);
				GlobalLoggerInternal.getLoggers().set(logger.getName(), logger);
	
				// when
				const result = GlobalLoggerInternal.get(name);
	
				// then
				assert.strictEqual(result, logger);
			});
	
			it('given name, should create and return a new logger with the given name if it does not exist in the loggers map', () => {
				// given
				const name = 'FakeLogger'
	
				// when
				const result = GlobalLoggerInternal.get(name);
	
				// then
				assert.instanceOf(result, Logger);
				assert.strictEqual(result.getName(), name);
			});
	
			it('given name and logLevel, should create and return a new logger with the given parameters if it does not exist in the loggers map', () => {
				// given
				const name = 'FakeLogger'
				const logLevel = LogLevel.INFO
	
				// when
				const result = GlobalLoggerInternal.get(name, logLevel);
	
				// then
				assert.instanceOf(result, Logger);
				assert.strictEqual(result.getName(), name);
				assert.strictEqual(result.getLevel(), logLevel);
			});
		});
	});
	describe("LoggerFactory tests", () => {
		it("given parameters, when get, then created logger should be in GlobalLogger loggers", () => {
			// given
			const name = 'fakeName';
			const level = LogLevel.INFO;

			// when
			const logger = LoggerFactory.get(name,level);

			// then
			assert.deepEqual(logger, GlobalLoggerInternal.getLoggers().get(name));
		});
	});
});