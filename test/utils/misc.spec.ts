import { assert } from 'chai';
import { calculateLongestElement } from '../../src/utils/misc';

describe('misc tests', () => {
	describe('calculateLongestElement tests', () => {
		it('given tab of string, then should return longest element ]', () => {
			// given
			const elements = ['one', 'two', 'three']; // three => 5

			// when
			const actual = calculateLongestElement(elements);

			// then
			assert.equal(actual, 5);
		});
		it('given object with only string values, then should return longest value ]', () => {
			// given
			const object = { a: 'one', b: 'two', c: 'three' }; // three => 5

			// when
			const actual = calculateLongestElement(object);

			// then
			assert.equal(actual, 5);
		});
		it('given object with mixed values, then should return longest value ]', () => {
			// given
			const object = { a: 'one', b: 2, c: 3 }; // one => 3

			// when
			const actual = calculateLongestElement(object);

			// then
			assert.equal(actual, 3);
		});
		it('given object with any string, then should return 0 ]', () => {
			// given
			const object = { a: { sub: 'one' }, b: 2, c: true };

			// when
			const actual = calculateLongestElement(object);

			// then
			assert.equal(actual, 0);
		});
	});
});
