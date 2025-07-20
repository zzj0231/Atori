// types/blog.ts
export interface Post {
  slug: string
  frontmatter: {
    title: string
    date: string
    description?: string
    tags?: string[]
    lang?: string
    draft?: boolean
    duration?: string
    author?: string
    image?: string
  }
  content: string
  excerpt?: string
}

export interface Tag {
  name: string
  count: number
  slug: string
}

export interface YearGroup {
  year: string
  posts: Post[]
}
