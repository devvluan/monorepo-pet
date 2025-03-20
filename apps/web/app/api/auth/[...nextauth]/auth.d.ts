import { ProfileType } from '@ludispet/entities/dist/profile'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: UserType
    accessToken: string
    profile: ProfileType
  }

  interface UserType {
    [key: string]: unknown
    id: number
    secretNumber: null | string
    fullName: string
    email: string
    password: string
    security_key?: string
    profile?: ProfileType
    created_at: string
    updated_at: string
  }
}
