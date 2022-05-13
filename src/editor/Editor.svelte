<script lang="ts">
	import Game from 'src/game.svelte'

	import { ETool, isTall, local, show_editor, tool } from 'src/state'
	import Tool from './Tool.svelte'
</script>

<editor class:isTall={$isTall}>
	{#if $show_editor}
		<left_pane />
	{/if}
	<main>
		{#if $show_editor}
			<tools>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={local} value={!$local}>{$local ? 'local' : 'global'}</Tool>
			</tools>
		{/if}
		<Game />
		{#if $show_editor}
			<tools>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
				<Tool toggle={tool} value={ETool.Erase}>{ETool.Erase}</Tool>
			</tools>
		{/if}
	</main>
	{#if $show_editor}
		<right_pane />
	{/if}
</editor>

<style>
	editor {
		flex: 1;
		display: flex;
		flex-direction: row;
	}

	editor.isTall {
		flex-direction: column;
	}

	main {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	left_pane,
	right_pane {
		width: 20vw;
		background-color: #f0f0f0;
	}

	.isTall left_pane,
	.isTall right_pane {
		width: auto;
		height: 20vh;
	}

	tools {
		display: flex;
		flex-direction: row;
		background-color: gray;
	}
</style>
