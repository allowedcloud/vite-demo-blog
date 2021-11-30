import { resolve } from 'path'
import { UserConfig } from 'vite'
import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

// Markdown
import matter from 'gray-matter'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import markdownAttr from 'markdown-it-link-attributes'
// @ts-expect-error
import TOC from 'markdown-it-table-of-contents'
import { slugify } from './src/functions/slugify'

const config: UserConfig = {
  resolve: {
    alias: [{ find: '/~/', replacement: `${resolve(__dirname, 'src')}/` }],
  },
  optimizeDeps: {
    include: ['vue'],
  },
  plugins: [
    // Vue
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    //
    // Pages
    Pages({
      extensions: ['vue', 'md'],
      dirs: 'src/views',
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        if (!path.includes('projects.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        return route
      },
    }),
    //
    // Markdown
    Markdown({
      wrapperComponent: 'post',
      wrapperClasses: '',
      // headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(Prism)
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })
        // @ts-expect-error
        md.use(markdownAttr, {
          pattern: /^https?:/,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3],
          slugify,
        })
      },
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT')
          next(warning)
      },
    },
  },
}

export default config
