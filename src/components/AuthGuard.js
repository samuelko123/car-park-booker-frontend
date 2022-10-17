import React from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from './AuthProvider'
import { LoginForm } from './organisms/LoginForm'
import { useAjaxRequest } from '../hooks/useAjaxRequest'
import { HTTP_METHOD } from '../utils/constants'
import { BaseSpinner } from './atoms/Spinner'

export const AuthGuard = (props) => {
	const { children } = props

	const {
		user,
		error,
		loading,
	} = React.useContext(AuthContext)

	const isClientSide = (typeof window !== 'undefined')
	const [errMsg, isLoading, sendRequest] = useAjaxRequest()

	const router = useRouter()
	const handleSubmit = async (username, password) => {
		const request = {
			url: '/api/users/login',
			method: HTTP_METHOD.POST,
			data: {
				username: username,
				password: password,
			},
		}

		await sendRequest(request, () => {
			router.reload()
		})
	}

	if (loading) {
		return <BaseSpinner />
	}

	if (error) {
		return (
			<LoginForm
				onSubmit={handleSubmit}
				error={errMsg}
				loading={isLoading}
			/>
		)
	}

	if (isClientSide && !loading && !user) {
		return (
			<LoginForm
				onSubmit={handleSubmit}
				error={errMsg}
				loading={isLoading}
			/>
		)
	}

	return children
}