import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";

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
  ],
  openGraph: {
    title: 'PRECISE - AI AGENCY',
    description: 'AI 기반 효율과 정확함을 제공하는 디지털 에이전시 PRECISE.',
    url: 'https://precise.kr',
    siteName: 'PRECISE',
    images: [
      {
        url: 'http://precise.kr/img_og.png',
        width: 1200,
        height: 630,
        alt: 'PRECISE 로고와 슬로건',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRECISE - AI AGENCY',
    description: 'AI 기반 효율과 정확함을 제공하는 디지털 에이전시 PRECISE.',
    images: ['http://precise.kr/img_og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PJXS8ZGY90"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PJXS8ZGY90');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
