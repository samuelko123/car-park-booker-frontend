import React from 'react'
import {
	CircularProgress,
	Stack,
} from '@mui/material'
import { UpcomingList } from '../components/lists/UpcomingList'
import { ErrorAlert } from '../components/atoms/Alerts'
import { ERROR } from '../utils/constants'
import { useDataFetcher } from '../hooks/useDataFetcher'
import { CreateButton } from '../components/atoms/Buttons'
import { BaseLink } from '../components/Link'

export default function Page() {
	const {
		data: bookings,
		error: errBookings,
		isLoading: isLoadingBookings,
	} = useDataFetcher('/api/bookings')

	const {
		data: tickets,
		error: errTickets,
		isLoading: isLoadingTickets,
	} = useDataFetcher('/api/tickets')

	if (
		bookings === undefined ||
		tickets === undefined
	) {
		return <CircularProgress />
	}

	return (
		<>
			{errBookings &&
				<ErrorAlert>
					{errBookings?.message || ERROR.UNKNOWN}
				</ErrorAlert>
			}
			{errTickets &&
				<ErrorAlert>
					{errTickets?.message || ERROR.UNKNOWN}
				</ErrorAlert>
			}
			<Stack flexDirection='row' gap={2}>
				<BaseLink href='/tickets/create'>
					<CreateButton>
						Book Now
					</CreateButton>
				</BaseLink>
				{
					(isLoadingBookings || isLoadingTickets) &&
					<CircularProgress size='2rem' />
				}
			</Stack>
			<UpcomingList
				bookings={bookings}
				tickets={tickets}
			/>
		</>
	)
}
