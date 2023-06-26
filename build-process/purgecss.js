var Purgecss = require('purgecss')

const purgecss = new Purgecss({
    content: ['./dist/apps/ggj-aff-fe/browser/*.html'],
    css: ['./dist/apps/ggj-aff-fe/browser/*.css']
})

const purgecssResult = purgecss.purge()