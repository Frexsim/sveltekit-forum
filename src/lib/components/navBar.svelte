<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client"
	import { page } from "$app/stores";
</script>

<div class="bar">
	<img id="logo" src="logo.svg" alt="COOL FORUM">
	
	<div class="nav-items left">
		<a href="/">Posts</a>
		<a href="/create">Create</a>
	</div>

	<div class="nav-items right">
		{#if $page.data.session && $page.data.session.user}
			<div class="user-badge">
				<img src="{$page.data.session.user.image}" alt="user">
			</div>
		{:else}
			<button class="secondary" on:click={() => signIn("google")}>Sign In</button>
		{/if}
	</div>
</div>

<style>
	.nav-items > a {
		color: white;
		text-decoration: none;
	}

	.nav-items > a:hover {
		text-decoration: underline;
	}

	.nav-items > a:active {
		color: lightgray;
		text-decoration: underline;
	}

	.nav-items.left > * {
		margin-right: 16px;
	}

	.nav-items.right > * {
		margin-left: 16px;
	}

	#logo {
		position: absolute;
		left: 32px;
		top: 50%;
		transform: translate(0%, -50%);
		
		width: 64px;

		aspect-ratio: 340 / 200;
	}
	
	.nav-items.left {
		position: absolute;
		left: 128px;
		top: 50%;
		transform: translate(0%, -50%);

		color: white;
	}

	.nav-items.right {
		position: absolute;
		right: 64px;
		top: 50%;
		transform: translate(0%, -50%);

		color: white;
	}
	
	.bar {
		margin: auto;
		
		position: fixed;
		width: 100%;
		height: 52px;

		background-color: var(--cool-color);

		z-index: 10;
	}

	.user-badge {
		height: 36px;
	}

	.user-badge > img {
		width: 36px;
		border-radius: 50%;
	}
</style>