import React from 'react'
import { Alert } from '@mui/material'

export const BaseAlert = (props) => {
	const {
		severity,
		children,
	} = props

	return (
		<Alert
			severity={severity}
			sx={{
				display: 'inline-flex',
				width: 'fit-content',
				whiteSpace: 'pre-wrap',
			}}
		>
			{typeof children === 'object' ?
				JSON.stringify(children, null, 2) :
				children
			}
		</Alert>
	)
}