declare module '*.svelte' {
	export { SvelteComponentDev as default } from 'svelte/internal'
}

declare module '*.glsl' {
	const value: string
	export default value
}

declare module '*.frag' {
	const value: string
	export default value
}

declare module '*.vert' {
	const value: string
	export default value
}

