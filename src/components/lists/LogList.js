import React from 'react'
import moment from 'moment'
import {
	Divider,
	List,
	ListItemText,
} from '@mui/material'
import { BaseListItem } from '../ListItem'

export const LogList = (props) => {
	const {
		data,
	} = props

	return (
		<>
			{!!data && data.length > 0 &&
				<List>
					<Divider />
					{data.map((log, index) => (
						<BaseListItem key={index} alignItems='flex-start'>
							<ListItemText
								primary={moment(log.timestamp).format('DD/MM HH:mm')}
								sx={{ flex: 3 }}
							/>
							<ListItemText
								primary={log.message}
								sx={{ flex: 7 }}
							/>
						</BaseListItem>
					))}
				</List>
			}
		</>
	)
}