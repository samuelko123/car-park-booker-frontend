import React from 'react'
import { useDataFetcher } from '../hooks/useDataFetcher'

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
	const { children } = props

	const {
		data: user,
		error,
		isLoading,
	} = useDataFetcher('/api/users/me')

	return (
		<AuthContext.Provider
			value={{
				user: user,
				error: error,
				loading: isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}