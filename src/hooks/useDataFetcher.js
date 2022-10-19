import axios from 'axios'
import useSWR from 'swr'

export const useDataFetcher = (endpoint) => {
	const fetcher = url => {
		return axios
			.get(url)
			.then(res => res.data)
			.catch(err => {
				if (err?.code === 'ERR_BAD_REQUEST') {
					throw new Error('Not Found')
				} else {
					throw err
				}
			})
	}

	const {
		data,
		error,
		isValidating,
		mutate,
	} = useSWR(endpoint, fetcher, {
		revalidateOnFocus: false,
		revalidateOnMount: true,
		revalidateOnReconnect: false,
		revalidateIfStale: true,
	})

	return {
		data,
		error,
		isLoading: isValidating,
		mutate,
	}
}