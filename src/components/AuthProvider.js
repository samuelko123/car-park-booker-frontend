import React from 'react'
import { useAxios } from '../hooks/useAxios'
import { HTTP_METHOD } from '../utils/constants'

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
	const { children } = props

	const {
		data: user,
		error,
		loaded,
	} = useAxios('/api/users/me', HTTP_METHOD.GET, '')

	return (
		<AuthContext.Provider
			value={{
				user: user,
				error: error,
				loading: !loaded,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}