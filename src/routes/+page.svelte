<script>
	import MarkdownIt from "markdown-it";
	import MarkdownItVideo from "markdown-it-video";
	import MarkdownItHtml5Embed from "markdown-it-html5-embed";
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
	const { posts } = data;
</script>

<h1>Forum Posts</h1>
{#if posts.length > 0}
	{#each posts as post}
		{console.log(post)}
		{post.title}
	{/each}

	<h5>No more posts, write something to see it here!</h5>
{:else}
	<h3>Nothing here yet!</h3>
	Go to <a href="/create">Create</a> to post something here!
{/if}

<style>
	.lineBreak {
		height: 1px;
        width: 100% - 10px;
            
        margin: 10px;
            
        background-color: rgb(55, 55, 55);
	}

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1; 
		-webkit-box-orient: vertical;
	}
	
	.description {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1; 
		-webkit-box-orient: vertical;
	}

	.tag {
		color: gray;
		margin-right: 10px;
	}

	.tags {
		margin-top: 16px;
	}

	h5 {
		color: lightgray;
	}
</style>