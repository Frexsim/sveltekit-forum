<script>
	import MarkdownIt from "markdown-it";
	import MarkdownItVideo from "markdown-it-video";
	import MarkdownItHtml5Embed from "markdown-it-html5-embed";
	import date from "date-and-time"
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
	const xssFilter = new xss.FilterXSS({
		whiteList: {},
		stripIgnoreTag: false,
		stripIgnoreTagBody: ['script']
	});
	
	export let data;
	const { post } = data;

	function replyTest() {
		console.log("yippee")
	}
</script>

{#if post}
	<a href="/">Back</a>
	<h1>{post.title}</h1>
	<span class="post-content">{@html md.render(xssFilter.process(post.content))}</span>
	<div class="right">
		<div>Replies: {post.replies.length}</div>
		<div>Posted {date.format(new Date(post.creationDate), "dddd, MMM DD YYYY'")}</div>
	</div>
	<div class="left">
		<button class="reply gray" on:click="{replyTest()}">Reply</button>
	</div>
	<hr>
	<div>
		{#each post.replies as reply}
			<h4>Titel</h4>
			<span class="post-content">{@html md.render(xssFilter.process(reply.content))}</span>
			<hr>
		{/each}
	</div>
{:else}
	<h1 class="error">404, nothing to see here!</h1>
{/if}

<style>
	.post-content > :global(p) {
		white-space: break-spaces;
	}
	
	.error {
		text-align: center;
	}

	.left {}
	
	.right {
		float: right;
		margin-top: 10px;
		text-align: right;
	}

	h4 {
		margin-bottom: 0px;
	}
</style>