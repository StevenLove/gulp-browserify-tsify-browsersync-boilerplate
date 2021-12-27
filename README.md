Boilerplate
=========

This is a boilerplate if you want to write frontend in Typescript.

What you need to edit
=========
Go into gulpfile.js and modify `BROWSERIFY_ENTRIES`. These are your TypeScript files. You can modify the other variables as you like.

Commands
=========
`gulp watch` - probably the command you want. compiles all TypeScript and Sass files, then watches for changes. Also runs browsersync server to autoreload the browser when output files have changed.
`gulp ts` - runs one time compilation of TypeScript files
`gulp ts-watch` - runs TypeScript/browserify compilation and watches for changes using watchify for fast incremental builds
`gulp sass` - runs one time compilation of Sass files
`gulp sass-watch` - watches Sass files for changes and compiles on detected changes

Dependencies
=========
- Gulp
- browserify
- tsify plugin for browserify for TypeScript support
- watchify to minimize browserify compile time
- sass to CSS compilation
- Browsersync for live reloading of changed CSS/JS files
