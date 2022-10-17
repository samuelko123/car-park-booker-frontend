import React from 'react'
import { CircularProgress } from '@mui/material'

export const BaseSpinner = (props) => {
	const {
		color,
	} = props
	return (
		<CircularProgress
			color={color}
		/>
	)
}