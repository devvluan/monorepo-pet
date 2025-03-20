import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { AuthOptions, UserType } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: AuthOptions = {
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    newUser: '/register',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    csrfToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.csrf-token'
          : 'next-auth.csrf-token',
      options: {
        domain:
          process.env.NODE_ENV === 'production'
            ? '.ludispet.com.br'
            : undefined,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      },
    },
    callbackUrl: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.callback-url'
          : 'next-auth.callback-url',
      options: {
        domain:
          process.env.NODE_ENV === 'production'
            ? '.ludispet.com.br'
            : undefined,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      },
    },
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        domain:
          process.env.NODE_ENV === 'production'
            ? '.ludispet.com.br'
            : undefined,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      },
    },
  },
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      if (token.user) {
        session.user = token.user as UserType
        delete token.login
      }
      return session
    },
    async jwt({ token, user: data }) {
      console.log( 'token => ', token)
      if ((token.user as UserType) && !(token.user as UserType).v3Token && !(token.user as UserType).admMode) {
        console.warn('bateu aqui')
        token.user = null
        return token
      }

      if (data) {
        token.accessToken = (data as unknown as UserType).token
        token.user = (data as unknown as UserType)?.user as UserType
        api.defaults.headers.common.Authorization = `Bearer ${(token.user as UserType).v3Token}`
      }

      return token
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        ip: { label: 'ip', type: 'hidden' },
        userAgent: { label: 'userAgent', type: 'hidden' },
        switchUser: { label: 'switchUser', type: 'hidden' },
      },

      async authorize(credentials) {
        if (credentials?.switchUser) {
          return { ...JSON.parse(credentials?.switchUser) }
        }

        try {
          const { data } = await api.post('/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
            ip: credentials?.ip,
            userAgent: credentials?.userAgent,
          })

          if (data.token) {
            return {
              login: true,
              user: { ...data.user, loginDate: new Date().getTime(), v3Token: data.token },
            }
          }
        } catch (error) {
          console.error(error)
          if (error instanceof AxiosError) {
            const errorData = error.response?.data

            if ((errorData.field && errorData.field === 'password') || errorData?.message === 'Invalid user credentials') {
              console.warn('bateu aqui no erro')
              throw new Error(encodeURIComponent('Senha ou email inválido(s)!'))
            }
          }
        }

        return null
      },
    }),
  ],
}
