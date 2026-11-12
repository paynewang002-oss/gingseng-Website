import { open, link, unlink } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { randomUUID } from 'node:crypto';

const argumentsList = process.argv.slice(2);
const values = {};
for (let index = 0; index < argumentsList.length; index += 2) {
  const key = argumentsList[index];
  const value = argumentsList[index + 1];
  if (!['--type', '--output', '--base-url'].includes(key) || !value) {
    throw new Error('Usage: node ops/export-customers.mjs --type customers|contacts --output /absolute/path.csv');
  }
  values[key] = value;
}
const type = values['--type'] || 'customers';
if (!['customers', 'contacts'].includes(type) || !values['--output']) {
  throw new Error('Choose customers or contacts and provide --output.');
}
const token = process.env.GINSENG_ADMIN_TOKEN || process.env.ADMIN_TOKEN;
if (!token) throw new Error('Set GINSENG_ADMIN_TOKEN in your environment.');
const base = new URL(values['--base-url'] || 'https://changbaishanginseng.com');
const local = ['localhost', '127.0.0.1'].includes(base.hostname);
if ((!local && (base.protocol !== 'https:' || !['changbaishanginseng.com', 'www.changbaishanginseng.com'].includes(base.hostname))) || base.username || base.password) {
  throw new Error('Use the official website or a local development URL.');
}
const url = new URL(`/api/admin/export?type=${type}`, base);
const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, redirect: 'error' });
if (!response.ok || !response.headers.get('Content-Type')?.includes('text/csv')) {
  throw new Error(`Export failed with HTTP ${response.status}.`);
}
const target = resolve(values['--output']);
const temporary = resolve(dirname(target), `.${basename(target)}.${randomUUID()}.partial`);
const output = await open(temporary, 'wx', 0o600);
try {
  for await (const chunk of response.body) await output.writeFile(chunk);
  await output.close();
  await link(temporary, target);
  await unlink(temporary);
  console.log(`Saved ${type} export to ${target}`);
} catch (error) {
  await output.close().catch(() => {});
  await unlink(temporary).catch(() => {});
  throw error;
}
