import { JOB_STATUS } from '../utils/constants'
import { useUpcomingWeekdays } from './useUpcomingWeekDays'

export const useUpcomingData = (days, bookings, tickets) => {
	const dates = useUpcomingWeekdays(days)
	const data = dates.map((date) => {
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

	return data
}