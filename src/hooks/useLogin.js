import React from 'react'
import { useAjaxRequest } from './useAjaxRequest'
import { HTTP_METHOD } from '../utils/constants'
import { AuthContext } from '../components/organisms/AuthProvider'

export const useLogin = (endpoint) => {
	const [error, loading, sendRequest] = useAjaxRequest()

	const { mutate } = React.useContext(AuthContext)
	const handleSubmit = async (username, password) => {
		const request = {
			url: endpoint,
			method: HTTP_METHOD.POST,
			data: {
				username: username,
				password: password,
			},
		}

		await sendRequest(request, () => {
			mutate()
		})
	}

	return {
		login: handleSubmit,
		error,
		loading,
	}
}