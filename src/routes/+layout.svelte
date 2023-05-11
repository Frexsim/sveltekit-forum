<script>
	import './styles.css';
	import NavBar from "$lib/components/navBar.svelte"
</script>

<head>
	<title>COOL FORUM</title>
</head>

<NavBar />

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0%);

		margin-top: 64px;
		padding-bottom: 16px;
		
		width: 70%;
		max-width: 1100px;

		min-height: calc(100% - 64px - 16px);
	}
</style>