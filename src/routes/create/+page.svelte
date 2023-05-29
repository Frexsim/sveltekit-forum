<script>
	import { page } from "$app/stores";

	import MarkdownIt from "markdown-it";
	//@ts-ignore
	import MarkdownItVideo from "markdown-it-video";
	//@ts-ignore
	import MarkdownItHtml5Embed from "markdown-it-html5-embed";
	//@ts-ignore
	const md = new MarkdownIt({
	  html: true,
	  linkify: true,
	  typography: true
	}).use(MarkdownItHtml5Embed, {
		html5embed: {
			useImageEmbed: false,
			useLinkEmbed: true
		}
	}).use(MarkdownItVideo, {
		youtube: { width: 640, height: 390 },
		vimeo: { width: 500, height: 281 },
		prezi: { width: 550, height: 400 }
	});

	import xss from "xss";
	//@ts-ignore
	const xssFilter = new xss.FilterXSS({
		whiteList: {},
		stripIgnoreTag: false,
		stripIgnoreTagBody: ['script']
	});

	let title = "";
	let content = "";
	let createPostDisabled = false
</script>

{#if $page.data.session && $page.data.session.user}
	<div class="column-holder">
		<div class="column">
			<h1>Create Post</h1>

			<form on:submit={() => createPostDisabled = true} class="create-form" method="post" action="?/post">
				<input bind:value={title} type="text" name="title" placeholder="Title" minlength="3" required>
				<br><br>
				<textarea bind:value={content} name="content" placeholder="Content" maxlength="10000" rows="6" cols="65" required></textarea>
				<br><br>
				{#if createPostDisabled}
					<input type="submit" name="submit" value="Create Post" disabled>
				{:else}
					<input type="submit" name="submit" value="Create Post">
				{/if}
			</form>
		</div>
		<div class="column">
			<h1>Preview</h1>
			<h1>{title}</h1>
			<span class="preview-text">{@html md.render(xssFilter.process(content))}</span>
		</div>
	</div>
{:else}
	<h1>Please sign in!</h1>
	<p>Sign in to submit a new post!</p>
{/if}

<style>
	.create-form {
		margin-right: 18px;
	}

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

	.column-holder {
		display: grid;
		grid-template-columns: 50% 50%;
		column-gap: 24px;
	}

	.preview-text > :global(p) {
		white-space: break-spaces;
	}

	img video {
		max-height: 720px;
		max-width: 100%;
	}
</style>