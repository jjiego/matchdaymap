'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/types/profile'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signInWithKakao: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // 프로필이 아직 생성되지 않은 경우 (트리거 함수 지연)
        if (error.code === 'PGRST116') {
          console.log('Profile not yet created, retrying...')
          await new Promise(resolve => setTimeout(resolve, 500))
          return fetchProfile(userId)
        }
        console.error('Error fetching profile:', error)
        return null
      }
      return data as Profile
    } catch (err) {
      console.error('Unexpected error fetching profile:', err)
      return null
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile)
      }

      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // 닉네임과 프로필 이미지만 요청 (이메일 제외)
          // 개인 개발자는 account_email scope에 접근 불가
          scopes: 'profile_nickname profile_image',
          skipBrowserRedirect: false,
          queryParams: {
            scope: 'profile_nickname profile_image'
          }
        },
      })
      if (error) {
        console.error('Kakao login error:', error.message)
        // account_email 오류인 경우 사용자 친화적 메시지 출력
        if (error.message?.includes('account_email')) {
          throw new Error('카카오 로그인 설정에 문제가 있습니다. 관리자에게 문의해주세요.')
        }
        throw error
      }
    } catch (err) {
      console.error('Kakao login exception:', err)
      throw err
    }
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'profile',
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in')

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (error) throw error

    const newProfile = await fetchProfile(user.id)
    setProfile(newProfile)
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signInWithKakao, signInWithGoogle, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
