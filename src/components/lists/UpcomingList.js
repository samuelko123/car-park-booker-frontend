import React from 'react'
import {
	Divider,
	List,
} from '@mui/material'
import {
	UpcomingBlankListItem,
	UpcomingBookingListItem,
	UpcomingTicketListItem,
} from '../molecules/UpcomingListItem'
import { useUpcomingData } from '../../hooks/useUpcomingData'

export const UpcomingList = (props) => {
	const {
		bookings,
		tickets,
	} = props

	const data = useUpcomingData(bookings, tickets)

	return (
		<List>
			<Divider />
			{
				data.map((obj) => {
					return (
						<React.Fragment key={obj.date}>
							{obj.bookingId &&
								<UpcomingBookingListItem
									date={obj.date}
									bookingId={obj.bookingId}
									carPark={obj.carPark}
								/>
							}
							{obj.ticketId &&
								<UpcomingTicketListItem
									date={obj.date}
									ticketId={obj.ticketId}
									status={obj.status}
								/>
							}
							{!obj.bookingId && !obj.ticketId &&
								<UpcomingBlankListItem
									date={obj.date}
								/>
							}
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