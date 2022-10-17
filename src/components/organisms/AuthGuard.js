import React from 'react'
import { AuthContext } from './AuthProvider'
import { LoginForm } from './LoginForm'
import { BaseSpinner } from '../atoms/Spinner'
import { useLogin } from '../../hooks/useLogin'
import { ErrorAlert } from '../atoms/Alerts'

export const AuthGuard = (props) => {
	const {
		endpoint,
		children,
	} = props

	const isClientSide = (typeof window !== 'undefined')

	const {
		user,
		error: authError,
		loading: authLoading,
	} = React.useContext(AuthContext)

	const {
		login,
		error: loginError,
		loading: loginLoading,
	} = useLogin(endpoint)

	if (authLoading) {
		return <BaseSpinner />
	}

	if (isClientSide && !authLoading && !user) {
		return (
			<>
				{authError &&
					<ErrorAlert>
						{authError}
					</ErrorAlert>
				}
				{loginError &&
					<ErrorAlert>
						{loginError}
					</ErrorAlert>
				}
				<LoginForm
					onSubmit={login}
					loading={loginLoading}
				/>
			</>
		)
	}

	return children
}