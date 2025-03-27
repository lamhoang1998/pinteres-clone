export type TRes<T> = {
	status: string;
	code: number;
	message: string;
	metaData: T;
};
