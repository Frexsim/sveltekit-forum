<script>
	// @ts-nocheck

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
	<h1 class="title">{post.title}</h1>
	<div class="post">
		<div class="user-content">
			<img src="{post.author.image}" alt="user">
			<span><b>{post.author.name}</b></span>
		</div>

		<div class="post-content">
			<span class="post-text">{@html md.render(xssFilter.process(post.content))}</span>
		</div>
		<div class="holder right">
			<span>Posted: {date.format(new Date(post.creationDate), "dddd, MMM DD YYYY")}</span>
		</div>
		<div class="holder left">
		</div>
	</div>
{:else}
	<h1 class="error">404, post doesn't exist.</h1>
{/if}

<style>
	.title {
		margin-bottom: 8px;
	}

	.post {
		border-top: gray 1px solid;
        border-bottom: gray 1px solid;

        margin-bottom: -1px;

		padding-top: 16px;
		padding-bottom: 16px;
	}

	.user-content {
		position: relative;
	}

	.user-content > img {
		width: 48px;
		border-radius: 50%;
	}

	.user-content > span {
		color: gray;

		margin-left: 8px;
		vertical-align: top;
	}

	.post-content {
		margin-top: -42px;
		margin-left: 60px;
	}

	.post-text > :global(p) {
		white-space: break-spaces;
	}
	
	.error {
		text-align: center;
	}

	.holder {
		height: 20px;
	}
	
	/*.left {}*/
	
	.right {
		float: right;
		text-align: right;
	}

	.right > span {
		font-size: 16px;
	}
</style>