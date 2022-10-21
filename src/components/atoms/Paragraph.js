import React from 'react'
import { Typography } from '@mui/material'

export const BaseParagraph = (props) => {
	const { children } = props

	return (
		<Typography
			padding={0}
		>
			{children}
		</Typography>
	)
}