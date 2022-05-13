<script lang="ts">
	import type { Value } from 'src/value'

	export let toggle: Value<any>
	export let value: any
</script>

<tool on:click={() => toggle.set(value)}>
	<slot />
</tool>
