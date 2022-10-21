import { useRouter } from 'next/router'
import { useAjaxRequest } from './useAjaxRequest'
import { HTTP_METHOD } from '../utils/constants'

export const useLogout = (endpoint) => {
	const [error, loading, sendRequest] = useAjaxRequest()

	const router = useRouter()
	const handleSubmit = async () => {
		const request = {
			url: endpoint,
			method: HTTP_METHOD.GET,
		}

		await sendRequest(request, () => {
			router.push('/')
		})
	}

	return {
		logout: handleSubmit,
		error,
		loading,
	}
}