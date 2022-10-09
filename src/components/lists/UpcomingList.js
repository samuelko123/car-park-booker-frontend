import React from 'react'
import moment from 'moment'
import {
	Chip,
	Divider,
	List,
	ListItemButton,
	ListItemText,
} from '@mui/material'
import { BaseListItem } from '../ListItem'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
	JOB_STATUS,
	LIMIT,
} from '../../utils/constants'
import { BaseLink } from '../Link'

export const UpcomingList = (props) => {
	const {
		bookings,
		tickets,
	} = props

	const now = moment().utcOffset(0, true).startOf('days')
	const dateObjs = [...Array(LIMIT.AVAILABLE_DAYS_IN_ADVANCE + 1).keys()]
		.map((index) => {
			// create object
			const obj = {
				date: moment(now).add(index, 'days'),
			}

			// skip weekend
			const weekday = obj.date.weekday()
			if ([0, 6].includes(weekday)) {
				return null
			}

			// add bookings
			for (const booking of bookings) {
				if (booking.booking_date.substr(0, 10) === obj.date.format('YYYY-MM-DD')) {
					obj.status = JOB_STATUS.SUCCEEDED
					obj.booking_id = booking.id
					obj.car_park = `BOT ${booking.car_park.slice(-1)}`
					break
				}
			}

			// add tickets
			for (const ticket of tickets) {
				if (ticket.status === JOB_STATUS.SUCCEEDED){
					continue
				}

				if (ticket.booking_date.substr(0, 10) === obj.date.format('YYYY-MM-DD')) {
					obj.ticket_id = ticket.id
					obj.status = ticket.status
					break
				}
			}

			return obj
		})
		.filter(elem => !!elem)

	return (
		<List>
			<Divider />
			{
				dateObjs.map((obj) => {
					let url
					if (!!obj.booking_id) {
						url = `/bookings/${obj.booking_id}`
					} else if (!!obj.ticket_id) {
						url = `/tickets/${obj.ticket_id}`
					} else {
						url = `/tickets/create?date=${obj.date.format('YYYY-MM-DD')}`
					}

					const chipText = !!obj.booking_id ? obj.car_park : obj.status

					let chipColor
					if (!!obj.booking_id) {
						chipColor = 'success'
					}
					else if (obj.status === JOB_STATUS.FAILED) {
						chipColor = 'error'
					}
					else if (!!obj.status) {
						chipColor = 'primary'
					} else {
						chipColor = undefined
					}

					return (
						<React.Fragment key={obj.date}>
							<BaseListItem>
								<BaseLink href={url}>
									<ListItemButton alignItems='flex-start'>
										<ListItemText
											primary={moment.utc(obj.date).format('DD/MM (ddd)')}
											sx={{ flex: 1 }}
										/>
										{
											obj.status &&
											<ListItemText
												primary={
													<Chip
														size='small'
														label={chipText}
														color={chipColor}
													/>
												}
												sx={{ flex: 1 }}
											/>
										}
										<ArrowForwardIosIcon
											sx={{ alignSelf: 'center' }}
										/>
									</ListItemButton>
								</BaseLink>
							</BaseListItem>
							{obj.date.weekday() === 5 &&
								<Divider sx={{ borderWidth: 1 }} />
							}
						</React.Fragment>
					)
				})
			}
		</List>
	)
}