const formatHeadings = (headings) => {
	const toc = []
	let currentSection = -1

	headings.forEach(({ text, depth, slug }, i) => {
		if (depth === 2) {
			toc.push({
				heading: text,
				link: slug
			})
			currentSection++

			return;
		}

		if (depth === 3) {
			if (!toc[currentSection]?.items) {
				toc[currentSection].items = []
			}

			toc[currentSection].items.push({
				heading: text,
				link: slug
			})

			return;
		}
	})

	return toc
}

export default formatHeadings