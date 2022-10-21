import React from 'react'
import { useRouter } from 'next/router'
import { useAjaxRequest } from './useAjaxRequest'
import { HTTP_METHOD } from '../utils/constants'
import { AuthContext } from '../components/organisms/AuthProvider'

export const useLogout = (endpoint) => {
	const [error, loading, sendRequest] = useAjaxRequest()

	const router = useRouter()
	const { mutate } = React.useContext(AuthContext)

	const handleSubmit = async () => {
		const request = {
			url: endpoint,
			method: HTTP_METHOD.GET,
		}

		await sendRequest(request, () => {
			mutate()
			router.push('/')
		})
	}

	return {
		logout: handleSubmit,
		error,
		loading,
	}
}