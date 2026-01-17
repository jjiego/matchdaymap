import { supabase } from './client'

/**
 * 디버깅용: 모든 경기 데이터 확인
 */
export async function debugAllGames() {
  const { data, error } = await supabase
    .from('game')
    .select('*')
    .limit(10)

  console.log('=== All Games (first 10) ===')
  console.log('Error:', error)
  console.log('Data:', data)

  return data
}

/**
 * 디버깅용: 모든 경기장 이름 확인
 */
export async function debugStadiumNames() {
  const { data, error } = await supabase
    .from('game')
    .select('stadium')

  if (error) {
    console.log('Error:', error)
    return []
  }

  const uniqueStadiums = [...new Set(data?.map(d => d.stadium) || [])]
  console.log('=== Unique Stadium Names ===')
  console.log(uniqueStadiums)

  return uniqueStadiums
}

/**
 * 디버깅용: 특정 경기장의 모든 경기 (날짜 필터 없이)
 */
export async function debugStadiumGamesAll(stadiumName: string) {
  const { data, error } = await supabase
    .from('game')
    .select('*')
    .eq('stadium', stadiumName)

  console.log(`=== All games for ${stadiumName} ===`)
  console.log('Error:', error)
  console.log('Data:', data)

  return data
}
