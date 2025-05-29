import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PRECISE - AI AGENCY',
  description: 'AI를 활용한 홈페이지 제작, 앱 개발, 어플 개발 등 디지털 에이전시 서비스. AI 기반 효율과 정확함을 제공하는 PRECISE AI AGENCY. AI-powered web, app, and digital agency services. PRECISE AI AGENCY delivers efficiency and precision with artificial intelligence.',
  keywords: [
    '홈페이지 제작', '웹사이트', '앱 개발', '어플 개발', 'AI', '인공지능', '에이전시', '디지털', '웹에이전시',
    'AI agency', 'web development', 'app development', 'artificial intelligence', 'digital agency', 'precise', 'studio'
  ],
  icons: [
    { rel: 'icon', url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    { rel: 'shortcut icon', url: '/favicon-96x96.png', type: 'image/png' }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
