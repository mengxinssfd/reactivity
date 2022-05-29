const argv = require('minimist')(process.argv.slice(2));
const build = require('esbuild').build;
const Path = require('path');

console.log(argv)

const target = argv._[0] || 'reactivity';
const format = argv.f || 'iife';
const entry = Path.resolve(__dirname, `../packages/${target}/src/index.ts`);
const outputFile = Path.resolve(__dirname, `../packages/${target}/dist/index.${format}.js`);
const globalName = require(Path.resolve(__dirname, `../packages/${target}/package.json`)).buildOptions.name;


const tsconfigPath = Path.resolve(__dirname, `../packages/${target}/tsconfig.json`);
build({
    tsconfig: tsconfigPath,
    bundle: true,
    sourcemap: false,
    watch: argv.w || false,
    format,
    globalName,
    entryPoints: [entry],
    outfile: outputFile
});