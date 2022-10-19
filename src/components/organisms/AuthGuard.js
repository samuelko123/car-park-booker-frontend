import React from 'react'
import { useRouter } from 'next/router'
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

	const isClientSide = (typeof window !== 'undefined')

	const router = useRouter()
	if (router.pathname === '/404') {
		return children
	}

	if (authLoading && !user) {
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