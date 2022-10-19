import React from 'react'
import { useDataFetcher } from '../../hooks/useDataFetcher'

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
	const {
		endpoint,
		children,
	} = props

	const {
		data: user,
		error,
		isLoading,
		mutate,
	} = useDataFetcher(endpoint)

	return (
		<AuthContext.Provider
			value={{
				user,
				error,
				loading: isLoading,
				mutate,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}