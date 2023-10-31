import React from 'react'
import { User } from 'firebase/auth'

import { auth } from 'config'

import { IContext } from '../types'
import { Mappers } from '..'

export const useProfile = () => {
  const [state, setState] = React.useState<Omit<IContext.Auth, 'methods'>>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  React.useEffect(() => {
    auth.onAuthStateChanged((currentUser: User | null) => {
      const user = currentUser ? Mappers.User(currentUser) : null

      setState({ user, isLoading: false, isAuthenticated: !!user })
    })
  }, [])

  return [state, setState] as const
}
