export interface Game {
  game_id: string
  super_category_id?: string
  category_id?: string
  category_name?: string
  game_date: string
  game_date_time: string
  stadium: string
  home_team_code?: string
  home_team_name: string
  home_team_score: number
  away_team_code?: string
  away_team_name: string
  away_team_score: number
  winner?: string
  status_code?: string
  status_info?: string
  match_round?: string
  home_team_emblem_url?: string
  away_team_emblem_url?: string
  created_at?: string
}
