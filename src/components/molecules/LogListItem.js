import React from 'react'
import moment from 'moment'
import { ListItemText } from '@mui/material'
import { BaseListItem } from '../atoms/ListItems'

export const LogListItem = (props) => {
	const {
		timestamp,
		message,
	} = props

	return (
		<BaseListItem>
			<ListItemText
				primary={moment(timestamp).format('DD/MM HH:mm')}
				sx={{ flex: 3 }}
			/>
			<ListItemText
				primary={message}
				sx={{ flex: 7 }}
			/>
		</BaseListItem>
	)
}