export const metadata = {
  title: 'AI 工具日报 - 每天分享好用的 AI 工具',
  description: '发现最新、最好用的 AI 工具，提升工作效率，开启副业赚钱',
  keywords: 'AI 工具，人工智能，效率工具，副业，赚钱',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
