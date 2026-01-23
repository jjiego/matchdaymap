export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  favorite_team_id: string | null
  created_at: string
  updated_at: string
}

export interface ProfileUpdate {
  full_name?: string
  avatar_url?: string
  favorite_team_id?: string
}
