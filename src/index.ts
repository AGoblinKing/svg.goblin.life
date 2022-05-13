import Main from "./main.svelte"

const app = new Main({
	target: document.getElementById('svelte'),
	props: {}
})


window.addEventListener("contextmenu", e => e.preventDefault())