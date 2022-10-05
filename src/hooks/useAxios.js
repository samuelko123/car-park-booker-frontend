import React from 'react'
import axios from 'axios'

export const useAxios = (url, method, payload) => {
	const [data, setData] = React.useState(null)
	const [error, setError] = React.useState('')
	const [loaded, setLoaded] = React.useState(false)

	React.useEffect(() => {
		(async () => {
			try {
				const response = await axios.request({
					data: payload,
					method,
					url,
				})

				setData(response.data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoaded(true)
			}
		})()
	}, [url, method, payload])

	return {
		data,
		error,
		loaded,
	}
}