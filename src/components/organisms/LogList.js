import React from 'react'
import {
	Divider,
	List,
} from '@mui/material'
import { LogListItem } from '../organisms/LogListItem'

export const LogList = (props) => {
	const {
		data,
	} = props

	if (!!data && data.length > 0) {
		return (
			<List>
				<Divider />
				{data.map((log, index) => (
					<LogListItem
						key={index}
						timestamp={log.timestamp}
						message={log.message}
					/>
				))}
			</List>
		)
	}
}