
import fs from 'fs';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

async function main() {
  const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
  const parsed = await parseStringPromise(xml);
  const urls = parsed.urlset.url.map(u => u.loc[0]);

  const redirectUrls = [];
  for (const url of urls) {
	try {
	  const res = await fetch(url, { method: 'HEAD', redirect: 'manual' });
	  if (res.status >= 300 && res.status < 400) {
		redirectUrls.push(`${url} -> ${res.headers.get('location')}`);
	  }
	} catch (e) {
	  console.error('Fetch failed', url, e);
	}
  }

  if (redirectUrls.length) {
	console.log('Redirecting links found:');
	for (const r of redirectUrls) console.log(' -', r);
  } else {
	console.log('No redirecting links detected.');
  }
}
+
+main();
