import {
	JOB_STATUS,
	LIMIT,
} from '../utils/constants'
import moment from 'moment'

export const useUpcomingData = (bookings, tickets) => {
	const now = moment().utcOffset(0, true).startOf('days')
	const data = [...Array(LIMIT.AVAILABLE_DAYS_IN_ADVANCE + 1).keys()]
		.map((index) => {
			const date = moment(now).add(index, 'days')
			const weekday = date.weekday()
			if ([0, 6].includes(weekday)) {
				return null
			}

			const obj = {
				date: date,
			}

			for (const booking of bookings) {
				if (booking.booking_date.substr(0, 10) === date.format('YYYY-MM-DD')) {
					obj.bookingId = booking.id
					obj.carPark = `BOT ${booking.car_park.slice(-1)}`
					return obj
				}
			}

			for (const ticket of tickets) {
				if (ticket.status === JOB_STATUS.SUCCEEDED) {
					continue
				}

				if (ticket.booking_date.substr(0, 10) === obj.date.format('YYYY-MM-DD')) {
					obj.ticketId = ticket.id
					obj.status = ticket.status
					return obj
				}
			}

			return obj
		})
		.filter(elem => !!elem)

	return data
}