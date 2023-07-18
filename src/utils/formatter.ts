import { DEFAULT_DATE_FORMAT, MAX_CHAR_LEVEL, MAX_CHAR_NAME, MAX_DYNAMIC_CHAR_LEVEL } from '../constants/formatter';
import { LogLevel } from '../types';
import { GlobalLoggerInternal } from '../logger';

export function format(level: LogLevel, name: string, args: any[]) {
	return [`[${Utils.formatLevel(level)}][${Utils.formatName(name)}] ${Utils.formatDate()} >`, ...args];
}

export function formatLevel(level: LogLevel): string {
	const max = Utils.MAX_DYNAMIC_CHAR_LEVEL > Utils.MAX_CHAR_LEVEL ? Utils.MAX_CHAR_LEVEL : Utils.MAX_DYNAMIC_CHAR_LEVEL;
	return truncOrPad(level, max);
}

export function formatName(name: string): string {
	const dynamic = GlobalLoggerInternal.maxDynamicCharName;
	const max = dynamic > Utils.MAX_CHAR_NAME ? Utils.MAX_CHAR_NAME : dynamic;
	return truncOrPad(name, max);
}

export function formatDate(date: Date = new Date(), format: string = DEFAULT_DATE_FORMAT): string {
	const tokens: { [key: string]: string } = {
		YYYY: date.getFullYear().toString(),
		MM: (date.getMonth() + 1).toString().padStart(2, '0'),
		DD: date.getDate().toString().padStart(2, '0'),
		HH: date.getHours().toString().padStart(2, '0'),
		mm: date.getMinutes().toString().padStart(2, '0'),
		ss: date.getSeconds().toString().padStart(2, '0'),
		SSS: date.getMilliseconds().toString().padStart(3, '0'),
	};

	const regex = new RegExp(Object.keys(tokens).join('|'), 'g');
	const formattedDate = format.replace(regex, (match) => tokens[match]);

	return formattedDate;
}

function truncOrPad(str: string, max: number) {
	return `${str.length > max ? str.substring(0, max - 1).concat('…') : str.padEnd(max, ' ')}`;
}

// need it for unit tests
const Utils = {
	format,
	formatLevel,
	formatName,
	formatDate,
	MAX_DYNAMIC_CHAR_LEVEL,
	MAX_CHAR_LEVEL,
	MAX_CHAR_NAME,
};
export default Utils;
