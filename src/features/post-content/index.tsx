import Shiki from '@shikijs/markdown-it'
import MarkdownIt from 'markdown-it'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import anchor from 'markdown-it-anchor'
import GitHubAlerts from 'markdown-it-github-alerts'
import LinkAttributes from 'markdown-it-link-attributes'
import MarkdownItMagicLink from 'markdown-it-magic-link'

import { extractHeadings, slugify } from '@/utils/blog'
import { PostToc } from '../post-toc'

interface Props {
  content: string
}

export async function PostContent({ content }: Props) {
  const md = MarkdownIt()

  md.use(
    await Shiki({
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      defaultColor: false,
      cssVariablePrefix: '--c-',
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
      ],
    })
  )
  md.use(anchor, {
    slugify: slugify,
    permalink: anchor.permalink.linkInsideHeader({
      symbol: '#',
      renderAttrs: () => ({ 'aria-hidden': 'true' }),
    }),
  })

  md.use(LinkAttributes, {
    matcher: (link: string) => /^https?:\/\//.test(link),
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })

  md.use(MarkdownItMagicLink, {
    linksMap: {
      NuxtLabs: {
        link: 'https://nuxtlabs.com',
        imageUrl: 'https://nuxtlabs.com/nuxt.png',
      },
      Vitest: 'https://github.com/vitest-dev/vitest',
      Slidev: 'https://github.com/slidevjs/slidev',
      VueUse: 'https://github.com/vueuse/vueuse',
      UnoCSS: 'https://github.com/unocss/unocss',
      Elk: 'https://github.com/elk-zone/elk',
      'Type Challenges': 'https://github.com/type-challenges/type-challenges',
      Vue: 'https://github.com/vuejs/core',
      Nuxt: 'https://github.com/nuxt/nuxt',
      Vite: 'https://github.com/vitejs/vite',
      Shiki: 'https://github.com/shikijs/shiki',
      Twoslash: 'https://github.com/twoslashes/twoslash',
      'ESLint Stylistic':
        'https://github.com/eslint-stylistic/eslint-stylistic',
      Unplugin: 'https://github.com/unplugin',
      'Nuxt DevTools': 'https://github.com/nuxt/devtools',
      'Vite PWA': 'https://github.com/vite-pwa',
      'i18n Ally': 'https://github.com/lokalise/i18n-ally',
      ESLint: 'https://github.com/eslint/eslint',
      Astro: 'https://github.com/withastro/astro',
      TwoSlash: 'https://github.com/twoslashes/twoslash',
      'Anthony Fu Collective': {
        link: 'https://opencollective.com/antfu',
        imageUrl: 'https://github.com/antfu-collective.png',
      },
      Netlify: {
        link: 'https://netlify.com',
        imageUrl: 'https://github.com/netlify.png',
      },
      Stackblitz: {
        link: 'https://stackblitz.com',
        imageUrl: 'https://github.com/stackblitz.png',
      },
      Vercel: {
        link: 'https://vercel.com',
        imageUrl: 'https://github.com/vercel.png',
      },
    },
    imageOverrides: [
      ['https://github.com/vuejs/core', 'https://vuejs.org/logo.svg'],
      [
        'https://github.com/nuxt/nuxt',
        'https://nuxt.com/assets/design-kit/icon-green.svg',
      ],
      ['https://github.com/vitejs/vite', 'https://vitejs.dev/logo.svg'],
      ['https://github.com/sponsors', 'https://github.com/github.png'],
      ['https://github.com/sponsors/antfu', 'https://github.com/github.png'],
      ['https://nuxtlabs.com', 'https://github.com/nuxtlabs.png'],
      [/opencollective\.com\/vite/, 'https://github.com/vitejs.png'],
      [/opencollective\.com\/elk/, 'https://github.com/elk-zone.png'],
    ],
  })

  md.use(GitHubAlerts)

  const processedContent = await md.render(content)
  const headings = extractHeadings(md, content)

  return (
    <>
      <div
        className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose--blog"
        dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
      />
      <PostToc headings={headings} />
    </>
  )
}
