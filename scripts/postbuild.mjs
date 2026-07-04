// Prepares dist/client for GitHub Pages:
// - 404.html SPA fallback: stores the requested path and redirects to the
//   app shell; the router restores the route after hydration (see __root.tsx).
//   (Copying a prerendered page would break hydration – its dehydrated
//   router state wouldn't match the requested URL.)
// - .nojekyll so Pages serves files starting with underscores
import { writeFileSync } from 'node:fs'

const out = new URL('../dist/client/', import.meta.url)
const base = process.env.BASE_PATH ?? '/fishpidea/'

const fallback = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Fishpidea</title>
<script>
sessionStorage.setItem('fishpidea.redirect', location.pathname + location.search);
location.replace(${JSON.stringify(base)});
</script>
</head>
<body style="background:#eef7f9"></body>
</html>
`

writeFileSync(new URL('404.html', out), fallback)
writeFileSync(new URL('.nojekyll', out), '')
console.log('[postbuild] 404.html and .nojekyll written to dist/client')
