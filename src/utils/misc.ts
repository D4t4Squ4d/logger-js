export function calculateLongestElement(elements: string[] | object): number {
	const strings = Array.isArray(elements) ? elements : (Object.values(elements) as string[]);

	const maxLength = strings.reduce((max, element) => {
		const elementLength = element.length;
		return elementLength > max ? elementLength : max;
	}, 0);

	return maxLength;
}
