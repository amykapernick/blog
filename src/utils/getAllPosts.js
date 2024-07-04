import { isBefore, parseISO } from "date-fns";

const getAllPosts = async (props) => {
	const allPosts = [];
	const allTags = [];

	Object.entries(props.files).forEach(([type, files]) => {
		files.forEach((post) => {
			const matches = post.file.match(/\/(?<slug>(?:\w|\w|-)+)\.md$/i);
			const { slug } = matches?.groups;

			const postTags = post?.frontmatter?.categories ?? [];

			if (type === 'video' && !postTags.includes('video')) {
				postTags.push('video');
			}

			allPosts.push({
				post: {
					...post,
					frontmatter: {
						...post.frontmatter,
						categories: postTags
					},
					slug,
					type
				}
			});

			allTags.push(...postTags);
		});
	})

	allPosts.sort((a, b) =>
		isBefore(
			parseISO(
				a.post.frontmatter?.updated ?? a.post.frontmatter.date
			),
			parseISO(
				b.post.frontmatter?.updated ?? b.post.frontmatter.date
			)
		)
			? 1
			: -1
	);

	const tags = [...new Set(allTags)].sort((a, b) => {
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	});

	return ({
		allPosts,
		allTags: tags
	})
}

export default getAllPosts