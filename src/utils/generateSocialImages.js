import { getImage } from "astro:assets";

const generateSocialImages = async (image) => {
	const { src: facebook } = await getImage({
		src: `/img/${image}`,
		width: 1200,
		height: 630,
	});

	const { src: twitter } = await getImage({
		src: `/img/${image}`,
		width: 1200,
		height: 675,
	});

	const { src: linkedin } = await getImage({
		src: `/img/${image}`,
		width: 1200,
		height: 627,
	});

	return ({
		imageOg: facebook,
		imageTwitter: twitter,
		imageLinkedin: linkedin
	})
}

export default generateSocialImages