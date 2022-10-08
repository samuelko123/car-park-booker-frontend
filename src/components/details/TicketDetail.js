import React from 'react'
import moment from 'moment'
import { ReadOnlyField } from '../../components/TextFields'
import { Stack } from '@mui/material'

export const TicketDetail = (props) => {
	const { data } = props

	return (
		<Stack
			gap={3}
			sx={{ width: '100%' }}
		>
			{['booking_date', 'number_plate', 'status', 'run_count', 'last_run_at', 'created_at'].map(field => {
				let val = data[field]
				if (field === 'booking_date') {
					val = val.substr(0, 10)
				}

				if (field === 'last_run_at' || field === 'created_at') {
					val = moment().utc(val).format('DD/MM HH:mm')
				}

				return (
					<ReadOnlyField
						key={field}
						label={field}
						value={val}
						fullWidth
					/>
				)
			})}
		</Stack>
	)
}