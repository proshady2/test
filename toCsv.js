const https = require('request-promise');
const ObjectsToCsv = require('objects-to-csv')

const urls = [];

for (let i = 1; i < 46010; i++)
    urls.push(`${i}.json`);



(async () => {
    const feeds = [];

    for (const url of urls) {
        const options = {
            'method': 'GET',
            'url': 'https://player.fm/series/' + url + '?episode_detail=full',
            'headers': {
                'Referer': 'https://player.fm/series/the-invisible-man-by-h-g-wells',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            },
            'maxRedirects': 20,
        };
        await https(options).then(r => {
            console.log(url);



            const dataObjects =
            {
                url: JSON.parse(r).url,
                title: JSON.parse(r).title,
            }

            feeds.push(dataObjects);
        }).catch(e => {
        })
    }
    const csv = new ObjectsToCsv(feeds)
    await csv.toDisk('./list.csv')
})();