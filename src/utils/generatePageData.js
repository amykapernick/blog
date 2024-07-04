const generatePageData = (props) => {
	const { page } = props

	const totalPages = [];
	let i = 1;

	while (i <= page.lastPage) {
		totalPages.push(i);
		i++;
	}

	return ({
		page: {
			...page,
			totalPages
		},
		posts: page.data.map(({ post }) => post) || []
	})
}

export default generatePageData