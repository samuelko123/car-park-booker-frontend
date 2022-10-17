import React from 'react'
import { Alert } from '@mui/material'

const BaseAlert = React.forwardRef((props, ref) => {
	const {
		children,
	} = props

	return (
		<Alert
			ref={ref}
			{...props}
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
})

export const InfoAlert = React.forwardRef((props, ref) => {
	return (
		<BaseAlert
			ref={ref}
			{...props}
			severity='info'
		/>
	)
})

export const ErrorAlert = React.forwardRef((props, ref) => {
	return (
		<BaseAlert
			ref={ref}
			{...props}
			severity='error'
		/>
	)
})