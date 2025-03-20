/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileType } from '@ludispet/entities/dist/profile'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: UserType
    accessToken: string
    profile: ProfileType
  }

  interface UserType {
    id: number
    fullName: string
    email: string
    password: string
    [key: string]: any
    v1Token?: any
    profile?: ProfileType
    created_at: string
    updated_at: string
  }
}
