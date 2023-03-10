const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const dir = path.join(__dirname, '../posts/2023')

const tweetUrl = new RegExp(/\n((?:(?:https?):\/\/)?(?:www.)?twitter\.com(?:\/@?((?:\w){1,15}))\/status\/)([0-9]{19})(?:\?.+)?\n/gi)

fs.readdir(dir, (err, files) => {
	if (err) {
		console.log(err);
	} else {
		files.forEach(file => {
			fs.readFile(path.join(dir, file), 'utf8', async (err, data) => {
				if (err) {
					console.error(err);
					return;
				}

				if (!data.match(tweetUrl)) return

				const getContent = async (match, p1, p2, p3) => {
					let post
					return fetch('https://hook.eu1.make.com/bbzndk8nqa23u2w2vyi9rmjuvj1836tm', {
						method: 'post',
						body: JSON.stringify({ tweetId: p3 }),
						headers: { 'Content-Type': 'application/json' }
					}).then(res => res.json()).then(res => {
						if (!res?.[0]) return

						post = `<blockquote class="static_tweet"><cite>${p2}</cite><p>${res[0].text}</p><p>Created at ${res[0].created_at}</p><p>Retweet ${res[0].retweet_count} Favourite ${res[0].favourite_count}</p></blockquote>`

						return `\n![${post}](${p1}${p2})\n`
					}).catch(err => {
						console.log({ err })
					})

					return `![${post}](${p1}${p2})`
				}

				// const updatedContent = await data.replaceAll(tweetUrl, getContent).then(res => { console.log({ res }) })

				// console.log({ updatedContent })

				const replaceAsync = async (str, regex) => {
					const promises = [];
					str.replace(regex, (match, ...args) => {
						const promise = getContent(match, ...args);
						promises.push(promise);
					});
					const data = await Promise.all(promises);
					return str.replace(regex, () => data.shift());
				}

				await replaceAsync(data, tweetUrl).then(res => { fs.writeFileSync(path.join(dir, file), res) })

				// fs.writeFileSync(path.join(dir, file), data.replaceAll(
				// 	/\n((?:(?:https?):\/\/)?(?:www.)?twitter\.com(?:\/@?((?:\w){1,15}))\/status\/)([0-9]{19})(?:\?.+)?\n/gi,
				// 	(match, p1, p2, p3) => {
				// 		let post
				// 		return fetch('https://hook.eu1.make.com/bbzndk8nqa23u2w2vyi9rmjuvj1836tm', {
				// 			method: 'post',
				// 			body: JSON.stringify({ tweetId: p3 }),
				// 			headers: { 'Content-Type': 'application/json' }
				// 		}).then(res => res.json()).then(res => {
				// 			if (!res?.[0]) return

				// 			post = `<blockquote class="static_tweet"><cite>${p2}</cite><p>${res[0].text}</p><p>Created at ${res[0].created_at}</p><p>Retweet ${res[0].retweet_count} Favourite ${res[0].favourite_count}</p></blockquote>`

				// 			return `![${post}](${p1}${p2})`
				// 		}).catch(err => {
				// 			console.log({ err })
				// 		})

				// 		return `![${post}](${p1}${p2})`
				// 	}
				// ))

				// console.log({

				// })
			})
		})
	}
})