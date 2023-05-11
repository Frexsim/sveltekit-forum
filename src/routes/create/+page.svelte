<script>
	import Selector from "$lib/components/selector.svelte"
	import SelectorItem from "$lib/components/selectorItem.svelte"
	
	export let data;
	const { tags } = data;
</script>

<h1>Create Post</h1>
<form method="post" action="?/post">
	<label>
		Title
		<input type="text" name="title" placeholder="Title" min-length="3" required>
	</label>
	<br><br>
	<label>
		Content
		<textarea name="content" placeholder="Content" maxlength="10000" rows="6" cols="65" required></textarea>
	</label>
	<br><br>
	<label>
		Tags
		<Selector>
			<SelectorItem>test</SelectorItem>
		</Selector>
	</label>
	<br><br>
	<input type="submit" name="submit" value="Create Post">
</form>

<style>
	input[type="text"] {
		width: 100%;
	}

	textarea[name="content"] {
		min-width: 100%;
		max-width: 100%;
		
		min-height: 64px;
		max-height: 10%;

		vertical-align: text-top;
	}
</style>