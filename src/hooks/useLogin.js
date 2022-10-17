import { useRouter } from 'next/router'
import { useAjaxRequest } from './useAjaxRequest'
import { HTTP_METHOD } from '../utils/constants'

export const useLogin = (endpoint) => {
	const [error, loading, sendRequest] = useAjaxRequest()

	const router = useRouter()
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
			router.reload()
		})
	}

	return {
		login: handleSubmit,
		error,
		loading,
	}
}