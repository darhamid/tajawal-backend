export interface IPaging {
	index: number;
	size: number;
}

export const defaultPaging: IPaging = { index: 0, size: 10 };