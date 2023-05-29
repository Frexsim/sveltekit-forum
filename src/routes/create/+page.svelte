<script>
	import { page } from "$app/stores";
</script>

{#if $page.data.session && $page.data.session.user}
	<h1>Create Post</h1>
	<form method="post" action="?/post">
		<input type="text" name="title" placeholder="Title" minlength="3" required>
		<br><br>
		<textarea name="content" placeholder="Content" maxlength="10000" rows="6" cols="65" required></textarea>
		<br><br>
		<input type="submit" name="submit" value="Create Post">
	</form>
{:else}
	<h1>Please sign in!</h1>
	<p>Sign in to submit a new post!</p>
{/if}

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