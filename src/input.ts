import { Value } from 'src/value'

export const key_down = new Value('')
export const key_up = new Value('')
export const key_map = new Value({})

function bounce(e: KeyboardEvent) {
	return (
		// @ts-ignore
		e.target.tagName === 'INPUT'
	)
}

window.addEventListener('keydown', (e) => {
	if (bounce(e)) return

	e.preventDefault()
	const k = e.key.toLowerCase()

	key_down.set(k)

})

key_down.on(($k) => {
	key_map.$[$k] = true
	key_map.poke()
})

window.addEventListener('keyup', (e) => {
	if (bounce(e)) return
	const k = e.key.toLowerCase()

	key_up.set(k)

})

key_up.on(($k) => {
	key_map.$[$k] = false
	key_map.poke()
})

