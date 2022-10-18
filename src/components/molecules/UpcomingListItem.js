import React from 'react'
import moment from 'moment'
import {
	Chip,
	ListItemButton,
	ListItemText,
} from '@mui/material'
import { BaseListItem } from '../atoms/ListItems'
import { JOB_STATUS } from '../../utils/constants'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { BaseLink } from '../atoms/Links'

const BaseUpcomingListItem = (props) => {
	const {
		url,
		date,
		children,
	} = props

	return (
		<BaseListItem key={date}>
			<BaseLink href={url}>
				<ListItemButton alignItems='flex-start'>
					<ListItemText
						primary={moment.utc(date).format('DD/MM (ddd)')}
						sx={{ flex: 1 }}
					/>
					{children}
					<ArrowForwardIosIcon
						sx={{ alignSelf: 'center' }}
					/>
				</ListItemButton>
			</BaseLink>
		</BaseListItem>
	)
}

export const UpcomingBlankListItem = (props) => {
	const { date } = props

	return (
		<BaseUpcomingListItem
			url={`/tickets/create?date=${date.format('YYYY-MM-DD')}`}
			date={date}
		/>
	)
}

export const UpcomingTicketListItem = (props) => {
	const {
		date,
		ticketId,
		status,
	} = props

	return (
		<BaseUpcomingListItem
			url={`/tickets/${ticketId}`}
			date={date}
		>
			<ListItemText
				primary={
					<Chip
						size='small'
						label={status}
						color={status === JOB_STATUS.ACTIVE ? 'primary' : undefined}
					/>
				}
				sx={{ flex: 1 }}
			/>
		</BaseUpcomingListItem>
	)
}

export const UpcomingBookingListItem = (props) => {
	const {
		date,
		bookingId,
		carPark,
	} = props

	return (
		<BaseUpcomingListItem
			url={`/bookings/${bookingId}`}
			date={date}
		>
			<ListItemText
				primary={
					<Chip
						size='small'
						label={carPark}
						color='success'
					/>
				}
				sx={{ flex: 1 }}
			/>
		</BaseUpcomingListItem>
	)
}