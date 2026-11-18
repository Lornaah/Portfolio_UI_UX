// Transforme dist-demo/index.html (document complet) en fragment publiable :
// le contenu de <head> (titre, polices, styles, script) puis celui de <body>.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../dist-demo/index.html', import.meta.url);
const html = readFileSync(file, 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const cleanHead = head
  .replace(/<meta charset[^>]*>/i, '')
  .replace(/<meta name="viewport"[^>]*>/i, '')
  .replace('<title>Justine Herault · Portfolio</title>', '<title>Portfolio MMO Justine Herault</title>');
const out = `${cleanHead.trim()}\n<style>html,body{height:100%}body{background:#1d1d1b;color-scheme:light}</style>\n${body.trim()}\n`;
writeFileSync(new URL('../dist-demo/portfolio-demo.html', import.meta.url), out);
console.log(`dist-demo/portfolio-demo.html : ${(out.length / 1024).toFixed(0)} Ko`);
