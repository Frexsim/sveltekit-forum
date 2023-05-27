import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from "fs";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit()
	],
	server: {
		https: {
			key: fs.readFileSync("ca.key"),
			cert: fs.readFileSync("ca.crt"),
		},
		port: 8080,
	},
	preview: {
		https: {
			key: fs.readFileSync("ca.key"),
			cert: fs.readFileSync("ca.crt"),
		},
		port: 8080,
	},
};

export default config;
