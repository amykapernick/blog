const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { format, parse } = require('date-fns');
const generateImage = require('node-html-to-image')

const dir = path.join(__dirname, '../posts/2017')

const tweetUrl = new RegExp(/\n((?:(?:https?):\/\/)?(?:www.)?twitter\.com(?:\/@?((?:\w){1,15}))\/status\/)([0-9]{4,19})(?:\?.+)?\n/gi)

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
					return fetch('{webhook_url}', {
						method: 'post',
						body: JSON.stringify({ tweetId: p3 }),
						headers: { 'Content-Type': 'application/json' }
					}).then(res => res.json()).then(res => {
						if (!res?.[0]) return

						const { created_at, retweet_count, favorite_count, text, in_reply_to_screen_name, entities: { urls, media } } = res[0]

						const content = `<p>${text.replaceAll('\n', '</p><p>')}</p>`
						const css = `<style>body{width: 500px; padding: 5px; height: max-content;}.static_tweet {font-family: Rajdhani, Arial, sans-serif;position: relative;border-radius: 40px;padding: 40px;margin: 0;}.static_tweet svg {height: 20px;width: auto;}.static_tweet .icon {position: absolute;top: 40px;right: 40px;}.static_tweet dl {display: flex;align-items: center;margin-bottom: 0;font-weight: 600;}.static_tweet dt {margin: 0 1ch 0 0;display: block;}.static_tweet dd {margin: 0 40px 0 0;padding: 0;}.author {font-style: normal;font-weight: 600;margin: 0 0 20px;display: block;}.original, .date {opacity: 0.7;margin: 0;}.tweet {font-size: 1.5em;margin: 10px 0;}.tweet p:first-child{margin-top: 0;}.tweet p:last-child{margin-bottom: 0;}.images {position: relative;margin: 20px 0;padding: 0;border-radius: 20px;overflow: hidden;}.images li {margin: 0;padding: 0;overflow: hidden;width: 100%;}.images img {width: 100%;height: auto;display: block;}</style>`
						const images = media?.length ? `<ul class="images">${media.map(image => (`<li><img src="${image.media_url_https}" /></li>`))}</ul>` : ''
						const reply = in_reply_to_screen_name ? `<p class="original">Replying to @${in_reply_to_screen_name}</p>` : ''

						post = `${css}<blockquote class="static_tweet"><svg class="icon" fill="none" viewBox="0 0 56 47"><path fill="#318ce7" d="M0 41.021c6.226.559 11.757-.94 16.744-4.714-5.218-.45-8.706-3.051-10.654-7.942 1.744.204 3.378.245 5.095-.245-2.711-.64-4.877-1.962-6.553-4.047-1.676-2.098-2.52-4.482-2.507-7.275 1.594.804 3.202 1.322 5.11 1.376-2.494-1.812-4.088-4.073-4.728-6.948-.64-2.874-.232-5.613 1.24-8.256 6.185 7.262 13.977 11.267 23.5 11.921-.068-.75-.163-1.417-.204-2.098-.436-7.18 6.199-13.052 13.297-11.77 2.33.421 4.36 1.416 6.048 3.078.287.286.532.327.913.232 2.153-.504 4.196-1.254 6.117-2.33.15-.082.314-.163.586-.3-.885 2.67-2.493 4.632-4.727 6.13.013.055.04.096.054.15 1.022-.217 2.071-.394 3.08-.667 1.007-.272 1.988-.654 3.092-1.035-.477.627-.831 1.24-1.308 1.716-1.28 1.295-2.616 2.548-3.951 3.801-.272.246-.381.464-.368.832.082 9.809-3.378 18.173-10.408 24.999-4.428 4.291-9.782 6.866-15.845 7.943-5.953 1.062-11.798.626-17.492-1.472a32.738 32.738 0 0 1-5.886-2.888c-.054-.027-.095-.068-.245-.19Z"/></svg><cite class="author">@${p2}</cite>${reply}<div class="tweet">${content}</div>${images}<p class="date">Created at ${format(parse(created_at.replace('Z', ''), `yyyy-MM-dd'T'HH:mm:ss.SSS`, new Date()), 'h:mm a MMM d, yyyy')}</p><dl><dt><svg viewBox="0 0 1196 1196"><path fill="#cb5699" d="M821.417 195q-67 0-125.5 30t-98.5 82q-40-52-98.5-82t-125.5-30q-119 0-204 89.5t-84 214.5q1 69 29.5 129.5t77.5 102.5q3 3 9 8 10 9 170 154.5t205 185.5q9 8 21 8t21-8q34-30 185-167.5t197-178.5q51-42 80-103.5t29-131.5q0-125-84.5-214t-203.5-89z"/></svg></dt><dd>${favorite_count}</dd><dt><svg viewBox="0 0 640 512"><path fill="#318ce7" d="M388.461 387.515c7.56 7.56 2.206 20.485-8.485 20.485H128c-13.255 0-24-10.745-24-24V171.187l-72.162-.001c-10.683-.001-16.022-12.949-8.485-20.485l96.156-96.156c4.686-4.686 12.284-4.687 16.971 0l96.16 96.16c7.58 7.58 2.14 20.485-8.485 20.485L152 171.188V360h203.976c3.183 0 6.235 1.264 8.485 3.515l24 24zm219.701-46.7L536 340.813V128c0-13.255-10.745-24-24-24H260.024c-10.691 0-16.045 12.926-8.485 20.485l24 24a12.002 12.002 0 0 0 8.485 3.515H488v188.812l-72.154-.001c-10.625 0-16.066 12.905-8.485 20.485l96.16 96.16c4.686 4.687 12.285 4.686 16.971 0l96.156-96.156c7.535-7.536 2.197-20.485-8.486-20.485z"/></svg></dt><dd>${retweet_count}</dd></dl></blockquote>`

						generateImage({
							output: `./public/img/tweets/${p3}.png`,
							html: `<html><body>${post}</body></html>`
						})

						return `\n<a href="${p1}${p3}" target="_blank"><img class="static_tweet" alt="Static image of tweet linked here" src="/img/tweets/${p3}.png" /></a>\n`
					}).catch(err => {
						console.log({ err })
					})
				}

				const replaceAsync = async (str, regex) => {
					const promises = [];
					str.replace(regex, (match, ...args) => {
						const promise = getContent(match, ...args);
						promises.push(promise);
					});
					const data = await Promise.all(promises);
					return str.replace(regex, () => data.shift());
				}

				await replaceAsync(data, tweetUrl)
					.then(res => { fs.writeFileSync(path.join(dir, file), res) })
			})
		})
	}
})