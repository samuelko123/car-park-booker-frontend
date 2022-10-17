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
	} = useDataFetcher(endpoint)

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