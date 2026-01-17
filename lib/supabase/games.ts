import { supabase } from './client'
import { Game } from '@/lib/types/game'

/**
 * 특정 경기장의 최근 경기 일정을 가져옵니다 (오늘 날짜 기준 이후)
 * @param stadiumName 경기장 이름
 * @param limit 가져올 경기 수 (기본값: 5)
 * @returns 경기 목록
 */
export async function getStadiumGames(stadiumName: string, limit: number = 5): Promise<Game[]> {
  try {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD 형식

    console.log('Fetching games for stadium:', stadiumName)
    console.log('Today date:', today)

    const { data, error } = await supabase
      .from('game')
      .select('*')
      .eq('stadium', stadiumName)
      .gte('game_date', today)
      .order('game_date', { ascending: true })
      .order('game_date_time', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Error fetching games:', error)
      return []
    }

    console.log('Games found:', data?.length || 0, 'games')
    console.log('Games data:', data)

    return data || []
  } catch (error) {
    console.error('Error in getStadiumGames:', error)
    return []
  }
}

/**
 * 특정 팀의 최근 경기 일정을 가져옵니다 (오늘 날짜 기준 이후)
 * @param teamName 팀 이름
 * @param limit 가져올 경기 수 (기본값: 5)
 * @returns 경기 목록
 */
export async function getTeamGames(teamName: string, limit: number = 5): Promise<Game[]> {
  try {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD 형식

    const { data, error } = await supabase
      .from('game')
      .select('*')
      .or(`home_team_name.eq.${teamName},away_team_name.eq.${teamName}`)
      .gte('game_date', today)
      .order('game_date', { ascending: true })
      .order('game_date_time', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Error fetching team games:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getTeamGames:', error)
    return []
  }
}
