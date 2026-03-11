import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export default function Home() {
  const sortedPosts = getSortedPosts()

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🤖 AI 工具日报</h1>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>每天分享好用的 AI 工具，提升效率，开启副业</p>
      </header>

      <section>
        <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>最新文章</h2>
        {sortedPosts.length === 0 ? (
          <p>内容正在准备中，敬请期待！</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sortedPosts.map(({ id, date, title, description }) => (
              <li key={id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                <Link href={`/posts/${id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ color: '#0070f3', marginBottom: '10px' }}>{title}</h3>
                </Link>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>{date}</p>
                <p style={{ color: '#444' }}>{description}</p>
                <Link href={`/posts/${id}`} style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
                  阅读全文 →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #eaeaea', textAlign: 'center', color: '#888' }}>
        <p>© 2026 AI 工具日报 | 每天进步一点点</p>
      </footer>
    </main>
  )
}
