const xml = require('xml');
const slugify = require('slugify');
const writeFile = require('fs').writeFile;
const promisify = require('util').promisify;
const path = require('path');
const fetch = require('node-fetch');

const writeFileAsync = promisify(writeFile);
const distFolder = path.join(process.cwd(), 'dist/apps/ggj-aff-fe/browser/sitemap.xml');

const getPagesData = async function () {
    try {
        const apiUrl = 'https://divupro-apidjangobe-production.up.railway.app/v1/api-blog-fxeater/'

        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        const outData = jsonData.results.map(
            item => {
                return {
                    title: item.name,
                    created: item.created_at,
                    id: item.id
                }
            }
        );
        return outData;
    } catch (error) {
        return []
    }
};


async function main() {
    console.log("generate sitemap>> START")
    const pages = await getPagesData();
    const indexItem = [
        {
            //build index item
            url: [
                {
                    loc: "https://www.redamancy.blog",
                },
                {
                    lastmod: get_last_mod(pages)
                },
                { changefreq: "daily" },
                { priority: "1.0" },
            ],
        },
        {
            url: [
                {
                    loc: "https://www.redamancy.blog/about",
                },
                {
                    lastmod: get_last_mod(pages)
                },
                { priority: "0.8" },
            ]
        },
        {
            url: [
                {
                    loc: "https://www.redamancy.blog/home",
                },
                {
                    lastmod: get_last_mod(pages)
                },
                { priority: "0.8" },
            ]
        }
    ];

    const sitemapItems = pages.reduce(function (items, item) {
        // build page items
        items.push({
            url: [
                {
                    loc: `https://www.redamancy.blog/blog/${item.id}-${slugify(item.title, { locale: 'vi' }).toLowerCase()}`,
                },
                {
                    lastmod: new Date(item.lastModified ?? item.created)
                        .toISOString()
                        .split("T")[0],
                },
            ],
        });
        return items;
    }, []);
    const sitemapObject = {
        urlset: [
            {
                _attr: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                },
            },
            ...indexItem,
            ...sitemapItems,
        ],
    };
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${xml(sitemapObject)}`;
    console.log(`generate sitemap>> DONE with ${sitemapObject.urlset.length} pages`)
    await writeFileAsync(distFolder, sitemap, "utf8");
}

const get_last_mod = (pages) => {
    console.log(pages)
    const my_date = new Date(Math.max.apply(null, pages.map((page) => {
        return new Date(page.lastModified ?? page.created);
    })))

    console.log(my_date)

    return my_date.toISOString().split("T")[0]
}

main();
//# sourceMappingURL=sitemap-generate.js.map