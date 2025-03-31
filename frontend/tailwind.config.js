/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"lg-page": "hsla(9, 100%, 64%, 0.5)",
				"lg-container": "hsla(12, 100%, 64%, 0.8)",
				"input-bg": "rgba(255, 255, 255, 0.8)",
			},
		},
	},
	plugins: [],
};
