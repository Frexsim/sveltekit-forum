<script>
	var open = false;
	var selectedOptions = ["test", "test2"];
</script>

<div class="box click" on:click="{() => {open = !open}}">
	{#if selectedOptions.length > 0}
		{#each selectedOptions as selectedOption}
			<span>{selectedOption}</span>
		{/each}
	{:else}
		No options selected
	{/if}
</div>

{#if open == true}
	<div class="box">
	</div>
{/if}

<style>
	span {
		margin-right: 8px;
	}
	
	.box {
		min-width: 64px;

		padding: 8px;
		
		background-color: #f0f0f0;

		border: 1px gray solid;
		border-radius: 8px;
	}

	.click {
		cursor: pointer;
	}
</style>