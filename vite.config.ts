import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		basicSsl()
	],
	server: {
		port: 8080,
	},
	preview: {
		port: 8080,
	},
};

export default config;
