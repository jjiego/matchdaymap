import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
    }

    // URL이 Naver Sports CDN인지 확인 (보안)
    if (!url.includes('sports-phinf.pstatic.net')) {
      return NextResponse.json({ error: 'Invalid URL domain' }, { status: 403 })
    }

    // Naver Sports CDN에서 이미지 가져오기
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://sports.news.naver.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch image: ${response.status}` }, { status: response.status })
    }

    // 이미지 데이터 가져오기
    const buffer = await response.arrayBuffer()

    // 응답 반환 (CORS 헤더 포함)
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=86400', // 24시간 캐시
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
