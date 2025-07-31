import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, Tag } from '@/types/blog'
import { generateExcerpt, slugify } from '@/utils/blog'

const postsDirectory = path.join(process.cwd(), 'src/app/posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug: filename.replace(/\.md$/, ''),
        frontmatter: {
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          tags: data.tags || [],
          lang: data.lang || 'en',
          draft: data.draft || false,
          duration: data.duration || '',
          author: data.author || '',
          image: data.image || '',
        },
        content,
        excerpt: generateExcerpt(content),
      }
    })
    .filter(post => !post.frontmatter.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB.getTime() - dateA.getTime()
    })

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: {
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || [],
        lang: data.lang || 'en',
        draft: data.draft || false,
        duration: data.duration || '',
        author: data.author || '',
        image: data.image || '',
      },
      content,
      excerpt: generateExcerpt(content),
    }
  } catch {
    return null
  }
}

export function getAllSlugs(): string[] {
  return getAllPosts().map(post => post.slug)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => post.frontmatter.tags?.includes(tag))
}

export function groupPostsByYear(posts: Post[]) {
  return posts.reduce(
    (groups, post) => {
      const year = new Date(post.frontmatter.date).getFullYear().toString()
      if (!groups[year]) groups[year] = []
      groups[year].push(post)
      return groups
    },
    {} as Record<string, Post[]>
  )
}

export function getAllTags(): Tag[] {
  const posts = getAllPosts()
  const tagCount: Record<string, number> = {}

  posts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  return Object.entries(tagCount)
    .map(([name, count]) => ({
      name,
      count,
      slug: slugify(name),
    }))
    .sort((a, b) => b.count - a.count)
}

export function getTagBySlug(slug: string): Tag | null {
  return getAllTags().find(tag => tag.slug === slug) || null
}
