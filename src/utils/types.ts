export type CamelToKebab<T extends string> =
	T extends `${infer First}${infer Rest}`
		? Rest extends Uncapitalize<Rest>
			? `${Lowercase<First>}${CamelToKebab<Rest>}`
			: `${Lowercase<First>}-${CamelToKebab<Rest>}`
		: T

export type KebabToCamel<T extends string> =
	T extends `${infer First}-${infer Rest}`
		? `${First}${Capitalize<KebabToCamel<Rest>>}`
		: T
