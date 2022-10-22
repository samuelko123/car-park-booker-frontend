import React from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	List,
	Typography,
} from '@mui/material'
import { LogListItem } from '../organisms/LogListItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import moment from 'moment'

export const LogList = (props) => {
	const {
		data,
	} = props

	if (!!data && data.length > 0) {
		const logs = data.reduce((prev, curr) => {
			const date = moment(curr.timestamp).format('YYYY.MM.DD')
			if (!prev[date]) {
				prev[date] = []
			}
			prev[date].push(curr)

			return prev
		}, {})

		return (
			<div>
				{
					Object.keys(logs).map(date => {
						return (
							<Accordion key={date}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography>{date} ({logs[date].length})</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<List>
										<Divider />
										{logs[date].map((log, index) => (
											<LogListItem
												key={index}
												timestamp={log.timestamp}
												message={log.message}
											/>
										))}
									</List>
								</AccordionDetails>
							</Accordion>
						)
					})
				}
			</div>
		)
	}
}