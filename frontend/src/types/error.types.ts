export interface ApiErrorResponse {
	// data: {

	// 	status: number;
	// 	statusText: string;
	// 	headers: {
	// 		"content-length": string;
	// 		"content-type": string;
	// 	};
	// };
	status: string;
	code: number;
	message: string;
	stack: string | null;
}
