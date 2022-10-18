import moment from 'moment'

export const useUpcomingWeekdays = (days) => {
	const now = moment().utcOffset(0, true).startOf('days')
	const data = [...Array(days).keys()]
		.map((index) => {
			const date = moment(now).add(index, 'days')
			const weekday = date.weekday()
			if ([0, 6].includes(weekday)) {
				return null
			}

			return date
		})
		.filter(elem => !!elem)

	return data
}