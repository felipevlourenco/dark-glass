// The emitted .d.ts files keep `import './X.css'`, which consumers without
// CSS module types (skipLibCheck off) report as an error. The CSS ships in style.css.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory()
            ? walk(join(dir, e.name))
            : e.name.endsWith('.d.ts')
              ? [join(dir, e.name)]
              : [],
    );

for (const file of walk('dist')) {
    const src = readFileSync(file, 'utf8');
    const out = src.replace(/^import ['"][^'"]+\.css['"];?\r?\n/gm, '');
    if (out !== src) writeFileSync(file, out);
}
