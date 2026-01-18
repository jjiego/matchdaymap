'use client'

import { useState } from 'react'
import { getCoordinates, getMultipleCoordinates } from '@/lib/utils/addressSearch'
import { K_LEAGUE_FULL_STADIUMS } from '@/lib/constants/stadiums'

interface TestResult {
  address: string
  latitude?: number
  longitude?: number
  status: 'success' | 'error'
  message?: string
  stadiumId?: string
  stadiumName?: string
  searchedAddress?: string
}

export default function AddressSearchTestPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(false)

  const handleTestSingle = async () => {
    setLoading(true)
    try {
      const result = await getCoordinates('경기도 김포시 마산동 642-1')
      setResults([
        {
          address: '경기도 김포시 마산동 642-1',
          latitude: result.latitude,
          longitude: result.longitude,
          status: 'success',
          message: result.address,
        },
      ])
      console.log('✅ 단일 주소 변환 성공:', result)
    } catch (error) {
      setResults([
        {
          address: '경기도 김포시 마산동 642-1',
          status: 'error',
          message: error instanceof Error ? error.message : '알 수 없는 오류',
        },
      ])
      console.error('❌ 변환 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTestMultiple = async () => {
    setLoading(true)
    try {
      const addresses = [
        '경기 김포시 마산동 673-1',
        '서울 마포구 성산동 515',
        '울산 남구 문수로 44',
        '전북 전주 덕진구 기린대로 1055',
      ]
      const results = await getMultipleCoordinates(addresses)
      setResults(
        results.map((result) => ({
          address: result.address,
          latitude: result.latitude,
          longitude: result.longitude,
          status: 'success' as const,
        }))
      )
      console.log('✅ 여러 주소 변환 성공:', results)
    } catch (error) {
      console.error('❌ 변환 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTestAllStadiums = async () => {
    setLoading(true)
    setResults([])
    try {
      for (let i = 0; i < K_LEAGUE_FULL_STADIUMS.length; i++) {
        try {
          const stadium = K_LEAGUE_FULL_STADIUMS[i]
          const result = await getCoordinates(stadium.address)
          setResults((prev) => [
            ...prev,
            {
              address: result.address,
              latitude: result.latitude,
              longitude: result.longitude,
              status: 'success' as const,
              stadiumId: stadium.id,
              stadiumName: stadium.fullName || stadium.name,
              searchedAddress: stadium.address,
            },
          ])
          // UI 업데이트 효과
          await new Promise(resolve => setTimeout(resolve, 200))
        } catch (error) {
          const stadium = K_LEAGUE_FULL_STADIUMS[i]
          setResults((prev) => [
            ...prev,
            {
              address: stadium.address,
              status: 'error' as const,
              message: error instanceof Error ? error.message : '변환 실패',
              stadiumId: stadium.id,
              stadiumName: stadium.fullName || stadium.name,
              searchedAddress: stadium.address,
            },
          ])
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateAddressesByFullName = async () => {
    setLoading(true)
    setResults([])
    try {
      for (let i = 0; i < K_LEAGUE_FULL_STADIUMS.length; i++) {
        try {
          const stadium = K_LEAGUE_FULL_STADIUMS[i]
          const fullName = stadium.fullName || stadium.name
          const result = await getCoordinates(fullName)
          setResults((prev) => [
            ...prev,
            {
              address: result.address,
              latitude: result.latitude,
              longitude: result.longitude,
              status: 'success' as const,
              stadiumId: stadium.id,
              stadiumName: fullName,
              searchedAddress: stadium.address,
            },
          ])
          // UI 업데이트 효과
          await new Promise(resolve => setTimeout(resolve, 200))
        } catch (error) {
          const stadium = K_LEAGUE_FULL_STADIUMS[i]
          setResults((prev) => [
            ...prev,
            {
              address: stadium.address,
              status: 'error' as const,
              message: error instanceof Error ? error.message : '변환 실패',
              stadiumId: stadium.id,
              stadiumName: stadium.fullName || stadium.name,
              searchedAddress: stadium.address,
            },
          ])
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-blue-900">🗺️ 카카오맵 주소 변환 테스트</h1>
        <p className="text-gray-600 mb-8">경기장 주소를 위도/경도 좌표로 변환합니다</p>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <button
              onClick={handleTestSingle}
              disabled={loading}
              className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? '⏳ 로딩 중...' : '🔍 단일 주소 변환'}
            </button>

            <button
              onClick={handleTestMultiple}
              disabled={loading}
              className="px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? '⏳ 로딩 중...' : '📍 여러 주소 변환'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleTestAllStadiums}
              disabled={loading}
              className="px-6 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? '⏳ 로딩 중...' : `⚽ 현재 주소로 검색`}
            </button>

            <button
              onClick={handleUpdateAddressesByFullName}
              disabled={loading}
              className="px-6 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? '⏳ 로딩 중...' : `🏟️ fullName으로 검색`}
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              📊 테스트 결과 ({results.length}개)
            </h2>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-lg border-2 ${
                    result.status === 'success'
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{result.address}</p>
                        {result.stadiumId && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {result.stadiumId}
                          </span>
                        )}
                      </div>
                      {result.stadiumName && (
                        <p className="text-sm text-gray-600 mb-1">경기장: {result.stadiumName}</p>
                      )}
                      {result.searchedAddress && result.searchedAddress !== result.address && (
                        <p className="text-xs text-gray-500 mb-1">원본 주소: {result.searchedAddress}</p>
                      )}
                      {result.status === 'success' ? (
                        <div className="text-sm text-gray-700 mt-2 space-y-1">
                          <p>
                            <span className="font-medium">위도:</span> {result.latitude?.toFixed(6)}
                          </p>
                          <p>
                            <span className="font-medium">경도:</span> {result.longitude?.toFixed(6)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-red-600 mt-2">❌ {result.message}</p>
                      )}
                    </div>
                    <div className="text-2xl ml-4">
                      {result.status === 'success' ? '✅' : '❌'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {results.length > 0 && (
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">
                    ✅ 성공: {results.filter((r) => r.status === 'success').length}개 | ❌ 실패:{' '}
                    {results.filter((r) => r.status === 'error').length}개
                  </p>
                </div>

                {results.some((r) => r.status === 'success' && r.stadiumId) && (
                  <button
                    onClick={() => {
                      const updates = results
                        .filter((r) => r.status === 'success')
                        .map((r) => `    address: '${r.address}', // ${r.stadiumName} - ${r.stadiumId}`)
                        .join('\n')
                      const text = `// 검색된 주소 (fullName으로 검색한 결과):\n${updates}`
                      navigator.clipboard.writeText(text)
                      alert('복사 완료! stadiums.ts에 붙여넣기하세요.')
                    }}
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    📋 주소 업데이트 코드 복사
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
