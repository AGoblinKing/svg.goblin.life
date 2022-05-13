const esbuild = require('esbuild')
const esbuildSvelte = require('esbuild-svelte')
const sveltePreprocess = require('svelte-preprocess')
const { glsl } = require('esbuild-plugin-glsl')
const runAll = require("npm-run-all")

esbuild
	.build({
		entryPoints: ['src/index.ts' ],
		bundle: true,
		watch: process.env.DEV == 1,
		outdir: './public/build',
		plugins: [
			esbuildSvelte({
				filterWarnings: () => false,
				preprocess: sveltePreprocess()
			}),
			glsl({
				minify: false
			})
		]
	})
	.catch(() => process.exit(1))


esbuild
	.build({
		entryPoints: ['src/test/runner.ts', 'src/server.ts'],
		bundle: true,
		platform: 'node',
		watch: process.env.DEV == 1 ? { 
			onRebuild(error) {
				if(error) return

				runAll(["test"], { stdout: process.stdout, stderr: process.stderr })
			}
		} : false,
		outdir: './build',
		plugins: [
		
		]
	})
	.catch(() => process.exit(1))

console.log('[esbuild]', process.env.DEV == 1 ? 'WATCHING' : 'BUILDING')
