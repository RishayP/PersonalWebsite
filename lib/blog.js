import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const postsDirectory = join(process.cwd(), 'articles')

export function getPostSlugs() {
  // Check if articles directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug, fields = []) {
  // Check if articles directory exists
  if (!fs.existsSync(postsDirectory)) {
    throw new Error('Articles directory not found')
  }
  
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error('Post not found')
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  
  // Return empty array if no posts
  if (slugs.length === 0) {
    return []
  }
  
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))

  return posts
}

export async function convertMarkdownToHtml(markdown) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown)
  return result.toString()
}
