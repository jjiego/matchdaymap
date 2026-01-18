// 카카오맵 Geocoder를 사용하여 주소를 좌표로 변환하는 유틸리티 함수

interface CoordinateResult {
  latitude: number
  longitude: number
  address: string
}

declare global {
  interface Window {
    kakao: any
  }
}

/**
 * Kakao Maps SDK가 완전히 로드될 때까지 대기합니다.
 */
const waitForKakaoMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window 객체가 없습니다.'))
      return
    }

    // 이미 services가 있으면 즉시 반환
    if (window.kakao?.maps?.services?.Geocoder) {
      resolve()
      return
    }

    // kakao 객체 대기
    let attempts = 0
    const maxAttempts = 300 // 30초
    const checkInterval = setInterval(() => {
      attempts++

      // Geocoder가 직접 사용 가능하면 OK
      if (window.kakao?.maps?.services?.Geocoder) {
        clearInterval(checkInterval)
        resolve()
        return
      }

      // kakao 객체가 없으면 계속 대기
      if (!window.kakao) {
        if (attempts >= maxAttempts) {
          clearInterval(checkInterval)
          reject(new Error('Kakao Maps 스크립트 로드 실패'))
        }
        return
      }

      // kakao.maps가 있지만 services가 없으면 load 호출
      if (window.kakao.maps && !window.kakao.maps.services) {
        clearInterval(checkInterval)
        try {
          // 먼저 load() 호출 없이 services 확인
          if (window.kakao.maps.services?.Geocoder) {
            resolve()
            return
          }

          // load() 호출
          window.kakao.maps.load(() => {
            // load 후 다시 체크
            if (window.kakao?.maps?.services?.Geocoder) {
              resolve()
            } else {
              // 아직도 없으면 약간 더 대기
              setTimeout(() => {
                if (window.kakao?.maps?.services?.Geocoder) {
                  resolve()
                } else {
                  reject(new Error('Kakao Maps Geocoder 초기화 실패'))
                }
              }, 200)
            }
          })
        } catch (error) {
          reject(error)
        }
        return
      }

      // 타임아웃
      if (attempts >= maxAttempts) {
        clearInterval(checkInterval)
        reject(new Error('Kakao Maps API 로드 시간 초과'))
      }
    }, 100)
  })
}

/**
 * 주소를 위도/경도 좌표로 변환합니다.
 * @param address - 변환할 주소 (예: '경기도 김포시 마산동 642-1')
 * @returns Promise<CoordinateResult> - 위도, 경도, 주소 정보
 */
export const getCoordinates = async (
  address: string
): Promise<CoordinateResult> => {
  // Kakao Maps SDK가 준비될 때까지 대기
  await waitForKakaoMaps()

  return new Promise((resolve, reject) => {
    try {
      const geocoder = new window.kakao.maps.services.Geocoder()

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { y, x, address_name } = result[0]
          resolve({
            latitude: parseFloat(y),
            longitude: parseFloat(x),
            address: address_name,
          })
        } else {
          reject(new Error(`주소를 찾을 수 없습니다: ${address}`))
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 여러 주소를 일괄로 좌표로 변환합니다.
 * @param addresses - 변환할 주소 배열
 * @returns Promise<CoordinateResult[]> - 좌표 결과 배열
 */
export const getMultipleCoordinates = async (
  addresses: string[]
): Promise<CoordinateResult[]> => {
  const results: CoordinateResult[] = []

  for (const address of addresses) {
    try {
      const result = await getCoordinates(address)
      results.push(result)
      // API 호출 간 짧은 딜레이 (rate limit 방지)
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`주소 변환 실패 (${address}):`, error)
    }
  }

  return results
}
