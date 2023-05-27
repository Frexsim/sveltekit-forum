<script>
// @ts-nocheck

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

    import date from "date-and-time";
	
	export let data;
	const { posts, user } = data;
	console.log(user);
</script>

<h1>Forum Posts</h1>
{#if posts.length > 0}
	{#each posts as post}
        <div class="post-container">
            <h2 class="title-header"><a class="title" href="/post/{post.postId}" >{post.title}</a></h2>
            <p class="description">{post.content}</p>
            <h5 class="creationDate">{date.format(post.creationDate, "dddd, MMMM DD YYYY at HH:mm:ss")}</h5>
        </div>
	{/each}

	<h5>No more posts, write something to see it here!</h5>
{:else}
	<h3>Nothing here yet!</h3>
	Go to <a href="/create">Create</a> to post something here!
{/if}

<style>
    .post-container {
        border-top: gray 1px solid;
        border-bottom: gray 1px solid;

        padding-left: 10px;
        margin-bottom: -1px;
    }

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1; 
		-webkit-box-orient: vertical;
	}

    .title-header {
        margin-bottom: 8px;
    }
	
	.description {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1; 
		-webkit-box-orient: vertical;

        margin-top: 0px;
        margin-bottom: 0px;
	}

    .creationDate {
        margin-top: 8px;
    }
</style>