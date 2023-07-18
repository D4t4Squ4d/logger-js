import { assert } from 'chai';
import sinon from 'sinon';
import Utils from '../../src/utils/formatter';
import { GlobalLoggerInternal } from '../../src/logger';
import { LogLevel } from '../../src/types';

describe('formatter tests', () => {
	describe('format tests', () => {
		it('given LogLevel, args and name, should call formatLevel, formatName and formatDate', () => {
			// given
			const logLevel = LogLevel.INFO;
			const name = 'fakeLogger';
			const args = ['fake log'];

			const spyLevel = sinon.spy(Utils, 'formatLevel');
			const spyName = sinon.spy(Utils, 'formatName');
			const spyDate = sinon.spy(Utils, 'formatDate');

			// when
			Utils.format(logLevel, name, args);

			// then
			assert(spyLevel.calledOnceWith(logLevel));
			assert(spyName.calledOnceWith(name));
			assert(spyDate.calledOnceWith());
		});
		it('given args, should insert string at the beggining into args', () => {
			// given
			const args = ['fake log'];

			sinon.stub(Utils, 'formatLevel').returns('fakeLevel');
			sinon.stub(Utils, 'formatName').returns('fakeName');
			sinon.stub(Utils, 'formatDate').returns('fake-date');

			// when
			const actual = Utils.format(LogLevel.INFO, 'fakeLogger', args);

			// then
			assert.equal(actual.length, 2);
			assert.equal(actual[0], '[fakeLevel][fakeName] fake-date >');
			assert.equal(actual[1], 'fake log');
		});
	});
	describe('formatLevel tests', () => {
		it('given small name of logLevel smaller than MAX_DYNAMIC_CHAR_LEVEL, then should add space at end', () => {
			// given
			const logLevel = LogLevel.LOG;
			sinon.replace(Utils, 'MAX_DYNAMIC_CHAR_LEVEL', 4);

			// when
			const actual = Utils.formatLevel(logLevel);

			// then
			assert.equal(actual, 'LOG ');
		});
		it('given long name of logLevel bigger than MAX_DYNAMIC_CHAR_LEVEL, then should trunc LogLevel', () => {
			// given
			const logLevel = LogLevel.ERROR;
			sinon.replace(Utils, 'MAX_DYNAMIC_CHAR_LEVEL', 4);

			// when
			const actual = Utils.formatLevel(logLevel);

			// then
			assert.equal(actual, 'ERR…');
		});
		it('given name of logLevel with same value of MAX_DYNAMIC_CHAR_LEVEL, then should not modify name', () => {
			// given
			const logLevel = LogLevel.WARN;
			sinon.replace(Utils, 'MAX_DYNAMIC_CHAR_LEVEL', 4);

			// when
			const actual = Utils.formatLevel(logLevel);

			// then
			assert.equal(actual, 'WARN');
		});
		it('given long name with MAX_DYNAMIC_CHAR_LEVEL bigger than MAX_CHAR_LEVEL, then should trunc name with MAX_CHAR_LEVEL size', () => {
			// given
			const logLevel = LogLevel.ERROR;
			sinon.replace(Utils, 'MAX_DYNAMIC_CHAR_LEVEL', 5);
			sinon.replace(Utils, 'MAX_CHAR_LEVEL', 3);

			// when
			const actual = Utils.formatLevel(logLevel);

			// then
			assert.equal(actual, 'ER…');
			assert.equal(actual.length, Utils.MAX_CHAR_LEVEL);
		});
	});
	describe('formatName tests', () => {
		it('given small name with bigger max dynamic value, then should add space at end', () => {
			// given
			const name = 'Small';
			GlobalLoggerInternal.maxDynamicCharName = 10;

			// when
			const actual = Utils.formatName(name);

			// then
			assert.equal(actual, 'Small     ');
		});
		it('given long name with smaller max dynamic value, then should trunc name', () => {
			// given
			const name = 'LongNameForSure';
			GlobalLoggerInternal.maxDynamicCharName = 10;

			// when
			const actual = Utils.formatName(name);

			// then
			assert.equal(actual, 'LongNameF…');
		});
		it('given name with same value of max dynamic value, then should not modify name', () => {
			// given
			const name = 'PerfectName';
			GlobalLoggerInternal.maxDynamicCharName = 11;

			// when
			const actual = Utils.formatName(name);

			// then
			assert.equal(actual, 'PerfectName');
		});
		it('given very long name with max dynamic value bigger than MAX_CHAR_NAME, then should trunc name with MAX_CHAR_NAME size', () => {
			// given
			const name = 'VeryLongNameButINeedItReally';
			GlobalLoggerInternal.maxDynamicCharName = 30;

			// when
			const actual = Utils.formatName(name);

			// then
			assert.equal(actual, 'VeryLongNameButINeedIt…');
			assert.equal(actual.length, Utils.MAX_CHAR_NAME);
		});
	});
	describe('formatDate tests', () => {
		it('given nothing, should format the current date using the default format', () => {
			// given
			sinon.useFakeTimers(new Date('2009-01-09T02:54:25.123').getTime());
	
			// when
			const formattedDate = Utils.formatDate();
	
			// then
			assert.equal(formattedDate, '2009-01-09 02:54:25.123')
		});
	
		it('given date and format, should format a provided date using the provided format', () => {
			// given
			const customDate = new Date('2000-01-01T01:34:56');
	
			// when
			const formattedDate = Utils.formatDate(customDate, 'YYYY/MM/DD');
	
			// then
			assert.equal(formattedDate, '2000/01/01')
		});
	
		it('given format, should format the current date using provided format', () => {
			// given
			sinon.useFakeTimers(new Date('2015-07-30T03:26:13.123').getTime());
	
			// when
			const formattedDate = Utils.formatDate(undefined, 'YYYY/MM/DD HHhmmmsss');
	
			// then
			assert.equal(formattedDate, '2015/07/30 03h26m13s')
		});
		it('given date and format with arbitrary text, should handle it', () => {
			// given
			const customDate = new Date('1970-01-01');
	
			// when
			const formattedDate = Utils.formatDate(customDate, 'Timestamp 0 is YYYY-MM-DD');
	
			// then
			assert.equal(formattedDate, 'Timestamp 0 is 1970-01-01');
		});
		it('given date and empty format, should return an empty string', () => {
			// given
			const customDate = new Date('2023-07-14');
	
			// when
			const formattedDate = Utils.formatDate(customDate, '');
	
			// then
			assert.equal(formattedDate, '');
		});
	});
});
